import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateOfficialNames.js")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const failed = []
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    throw new Error("Invalid JSON from Gemini")
  }
}

// Generate proper names, short names, and slugs using Gemini
async function getOfficialNameAndSlug(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an expert on higher education institutions in India.
Standardize the college name, popular short name, and URL slug to their official registered format.

Guidelines:
1. official_name:
   - Generate the complete, official full name of the university or college (e.g. "Indian Institute of Technology Bombay" instead of "IIT Bombay").
   - If it is a department or business school within a university (e.g., SJMSOM or DMS), include both (e.g., "Shailesh J. Mehta School of Management, IIT Bombay").

2. short_name:
   - Generate the popular short name, acronym, or common abbreviation for the institution (e.g., "IIT Bombay", "SRM University", "BITS Pilani", "IIM Ahmedabad", "MSU Baroda").
   - If there is no common abbreviation, use a simplified/shortened version of the official name.

3. proper_slug:
   - Generate a clean, lowercase, hyphenated slug representing ONLY the name of the institution itself (e.g. "indian-institute-of-technology-bombay", "graphic-era-university", "maharaja-sayajirao-university-of-baroda").
   - CRITICAL: Do NOT include departments, streams, or shorthand suffixes like "mgmt", "tech", "pharmacy", "medical", "law", "engineering", etc.
   - Example: "Graphic Era Hill University" ➔ "graphic-era-hill-university".
   - Example: "Birla Institute of Technology and Science Pilani" ➔ "birla-institute-of-technology-and-science-pilani".

Return ONLY a valid JSON object in this exact format:
{
  "official_name": "Birla Institute of Technology and Science Pilani",
  "short_name": "BITS Pilani",
  "proper_slug": "birla-institute-of-technology-and-science-pilani"
}

College Details:
- Current Name: ${college.name}
- Location: ${college.location}, ${college.state}
- Stream: ${college.stream}
- Slug: ${college.slug}
`

  try {
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 12000)
      )
    ])
    const text = result.response.text()
    const parsed = safeParse(text)
    
    return {
      official_name: parsed.official_name ? parsed.official_name.trim() : null,
      short_name: parsed.short_name ? parsed.short_name.trim() : null,
      proper_slug: parsed.proper_slug ? parsed.proper_slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '') : null
    }
  } catch (err) {
    console.error(`❌ Gemini Error for ${college.name}:`, err.message)
    return null
  }
}

async function run() {
  console.log("📡 Fetching all active colleges...")

  const { data: colleges, error } = await supabase
    .from("colleges")
    .select("id, name, location, state, stream, slug")
    .eq("is_active", true)
    .order('id', { ascending: true })

  if (error) {
    console.error("Supabase fetch error:", error)
    return
  }

  console.log(`🔍 Found ${colleges.length} colleges to process.`)

  // Track slugs in a Set to handle uniqueness checks
  const processedSlugs = new Set()

  for (let i = 0; i < colleges.length; i++) {
    const college = colleges[i]
    console.log(`[${i + 1}/${colleges.length}] Processing: ${college.name}`)

    const officialData = await getOfficialNameAndSlug(college)

    if (officialData && officialData.official_name && officialData.short_name && officialData.proper_slug) {
      let finalSlug = officialData.proper_slug
      let counter = 2
      
      // Resolve any slug collisions to prevent database UNIQUE constraint violations
      while (processedSlugs.has(finalSlug)) {
        finalSlug = `${officialData.proper_slug}-${counter}`
        counter++
      }
      processedSlugs.add(finalSlug)

      const { error: updateError } = await supabase
        .from("colleges")
        .update({
          name: officialData.official_name,
          short_name: officialData.short_name,
          slug: finalSlug,
          updated_at: new Date().toISOString()
        })
        .eq("id", college.id)

      if (updateError) {
        console.error(`❌ Supabase update error for ${college.name}:`, updateError.message)
        failed.push(college)
      } else {
        console.log(`   ✅ Name: "${officialData.official_name}" | Short Name: "${officialData.short_name}" | Slug: "${finalSlug}"`)
      }
    } else {
      console.warn(`   ⚠️ Skipping update (invalid data received).`)
      failed.push(college)
    }

    await delay(300)
  }

  console.log("\n🏁 Done processing.")
  if (failed.length > 0) {
    console.log(`⚠️ Failed / Skipped colleges (${failed.length}):`, failed.map(c => c.name).join(', '))
  } else {
    console.log("🎉 All colleges renamed and updated successfully!")
  }
}

run()

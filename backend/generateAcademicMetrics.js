import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateAcademicMetrics.js")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const failed = []

// Delay utility
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// Safe JSON parser
function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    throw new Error("Invalid JSON from Gemini")
  }
}

// Generate Academic Metrics using Gemini 2.5 Flash
async function getAcademicMetrics(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an expert on higher education institutions in India.
Estimate realistic values for international students enrollment and research publications for the following college.

Guidelines:
1. international_students (Integer):
   - Number of international students currently enrolled.
   - Top tier universities/institutes (like IIT Bombay, IIT Delhi, BITS Pilani, IIMs, VIT, Manipal) should have between 50 and 400.
   - Mid tier colleges should have between 5 and 50.
   - Low tier or local colleges should have 0.

2. research_publications (Integer):
   - Number of research publications (e.g., papers, books, patents) in the last few years.
   - Top engineering/medical research institutes (like IITs, IISc, top AIIMS) should have between 1000 and 5000.
   - Established private/government colleges should have between 100 and 800.
   - Smaller or teaching-focused colleges should have between 10 and 90.

Return ONLY a valid JSON object in this exact format:
{
  "international_students": 120,
  "research_publications": 850
}

College Details:
- Name: ${college.name}
- Location: ${college.location}, ${college.state}
- Stream: ${college.stream}
- Ownership: ${college.ownership || 'Private'}
- NIRF Rank: ${college.nirf_rank || 'Not ranked'}
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
      international_students: typeof parsed.international_students === 'number' ? parsed.international_students : null,
      research_publications: typeof parsed.research_publications === 'number' ? parsed.research_publications : null
    }
  } catch (err) {
    console.error(`❌ Gemini Error for ${college.name}:`, err.message)
    return null
  }
}

// Main execution run
async function run() {
  console.log("📡 Fetching colleges missing academic metrics...")

  const { data: colleges, error } = await supabase
    .from("colleges")
    .select("id, name, location, state, stream, ownership, nirf_rank")
    .or("international_students.is.null,research_publications.is.null")
    .order('id', { ascending: true })

  if (error) {
    console.error("Supabase fetch error:", error)
    return
  }

  if (!colleges || colleges.length === 0) {
    console.log("✅ All colleges already have academic metrics!")
    return
  }

  console.log(`🔍 Found ${colleges.length} colleges to process.`)

  for (let i = 0; i < colleges.length; i++) {
    const college = colleges[i]
    console.log(`[${i + 1}/${colleges.length}] Processing: ${college.name} (${college.location})`)

    const metrics = await getAcademicMetrics(college)

    if (metrics && (metrics.international_students !== null || metrics.research_publications !== null)) {
      const updatePayload = {
        updated_at: new Date().toISOString()
      }
      if (metrics.international_students !== null) {
        updatePayload.international_students = metrics.international_students
      }
      if (metrics.research_publications !== null) {
        updatePayload.research_publications = metrics.research_publications
      }

      const { error: updateError } = await supabase
        .from("colleges")
        .update(updatePayload)
        .eq("id", college.id)

      if (updateError) {
        console.error(`❌ Supabase update error for ${college.name}:`, updateError.message)
        failed.push(college)
      } else {
        console.log(`   ✅ Successfully updated! International: ${metrics.international_students || 0}, Research: ${metrics.research_publications || 0}`)
      }
    } else {
      console.warn(`   ⚠️ Skipping update (invalid academic metrics received).`)
      failed.push(college)
    }

    // Standard sleep to avoid rate limits
    await delay(300)
  }

  console.log("\n🏁 Done processing.")
  if (failed.length > 0) {
    console.log(`⚠️ Failed / Skipped colleges (${failed.length}):`, failed.map(c => c.name).join(', '))
  } else {
    console.log("🎉 All processed colleges updated successfully with zero errors!")
  }
}

run()

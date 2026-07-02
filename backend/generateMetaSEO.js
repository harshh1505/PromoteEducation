import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateMetaSEO.js")

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

// Generate Meta Title and Meta Description using Gemini 2.5 Flash
async function getMetaSEO(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an SEO expert specializing in higher education portals in India.
Generate a search engine optimized Meta Title and Meta Description for the following college.

Guidelines:
1. Meta Title (Max 60 characters):
   - Format: "[College Name], [City] - Admissions, Placement, Fees 2026"
   - Keep it engaging, clear, and under 60 characters so it fits on Google search results.

2. Meta Description (150-160 characters):
   - Summarize the college's key details: placements, fees, courses, ranking, and how to apply.
   - Must be between 140 and 160 characters. Make it highly clickable and action-oriented for prospective students.

Return ONLY a valid JSON object in this exact format:
{
  "meta_title": "IIT Bombay, Mumbai - Admissions, Placement, Fees 2026",
  "meta_description": "Explore IIT Bombay admission process, cutoff ranks, average placement package, fee structure, and courses for 2026. Apply directly for details."
}

College Details:
- Name: ${college.name}
- Location: ${college.location}, ${college.state}
- Stream: ${college.stream}
- Ownership: ${college.ownership || 'Private'}
- Average CTC/Package: ${college.avg_ctc || 'Not specified'}
- Fees: ${college.total_fee || 'Not specified'}
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
      meta_title: parsed.meta_title ? parsed.meta_title.trim() : null,
      meta_description: parsed.meta_description ? parsed.meta_description.trim() : null
    }
  } catch (err) {
    console.error(`❌ Gemini Error for ${college.name}:`, err.message)
    return null
  }
}

// Main execution run
async function run() {
  console.log("📡 Fetching colleges missing meta tags...")

  const { data: colleges, error } = await supabase
    .from("colleges")
    .select("id, name, location, state, stream, ownership, avg_ctc, total_fee")
    .or("meta_title.is.null,meta_description.is.null")
    .order('id', { ascending: true })

  if (error) {
    console.error("Supabase fetch error:", error)
    return
  }

  if (!colleges || colleges.length === 0) {
    console.log("✅ All colleges already have meta titles and descriptions!")
    return
  }

  console.log(`🔍 Found ${colleges.length} colleges to process.`)

  for (let i = 0; i < colleges.length; i++) {
    const college = colleges[i]
    console.log(`[${i + 1}/${colleges.length}] Processing: ${college.name} (${college.location})`)

    const seoData = await getMetaSEO(college)

    if (seoData && seoData.meta_title && seoData.meta_description) {
      const { error: updateError } = await supabase
        .from("colleges")
        .update({
          meta_title: seoData.meta_title,
          meta_description: seoData.meta_description,
          updated_at: new Date().toISOString()
        })
        .eq("id", college.id)

      if (updateError) {
        console.error(`❌ Supabase update error for ${college.name}:`, updateError.message)
        failed.push(college)
      } else {
        console.log(`   ✅ Successfully updated meta tags!`)
      }
    } else {
      console.warn(`   ⚠️ Skipping update (invalid SEO data received).`)
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

import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateFacilities.js")

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

// Generate facilities using Gemini 2.5 Flash
async function getFacilities(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an expert on higher education institutions in India.
Generate a list of 5-8 key campus facilities for the following college.

Guidelines:
1. Provide standard facilities (e.g., "Library", "Cafeteria", "Sports Complex", "Gym", "Wi-Fi Campus", "Boys Hostel", "Girls Hostel", "Auditorium", "Computer Labs", "Medical Facilities").
2. Tailor them slightly based on the stream:
   - For Medical colleges, prioritize: "Hospital", "Clinical Labs", "Medical Library".
   - For Law colleges, prioritize: "Moot Court", "Law Library".
   - For Engineering colleges, prioritize: "Advanced Labs", "Workshop".

Return ONLY a valid JSON object in this exact format:
{
  "facilities": ["Library", "Boys Hostel", "Girls Hostel", "Computer Labs", "Sports Complex", "Cafeteria"]
}

College Details:
- Name: ${college.name}
- Location: ${college.location}, ${college.state}
- Stream: ${college.stream}
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
    
    if (parsed.facilities && Array.isArray(parsed.facilities)) {
      return parsed.facilities.map(f => f.trim()).filter(Boolean)
    }
    return null
  } catch (err) {
    console.error(`❌ Gemini Error for ${college.name}:`, err.message)
    return null
  }
}

// Main execution run
async function run() {
  console.log("📡 Fetching colleges missing facilities...")

  const { data: colleges, error } = await supabase
    .from("colleges")
    .select("id, name, location, state, stream")
    .is("facilities", null)
    .order('id', { ascending: true })

  if (error) {
    console.error("Supabase fetch error:", error)
    return
  }

  if (!colleges || colleges.length === 0) {
    console.log("✅ All colleges already have facilities!")
    return
  }

  console.log(`🔍 Found ${colleges.length} colleges to process.`)

  for (let i = 0; i < colleges.length; i++) {
    const college = colleges[i]
    console.log(`[${i + 1}/${colleges.length}] Processing: ${college.name} (${college.location})`)

    const facilities = await getFacilities(college)

    if (facilities && facilities.length > 0) {
      const { error: updateError } = await supabase
        .from("colleges")
        .update({
          facilities: facilities,
          updated_at: new Date().toISOString()
        })
        .eq("id", college.id)

      if (updateError) {
        console.error(`❌ Supabase update error for ${college.name}:`, updateError.message)
        failed.push(college)
      } else {
        console.log(`   ✅ Successfully updated facilities: ${facilities.join(", ")}`)
      }
    } else {
      console.warn(`   ⚠️ Skipping update (invalid facilities data received).`)
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

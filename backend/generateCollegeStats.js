import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateCollegeStats.js")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const failed = []

// Delay
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

// Generate AI content
async function getCollegeStats(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an expert on higher education institutions in India.
Provide the estimated "NAAC Grade", "Placement Rate", and "Campus Size" for the following college.

Return ONLY a valid JSON object in this exact format. 
- "naac_grade": A valid NAAC grade string (e.g., "A++", "A+", "A", "B++", "B+", "B", "C"). If not accredited or unknown, return null.
- "placement_rate": A number representing the placement percentage (e.g., 95.5, 80.0). Do NOT include the '%' sign. If unknown, return null.
- "campus_size": A string describing the campus size in acres (e.g., "250 Acres", "50 Acres"). If unknown, return null.

{
  "naac_grade": "A+",
  "placement_rate": 85.5,
  "campus_size": "200 Acres"
}

College Name: ${college.name}
Location: ${college.location}, ${college.state}
Stream: ${college.stream}
`

  try {
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 10000)
      )
    ])
    const text = result.response.text()
    const parsed = safeParse(text)
    
    return {
      naac_grade: parsed.naac_grade || null,
      placement_rate: typeof parsed.placement_rate === 'number' ? parsed.placement_rate : null,
      campus_size: parsed.campus_size || null
    }
  } catch (err) {
    console.error(`Gemini Error for ${college.name}:`, err.message)
    return null
  }
}

// MAIN FUNCTION
async function run() {
  console.log("📡 Fetching colleges...")

  // Fetching all colleges. You can add .or('naac_grade.is.null,placement_rate.is.null,campus_size.is.null') to filter if needed.
  const { data: colleges, error } = await supabase
    .from("colleges")
    .select("id, name, location, state, stream")
    .order('id', { ascending: true })

  if (error) {
    console.error("Supabase fetch error:", error)
    return
  }

  if (!colleges || colleges.length === 0) {
    console.log("No colleges left to process")
    return
  }

  console.log(`Found ${colleges.length} colleges to process`)

  let successCount = 0;
  let notFoundCount = 0;

  for (const college of colleges) {
    console.log(`\nGenerating for: ${college.name}`)

    try {
      const stats = await getCollegeStats(college)

      if (stats === null || (stats.naac_grade === null && stats.placement_rate === null && stats.campus_size === null)) {
          console.log(`⚠️ Gemini could not confidently determine stats for: ${college.name}`)
          notFoundCount++;
          await delay(1000)
          continue;
      }

      const { error: updateError } = await supabase
        .from("colleges")
        .update({ 
          naac_grade: stats.naac_grade,
          placement_rate: stats.placement_rate,
          campus_size: stats.campus_size
        })
        .eq("id", college.id)

      if (updateError) {
        console.error("Update error:", updateError)
        failed.push(college.name)
        continue
      }

      console.log(`✅ Saved: ${college.name} (NAAC: ${stats.naac_grade}, Placement: ${stats.placement_rate}%, Campus: ${stats.campus_size})`)
      successCount++;
      await delay(1000) 
    } catch (err) {
      console.error(`Failed: ${college.name}`, err.message)
      failed.push(college.name)
      await delay(2000)
    }
  }

  console.log("\n🎉 Completed!")
  console.log(`Successfully Updated: ${successCount}`)
  console.log(`Stats Not Found/Null: ${notFoundCount}`)
  if (failed.length > 0) {
    console.log(`Failed Updates: ${failed.length}`)
  }
}

run()

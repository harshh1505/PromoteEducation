import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateMoreStats.js")

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
async function getMoreStats(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an expert on higher education institutions in India.
Provide the estimated "Affiliation", "NAAC CGPA", and "Total Students" for the following college.

Return ONLY a valid JSON object in this exact format. 
- "affiliation": The university or board the college is affiliated to (e.g., "Delhi University", "JNTU Hyderabad", "Autonomous"). If unknown, return null.
- "naac_cgpa": A number representing the NAAC CGPA on a 4-point scale (e.g., 3.25, 3.8). If not accredited or unknown, return null.
- "total_students": An integer representing the approximate total number of students currently enrolled (e.g., 5000, 2500). Do NOT include commas in the number. If unknown, return null.

{
  "affiliation": "Delhi University",
  "naac_cgpa": 3.45,
  "total_students": 4500
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
      affiliation: parsed.affiliation || null,
      naac_cgpa: typeof parsed.naac_cgpa === 'number' ? parsed.naac_cgpa : null,
      total_students: typeof parsed.total_students === 'number' ? parsed.total_students : null
    }
  } catch (err) {
    console.error(`Gemini Error for ${college.name}:`, err.message)
    return null
  }
}

// MAIN FUNCTION
async function run() {
  console.log("📡 Fetching colleges...")

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
      const stats = await getMoreStats(college)

      if (stats === null || (stats.affiliation === null && stats.naac_cgpa === null && stats.total_students === null)) {
          console.log(`⚠️ Gemini could not confidently determine stats for: ${college.name}`)
          notFoundCount++;
          await delay(1000)
          continue;
      }

      const { error: updateError } = await supabase
        .from("colleges")
        .update({ 
          affiliation: stats.affiliation,
          naac_cgpa: stats.naac_cgpa,
          total_students: stats.total_students
        })
        .eq("id", college.id)

      if (updateError) {
        console.error("Update error:", updateError)
        failed.push(college.name)
        continue
      }

      console.log(`✅ Saved: ${college.name} (Affiliation: ${stats.affiliation}, NAAC CGPA: ${stats.naac_cgpa}, Total Students: ${stats.total_students})`)
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

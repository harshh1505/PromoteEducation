import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateMoreStats2.js")

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
async function getMoreStats2(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an expert on higher education institutions in India.
Provide the estimated "Total Offers", "Companies Visited", "Entrance Exams", "Faculty Count", and "PhD Scholars" for the following college.

Return ONLY a valid JSON object in this exact format. 
- "total_offers": An integer representing the approximate total number of placement offers given to students in a year (e.g., 1500). Do NOT include commas. If unknown, return null.
- "companies_visited": An integer representing the approximate number of companies that visit for campus placements in a year (e.g., 250). Do NOT include commas. If unknown, return null.
- "entrance_exam": A string listing all major entrance exams accepted for admission across all courses, separated by commas (e.g., "JEE Main, GATE, CAT"). If unknown, return null.
- "faculty_count": An integer representing the approximate total number of faculty members in the institution (e.g., 350). Do NOT include commas. If unknown, return null.
- "phd_scholars": An integer representing the approximate total number of PhD scholars currently enrolled (e.g., 120). Do NOT include commas. If unknown, return null.

{
  "total_offers": 1500,
  "companies_visited": 250,
  "entrance_exam": "JEE Main, GATE, CAT",
  "faculty_count": 350,
  "phd_scholars": 120
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
      total_offers: typeof parsed.total_offers === 'number' ? parsed.total_offers : null,
      companies_visited: typeof parsed.companies_visited === 'number' ? parsed.companies_visited : null,
      entrance_exam: typeof parsed.entrance_exam === 'string' ? parsed.entrance_exam : null,
      faculty_count: typeof parsed.faculty_count === 'number' ? parsed.faculty_count : null,
      phd_scholars: typeof parsed.phd_scholars === 'number' ? parsed.phd_scholars : null
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
      const stats = await getMoreStats2(college)

      if (stats === null || (stats.total_offers === null && stats.companies_visited === null && stats.entrance_exam === null && stats.faculty_count === null && stats.phd_scholars === null)) {
          console.log(`⚠️ Gemini could not confidently determine stats for: ${college.name}`)
          notFoundCount++;
          await delay(1000)
          continue;
      }

      const { error: updateError } = await supabase
        .from("colleges")
        .update({ 
          total_offers: stats.total_offers,
          companies_visited: stats.companies_visited,
          entrance_exam: stats.entrance_exam,
          faculty_count: stats.faculty_count,
          phd_scholars: stats.phd_scholars
        })
        .eq("id", college.id)

      if (updateError) {
        console.error("Update error:", updateError)
        failed.push(college.name)
        continue
      }

      console.log(`✅ Saved: ${college.name} (Offers: ${stats.total_offers}, Companies: ${stats.companies_visited}, Exams: ${stats.entrance_exam}, Faculty: ${stats.faculty_count}, PhD: ${stats.phd_scholars})`)
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

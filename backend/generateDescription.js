import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateDescription.js")

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
async function getDescription(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an expert on higher education institutions in India.
Write a concise, engaging, and professional 10-12 sentence description for the following college. It should highlight what the college is best known for.

Return ONLY a valid JSON object in this exact format:
{
  "description": "The description goes here."
}

If you cannot confidently write a description for this specific college, return null:
{
  "description": null
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
    
    let description = parsed.description
    if (description && typeof description === 'string' && description.trim().length > 0) {
       return description.trim()
    }

    return null
  } catch (err) {
    console.error(`Gemini Error for ${college.name}:`, err.message)
    return null
  }
}

// MAIN FUNCTION
async function run() {
  console.log("📡 Fetching colleges missing description...")

  const { data: colleges, error } = await supabase
    .from("colleges")
    .select("id, name, location, state, stream")
    .is("description", null)
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
      const description = await getDescription(college)

      if (description === null) {
          console.log(`⚠️ Gemini could not confidently determine description for: ${college.name}`)
          notFoundCount++;
          await delay(1000)
          continue;
      }

      const { error: updateError } = await supabase
        .from("colleges")
        .update({ description })
        .eq("id", college.id)

      if (updateError) {
        console.error("Update error:", updateError)
        failed.push(college.name)
        continue
      }

      console.log(`✅ Saved: ${college.name}`)
      successCount++;
      await delay(1000) // Fast delay for Gemini Flash
    } catch (err) {
      console.error(`Failed: ${college.name}`, err.message)
      failed.push(college.name)
      await delay(2000)
    }
  }

  console.log("\n🎉 Completed!")
  console.log(`Successfully Updated: ${successCount}`)
  console.log(`Description Not Found/Null: ${notFoundCount}`)
  if (failed.length > 0) {
    console.log(`Failed Updates: ${failed.length}`)
  }
}

run()

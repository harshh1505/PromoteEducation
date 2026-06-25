import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateHighestPackage.js")

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
async function getHighestPackage(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an expert on higher education institutions in India.
Provide the typical or median highest placement package (in Lakhs Per Annum - LPA) for the most popular course of that college of the following college.

Return ONLY a valid JSON object in this exact format. Give the number only, e.g., 25.5 for 25.5 LPA:
{
  "highest_package": 25.5
}

If you cannot confidently determine a reasonable estimate for the highest package, return null:
{
  "highest_package": null
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
    
    // Ensure it's a valid numeric
    let highest_package = parsed.highest_package
    if (highest_package !== null) {
       highest_package = parseFloat(highest_package)
       if (isNaN(highest_package) || highest_package <= 0 || highest_package > 500) {
           highest_package = null
       }
    }

    return highest_package
  } catch (err) {
    console.error(`Gemini Error for ${college.name}:`, err.message)
    return null
  }
}

// MAIN FUNCTION
async function run() {
  console.log("📡 Fetching colleges missing highest package...")

  const { data: colleges, error } = await supabase
    .from("colleges")
    .select("id, name, location, state, stream")
    .is("highest_package", null)
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
      const highest_package = await getHighestPackage(college)

      if (highest_package === null) {
          console.log(`⚠️ Gemini could not confidently determine highest package for: ${college.name}`)
          notFoundCount++;
          // Still waiting to avoid rate limits
          await delay(1000)
          continue;
      }

      const { error: updateError } = await supabase
        .from("colleges")
        .update({ highest_package })
        .eq("id", college.id)

      if (updateError) {
        console.error("Update error:", updateError)
        failed.push(college.name)
        continue
      }

      console.log(`✅ Saved: ${college.name} (${highest_package} LPA)`)
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
  console.log(`Package Not Found/Null: ${notFoundCount}`)
  if (failed.length > 0) {
    console.log(`Failed Updates: ${failed.length}`)
  }
}

run()

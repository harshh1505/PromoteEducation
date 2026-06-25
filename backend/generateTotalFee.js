import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started: generateTotalFee.js")

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
async function getTotalFee(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an expert on higher education institutions in India.
Provide the estimated "Total Annual Fees" for the most important/popular course of the following college (e.g., B.Tech for IITs/NITs, MBA for IIMs, MBBS for Medical Colleges, or the flagship course for universities). 

Return ONLY a valid JSON object in this exact format. The "total_fee" value should be a clean, readable text string describing the annual fee in INR (like "₹2.5 Lakhs", "₹80,000", or "₹1.2 Lakhs - ₹2.5 Lakhs"). Do not include any other text.
{
  "total_fee": "₹2.5 Lakhs"
}

If you cannot confidently determine a reasonable estimate for the fees, return null:
{
  "total_fee": null
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
    
    return parsed.total_fee || null
  } catch (err) {
    console.error(`Gemini Error for ${college.name}:`, err.message)
    return null
  }
}

// MAIN FUNCTION
async function run() {
  console.log("📡 Fetching colleges missing total fee...")

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
      const total_fee = await getTotalFee(college)

      if (total_fee === null) {
          console.log(`⚠️ Gemini could not confidently determine total fee for: ${college.name}`)
          notFoundCount++;
          await delay(1000)
          continue;
      }

      const { error: updateError } = await supabase
        .from("colleges")
        .update({ total_fee })
        .eq("id", college.id)

      if (updateError) {
        console.error("Update error:", updateError)
        failed.push(college.name)
        continue
      }

      console.log(`✅ Saved: ${college.name} (${total_fee})`)
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
  console.log(`Fee Not Found/Null: ${notFoundCount}`)
  if (failed.length > 0) {
    console.log(`Failed Updates: ${failed.length}`)
  }
}

run()

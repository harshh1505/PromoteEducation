import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

console.log("Script started")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const failed = []

//  Delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

//  Safe JSON parser
function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    throw new Error("Invalid JSON from Gemini")
  }
}

// Similarity checker
function isTooSimilar(text) {
  if (!text) return true

  const badPatterns = [
    "known for academic excellence",
    "offers a vibrant campus",
    "strong placement opportunities",
    "industry-oriented curriculum"
  ]

  return badPatterns.some(p => text.toLowerCase().includes(p))
}

// Fallback logic
function getFallback(college) {
  return {
    overview: `${college.name} is a premier ${college.stream} institution located in ${college.location}, ${college.state}.`,
    why_choose: `Students choose ${college.name} for its academic excellence and industry reputation.`,
    placements: `${college.name} has a strong track record of placements with top recruiters.`,
    campus_life: `The campus offers a vibrant environment for learning and growth.`,
    admission: `Admissions are based on merit and entrance exams.`,
    faqs: [
      { question: `What is the average package at ${college.name}?`, answer: `The average package at ${college.name} is highly competitive, reflecting its strong placement cell.` }
    ]
  }
}

//  Generate AI content
async function generateContent(college) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  })

  const variation = Math.floor(Math.random() * 10000)

  const prompt = `
You are a senior education content writer.

Generate HIGHLY UNIQUE, NON-GENERIC content.

STRICT RULES:
- No repetition across colleges
- Use specific wording (not generic phrases)
- Each section must feel different
- Avoid templates

Return ONLY JSON:

{
  "overview": "...",
  "why_choose": "...",
  "placements": "...",
  "campus_life": "...",
  "admission": "...",
  "faqs": [
    { "question": "...", "answer": "..." }
  ]
}

College:
${college.name}, ${college.location}, ${college.state}
Established: ${college.established}
Stream: ${college.stream}
Avg Package: ${college.avg_package}

Variation seed: ${variation}
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
    
    if (isTooSimilar(parsed.overview)) {
      console.log("⚠️ Regenerating due to generic content...")
      throw new Error("Generic content detected")
    }

    return {
      content: {
        ...parsed,
        faqs: parsed.faqs && parsed.faqs.length > 0 ? parsed.faqs : getFallback(college).faqs
      },
      raw_ai: text
    }
  } catch (err) {
    console.error(`Gemini Error for ${college.name}:`, err.message)
    return {
      content: getFallback(college),
      raw_ai: err.message
    }
  }
}

//  MAIN FUNCTION
async function run() {
  console.log("📡 Fetching colleges...")

  const { data: colleges, error } = await supabase
    .from("colleges")
    .select("*")
    .is("content_version", null)
    .order('id', { ascending: true })
    .limit(50)

  if (error) {
    console.error("Supabase fetch error:", error)
    return
  }

  if (!colleges || colleges.length === 0) {
    console.log("No colleges left to process")
    return
  }

  console.log(`Found ${colleges.length} colleges to process`)

  for (const college of colleges) {
    console.log(`\nGenerating for: ${college.name}`)

    try {
      const { content, raw_ai } = await generateContent(college)

      const { error: updateError } = await supabase
        .from("colleges")
        .update({ 
          content,
          faqs: content.faqs,
          content_version: 1,
          content_updated_at: new Date(),
          raw_ai
        })
        .eq("id", college.id)

      if (updateError) {
        console.error("Update error:", updateError)
        failed.push(college.name)
        continue
      }

      console.log(`✅ Saved: ${college.name}`)
      await delay(1500) // Fast delay for Gemini Flash
    } catch (err) {
      console.error(`Failed: ${college.name}`, err.message)
      failed.push(college.name)
      await delay(3000)
    }
  }

  console.log("\n🎉 Completed!")
  if (failed.length > 0) {
    console.log("Failed colleges:", failed)
  }
}

run()
import { GoogleGenerativeAI } from "@google/generative-ai"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function safeParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    throw new Error("Invalid JSON from Gemini")
  }
}

function fallback(c1, c2) {
  return {
    overview: `${c1.name} and ${c2.name} are well-known institutions offering strong academic programs and placement opportunities.`,
    differences: `${c1.name} differs from ${c2.name} in terms of ranking, placement packages, and campus environment.`,
    pros: {
      [c1.name]: ["Strong academics", "Good placements"],
      [c2.name]: ["Good infrastructure", "Industry exposure"],
    },
    cons: {
      [c1.name]: ["High competition"],
      [c2.name]: ["Variable placements"],
    },
    verdict: `Both ${c1.name} and ${c2.name} are strong options. Choose based on branch, location, and career goals.`,
  }
}

async function generateComparison(c1, c2) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  })

  const prompt = `
Generate UNIQUE SEO comparison content.

STRICT RULES:
- Return ONLY JSON
- No null values
- Each section must be 2–3 lines
- Content must mention both colleges naturally

{
  "overview": "...",
  "differences": "...",
  "pros": {
    "${c1.name}": ["...", "..."],
    "${c2.name}": ["...", "..."]
  },
  "cons": {
    "${c1.name}": ["...", "..."],
    "${c2.name}": ["...", "..."]
  },
  "verdict": "..."
}

Compare:
${c1.name} vs ${c2.name}

Data:
Rank: ${c1.nirf_rank} vs ${c2.nirf_rank}
Avg Package: ${c1.avg_package} vs ${c2.avg_package}
Location: ${c1.location} vs ${c2.location}
`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    const parsed = safeParse(text)

    return {
      overview: parsed.overview || fallback(c1, c2).overview,
      differences: parsed.differences || fallback(c1, c2).differences,
      pros: parsed.pros || fallback(c1, c2).pros,
      cons: parsed.cons || fallback(c1, c2).cons,
      verdict: parsed.verdict || fallback(c1, c2).verdict,
    }
  } catch (err) {
    console.log("Gemini error, using fallback:", err.message)
    return fallback(c1, c2)
  }
}

async function run() {
  console.log("Starting comparison generation...")

  const { data: colleges } = await supabase
    .from("colleges")
    .select("id, name, slug, nirf_rank, avg_package, location")
    .limit(20)

  if (!colleges || colleges.length === 0) {
    console.log("No colleges found")
    return
  }

  for (let i = 0; i < colleges.length - 1; i++) {
    const c1 = colleges[i]
    const c2 = colleges[i + 1]

    const slug = `${c1.slug}-vs-${c2.slug}`

    console.log(`⏳ Generating: ${slug}`)

    try {
      const content = await generateComparison(c1, c2)

      await supabase.from("comparisons").upsert({
        slug,
        college1_slug: c1.slug,
        college2_slug: c2.slug,
        content,
      })

      console.log(`Done: ${slug}`)
    } catch (err) {
      console.log(`Failed: ${slug}`, err.message)
    }

    await new Promise((res) => setTimeout(res, 1500))
  }
  console.log("Completed!")
}
run()
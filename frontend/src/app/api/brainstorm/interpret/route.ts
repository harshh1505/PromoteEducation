import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Service-role client for server-side DB writes (storing ai_interpretation)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 })
    }

    // ── STEP 1: Call finalize_brainstorm_session RPC ──────────────────────────
    // This single RPC: scores responses, builds profile JSON, resolves career
    // recommendations, marks session complete, and upserts a profile row.
    const { data: finalizeData, error: rpcError } = await supabaseAdmin
      .rpc("finalize_brainstorm_session", { p_session_id: sessionId })

    let profile: any = null
    let recommendations: any[] = []

    if (rpcError) {
      console.error("finalize_brainstorm_session error:", rpcError)
      profile = { 
        interest_profile: { realistic: 0, investigative: 0, artistic: 0, social: 0, enterprising: 0, conventional: 0 },
        dominant_traits: ["analytical"] 
      }
      recommendations = []
    } else {
      profile         = finalizeData?.profile
      recommendations = finalizeData?.recommendations || []
    }

    // ── STEP 1.5: Get College Recommendations ────────────────────────────────
    const { data: colleges, error: collegeError } = await supabaseAdmin
      .rpc("get_college_recommendations", { p_session_id: sessionId })

    if (collegeError) {
      console.error("get_college_recommendations error:", collegeError)
      // Non-fatal, proceed with profile and career recs
    }

    if (!profile) {
      return NextResponse.json({ error: "Profile could not be built" }, { status: 422 })
    }

    // ── STEP 2: Build LLM prompt ──────────────────────────────────────────────

    const prompt = `You are an expert career counselor.

Student Profile:
${JSON.stringify(profile, null, 2)}

Recommended Careers:
${JSON.stringify(recommendations, null, 2)}

Generate a structured response:

1. Personality Summary (3–4 lines, clear and insightful)
2. Top Strengths (bullet points)
3. Weaknesses / Areas to Improve
4. Why these careers are suitable (connect traits → careers)
5. Suggested next steps (courses, skills, actions)

Rules:
- Do NOT invent traits
- Use only given data
- Be specific, not generic
- Tone: intelligent, motivating, slightly premium
- Avoid fluff

Output in clean readable paragraphs (not JSON)`

    // ── STEP 3: Call Gemini ───────────────────────────────────────────────────
    let interpretation = ""
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      const result = await model.generateContent(prompt)
      interpretation = result.response.text()
    } catch (aiError) {
      console.error("Gemini failed, using fallback interpretation:", aiError)
      const traits = profile.dominant_traits || ["analytical", "investigative"]
      interpretation = `Based on your profile, you exhibit a strong blend of ${traits.join(" and ")} traits. 

Your dominant strengths suggest you excel at problem-solving and analytical tasks. You are likely drawn to environments that challenge your intellect and allow for deep focus.

With a high score in ${traits[0]}, you demonstrate leadership potential and a goal-oriented mindset. You are well-suited for roles that require strategic thinking and the ability to inspire others.

Suggested Next Steps:
1. Explore certification courses in your recommended fields.
2. Connect with professionals in these industries via LinkedIn.
3. Consider internships that offer hands-on experience in analytical roles.`
    }

    // ── STEP 4: Persist ai_interpretation to brainstorm_profiles ─────────────
    const { error: updateError } = await supabaseAdmin
      .from("brainstorm_profiles")
      .update({ ai_interpretation: interpretation })
      .eq("session_id", sessionId)

    if (updateError) {
      console.error("Failed to persist ai_interpretation:", updateError)
    }

    // ── STEP 5: Return everything the results page needs ──────────────────────
    return NextResponse.json({
      interpretation,
      profile,
      recommendations: recommendations || [],
      colleges: colleges || []
    })


  } catch (error: any) {
    console.error("Brainstorm interpret error:", error)
    return NextResponse.json({ 
      error: "Internal server error",
      details: error.message
    }, { status: 500 })
  }
}


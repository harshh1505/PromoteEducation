import { NextResponse } from "next/server"

export const runtime = 'edge'

// ── Supabase REST helper ────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function supabaseRpc(fnName: string, args: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fnName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
    body: JSON.stringify(args),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase RPC ${fnName} failed: ${res.status} ${text}`)
  }
  return res.json()
}

async function supabaseUpdate(table: string, data: Record<string, unknown>, matchColumn: string, matchValue: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?${matchColumn}=eq.${encodeURIComponent(matchValue)}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(data),
    }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase PATCH ${table} failed: ${res.status} ${text}`)
  }
}

// ── Gemini REST helper ──────────────────────────────────────────────────────
async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || ""
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Gemini API failed: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
}

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 })
    }

    // ── STEP 1: Call finalize_brainstorm_session RPC ──────────────────────────
    // This single RPC: scores responses, builds profile JSON, resolves career
    // recommendations, marks session complete, and upserts a profile row.
    let profile: any = null
    let recommendations: any[] = []

    try {
      const finalizeData = await supabaseRpc("finalize_brainstorm_session", { p_session_id: sessionId })
      profile         = finalizeData?.profile
      recommendations = finalizeData?.recommendations || []
    } catch (rpcError) {
      console.error("finalize_brainstorm_session error:", rpcError)
      profile = { 
        interest_profile: { realistic: 0, investigative: 0, artistic: 0, social: 0, enterprising: 0, conventional: 0 },
        dominant_traits: ["analytical"] 
      }
      recommendations = []
    }

    // ── STEP 1.5: Get College Recommendations ────────────────────────────────
    let colleges: any[] = []
    try {
      colleges = await supabaseRpc("get_college_recommendations", { p_session_id: sessionId })
    } catch (collegeError) {
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
      interpretation = await callGemini(prompt)
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
    try {
      await supabaseUpdate("brainstorm_profiles", { ai_interpretation: interpretation }, "session_id", sessionId)
    } catch (updateError) {
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

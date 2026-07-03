import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const dynamic = "force-dynamic"
export const runtime = "edge"

// ── Supabase REST helpers ────────────────────────────────────────────────────

async function supabaseSelect(table: string, query: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase SELECT ${table} failed: ${res.status} ${text}`)
  }
  return res.json()
}

// ─────────────────────────────────────────────────────────────────────────────
// Adaptive Question Engine
// ─────────────────────────────────────────────────────────────────────────────

function getNextQuestion(
  questions: any[],
  answeredIds: string[],
  scores: Record<string, number>
) {
  const remaining = questions.filter(q => !answeredIds.includes(q.id))
  if (remaining.length === 0) return null

  const scoreEntries = Object.entries(scores)
  if (scoreEntries.length === 0) {
    return remaining[Math.floor(Math.random() * remaining.length)]
  }

  const weakestTrait = scoreEntries
    .sort((a, b) => (a[1] as number) - (b[1] as number))[0][0]

  const candidates = remaining.filter(q =>
    q.brainstorm_options?.some((o: any) => {
      const weights = o.trait_weights || {}
      return weights[weakestTrait] && weights[weakestTrait] > 0
    })
  )

  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)]
  }

  return remaining[Math.floor(Math.random() * remaining.length)]
}

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 })
    }

    // ── 1. Get already-answered question IDs ─────────────────────────────────
    const responses = await supabaseSelect(
      "brainstorm_responses",
      `select=question_id,trait_weights&session_id=eq.${encodeURIComponent(sessionId)}`
    )

    const answeredIds = (responses || []).map((r: any) => r.question_id)

    // ── 2. Calculate scores from stored responses (server-side truth) ─────────
    const scores: Record<string, number> = {}
    for (const r of responses || []) {
      const weights = r.trait_weights || {}
      for (const [trait, value] of Object.entries(weights)) {
        scores[trait] = (scores[trait] || 0) + (value as number)
      }
    }

    // ── 3. Get ALL questions with options ─────────────────────────────────────
    const questions = await supabaseSelect(
      "brainstorm_questions",
      `select=id,category,question_text,brainstorm_options!brainstorm_options_question_id_fkey(id,option_text,trait_weights,next_question_id)&order=sort_order.asc`
    )

    if (!questions || questions.length === 0) {
      return NextResponse.json({ error: "No questions in database" }, { status: 404 })
    }

    // ── 4. Run adaptive logic ────────────────────────────────────────────────
    const next = getNextQuestion(questions, answeredIds, scores)

    if (!next) {
      return NextResponse.json({ done: true, message: "All questions answered" })
    }

    // ── 5. Return in the shape the frontend expects ──────────────────────────
    return NextResponse.json({
      id: next.id,
      category: next.category,
      text: next.question_text,
      options: (next.brainstorm_options || []).map((o: any) => ({
        id: o.id,
        text: o.option_text,
        weights: o.trait_weights || {},
        nextQuestionId: o.next_question_id,
      })),
      meta: {
        weakestTrait: Object.entries(scores).length > 0
          ? Object.entries(scores).sort((a, b) => (a[1] as number) - (b[1] as number))[0][0]
          : null,
        answeredCount: answeredIds.length,
        remainingCount: questions.length - answeredIds.length,
      }
    })

  } catch (err: any) {
    console.error("Unexpected error in /api/brainstorm/next:", err)
    return NextResponse.json({ error: "Internal server error", details: err.message }, { status: 500 })
  }
}

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const dynamic = "force-dynamic"

// ─────────────────────────────────────────────────────────────────────────────
// Adaptive Question Engine
// ─────────────────────────────────────────────────────────────────────────────
// Flow:
//   Session → responses stored → backend calculates scores
//           ↓
//   Weakest trait detected
//           ↓
//   Find candidate questions (via option weights)
//           ↓
//   Random pick (avoid bias)
//           ↓
//   Return next question
// ─────────────────────────────────────────────────────────────────────────────

function getNextQuestion(
  questions: any[],
  answeredIds: string[],
  scores: Record<string, number>
) {
  // 1. Filter out already-asked questions
  const remaining = questions.filter(q => !answeredIds.includes(q.id))
  if (remaining.length === 0) return null

  // 2. Find weakest trait
  const scoreEntries = Object.entries(scores)
  if (scoreEntries.length === 0) {
    // No scores yet (first question) → random pick
    return remaining[Math.floor(Math.random() * remaining.length)]
  }

  const weakestTrait = scoreEntries
    .sort((a, b) => (a[1] as number) - (b[1] as number))[0][0]

  // 3. Find ALL candidate questions targeting the weakest trait
  const candidates = remaining.filter(q =>
    q.brainstorm_options?.some((o: any) => {
      const weights = o.trait_weights || {}
      return weights[weakestTrait] && weights[weakestTrait] > 0
    })
  )

  // 4. Random pick from candidates (avoid bias)
  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)]
  }

  // 5. Fallback → random from all remaining
  return remaining[Math.floor(Math.random() * remaining.length)]
}

/**
 * POST /api/brainstorm/next
 * Body: { sessionId: string }
 *
 * Returns the next adaptive question for this session.
 * Scores are calculated from stored responses — no client trust needed.
 */
export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 })
    }

    // ── 1. Get already-answered question IDs ─────────────────────────────────
    const { data: responses, error: respErr } = await supabaseAdmin
      .from("brainstorm_responses")
      .select("question_id, trait_weights")
      .eq("session_id", sessionId)

    if (respErr) {
      console.error("Error fetching responses:", respErr)
      return NextResponse.json({ error: "Failed to fetch responses" }, { status: 500 })
    }

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
    const { data: questions, error: qErr } = await supabaseAdmin
      .from("brainstorm_questions")
      .select(`
        id,
        category,
        question_text,
        brainstorm_options!brainstorm_options_question_id_fkey (
          id,
          option_text,
          trait_weights,
          next_question_id
        )
      `)
      .order("sort_order", { ascending: true })

    if (qErr) {
      console.error("Error fetching questions:", qErr)
      return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
    }

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

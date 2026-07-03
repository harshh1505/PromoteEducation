import { NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/brainstorm_questions?select=id,category,question_text,brainstorm_options!brainstorm_options_question_id_fkey(id,option_text,trait_weights,next_question_id)&order=sort_order.asc`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Supabase query failed: ${res.status} ${text}`)
    }

    const data = await res.json()

    // If database is empty, return a 404 so the frontend knows to use fallback
    if (!data || data.length === 0) {
      return NextResponse.json({ error: "No questions found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Fetch questions API error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

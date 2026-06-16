import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('brainstorm_questions')
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
      .order('sort_order', { ascending: true })

    if (error) throw error

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

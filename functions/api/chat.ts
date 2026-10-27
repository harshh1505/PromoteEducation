import { createClient } from '@supabase/supabase-js'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface Env {
  GEMINI_API_KEY?: string
  NEXT_PUBLIC_SUPABASE_URL?: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string
  SUPABASE_URL?: string
  SUPABASE_ANON_KEY?: string
}

type PagesFunction<T = any> = (context: {
  request: Request
  env: T
  params?: any
  data?: any
  next?: () => Promise<Response>
}) => Promise<Response> | Response

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest'
]

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// ── Fallback static exam information for fast edge matching ────────────────
const TOP_EXAMS: Record<string, { title: string; fullName: string; stream: string; mode: string; duration: string; totalMarks: string; eligibility: string }> = {
  'neet': {
    title: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test',
    stream: 'Medical',
    mode: 'Pen & Paper (OMR)',
    duration: '3 Hours 20 Minutes',
    totalMarks: '720',
    eligibility: '12th with Physics, Chemistry, Biology/Biotechnology; Min 50% for Gen (40% reserved); Min age 17'
  },
  'jee': {
    title: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    stream: 'Engineering',
    mode: 'Computer Based Test (CBT)',
    duration: '3 Hours',
    totalMarks: '300',
    eligibility: '12th with Physics, Chemistry, Math; 75% aggregate in 12th board for NIT/IIIT seats'
  },
  'bitsat': {
    title: 'BITSAT',
    fullName: 'Birla Institute of Technology and Science Admission Test',
    stream: 'Engineering',
    mode: 'Online CBT',
    duration: '3 Hours',
    totalMarks: '390',
    eligibility: '12th with Physics, Chemistry, Math; Min 75% in PCM aggregate and 60% in each subject'
  },
  'cat': {
    title: 'CAT',
    fullName: 'Common Admission Test',
    stream: 'Management',
    mode: 'Computer Based Test',
    duration: '2 Hours (120 Mins)',
    totalMarks: '198',
    eligibility: "Bachelor's degree with minimum 50% marks (45% for SC/ST/PwD)"
  },
  'clat': {
    title: 'CLAT',
    fullName: 'Common Law Admission Test',
    stream: 'Law',
    mode: 'Offline Pen-Paper',
    duration: '2 Hours',
    totalMarks: '120',
    eligibility: '12th or equivalent with min 45% marks (40% for SC/ST)'
  }
}

async function searchKnowledge(userQuery: string, env: Env) {
  const query = userQuery.toLowerCase().trim()
  const result = {
    colleges: [] as any[],
    cutoffs: [] as any[],
    examInfo: null as any,
  }

  // 1. Detect Exam Info
  for (const [key, exam] of Object.entries(TOP_EXAMS)) {
    if (query.includes(key) || query.includes(exam.title.toLowerCase()) || query.includes(exam.fullName.toLowerCase())) {
      result.examInfo = exam
      break
    }
  }

  // 2. Supabase Query if configured
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL
  const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http')) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)

      // Search Colleges
      const cleanTokens = query
        .replace(/[^\w\s]/gi, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2 && !['what', 'which', 'where', 'when', 'college', 'colleges', 'fees', 'best', 'good', 'package', 'cutoff', 'cutoffs', 'rank', 'marks', 'admission', 'want', 'give', 'tell', 'need'].includes(w))

      if (cleanTokens.length > 0) {
        const searchTerms = cleanTokens.slice(0, 3)
        const { data: matchedColleges } = await supabase
          .from('colleges')
          .select('name, slug, location, state, stream, type, ownership, nirf_rank, rating, avg_ctc, highest_package, total_fee')
          .or(searchTerms.map(t => `name.ilike.%${t}%,short_name.ilike.%${t}%,location.ilike.%${t}%,state.ilike.%${t}%`).join(','))
          .limit(6)

        if (matchedColleges && matchedColleges.length > 0) {
          result.colleges = matchedColleges
        }
      }

      // Search Cutoffs
      const rankMatch = query.match(/\b(\d{3,6})\b/)
      const isCutoffQuery = query.includes('cutoff') || query.includes('cut off') || query.includes('rank') || query.includes('marks') || rankMatch

      if (isCutoffQuery) {
        let cutoffQuery = supabase
          .from('cutoffs')
          .select(`
            course, category, quota, state, college_type, rank, marks, round, year,
            colleges ( name, slug, location, state )
          `)
          .order('rank', { ascending: true })
          .limit(10)

        if (rankMatch) {
          const studentRank = parseInt(rankMatch[1], 10)
          const minRank = Math.max(1, Math.floor(studentRank * 0.8))
          const maxRank = Math.floor(studentRank * 1.25)
          cutoffQuery = cutoffQuery.gte('rank', minRank).lte('rank', maxRank)
        }

        if (query.includes('mbbs')) cutoffQuery = cutoffQuery.eq('course', 'MBBS')
        else if (query.includes('bds')) cutoffQuery = cutoffQuery.eq('course', 'BDS')
        else if (query.includes('b.tech') || query.includes('btech') || query.includes('cse')) cutoffQuery = cutoffQuery.ilike('course', '%B.Tech%')

        const { data: cutoffsData } = await cutoffQuery
        if (cutoffsData && cutoffsData.length > 0) {
          result.cutoffs = cutoffsData
        }
      }
    } catch (err) {
      console.warn('[Cloudflare Function] Supabase retrieval error:', err)
    }
  }

  return result
}

async function generateWithGemini(apiKey: string, systemPrompt: string, conversation: ChatMessage[]): Promise<string> {
  const contents = conversation.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))

  let lastError: any = null

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents,
          generationConfig: {
            temperature: 0.65,
            topP: 0.95,
            maxOutputTokens: 1200,
          }
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.warn(`[Gemini API] Model ${model} failed (${response.status}): ${errorText}`)
        lastError = new Error(`Model ${model} returned status ${response.status}`)
        continue
      }

      const data = await response.json() as any
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (reply) return reply
    } catch (err) {
      console.warn(`[Gemini API] Failed calling ${model}:`, err)
      lastError = err
    }
  }

  throw lastError || new Error('All Gemini model invocations failed')
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  })
}

export const onRequestGet: PagesFunction<Env> = async () => {
  return new Response(
    JSON.stringify({ status: 'ok', service: 'PromoteEducation EduBot API' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS
      }
    }
  )
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context
    const body = await request.json() as { messages?: ChatMessage[] }
    const messages = body.messages || []

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      })
    }

    const lastMessage = messages[messages.length - 1]?.content || ''
    if (!lastMessage.trim()) {
      return new Response(JSON.stringify({ error: 'Empty message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      })
    }

    const apiKey = env.GEMINI_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          message: "I am currently undergoing scheduled maintenance on our cloud servers. Please call our admission counseling team directly at **+91 99001 16101** for immediate personal guidance!",
          error: "GEMINI_API_KEY is not configured in Cloudflare Pages environment variables"
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
        }
      )
    }

    // 1. Retrieve Knowledge
    const knowledge = await searchKnowledge(lastMessage, env)

    let contextParts: string[] = []
    if (knowledge.colleges.length > 0) {
      contextParts.push(`### Relevant Verified Colleges in Database:\n` + knowledge.colleges.map(c => 
        `- **${c.name}** (${c.location}, ${c.state}) | Stream: ${c.stream} | Type: ${c.type || 'N/A'}\n` +
        `  NIRF Rank: ${c.nirf_rank ?? 'Unranked'} | Avg CTC: ${c.avg_ctc || 'N/A'} | Highest: ${c.highest_package || 'N/A'}\n` +
        `  Total Fee: ${c.total_fee || 'As per norms'} | Link: /colleges/${c.slug}`
      ).join('\n\n'))
    }

    if (knowledge.cutoffs.length > 0) {
      contextParts.push(`### Verified Cutoff Data from Database:\n` + knowledge.cutoffs.map((ct: any) =>
        `- **${ct.colleges?.name || 'Institutional Quota'}** | Course: ${ct.course} | Year: ${ct.year} | Round: ${ct.round}\n` +
        `  Closing Rank: ${ct.rank?.toLocaleString?.() || ct.rank} | Category: ${ct.category} | Quota: ${ct.quota} (${ct.state || 'All India'})`
      ).join('\n\n'))
    }

    if (knowledge.examInfo) {
      const e = knowledge.examInfo
      contextParts.push(`### Verified Exam Guide (${e.title} - ${e.fullName}):\n` +
        `- Mode: ${e.mode} | Duration: ${e.duration} | Total Marks: ${e.totalMarks}\n` +
        `- Eligibility: ${e.eligibility}`
      )
    }

    const contextText = contextParts.length > 0
      ? `=== ACCURATE KNOWLEDGE BASE FROM PROMOTE EDUCATION ===\n${contextParts.join('\n\n')}\n=================================================`
      : `(Provide guidance based on standard official Indian counseling norms like MCC, JoSAA, NTA, and State DTE).`

    // 2. System Prompt
    const systemPrompt = `You are EduBot, the Senior Educational & Admissions Counselor at Promote Education (India's premier college discovery, cutoffs analytics, and admission portal - promoteducation.com).

YOUR MISSION:
Empower students and parents navigating the stressful Indian admission landscape (NEET UG/PG, JEE Main/Advanced, JoSAA/CSAB, BITSAT, State Engineering/Medical, MBA/CAT, Deemed & NRI quotas) with accurate, empathetic, transparent, and actionable advice.

VOICE & PERSONA:
- Warm, human, polite, and encouraging like a trusted mentor.
- Never robotic. Speak naturally with clear explanations.
- If the user writes in Hindi or Hinglish, reply warmly in conversational Hinglish/English.
- Be honest about admission chances. Never give false guarantees; present realistic alternatives (Deemed universities, State private seats, management quota, or related courses).

KNOWLEDGE BASE:
${contextText}

RESPONSE GUIDELINES:
1. Always format key details cleanly with markdown bullet points, bold highlights, or comparison tables.
2. Direct Admission & Choice Filling Support: Promote Education provides 1-on-1 personalized counseling. Students can speak directly with senior counselors at **+91 99001 16101**.
`

    // 3. Call AI
    const reply = await generateWithGemini(apiKey, systemPrompt, messages)

    return new Response(
      JSON.stringify({
        message: reply,
        hasContext: contextParts.length > 0,
        sources: {
          collegesCount: knowledge.colleges.length,
          cutoffsCount: knowledge.cutoffs.length,
          hasExam: !!knowledge.examInfo
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      }
    )

  } catch (error: any) {
    console.error('[Cloudflare Function Error]:', error)
    return new Response(
      JSON.stringify({
        message: "I'm having a brief connection issue with our knowledge database. Please try asking again in a moment, or reach out to our admission team directly at **+91 99001 16101** for immediate help!",
        error: error?.message || 'Internal Server Error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      }
    )
  }
}

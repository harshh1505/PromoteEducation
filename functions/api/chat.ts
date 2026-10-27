/**
 * Cloudflare Pages Function: /api/chat
 *
 * Mirror of src/app/api/chat/route.ts and src/lib/ai/retrieval.ts
 * Implements the same 4-level source priority pipeline at the edge.
 *
 * PRIORITY: P1 Colleges → P2 News → P3 Blogs → P4 Exam Info (static)
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js'

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

// ── Static exam data (P4 fallback) ────────────────────────────────────────────
const TOP_EXAMS: Record<string, {
  title: string; fullName: string; stream: string; mode: string;
  duration: string; totalMarks: string; eligibility: string;
  sections?: string[]
}> = {
  'neet': { title: 'NEET UG', fullName: 'National Eligibility cum Entrance Test', stream: 'Medical', mode: 'Pen & Paper (OMR)', duration: '3 Hours 20 Minutes', totalMarks: '720', eligibility: '12th with PCB; Min 50% Gen (40% reserved); Min age 17', sections: ['Physics (45Q)', 'Chemistry (45Q)', 'Biology (90Q)'] },
  'jee': { title: 'JEE Main', fullName: 'Joint Entrance Examination Main', stream: 'Engineering', mode: 'Computer Based Test (CBT)', duration: '3 Hours', totalMarks: '300', eligibility: '12th with PCM; 75% aggregate for NIT/IIIT seats; No age limit', sections: ['Physics', 'Chemistry', 'Mathematics'] },
  'jee advanced': { title: 'JEE Advanced', fullName: 'Joint Entrance Examination Advanced', stream: 'Engineering', mode: 'Computer Based Test', duration: '6 Hours (2 papers of 3h)', totalMarks: '360', eligibility: 'Top 2.5 lakh JEE Main qualifiers; Max 2 attempts', sections: ['Physics', 'Chemistry', 'Mathematics'] },
  'bitsat': { title: 'BITSAT', fullName: 'BITS Admission Test', stream: 'Engineering', mode: 'Online CBT', duration: '3 Hours', totalMarks: '390', eligibility: '12th PCM; Min 75% in PCM aggregate', sections: ['Physics', 'Chemistry', 'Mathematics', 'English & LR'] },
  'cat': { title: 'CAT', fullName: 'Common Admission Test', stream: 'Management', mode: 'Computer Based Test', duration: '2 Hours', totalMarks: '198', eligibility: "Bachelor's degree with 50% marks (45% SC/ST)", sections: ['VARC', 'DILR', 'QA'] },
  'clat': { title: 'CLAT', fullName: 'Common Law Admission Test', stream: 'Law', mode: 'Offline Pen-Paper', duration: '2 Hours', totalMarks: '120', eligibility: '12th with 45% marks (40% SC/ST)', sections: ['English', 'GK/Current Affairs', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'] },
  'gate': { title: 'GATE', fullName: 'Graduate Aptitude Test in Engineering', stream: 'Engineering', mode: 'Computer Based Test', duration: '3 Hours', totalMarks: '100', eligibility: "Bachelor's in Engineering/Technology/Architecture or equivalent" },
  'neet pg': { title: 'NEET PG', fullName: 'National Eligibility cum Entrance Test — Postgraduate', stream: 'Medical', mode: 'Computer Based Test', duration: '3 Hours 30 Minutes', totalMarks: '800', eligibility: 'MBBS degree with internship completion; Valid MCI/NMC registration' },
}

// ── India state keyword lookup ────────────────────────────────────────────────
const INDIA_STATES: Record<string, string> = {
  'delhi': 'Delhi', 'mumbai': 'Maharashtra', 'maharashtra': 'Maharashtra',
  'bangalore': 'Karnataka', 'bengaluru': 'Karnataka', 'karnataka': 'Karnataka',
  'chennai': 'Tamil Nadu', 'tamil nadu': 'Tamil Nadu', 'hyderabad': 'Telangana',
  'telangana': 'Telangana', 'andhra pradesh': 'Andhra Pradesh', 'andhra': 'Andhra Pradesh',
  'kolkata': 'West Bengal', 'west bengal': 'West Bengal', 'pune': 'Maharashtra',
  'ahmedabad': 'Gujarat', 'gujarat': 'Gujarat', 'rajasthan': 'Rajasthan',
  'jaipur': 'Rajasthan', 'lucknow': 'Uttar Pradesh', 'uttar pradesh': 'Uttar Pradesh',
  'madhya pradesh': 'Madhya Pradesh', 'bhopal': 'Madhya Pradesh',
  'punjab': 'Punjab', 'chandigarh': 'Chandigarh', 'haryana': 'Haryana',
  'kerala': 'Kerala', 'assam': 'Assam', 'guwahati': 'Assam', 'bihar': 'Bihar',
  'jharkhand': 'Jharkhand', 'odisha': 'Odisha', 'chhattisgarh': 'Chhattisgarh',
  'uttarakhand': 'Uttarakhand', 'goa': 'Goa',
}

const STOP_WORDS = new Set([
  'what', 'which', 'where', 'when', 'college', 'colleges', 'fees',
  'best', 'good', 'top', 'package', 'packages', 'cutoff', 'cutoffs',
  'rank', 'marks', 'admission', 'want', 'give', 'tell', 'need', 'how',
  'many', 'much', 'does', 'have', 'with', 'for', 'the', 'are', 'can',
  'get', 'and', 'its', 'seat', 'seats', 'course', 'courses', 'about',
  'from', 'into', 'also', 'that', 'this', 'list', 'show', 'all',
  'compare', 'between', 'placement', 'placements', 'average', 'high',
  'low', 'year', 'recent', 'latest', 'news',
])

// ── Intent Classification ──────────────────────────────────────────────────────
interface QueryIntent {
  isCollegeQuery: boolean
  isNewsQuery: boolean
  isCutoffQuery: boolean
  wantsLatestNews: boolean
  stream: string | null
  rankNumber: number | null
  nameTokens: string[]
  stateHint: string | null
}

function classifyIntent(userMessage: string): QueryIntent {
  const q = userMessage.toLowerCase()
  let stream: string | null = null
  if (q.includes('mbbs') || q.includes('neet') || q.includes('medical') || q.includes('doctor')) stream = 'Medical'
  else if (q.includes('bds') || q.includes('dental')) stream = 'BDS'
  else if (q.includes('engineering') || q.includes('b.tech') || q.includes('btech') || q.includes('jee') || q.includes('iit') || q.includes('nit') || q.includes('cse') || q.includes('ece')) stream = 'Engineering'
  else if (q.includes('mba') || q.includes('management') || q.includes('cat ') || q.includes('iim') || q.includes('xat') || q.includes('pgdm')) stream = 'Management'
  else if (q.includes('law') || q.includes('clat') || q.includes('llb')) stream = 'Law'
  else if (q.includes('pharmacy') || q.includes('b.pharm')) stream = 'Pharmacy'

  const rankMatch = q.match(/\b(\d{3,7})\b/)
  const rankNumber = rankMatch ? parseInt(rankMatch[1], 10) : null

  let stateHint: string | null = null
  for (const [kw, state] of Object.entries(INDIA_STATES)) {
    if (q.includes(kw)) { stateHint = state; break }
  }

  const isCutoffQuery = q.includes('cutoff') || q.includes('cut off') || q.includes('closing rank') ||
    q.includes('opening rank') || (rankNumber !== null && (q.includes('rank') || q.includes('get') || q.includes('score')))

  const wantsLatestNews = q.includes('latest') || q.includes('recent') || q.includes('news') ||
    q.includes('update') || q.includes('notice') || q.includes('announcement') ||
    q.includes('date') || q.includes('deadline') || q.includes('registration') || q.includes('when')

  const isNewsQuery = wantsLatestNews || q.includes('admit card') || q.includes('result') || q.includes('counselling date')

  const isCollegeQuery = q.includes('college') || q.includes('university') || q.includes('institute') ||
    q.includes('iit') || q.includes('nit') || q.includes('aiims') || q.includes('iim') ||
    q.includes('bits') || q.includes('fee') || q.includes('placement') || q.includes('campus') ||
    q.includes('nirf') || q.includes('naac') || stream !== null || stateHint !== null || isCutoffQuery

  const nameTokens = q.replace(/[^\w\s]/gi, ' ').split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w))
    .slice(0, 5)

  return { isCollegeQuery, isNewsQuery, isCutoffQuery, wantsLatestNews, stream, rankNumber, nameTokens, stateHint }
}

// ── P1: College + Cutoff Retrieval ────────────────────────────────────────────
const COLLEGE_FIELDS = [
  'id', 'slug', 'name', 'short_name', 'location', 'state', 'stream', 'ranking', 'type',
  'ownership', 'affiliation', 'established', 'nirf_rank', 'naac_grade', 'naac_cgpa',
  'campus_size', 'total_students', 'faculty_count', 'avg_ctc', 'avg_package',
  'highest_package', 'placement_rate', 'total_offers', 'companies_visited',
  'total_fee', 'entrance_exam', 'rating', 'review_count', 'verified',
  'facilities', 'description', 'content->>overview', 'content->>admission',
  'content->>why_choose', 'content->>campus_life', 'faqs'
].join(', ')

async function fetchColleges(supabase: SupabaseClient, intent: QueryIntent) {
  try {
    let q = supabase.from('colleges').select(COLLEGE_FIELDS).eq('is_active', true)
    if (intent.stream) q = q.eq('stream', intent.stream)
    if (intent.stateHint) q = q.eq('state', intent.stateHint)
    if (intent.nameTokens.length > 0) {
      const orFilter = intent.nameTokens.slice(0, 4)
        .map(t => `name.ilike.%${t}%,short_name.ilike.%${t}%,location.ilike.%${t}%,description.ilike.%${t}%`)
        .join(',')
      q = q.or(orFilter)
    }
    q = q.order('verified', { ascending: false })
         .order('ranking', { ascending: true, nullsFirst: false })
         .limit((intent.stream || intent.stateHint) ? 10 : 8)
    const { data } = await q
    return data || []
  } catch { return [] }
}

async function fetchCutoffs(supabase: SupabaseClient, intent: QueryIntent) {
  if (!intent.isCutoffQuery) return []
  try {
    let q = supabase.from('cutoffs')
      .select('course, category, quota, state, college_type, rank, marks, round, year, colleges(name,slug,location,state)')
      .order('rank', { ascending: true })
    if (intent.rankNumber) {
      const minRank = Math.max(1, Math.floor(intent.rankNumber * 0.75))
      const maxRank = Math.floor(intent.rankNumber * 1.30)
      q = q.gte('rank', minRank).lte('rank', maxRank)
    }
    if (intent.stream === 'Medical') q = q.eq('course', 'MBBS')
    else if (intent.stream === 'BDS') q = q.eq('course', 'BDS')
    if (intent.stateHint) q = q.or(`state.eq.${intent.stateHint},quota.ilike.%All India%`)
    q = q.limit(15)
    const { data } = await q
    return data || []
  } catch { return [] }
}

// ── P2: News ───────────────────────────────────────────────────────────────────
async function fetchNews(supabase: SupabaseClient, intent: QueryIntent, broad = false) {
  if (!broad && !intent.isNewsQuery) return []
  try {
    let q = supabase.from('news_articles')
      .select('slug, heading, synopsis, published_at')
      .eq('is_live', true)
      .order('published_at', { ascending: false })
    if (intent.nameTokens.length > 0 && !broad) {
      q = q.or(intent.nameTokens.slice(0, 3).map(t => `heading.ilike.%${t}%,synopsis.ilike.%${t}%`).join(','))
    }
    q = q.limit(broad ? 5 : 6)
    const { data } = await q
    return data || []
  } catch { return [] }
}

// ── P3: Blogs ──────────────────────────────────────────────────────────────────
async function fetchBlogs(supabase: SupabaseClient, intent: QueryIntent) {
  if (intent.nameTokens.length === 0) return []
  try {
    const orFilter = intent.nameTokens.slice(0, 3).map(t => `title.ilike.%${t}%,summary.ilike.%${t}%`).join(',')
    const { data } = await supabase.from('blogs')
      .select('slug, title, summary, category, author, published_at, updated_at')
      .eq('is_live', true)
      .or(orFilter)
      .order('updated_at', { ascending: false })
      .limit(4)
    return data || []
  } catch { return [] }
}

// ── Context Builders ──────────────────────────────────────────────────────────
function buildCollegeCtx(colleges: any[]): string {
  if (!colleges.length) return ''
  const lines = colleges.map(c => {
    const parts = [`### [${c.name}](/colleges/${c.slug})`,
      `📍 ${c.location}, ${c.state} | Stream: ${c.stream} | Type: ${c.type || 'N/A'} | Ownership: ${c.ownership || 'N/A'}`]
    if (c.nirf_rank) parts.push(`NIRF Rank: ${c.nirf_rank}`)
    if (c.naac_grade) parts.push(`NAAC: ${c.naac_grade}`)
    if (c.total_fee) parts.push(`Total Fee: ${c.total_fee}`)
    if (c.entrance_exam) parts.push(`Entrance: ${c.entrance_exam}`)
    const pl: string[] = []
    if (c.avg_ctc) pl.push(`Avg CTC: ${c.avg_ctc}`)
    if (c.avg_package) pl.push(`Avg Pkg: ₹${(c.avg_package/100000).toFixed(1)} LPA`)
    if (c.highest_package) pl.push(`Highest: ₹${(c.highest_package/100000).toFixed(1)} LPA`)
    if (c.placement_rate) pl.push(`Placement: ${c.placement_rate}%`)
    if (c.companies_visited) pl.push(`Companies: ${c.companies_visited}`)
    if (pl.length) parts.push(pl.join(' | '))
    if (c.campus_size) parts.push(`Campus: ${c.campus_size}`)
    if (c.total_students) parts.push(`Students: ${c.total_students.toLocaleString()}`)
    if (c.description) parts.push(`About: ${c.description.slice(0, 280)}…`)
    if (c.overview) parts.push(`Overview: ${String(c.overview).slice(0, 250)}…`)
    if (c.admission) parts.push(`Admission: ${String(c.admission).slice(0, 200)}…`)
    if (c.faqs && c.faqs.length > 0) {
      parts.push(`FAQs:\n${c.faqs.slice(0, 2).map((f: any) => `  Q: ${f.question}\n  A: ${String(f.answer).slice(0, 180)}`).join('\n')}`)
    }
    return parts.join('\n')
  })
  return `## ✅ [SOURCE P1] Verified College Data — Promote Education Database\n\n` + lines.join('\n\n---\n\n')
}

function buildCutoffCtx(cutoffs: any[]): string {
  if (!cutoffs.length) return ''
  const rows = cutoffs.map(ct =>
    `- **${ct.colleges?.name || 'Unknown'}** | Course: ${ct.course} | Year: ${ct.year ?? 'N/A'} | Round: ${ct.round ?? 'N/A'}\n` +
    `  Closing Rank: **${ct.rank?.toLocaleString?.() ?? ct.rank}** | Marks: ${ct.marks ?? 'N/A'} | Category: ${ct.category} | Quota: ${ct.quota} | State: ${ct.state || 'All India'}`
  )
  return `## ✅ [SOURCE P1] Verified Cutoff Data (5,117+ records in DB)\n\n` + rows.join('\n\n')
}

function buildNewsCtx(news: any[]): string {
  if (!news.length) return ''
  const rows = news.map(n => {
    const date = n.published_at ? new Date(n.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'
    return `- **[${n.heading}](/news/${n.slug})** (${date})\n  ${(n.synopsis || '').replace(/\*/g, '').slice(0, 300)}`
  })
  return `## 📰 [SOURCE P2] Latest News & Announcements\n\n` + rows.join('\n\n')
}

function buildBlogCtx(blogs: any[]): string {
  if (!blogs.length) return ''
  const rows = blogs.map(b => {
    const date = b.updated_at ? new Date(b.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'
    return `- **[${b.title}](/blogs/${b.slug})** (${b.category || 'Education'}, ${date})\n  ${(b.summary || '').replace(/\*/g, '').slice(0, 250)}`
  })
  return `## 📝 [SOURCE P3] Relevant Blog Posts from Promote Education\n\n` + rows.join('\n\n')
}

function buildExamCtx(info: any): string {
  if (!info) return ''
  return `## 📋 [SOURCE P4] Exam Reference — ${info.title} (${info.fullName})
- Mode: ${info.mode} | Duration: ${info.duration} | Total Marks: ${info.totalMarks}
- Sections: ${info.sections?.join(', ') ?? 'N/A'}
- Eligibility: ${info.eligibility}`
}

// ── Gemini LLM ────────────────────────────────────────────────────────────────
async function generateWithGemini(apiKey: string, systemPrompt: string, conversation: ChatMessage[]): Promise<string> {
  const contents = conversation.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))
  let lastError: any = null
  for (const model of GEMINI_MODELS) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { temperature: 0.60, topP: 0.95, maxOutputTokens: 1500 }
        })
      })
      if (!res.ok) { lastError = new Error(`${model} → ${res.status}`); continue }
      const data = await res.json() as any
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (reply) return reply
    } catch (err) { lastError = err }
  }
  throw lastError || new Error('All models failed')
}

// ── Handlers ──────────────────────────────────────────────────────────────────
export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, { status: 204, headers: CORS_HEADERS })

export const onRequestGet: PagesFunction<Env> = async () =>
  new Response(JSON.stringify({ status: 'ok', service: 'PromoteEducation EduBot API — Priority Pipeline v2' }), {
    status: 200, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
  })

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context
    const body = await request.json() as { messages?: ChatMessage[] }
    const messages = body.messages || []

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } })
    }

    const lastMessage = messages[messages.length - 1]?.content || ''
    if (!lastMessage.trim()) {
      return new Response(JSON.stringify({ error: 'Empty message' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } })
    }

    const apiKey = env.GEMINI_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({
        message: 'I am currently under maintenance. Please call our senior counselors at **+91 99001 16101** for immediate help!',
        error: 'GEMINI_API_KEY not configured'
      }), { status: 503, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } })
    }

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ error: 'Database not configured' }), { status: 503, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } })
    }

    const sb = createClient(supabaseUrl, supabaseKey)
    const intent = classifyIntent(lastMessage)

    // ── Priority Retrieval ────────────────────────────────────────────────────
    // P1: Colleges
    const [colleges, cutoffs] = await Promise.all([
      intent.isCollegeQuery || intent.isCutoffQuery ? fetchColleges(sb, intent) : Promise.resolve([]),
      fetchCutoffs(sb, intent),
    ])

    const p1Sufficient = colleges.length > 0 || cutoffs.length > 0

    // P2: News — always if query is news-oriented; conditionally if P1 is not sufficient
    const shouldFetchNews = intent.isNewsQuery || !p1Sufficient
    const news = shouldFetchNews ? await fetchNews(sb, intent, !intent.isCollegeQuery && intent.wantsLatestNews) : []

    // P3: Blogs — only if P1 + P2 not sufficient
    const needsBlogs = !p1Sufficient && news.length === 0 && intent.nameTokens.length > 0
    const blogs = needsBlogs ? await fetchBlogs(sb, intent) : []

    // P4: Static Exam Info — supplement always
    let examInfo: any = null
    const qLower = lastMessage.toLowerCase()
    for (const [key, exam] of Object.entries(TOP_EXAMS)) {
      if (qLower.includes(key) || qLower.includes(exam.title.toLowerCase())) { examInfo = exam; break }
    }

    // ── Build Context Sections ────────────────────────────────────────────────
    const sections: string[] = []
    const collegeCtx = buildCollegeCtx(colleges)
    const cutoffCtx = buildCutoffCtx(cutoffs)
    if (collegeCtx) sections.push(collegeCtx)
    if (cutoffCtx) sections.push(cutoffCtx)
    const newsCtx = buildNewsCtx(news)
    if (newsCtx) sections.push(newsCtx)
    const blogCtx = buildBlogCtx(blogs)
    if (blogCtx) sections.push(blogCtx)
    const examCtx = buildExamCtx(examInfo)
    if (examCtx) sections.push(examCtx)

    const activeSources: string[] = []
    if (p1Sufficient) activeSources.push('P1: Colleges DB')
    if (news.length > 0) activeSources.push('P2: Latest News')
    if (blogs.length > 0) activeSources.push('P3: Blogs')
    if (examInfo) activeSources.push('P4: Exam Reference')

    const contextText = sections.length > 0
      ? `=== KNOWLEDGE BASE [${activeSources.join(', ')}] ===\n\n${sections.join('\n\n')}\n\n=== END KNOWLEDGE BASE ===`
      : `(No database match found. Answer from standard MCC/JoSAA/NTA/State DTE counselling norms.)`

    // ── System Prompt ─────────────────────────────────────────────────────────
    const systemPrompt = `You are EduBot, the Senior Educational & Admissions Counselor at Promote Education — India's premier college discovery, cutoff analytics, and admission portal (promoteducation.com).

YOUR MISSION: Help students navigate NEET, JEE, CAT, CLAT, BITSAT, State counselling, Deemed & NRI quotas with accurate, empathetic, actionable advice.

VOICE: Warm, mentor-like. If user writes in Hindi/Hinglish, reply in Hinglish/English. Never give false guarantees.

SOURCE PRIORITY (follow strictly):
1. ✅ [SOURCE P1] College Database — PRIMARY TRUTH for college facts, fees, placements, rankings, facilities.
2. 📰 [SOURCE P2] Latest News — for time-sensitive events: deadlines, results, counselling dates. Mention publication date.
3. 📝 [SOURCE P3] Blogs — supplemental context only. Note: "As per our blog..."
4. 📋 [SOURCE P4] Exam Reference — static structure data.
→ P1 data overrides blogs/articles for factual college information.
→ If asking for "latest" and only old data available, say so explicitly.

KNOWLEDGE BASE:
${contextText}

FORMATTING:
- Use markdown: bold numbers, bullet lists, comparison tables.
- Link colleges: [College Name](/colleges/slug)
- Link news: [Article Title](/news/slug) with publication date
- For cutoffs: show exact rank, category, quota, year from database
- If info missing: say "Not in our current database — check official website or call +91 99001 16101"
- End with: offer to compare more colleges, show cutoffs for their rank, or request a free callback.

EDGE CASES:
- Missing rank for MBBS/BTech query: ask for rank/score, category, state, budget
- Out of scope: politely redirect to education counseling
- User stressed: acknowledge first, then give structured options`

    const reply = await generateWithGemini(apiKey, systemPrompt, messages)

    return new Response(
      JSON.stringify({
        message: reply,
        hasContext: sections.length > 0,
        sources: {
          collegesCount: colleges.length,
          cutoffsCount: cutoffs.length,
          newsCount: news.length,
          blogsCount: blogs.length,
          hasExam: !!examInfo,
          activeSources,
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    )

  } catch (error: any) {
    console.error('[Cloudflare EduBot Error]:', error)
    return new Response(
      JSON.stringify({
        message: "I'm having a brief connection issue. Please try again or call our admission team at **+91 99001 16101** for immediate help!",
        error: error?.message || 'Internal Server Error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    )
  }
}

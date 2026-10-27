import { NextResponse } from 'next/server'
import { searchWebsiteKnowledge, CollegeRecord, CutoffRecord, NewsRecord, BlogRecord } from '@/lib/ai/retrieval'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest'
]

async function generateWithGemini(systemPrompt: string, conversation: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing from environment variables')
  }

  const contents = conversation.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))

  let lastError = null

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.60,
            topP: 0.95,
            maxOutputTokens: 1500,
          }
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.warn(`[Gemini API] Model ${model} failed with ${response.status}: ${errorText}`)
        lastError = new Error(`Model ${model} returned status ${response.status}`)
        continue
      }

      const data = await response.json()
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (reply) return reply
    } catch (err) {
      console.warn(`[Gemini API] Failed calling ${model}:`, err)
      lastError = err
    }
  }

  throw lastError || new Error('All Gemini model invocations failed')
}

// ── Context Builders (each produces a labelled, structured section) ───────────

function buildCollegeContext(colleges: CollegeRecord[]): string {
  if (colleges.length === 0) return ''
  const lines = colleges.map(c => {
    const parts: string[] = [
      `### [${c.name}](/colleges/${c.slug})`,
      `📍 ${c.location}, ${c.state} | Stream: ${c.stream} | Type: ${c.type || 'N/A'} | Ownership: ${c.ownership || 'N/A'}`,
    ]
    if (c.established) parts.push(`Founded: ${c.established}`)
    if (c.nirf_rank) parts.push(`NIRF Rank: ${c.nirf_rank}`)
    if (c.naac_grade) parts.push(`NAAC: ${c.naac_grade} (CGPA ${c.naac_cgpa ?? 'N/A'})`)
    if (c.ranking) parts.push(`Platform Rank: ${c.ranking}`)
    if (c.rating) parts.push(`Rating: ${c.rating}/5 (${c.review_count ?? 0} reviews)`)
    if (c.total_fee) parts.push(`Total Fee: ${c.total_fee}`)
    if (c.entrance_exam) parts.push(`Entrance: ${c.entrance_exam}`)
    // Placement data
    const placementParts: string[] = []
    if (c.avg_ctc) placementParts.push(`Avg CTC: ${c.avg_ctc}`)
    if (c.avg_package) placementParts.push(`Avg Package: ₹${(c.avg_package / 100000).toFixed(1)} LPA`)
    if (c.highest_package) placementParts.push(`Highest: ₹${(c.highest_package / 100000).toFixed(1)} LPA`)
    if (c.placement_rate) placementParts.push(`Placement Rate: ${c.placement_rate}%`)
    if (c.total_offers) placementParts.push(`Total Offers: ${c.total_offers}`)
    if (c.companies_visited) placementParts.push(`Companies: ${c.companies_visited}`)
    if (placementParts.length > 0) parts.push(placementParts.join(' | '))
    // Infrastructure
    const infraParts: string[] = []
    if (c.campus_size) infraParts.push(`Campus: ${c.campus_size}`)
    if (c.total_students) infraParts.push(`Students: ${c.total_students.toLocaleString()}`)
    if (c.faculty_count) infraParts.push(`Faculty: ${c.faculty_count}`)
    if (infraParts.length > 0) parts.push(infraParts.join(' | '))
    if (c.affiliation) parts.push(`Affiliated to: ${c.affiliation}`)
    if (c.facilities && c.facilities.length > 0) parts.push(`Facilities: ${c.facilities.slice(0, 6).join(', ')}`)
    if (c.description) parts.push(`About: ${c.description.slice(0, 300)}${c.description.length > 300 ? '…' : ''}`)
    // Content fields from JSON column
    if (c.content) {
      if ((c.content as any).overview) {
        const ov = String((c.content as any).overview)
        parts.push(`Overview: ${ov.slice(0, 250)}${ov.length > 250 ? '…' : ''}`)
      }
      if ((c.content as any).admission) {
        const adm = String((c.content as any).admission)
        parts.push(`Admission Process: ${adm.slice(0, 200)}${adm.length > 200 ? '…' : ''}`)
      }
    }
    // FAQs — top 2
    if (c.faqs && c.faqs.length > 0) {
      const faqLines = c.faqs.slice(0, 2).map(f => `  Q: ${f.question}\n  A: ${f.answer.slice(0, 200)}`)
      parts.push(`FAQs:\n${faqLines.join('\n')}`)
    }
    return parts.join('\n')
  })
  return `## ✅ [SOURCE P1] Verified College Data from Promote Education Database\n\n` + lines.join('\n\n---\n\n')
}

function buildCutoffContext(cutoffs: CutoffRecord[]): string {
  if (cutoffs.length === 0) return ''
  const rows = cutoffs.map(ct => {
    const college = ct.colleges
      ? Array.isArray(ct.colleges) ? ct.colleges[0] : ct.colleges
      : null
    return `- **${college?.name || 'Unknown College'}** | Course: ${ct.course} | Year: ${ct.year ?? 'N/A'} | Round: ${ct.round ?? 'N/A'}\n` +
      `  Closing Rank: **${ct.rank.toLocaleString()}** | Marks: ${ct.marks ?? 'N/A'} | Category: ${ct.category} | Quota: ${ct.quota} | State: ${ct.state || 'All India'}`
  })
  return `## ✅ [SOURCE P1] Verified Cutoff Data (5,117+ Records in Database)\n\n` + rows.join('\n\n')
}


function buildNewsContext(news: NewsRecord[]): string {
  if (news.length === 0) return ''
  const rows = news.map(n => {
    const date = n.published_at ? new Date(n.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'
    return `- **[${n.heading}](/news/${n.slug})** (${date})\n  ${n.synopsis ? n.synopsis.replace(/\*/g, '').slice(0, 300) : 'See full article for details.'}`
  })
  return `## 📰 [SOURCE P2] Latest News & Announcements (Most Recent First)\n\n` + rows.join('\n\n')
}

function buildBlogsContext(blogs: BlogRecord[]): string {
  if (blogs.length === 0) return ''
  const rows = blogs.map(b => {
    const date = b.updated_at ? new Date(b.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'
    return `- **[${b.title}](/blogs/${b.slug})** (${b.category || 'Education'}, Updated: ${date})\n  ${b.summary ? b.summary.replace(/\*/g, '').slice(0, 250) : ''}`
  })
  return `## 📝 [SOURCE P3] Relevant Blog Insights from Promote Education\n\n` + rows.join('\n\n')
}

function buildExamContext(examInfo: any): string {
  if (!examInfo) return ''
  return `## 📋 [SOURCE P4] Exam Reference Data (${examInfo.title} — ${examInfo.fullName})
- Mode: ${examInfo.mode} | Duration: ${examInfo.duration} | Total Marks: ${examInfo.totalMarks}
- Sections: ${examInfo.sections?.join(', ') ?? 'N/A'}
- Eligibility: ${examInfo.eligibility?.join('; ') ?? 'N/A'}
- Important Dates: ${examInfo.importantDates?.map((d: any) => `${d.label}: ${d.date}`).join(' | ') ?? 'N/A'}`
}

function buildAlertsContext(alerts: any[]): string {
  if (alerts.length === 0) return ''
  const rows = alerts.map(a => `- **${a.exam}**: ${a.event} — Deadline: **${a.deadline}**`)
  return `## ⚠️ [ALERTS] Active Admission Deadlines\n\n` + rows.join('\n')
}

interface SourcePriority {
  collegesAnswers: boolean
  newsAnswers: boolean
  blogsAnswers: boolean
  examInfoAnswers: boolean
}

function buildPriorityLegend(sp: SourcePriority): string {
  const active: string[] = []
  if (sp.collegesAnswers) active.push('P1 (Colleges DB — primary truth)')
  if (sp.newsAnswers) active.push('P2 (Latest News — time-sensitive)')
  if (sp.blogsAnswers) active.push('P3 (Blogs — supplemental)')
  if (sp.examInfoAnswers) active.push('P4 (Exam Reference — static)')
  return active.length > 0
    ? `Active sources this query: ${active.join(', ')}`
    : 'No structured data found; responding from general knowledge.'
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages: ChatMessage[] = body.messages || []

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]?.content || ''
    if (!lastMessage.trim()) {
      return NextResponse.json({ error: 'Empty message' }, { status: 400 })
    }

    // ── 1. Priority-based Retrieval ──────────────────────────────────────────
    const knowledge = await searchWebsiteKnowledge(lastMessage)

    // ── 2. Build Context Sections in Priority Order ──────────────────────────
    const contextSections: string[] = []

    // P1 — Colleges (always first and most authoritative)
    const collegeCtx = buildCollegeContext(knowledge.colleges)
    const cutoffCtx = buildCutoffContext(knowledge.cutoffs)
    if (collegeCtx) contextSections.push(collegeCtx)
    if (cutoffCtx) contextSections.push(cutoffCtx)

    // P2 — News
    const newsCtx = buildNewsContext(knowledge.news)
    if (newsCtx) contextSections.push(newsCtx)

    // P3 — Blogs
    const blogCtx = buildBlogsContext(knowledge.blogs)
    if (blogCtx) contextSections.push(blogCtx)

    // P4 — Exam Info
    const examCtx = buildExamContext(knowledge.examInfo)
    if (examCtx) contextSections.push(examCtx)

    // Alerts
    const alertCtx = buildAlertsContext(knowledge.alerts)
    if (alertCtx) contextSections.push(alertCtx)

    const sourcesSummary = buildPriorityLegend(knowledge.sourcePriority)

    const contextText = contextSections.length > 0
      ? `=== KNOWLEDGE BASE (${sourcesSummary}) ===\n\n${contextSections.join('\n\n')}\n\n=== END OF KNOWLEDGE BASE ===`
      : `(No structured data found for this query. Answer using standard official guidance from MCC, JoSAA, NTA, and State DTE counselling norms.)`

    // ── 3. System Prompt ─────────────────────────────────────────────────────
    const systemPrompt = `You are EduBot, the Senior Educational & Admissions Counselor at Promote Education — India's premier college discovery, cutoff analytics, and admission portal (promoteducation.com).

YOUR MISSION:
Help students and parents navigate the Indian admission landscape (NEET UG/PG, JEE Main/Advanced, JoSAA/CSAB, BITSAT, State Engineering/Medical, MBA/CAT, Deemed & NRI quotas) with accurate, empathetic, and actionable advice.

VOICE & PERSONA:
- Warm, human, polite — like a trusted senior mentor. Never robotic.
- If the user writes in Hindi or Hinglish, reply warmly in Hinglish/English.
- Be honest about admission chances. Never give false guarantees. Present realistic alternatives.

SOURCE PRIORITY — follow strictly when answering:
1. [SOURCE P1] College Database — use as PRIMARY TRUTH for all college facts, fees, placements, rankings, facilities. If this source has data, it overrides blogs/articles.
2. [SOURCE P2] Latest News — use for time-sensitive events: deadlines, results, counselling dates, policy changes. Indicate the publication date.
3. [SOURCE P3] Blogs — use to supplement context, preparation tips, comparison insights. Clearly note it is a supplemental source, not the primary fact source.
4. [SOURCE P4] Exam Reference — static exam structure data. Use for patterns, eligibility, sections.

CRITICAL RULES:
- If SOURCE P1 already answers the question, do NOT introduce conflicting blog/article data without flagging the discrepancy.
- Always cite the source: e.g., "According to our verified database..." or "As per the latest news dated [date]..."
- For cutoff queries: quote the EXACT rank, category, quota, and year from the database. Never estimate if data exists.
- If asking for "latest" information and only old data is available, explicitly say so.
- For missing information: say "This detail is not in our current database — for authoritative info, check the official website or call **+91 99001 16101**."

KNOWLEDGE BASE (STRICT SOURCE PRIORITY):
${contextText}

RESPONSE FORMATTING:
1. Use markdown — bold for key numbers, bullet points for lists, tables for comparisons.
2. Link colleges using markdown: [College Name](/colleges/slug)
3. For links: [News Article](/news/slug), [Blog Post](/blogs/slug)
4. After giving information, offer next steps: "Would you like me to compare more colleges?" or "Should I show cutoffs for your specific rank?"
5. Mention our personalized counseling: students can call **+91 99001 16101** or request a free callback.

EDGE CASES:
- If query lacks required details (e.g. "Can I get MBBS?" without rank): Ask for NEET rank/score, category, preferred state, and budget.
- If out of scope (recipes, coding, politics): Redirect: "I specialize exclusively in Indian college admissions and education counseling!"
- If user is stressed or overwhelmed: Acknowledge first, then reassure with structured options.`

    // ── 4. Call AI ────────────────────────────────────────────────────────────
    const reply = await generateWithGemini(systemPrompt, messages)

    return NextResponse.json({
      message: reply,
      hasContext: contextSections.length > 0,
      sources: {
        collegesCount: knowledge.colleges.length,
        cutoffsCount: knowledge.cutoffs.length,
        newsCount: knowledge.news.length,
        blogsCount: knowledge.blogs.length,
        hasExam: !!knowledge.examInfo,
        priority: knowledge.sourcePriority,
      }
    })

  } catch (error: any) {
    console.error('[Chat API Error]:', error)
    return NextResponse.json(
      {
        message: "I'm having a brief connection issue with our knowledge database. Please try asking again in a moment, or reach out to our admission team directly at **+91 99001 16101** for immediate help!",
        error: error?.message || 'Internal Server Error'
      },
      { status: 500 }
    )
  }
}

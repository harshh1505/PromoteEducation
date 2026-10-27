import { NextResponse } from 'next/server'
import { searchWebsiteKnowledge } from '@/lib/ai/retrieval'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash'
]

async function generateWithGemini(systemPrompt: string, conversation: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing from environment variables')
  }

  // Format contents for Gemini API:
  // Convert chat history to Gemini format (user -> user, assistant -> model)
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

    // ── 1. Retrieve Knowledge from Promote Education Datasets ───────────────
    const knowledge = await searchWebsiteKnowledge(lastMessage)

    // Build structured context text from retrieved records
    let contextParts: string[] = []

    if (knowledge.colleges.length > 0) {
      contextParts.push(`### Relevant Verified Colleges in Database:\n` + knowledge.colleges.map(c => 
        `- **${c.name}** (${c.location}, ${c.state}) | Stream: ${c.stream} | Type: ${c.type || 'N/A'} | Ownership: ${c.ownership || 'N/A'}\n` +
        `  NIRF Rank: ${c.nirf_rank ?? 'Unranked'} | Rating: ${c.rating ?? '4.5'}/5 | Avg CTC: ${c.avg_ctc || c.avg_package || 'N/A'} | Highest: ${c.highest_package || 'N/A'}\n` +
        `  Total Fee: ${c.total_fee || 'Affordable / As per govt norm'} | Entrance: ${c.entrance_exam || 'NEET / JEE / Merit'}\n` +
        `  Link: /colleges/${c.slug}`
      ).join('\n\n'))
    }

    if (knowledge.cutoffs.length > 0) {
      contextParts.push(`### Verified Cutoff Data from Database (Recent Rounds):\n` + knowledge.cutoffs.map(ct =>
        `- **${ct.colleges?.name || 'Institutional Quota'}** | Course: ${ct.course} | Year: ${ct.year} | Round: ${ct.round}\n` +
        `  Closing Rank: ${ct.rank.toLocaleString()} | Marks: ${ct.marks ?? 'N/A'} | Category: ${ct.category} | Quota: ${ct.quota} (${ct.state || 'All India'})`
      ).join('\n\n'))
    }

    if (knowledge.examInfo) {
      const e = knowledge.examInfo
      contextParts.push(`### Verified Exam Guide (${e.title} - ${e.fullName}):\n` +
        `- Mode: ${e.mode} | Duration: ${e.duration} | Total Marks: ${e.totalMarks}\n` +
        `- Sections: ${e.sections?.join(', ')}\n` +
        `- Eligibility: ${e.eligibility?.join('; ')}\n` +
        `- Important Dates: ${e.importantDates?.map((d: any) => `${d.label}: ${d.date}`).join(' | ')}`
      )
    }

    if (knowledge.alerts.length > 0) {
      contextParts.push(`### Active Deadlines & Admission Alerts:\n` + knowledge.alerts.map(a =>
        `- **${a.exam}**: ${a.event} (Deadline: ${a.deadline})`
      ).join('\n'))
    }

    if (knowledge.news.length > 0) {
      contextParts.push(`### Latest News & Announcements:\n` + knowledge.news.map(n =>
        `- **${n.heading}**: ${n.synopsis || ''} (/news/${n.slug})`
      ).join('\n'))
    }

    const contextText = contextParts.length > 0
      ? `=== ACCURATE KNOWLEDGE BASE FROM PROMOTE EDUCATION ===\n${contextParts.join('\n\n')}\n=================================================`
      : `(No direct database match found. Provide guidance based on standard official counseling norms like MCC, JoSAA, NTA, and State DTE).`

    // ── 2. Construct Master System Prompt ────────────────────────────────────
    const systemPrompt = `You are EduBot, the Senior Educational & Admissions Counselor at Promote Education (India's premier college discovery, cutoffs analytics, and admission portal - promoteducation.com).

YOUR MISSION:
Empower students and parents navigating the stressful Indian admission landscape (NEET UG/PG, JEE Main/Advanced, JoSAA/CSAB, BITSAT, State Engineering/Medical, MBA/CAT, Deemed & NRI quotas) with accurate, empathetic, transparent, and actionable advice.

VOICE & PERSONA:
- Warm, human, polite, and encouraging like a trusted mentor.
- Never robotic. Speak naturally with clear explanations.
- If the user writes in Hindi or Hinglish, reply warmly in conversational Hinglish/English.
- Be honest about admission chances. Never give false guarantees if a student's rank is far above the closing cutoff; instead, constructively present realistic alternatives (Deemed universities, State private seats, management quota, or related courses like BDS/BAMS/Biotech).

KNOWLEDGE BASE:
Use the provided verified data below to quote exact numbers, fees, and ranks:
${contextText}

RESPONSE GUIDELINES:
1. Always format key details cleanly with markdown bullet points, bold highlights, or comparison tables.
2. When referencing colleges or exams in our database, include clickable markdown links, e.g.:
   - [AIIMS Kalyani](/colleges/aiims-kalyani)
   - [Medical Cutoffs Dashboard](/cutoffs/medical)
   - [Engineering Cutoffs Dashboard](/cutoffs/engineering)
   - [NEET UG Guide](/exams/neet-ug)
3. Direct Admission & Choice Filling Support:
   - Promote Education provides 1-on-1 personalized counseling, choice-filling guidance, and NRI/Management seat advisory.
   - Mention that students can speak directly with our senior counselors at **+91 99001 16101** or request a free callback.

EDGE CASE HANDLING:
- If student query lacks details (e.g. "Can I get MBBS?" without rank): Warmly ask for their NEET score/rank, category (General/OBC/SC/ST/EWS), and preferred state or budget.
- If query is out of scope (recipes, politics, coding problems): Gently and politely redirect: "I specialize exclusively in college admissions, cutoffs, exams, and career counseling in India! How can I assist with your higher education journey today?"
- If user expresses stress or feeling overwhelmed: Acknowledge their effort first, reassure them that there are great alternative pathways, and break down their options step-by-step.
`

    // ── 3. Call AI Model ────────────────────────────────────────────────────
    const reply = await generateWithGemini(systemPrompt, messages)

    return NextResponse.json({
      message: reply,
      hasContext: contextParts.length > 0,
      sources: {
        collegesCount: knowledge.colleges.length,
        cutoffsCount: knowledge.cutoffs.length,
        hasExam: !!knowledge.examInfo,
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

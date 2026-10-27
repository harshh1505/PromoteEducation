import { supabase } from '@/lib/supabase'
import { examDatabase } from '@/data/examDatabase'
import { URGENT_DEADLINES } from '@/data/admissionAlertsData'

export interface RetrievalResult {
  colleges: any[]
  cutoffs: any[]
  examInfo: any | null
  alerts: any[]
  news: any[]
}

/**
 * Searches website datasets (colleges, cutoffs, exams, alerts, news)
 * based on user message text to provide grounded context to the LLM.
 */
export async function searchWebsiteKnowledge(userMessage: string): Promise<RetrievalResult> {
  const query = userMessage.toLowerCase().trim()
  const result: RetrievalResult = {
    colleges: [],
    cutoffs: [],
    examInfo: null,
    alerts: [],
    news: [],
  }

  try {
    // 1. Detect and retrieve Exam Information
    const examSlugs = Object.keys(examDatabase)
    for (const slug of examSlugs) {
      const exam = examDatabase[slug]
      const nameMatch = query.includes(slug.replace(/-/g, ' ')) || 
                        query.includes(slug) || 
                        query.includes(exam.title.toLowerCase()) || 
                        query.includes(exam.fullName.toLowerCase())
      if (nameMatch) {
        result.examInfo = {
          title: exam.title,
          fullName: exam.fullName,
          stream: exam.stream,
          mode: exam.mode,
          duration: exam.duration,
          totalMarks: exam.totalMarks,
          sections: exam.sections,
          eligibility: exam.eligibility,
          importantDates: exam.importantDates,
          preparationTips: exam.preparationTips?.slice(0, 3),
        }
        break
      }
    }

    // 2. Search Colleges in Supabase
    // Extract keywords by removing generic stop words
    const cleanTokens = query
      .replace(/[^\w\s]/gi, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !['what', 'which', 'where', 'when', 'college', 'colleges', 'fees', 'best', 'good', 'package', 'cutoff', 'cutoffs', 'rank', 'marks', 'admission', 'want', 'give', 'tell'].includes(w))

    if (cleanTokens.length > 0) {
      const searchTerms = cleanTokens.slice(0, 3)
      const collegeQuery = supabase
        .from('colleges')
        .select('name, slug, location, state, stream, type, ownership, nirf_rank, rating, avg_ctc, highest_package, total_fee, placement_rate, entrance_exam')
        .or(searchTerms.map(t => `name.ilike.%${t}%,short_name.ilike.%${t}%,location.ilike.%${t}%,state.ilike.%${t}%`).join(','))
        .limit(6)

      const { data: matchedColleges } = await collegeQuery
      if (matchedColleges && matchedColleges.length > 0) {
        result.colleges = matchedColleges
      }
    }

    // 3. Search Cutoffs
    // Check if the query mentions rank, marks, or specific cutoff criteria
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
        const studentRank = parseInt(rankMatch[1])
        // Show cutoffs around the student's rank (+/- 20%)
        const minRank = Math.max(1, Math.floor(studentRank * 0.8))
        const maxRank = Math.floor(studentRank * 1.25)
        cutoffQuery = cutoffQuery.gte('rank', minRank).lte('rank', maxRank)
      }

      // Check course mentions
      if (query.includes('mbbs')) cutoffQuery = cutoffQuery.eq('course', 'MBBS')
      else if (query.includes('bds')) cutoffQuery = cutoffQuery.eq('course', 'BDS')
      else if (query.includes('b.tech') || query.includes('btech') || query.includes('cse')) cutoffQuery = cutoffQuery.ilike('course', '%B.Tech%')

      // Check quota mentions
      if (query.includes('aiq') || query.includes('all india')) cutoffQuery = cutoffQuery.ilike('quota', '%All India%')
      else if (query.includes('nri')) cutoffQuery = cutoffQuery.ilike('quota', '%NRI%')
      else if (query.includes('management') || query.includes('deemed')) cutoffQuery = cutoffQuery.ilike('quota', '%Management%')

      const { data: cutoffsData } = await cutoffQuery
      if (cutoffsData && cutoffsData.length > 0) {
        result.cutoffs = cutoffsData
      }
    }

    // 4. Search Urgent Deadlines & Alerts
    const matchedAlerts = URGENT_DEADLINES.filter(a => 
      query.includes(a.category.toLowerCase()) || 
      query.includes(a.exam.toLowerCase()) || 
      query.includes('deadline') || 
      query.includes('date') || 
      query.includes('alert')
    )
    result.alerts = matchedAlerts.slice(0, 4)

    // 5. Search News Articles
    if (query.includes('news') || query.includes('update') || query.includes('notice') || query.includes('latest')) {
      const { data: newsData } = await supabase
        .from('news_articles')
        .select('heading, synopsis, slug, published_at')
        .order('published_at', { ascending: false })
        .limit(3)
      if (newsData) {
        result.news = newsData
      }
    }

  } catch (err) {
    console.error('[searchWebsiteKnowledge] Error retrieving knowledge:', err)
  }

  return result
}

/**
 * retrieval.ts — Priority-based retrieval pipeline for EduBot
 *
 * SOURCE PRIORITY (enforced in orchestrate()):
 *   P1: colleges table (primary truth — full schema, rich querying)
 *   P2: news_articles table (latest, time-sensitive information)
 *   P3: blogs table (supplemental education content)
 *   P4: static exam database (local fallback for exam-structure facts)
 *
 * Lower-priority sources are queried only when P1 data is insufficient
 * for the question type, OR when the question explicitly targets them.
 */

import { supabase } from '@/lib/supabase'
import { examDatabase } from '@/data/examDatabase'
import { URGENT_DEADLINES } from '@/data/admissionAlertsData'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CollegeRecord {
  id: string
  slug: string
  name: string
  short_name: string | null
  location: string
  state: string
  stream: string
  ranking: number | null
  type: string | null
  avg_ctc: string | null
  total_fee: string | null
  verified: boolean
  ownership: string | null
  affiliation: string | null
  established: number | null
  description: string | null
  nirf_rank: number | null
  naac_grade: string | null
  naac_cgpa: number | null
  campus_size: string | null
  total_students: number | null
  faculty_count: number | null
  avg_package: number | null
  highest_package: number | null
  placement_rate: number | null
  total_offers: number | null
  companies_visited: number | null
  entrance_exam: string | null
  rating: number | null
  review_count: number | null
  facilities: string[] | null
  official_website: string | null
  content: {
    overview?: string
    courses?: any[]
    cutoffs?: any[]
    placements?: any
    why_choose?: string
    campus_life?: string
    admission?: string
    rankings?: any
  } | null
  faqs: { question: string; answer: string }[] | null
}

export interface CutoffRecord {
  course: string
  category: string
  quota: string
  state: string | null
  college_type: string | null
  rank: number
  marks: number | null
  round: number | null
  year: number | null
  colleges: { name: string; slug: string; location: string; state: string } | { name: string; slug: string; location: string; state: string }[] | null
}

export interface NewsRecord {
  slug: string
  heading: string
  synopsis: string | null
  published_at: string | null
}

export interface BlogRecord {
  slug: string
  title: string
  summary: string | null
  category: string | null
  author: string | null
  published_at: string | null
  updated_at: string | null
}

export interface RetrievalResult {
  /** Source priority metadata for the system prompt */
  sourcePriority: {
    collegesAnswers: boolean   // P1 provided substantial data
    newsAnswers: boolean       // P2 supplemented
    blogsAnswers: boolean      // P3 supplemented
    examInfoAnswers: boolean   // P4 used
  }
  colleges: CollegeRecord[]
  cutoffs: CutoffRecord[]
  alerts: any[]
  news: NewsRecord[]
  blogs: BlogRecord[]
  examInfo: any | null
}

// ── Intent Classification ─────────────────────────────────────────────────────

interface QueryIntent {
  /** Is this specifically about college facts/comparisons/fees/placements? */
  isCollegeQuery: boolean
  /** Is this about current events, announcements, dates, deadlines? */
  isNewsQuery: boolean
  /** Does this mention a specific rank/cutoff? */
  isCutoffQuery: boolean
  /** Does this explicitly ask for recent/latest news or updates? */
  wantsLatestNews: boolean
  /** Which stream is the user asking about? */
  stream: 'Medical' | 'Engineering' | 'Management' | 'Law' | 'Architecture' | 'Pharmacy' | 'BDS' | null
  /** Extracted numeric rank from query */
  rankNumber: number | null
  /** Search tokens for college/location name matching */
  nameTokens: string[]
  /** State filter extracted from query */
  stateHint: string | null
}

// Common stop-words to filter out of name-search tokens
const STOP_WORDS = new Set([
  'what', 'which', 'where', 'when', 'college', 'colleges', 'fees',
  'best', 'good', 'top', 'package', 'packages', 'cutoff', 'cutoffs',
  'rank', 'marks', 'admission', 'admissions', 'want', 'give', 'tell',
  'need', 'how', 'many', 'much', 'does', 'have', 'with', 'for', 'the',
  'are', 'can', 'get', 'and', 'its', 'seat', 'seats', 'course', 'courses',
  'about', 'from', 'into', 'also', 'that', 'this', 'list', 'show', 'all',
  'compare', 'comparison', 'between', 'different', 'across', 'placement',
  'placements', 'average', 'high', 'low', 'year', 'recent', 'latest',
])

const INDIA_STATES: Record<string, string> = {
  'delhi': 'Delhi', 'mumbai': 'Maharashtra', 'maharashtra': 'Maharashtra',
  'bangalore': 'Karnataka', 'bengaluru': 'Karnataka', 'karnataka': 'Karnataka',
  'chennai': 'Tamil Nadu', 'tamil nadu': 'Tamil Nadu', 'tamilnadu': 'Tamil Nadu',
  'hyderabad': 'Telangana', 'telangana': 'Telangana', 'andhra': 'Andhra Pradesh',
  'andhra pradesh': 'Andhra Pradesh', 'kolkata': 'West Bengal', 'west bengal': 'West Bengal',
  'pune': 'Maharashtra', 'ahmedabad': 'Gujarat', 'gujarat': 'Gujarat',
  'rajasthan': 'Rajasthan', 'jaipur': 'Rajasthan', 'lucknow': 'Uttar Pradesh',
  'uttar pradesh': 'Uttar Pradesh', 'up': 'Uttar Pradesh', 'mp': 'Madhya Pradesh',
  'madhya pradesh': 'Madhya Pradesh', 'bhopal': 'Madhya Pradesh',
  'punjab': 'Punjab', 'chandigarh': 'Chandigarh', 'haryana': 'Haryana',
  'kerala': 'Kerala', 'kochi': 'Kerala', 'assam': 'Assam', 'guwahati': 'Assam',
  'bihar': 'Bihar', 'patna': 'Bihar', 'jharkhand': 'Jharkhand',
  'odisha': 'Odisha', 'bhubaneswar': 'Odisha', 'chhattisgarh': 'Chhattisgarh',
  'uttarakhand': 'Uttarakhand', 'himachal': 'Himachal Pradesh',
  'goa': 'Goa', 'manipur': 'Manipur', 'nagaland': 'Nagaland',
}

function classifyIntent(userMessage: string): QueryIntent {
  const q = userMessage.toLowerCase()

  // Stream detection
  let stream: QueryIntent['stream'] = null
  if (q.includes('mbbs') || q.includes('medical') || q.includes('neet') || q.includes('doctor') || q.includes('medicine')) stream = 'Medical'
  else if (q.includes('bds') || q.includes('dental') || q.includes('dentist')) stream = 'BDS'
  else if (q.includes('engineering') || q.includes('b.tech') || q.includes('btech') || q.includes('jee') || q.includes('cse') || q.includes('ece') || q.includes('mtech')) stream = 'Engineering'
  else if (q.includes('mba') || q.includes('management') || q.includes('cat') || q.includes('xat') || q.includes('gmat') || q.includes('pgdm')) stream = 'Management'
  else if (q.includes('law') || q.includes('clat') || q.includes('llb') || q.includes('llm')) stream = 'Law'
  else if (q.includes('pharmacy') || q.includes('b.pharm') || q.includes('pharm')) stream = 'Pharmacy'
  else if (q.includes('architecture') || q.includes('b.arch') || q.includes('barch')) stream = 'Architecture'

  // Rank extraction
  const rankMatch = q.match(/\b(\d{3,7})\b/)
  const rankNumber = rankMatch ? parseInt(rankMatch[1], 10) : null

  // State extraction
  let stateHint: string | null = null
  for (const [keyword, state] of Object.entries(INDIA_STATES)) {
    if (q.includes(keyword)) { stateHint = state; break }
  }

  // Intent signals
  const isCutoffQuery = q.includes('cutoff') || q.includes('cut off') || q.includes('closing rank') ||
    q.includes('opening rank') || q.includes('last rank') || q.includes('my rank') ||
    (rankNumber !== null && (q.includes('rank') || q.includes('score') || q.includes('marks') || q.includes('get')))

  const wantsLatestNews = q.includes('latest') || q.includes('recent') || q.includes('news') ||
    q.includes('update') || q.includes('notice') || q.includes('announcement') ||
    q.includes('date') || q.includes('deadline') || q.includes('registration') ||
    q.includes('when') || q.includes('schedule')

  const isNewsQuery = wantsLatestNews || q.includes('admit card') || q.includes('result') ||
    q.includes('counselling date') || q.includes('counseling date')

  const isCollegeQuery = q.includes('college') || q.includes('university') || q.includes('institute') ||
    q.includes('iit') || q.includes('nit') || q.includes('aiims') || q.includes('iim') ||
    q.includes('bits') || q.includes('vit') || q.includes('srm') || q.includes('amity') ||
    q.includes('fee') || q.includes('placement') || q.includes('campus') || q.includes('hostel') ||
    q.includes('nirf') || q.includes('accreditation') || q.includes('naac') ||
    stream !== null || stateHint !== null || isCutoffQuery

  // Name search tokens (meaningful words that might be college names, states, locations)
  const nameTokens = q
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w))
    .slice(0, 5)

  return {
    isCollegeQuery,
    isNewsQuery,
    isCutoffQuery,
    wantsLatestNews,
    stream,
    rankNumber,
    nameTokens,
    stateHint,
  }
}

// ── P1: College Table Retrieval ───────────────────────────────────────────────

const COLLEGE_SELECT_FIELDS = [
  'id', 'slug', 'name', 'short_name', 'location', 'state', 'stream',
  'ranking', 'type', 'ownership', 'affiliation', 'established',
  'nirf_rank', 'naac_grade', 'naac_cgpa', 'campus_size',
  'total_students', 'faculty_count', 'avg_ctc', 'avg_package',
  'highest_package', 'placement_rate', 'total_offers', 'companies_visited',
  'total_fee', 'entrance_exam', 'rating', 'review_count', 'verified',
  'facilities', 'official_website', 'description',
  'content->>overview', 'content->courses', 'content->placements',
  'content->admission', 'content->>why_choose', 'content->>campus_life',
  'faqs',
].join(', ')

async function fetchColleges(intent: QueryIntent): Promise<CollegeRecord[]> {
  try {
    let q = supabase
      .from('colleges')
      .select(COLLEGE_SELECT_FIELDS)
      .eq('is_active', true)

    // Apply stream filter if detected
    if (intent.stream) {
      q = q.eq('stream', intent.stream)
    }

    // Apply state filter if detected
    if (intent.stateHint) {
      q = q.eq('state', intent.stateHint)
    }

    // Apply name/location search if we have meaningful tokens
    if (intent.nameTokens.length > 0) {
      const terms = intent.nameTokens.slice(0, 4)
      const orFilter = terms
        .map(t => `name.ilike.%${t}%,short_name.ilike.%${t}%,location.ilike.%${t}%,description.ilike.%${t}%`)
        .join(',')
      q = q.or(orFilter)
    }

    // Order by relevance: verified first, then by ranking, then nirf_rank
    q = q.order('verified', { ascending: false })
         .order('ranking', { ascending: true, nullsFirst: false })

    // Broader result set — up to 12 if we have filters, else limit tighter
    const limit = (intent.stream || intent.stateHint) ? 12 : 8
    q = q.limit(limit)

    const { data, error } = await q
    if (error) {
      console.error('[retrieval P1] college query error:', error.message)
      return []
    }
    return (data || []) as unknown as CollegeRecord[]
  } catch (err) {
    console.error('[retrieval P1] unexpected error:', err)
    return []
  }
}

async function fetchCutoffs(intent: QueryIntent): Promise<CutoffRecord[]> {
  if (!intent.isCutoffQuery) return []
  try {
    let q = supabase
      .from('cutoffs')
      .select(`course, category, quota, state, college_type, rank, marks, round, year,
               colleges ( name, slug, location, state )`)
      .order('rank', { ascending: true })

    // Rank window: ±25% of the student's rank
    if (intent.rankNumber) {
      const minRank = Math.max(1, Math.floor(intent.rankNumber * 0.75))
      const maxRank = Math.floor(intent.rankNumber * 1.30)
      q = q.gte('rank', minRank).lte('rank', maxRank)
    }

    // Course filter based on stream
    if (intent.stream === 'Medical') q = q.eq('course', 'MBBS')
    else if (intent.stream === 'BDS') q = q.eq('course', 'BDS')

    // State quota filter
    if (intent.stateHint) {
      q = q.or(`state.eq.${intent.stateHint},quota.ilike.%All India%`)
    }

    q = q.limit(15)
    const { data, error } = await q
    if (error) {
      console.error('[retrieval cutoffs] error:', error.message)
      return []
    }
    return (data || []) as unknown as CutoffRecord[]
  } catch (err) {
    console.error('[retrieval cutoffs] unexpected:', err)
    return []
  }
}

// ── P2: News Retrieval ────────────────────────────────────────────────────────

async function fetchNews(intent: QueryIntent, alwaysFetch = false): Promise<NewsRecord[]> {
  // Fetch news if explicitly requested or if it's clearly a news-type query
  if (!alwaysFetch && !intent.isNewsQuery) return []
  try {
    let q = supabase
      .from('news_articles')
      .select('slug, heading, synopsis, published_at')
      .eq('is_live', true)
      .order('published_at', { ascending: false })

    // Add keyword filter when we have meaningful tokens
    if (intent.nameTokens.length > 0 && !alwaysFetch) {
      const terms = intent.nameTokens.slice(0, 3)
      q = q.or(terms.map(t => `heading.ilike.%${t}%,synopsis.ilike.%${t}%`).join(','))
    }

    q = q.limit(alwaysFetch ? 5 : 6)
    const { data, error } = await q
    if (error) {
      console.error('[retrieval P2] news error:', error.message)
      return []
    }
    return (data || []) as NewsRecord[]
  } catch (err) {
    console.error('[retrieval P2] unexpected:', err)
    return []
  }
}

// ── P3: Blogs Retrieval ───────────────────────────────────────────────────────

async function fetchBlogs(intent: QueryIntent): Promise<BlogRecord[]> {
  if (intent.nameTokens.length === 0) return []
  try {
    const terms = intent.nameTokens.slice(0, 3)
    const orFilter = terms.map(t => `title.ilike.%${t}%,summary.ilike.%${t}%`).join(',')

    const { data, error } = await supabase
      .from('blogs')
      .select('slug, title, summary, category, author, published_at, updated_at')
      .eq('is_live', true)
      .or(orFilter)
      .order('updated_at', { ascending: false })
      .limit(4)

    if (error) {
      console.error('[retrieval P3] blogs error:', error.message)
      return []
    }
    return (data || []) as BlogRecord[]
  } catch (err) {
    console.error('[retrieval P3] unexpected:', err)
    return []
  }
}

// ── P4: Static Exam Database (Fallback) ──────────────────────────────────────

function fetchExamInfo(userMessage: string): any | null {
  const q = userMessage.toLowerCase()
  const examSlugs = Object.keys(examDatabase)
  for (const slug of examSlugs) {
    const exam = examDatabase[slug]
    const matched =
      q.includes(slug.replace(/-/g, ' ')) ||
      q.includes(slug) ||
      q.includes(exam.title.toLowerCase()) ||
      q.includes(exam.fullName.toLowerCase())
    if (matched) {
      return {
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
    }
  }
  return null
}

// ── Sufficiency Check ─────────────────────────────────────────────────────────

/**
 * Determine whether the P1 college data sufficiently answers the query.
 * Returns false if we should proceed to lower-priority sources.
 */
function collegeDataSufficient(
  intent: QueryIntent,
  colleges: CollegeRecord[],
  cutoffs: CutoffRecord[],
): boolean {
  // If query is purely about news/announcements and we found no time-sensitive
  // college data, college table cannot answer it
  if (intent.wantsLatestNews && !intent.isCollegeQuery) return false

  // If a cutoff query came back with results, P1 is sufficient for cutoffs
  if (intent.isCutoffQuery && cutoffs.length > 0) return true

  // College name search: sufficient if we found ≥1 record
  if (intent.isCollegeQuery && colleges.length > 0) return true

  // If no college matches at all, escalate
  return false
}

// ── Orchestrator ──────────────────────────────────────────────────────────────

export async function searchWebsiteKnowledge(userMessage: string): Promise<RetrievalResult> {
  const result: RetrievalResult = {
    sourcePriority: {
      collegesAnswers: false,
      newsAnswers: false,
      blogsAnswers: false,
      examInfoAnswers: false,
    },
    colleges: [],
    cutoffs: [],
    alerts: [],
    news: [],
    blogs: [],
    examInfo: null,
  }

  const intent = classifyIntent(userMessage)

  // ── Step 1: Always check urgent deadline alerts (from static data) ─────────
  const matchedAlerts = URGENT_DEADLINES.filter(a =>
    intent.nameTokens.some(t => a.exam.toLowerCase().includes(t)) ||
    (intent.stream && a.category.toLowerCase().includes(intent.stream.toLowerCase())) ||
    intent.wantsLatestNews
  )
  result.alerts = matchedAlerts.slice(0, 4)

  // ── Step 2: P1 — College Table ─────────────────────────────────────────────
  if (intent.isCollegeQuery || intent.isCutoffQuery) {
    const [colleges, cutoffs] = await Promise.all([
      fetchColleges(intent),
      fetchCutoffs(intent),
    ])
    result.colleges = colleges
    result.cutoffs = cutoffs

    if (colleges.length > 0 || cutoffs.length > 0) {
      result.sourcePriority.collegesAnswers = true
    }
  }

  // ── Step 3: P2 — Latest News (always if query targets news; conditionally if P1 insufficient) ──
  const p1Sufficient = collegeDataSufficient(intent, result.colleges, result.cutoffs)
  const shouldFetchNews = intent.isNewsQuery || !p1Sufficient || intent.wantsLatestNews

  if (shouldFetchNews) {
    const news = await fetchNews(intent, !intent.isCollegeQuery && intent.isNewsQuery)
    result.news = news
    if (news.length > 0) result.sourcePriority.newsAnswers = true
  }

  // ── Step 4: P3 — Blogs (only if P1 + P2 insufficient, OR explicitly mixed-need) ──
  const combinedSufficient = p1Sufficient || result.news.length > 0
  const needsBlogs = !combinedSufficient || (intent.nameTokens.length > 0 && !intent.isNewsQuery && result.colleges.length === 0)

  if (needsBlogs) {
    const blogs = await fetchBlogs(intent)
    result.blogs = blogs
    if (blogs.length > 0) result.sourcePriority.blogsAnswers = true
  }

  // ── Step 5: P4 — Static Exam Info (lowest priority; supplements always) ────
  const examInfo = fetchExamInfo(userMessage)
  if (examInfo) {
    result.examInfo = examInfo
    result.sourcePriority.examInfoAnswers = true
  }

  return result
}

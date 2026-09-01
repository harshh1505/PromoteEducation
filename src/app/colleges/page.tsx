import { supabase } from '@/lib/supabase'
import CollegesClient from './CollegesClient'
import type { Metadata } from 'next'

export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
  title: 'Top Colleges in India 2026: Rankings, Fees, Placements & Reviews | Promote Education',
  description: 'Explore 50,000+ top colleges in India across Engineering, Medical, Management, and Law. Compare verified NIRF rankings, cutoff marks, fee structure, and average salary packages.',
  alternates: {
    canonical: 'https://promoteducation.com/colleges',
  },
}

export default async function CollegesPage() {
  const [collegesRes, coursesRes] = await Promise.all([
    supabase
      .from('colleges')
      .select('id, slug, name, short_name, location, state, stream, ranking, total_fee, avg_ctc, ownership, type, cover_image, image_url')
      .eq('is_active', true)
      .order('ranking', { ascending: true }),
    supabase
      .from('courses')
      .select('college_id, course_catalog(degree, slug)')
  ])

  const colleges = collegesRes.data || []
  const courses = coursesRes.data || []

  // Extract unique college IDs for each course category
  const bdsCollegeIds = Array.from(new Set(
    courses
      .filter((c: any) => c.course_catalog?.slug === 'bds')
      .map((c: any) => c.college_id)
  )) as string[]

  const mbbsCollegeIds = Array.from(new Set(
    courses
      .filter((c: any) => c.course_catalog?.slug === 'mbbs')
      .map((c: any) => c.college_id)
  )) as string[]

  const btechCollegeIds = Array.from(new Set(
    courses
      .filter((c: any) => {
        const degree = c.course_catalog?.degree
        return degree === 'B.Tech' || degree === 'B.E.'
      })
      .map((c: any) => c.college_id)
  )) as string[]

  const mtechCollegeIds = Array.from(new Set(
    courses
      .filter((c: any) => c.course_catalog?.degree === 'M.Tech')
      .map((c: any) => c.college_id)
  )) as string[]

  const mbaCollegeIds = Array.from(new Set(
    courses
      .filter((c: any) => c.course_catalog?.degree === 'MBA')
      .map((c: any) => c.college_id)
  )) as string[]

  return (
    <CollegesClient
      initialColleges={colleges}
      initialBdsCollegeIds={bdsCollegeIds}
      initialMbbsCollegeIds={mbbsCollegeIds}
      initialBtechCollegeIds={btechCollegeIds}
      initialMtechCollegeIds={mtechCollegeIds}
      initialMbaCollegeIds={mbaCollegeIds}
    />
  )
}

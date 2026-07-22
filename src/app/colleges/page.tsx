import { supabase } from '@/lib/supabase'
import CollegesClient from './CollegesClient'

export const revalidate = 86400 // Revalidate daily

export default async function CollegesPage() {
  const [collegesRes, bdsRes, mbbsRes] = await Promise.all([
    supabase
      .from('colleges')
      .select('id, slug, name, short_name, location, state, stream, ranking, total_fee, avg_ctc, ownership, type, cover_image, image_url')
      .eq('is_active', true)
      .order('ranking', { ascending: true }),
    supabase
      .from('courses')
      .select('college_id')
      .eq('course_catalog_id', '9de59697-8f3b-48b0-9032-37b077cc9fe3'),
    supabase
      .from('courses')
      .select('college_id')
      .eq('course_catalog_id', 'f35ba06c-bd5c-42f8-be1d-376833eaeb08')
  ])

  const colleges = collegesRes.data || []
  const bdsCollegeIds = (bdsRes.data || []).map((c: any) => c.college_id)
  const mbbsCollegeIds = (mbbsRes.data || []).map((c: any) => c.college_id)

  return (
    <CollegesClient
      initialColleges={colleges}
      initialBdsCollegeIds={bdsCollegeIds}
      initialMbbsCollegeIds={mbbsCollegeIds}
    />
  )
}

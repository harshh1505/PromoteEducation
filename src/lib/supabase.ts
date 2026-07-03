import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!supabaseUrl || !supabaseAnonKey) {
  // Log a warning instead of throwing — throwing here crashes Next.js build workers
  // when this module is imported during static-generation time before env vars are ready.
  console.warn(
    '[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
    'Supabase calls will fail at runtime until these are set in Vercel environment variables.'
  )
}

// Use non-empty fallback values so createClient() doesn't throw on empty string.
// Pages that call supabase at build time must use export const dynamic = 'force-dynamic'
// to defer rendering to request time when real env vars are available.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.invalid',
  supabaseAnonKey || 'placeholder'
)

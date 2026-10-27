import { createClient } from '@supabase/supabase-js'

interface Env {
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

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context
    const body = await request.json() as {
      name?: string
      phone?: string
      email?: string
      course?: string
      message?: string
    }

    const { name, phone, email, course, message } = body

    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: 'Name and phone are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      )
    }

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Database credentials not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const cleanPhone = phone.replace(/\D/g, '')
    const finalEmail = email?.trim() || `${cleanPhone}@counseling.promoteducation.com`

    const { error } = await supabase.from('leads').insert([
      {
        full_name: name.trim(),
        phone: phone.trim(),
        email: finalEmail,
        stream: course || 'General Counseling',
        source: `AI Counselor Chatbot: ${message || 'Student requested callback via AI chat widget'}`,
        status: 'new'
      }
    ])

    if (error) {
      console.error('[Cloudflare Lead Function] Supabase error:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Callback request registered successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    )
  } catch (err: any) {
    console.error('[Cloudflare Lead Function] Unexpected error:', err)
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    )
  }
}

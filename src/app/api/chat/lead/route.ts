import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { name, phone, email, course, message } = await req.json()

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
    }

    // Ensure email is never null as the leads table enforces a NOT NULL constraint
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
      console.error('[Chat Lead Capture] Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Callback request registered successfully' })
  } catch (err: any) {
    console.error('[Chat Lead Capture] Unexpected error:', err)
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}

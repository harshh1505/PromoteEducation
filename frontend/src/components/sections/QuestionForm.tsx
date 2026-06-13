'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function QuestionForm({ collegeId }: { collegeId: string }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('faqs')
      .insert([{ college_id: collegeId, question, answer: 'Pending answer from college representative.' }])

    setLoading(false)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      setIsOpen(false)
      setQuestion('')
      router.refresh()
    }
  }

  return (
    <div className="mt-4">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ background: 'none', border: '1px solid #e2e8f0', color: '#1e293b', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          Ask a Question
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <textarea 
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Is there a swimming pool in the campus?"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px', marginBottom: '10px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button disabled={loading} type="submit" style={{ background: '#1a3557', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              {loading ? 'Posting...' : 'Post Question'}
            </button>
            <button type="button" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ReviewForm({ collegeId }: { collegeId: string }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    user_name: '',
    rating: 5,
    comment: '',
    user_tag: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('reviews')
      .insert([
        { 
          college_id: collegeId, 
          user_name: formData.user_name,
          rating: formData.rating,
          comment: formData.comment,
          user_tag: formData.user_tag,
          is_verified: false
        }
      ])

    setLoading(false)
    if (error) {
      alert('Error posting review: ' + error.message)
    } else {
      setIsOpen(false)
      setFormData({ user_name: '', rating: 5, comment: '', user_tag: '' })
      router.refresh()
    }
  }

  return (
    <div className="mt-6">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ 
            background: '#1a3557', 
            color: '#fff', 
            padding: '10px 20px', 
            borderRadius: '6px', 
            fontSize: '13px', 
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '18px' }}>+</span> Write a Review
        </button>
      ) : (
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Share your experience</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>Cancel</button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>Your Name</label>
                <input 
                  required
                  value={formData.user_name}
                  onChange={(e) => setFormData({...formData, user_name: e.target.value})}
                  placeholder="e.g. Aman Gupta"
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>Your Status</label>
                <input 
                  required
                  value={formData.user_tag}
                  onChange={(e) => setFormData({...formData, user_tag: e.target.value})}
                  placeholder="e.g. B.Tech Student, 2024"
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>Rating</label>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      fontSize: '20px', 
                      cursor: 'pointer',
                      color: star <= formData.rating ? '#f59e0b' : '#cbd5e1'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 600 }}>Your Review</label>
              <textarea 
                required
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                placeholder="What do you think about the campus, faculty, and placements?"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', height: '80px', resize: 'vertical' }}
              />
            </div>

            <button 
              disabled={loading}
              type="submit"
              style={{ 
                background: '#1a3557', 
                color: '#fff', 
                padding: '10px', 
                borderRadius: '6px', 
                fontSize: '13px', 
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                border: 'none',
                marginTop: '10px',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Posting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

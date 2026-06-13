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
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-lg animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-extrabold text-slate-900">Share your experience</h3>
            <button onClick={() => setIsOpen(false)} className="text-xs font-bold text-slate-400 hover:text-slate-950 transition-colors">Cancel</button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">Your Name</label>
                <input 
                  required
                  value={formData.user_name}
                  onChange={(e) => setFormData({...formData, user_name: e.target.value})}
                  placeholder="e.g. Aman Gupta"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-base sm:text-xs font-semibold text-slate-800 placeholder:text-slate-300 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">Your Status</label>
                <input 
                  required
                  value={formData.user_tag}
                  onChange={(e) => setFormData({...formData, user_tag: e.target.value})}
                  placeholder="e.g. B.Tech Student, 2024"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-base sm:text-xs font-semibold text-slate-800 placeholder:text-slate-300 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">Rating</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    className="p-1 min-w-[36px] min-h-[36px] flex items-center justify-center text-2xl transition-transform active:scale-90"
                    style={{ 
                      background: 'none', 
                      border: 'none', 
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
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">Your Review</label>
              <textarea 
                required
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                placeholder="What do you think about the campus, faculty, and placements?"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-base sm:text-xs font-semibold text-slate-800 placeholder:text-slate-300 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all min-h-[100px] resize-vertical"
              />
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 mt-1"
            >
              {loading ? 'Posting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

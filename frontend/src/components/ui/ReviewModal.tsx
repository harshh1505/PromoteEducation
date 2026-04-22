'use client'

import { useState, useEffect } from 'react'
import { X, Star, MessageSquare, Send, CheckCircle2, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  collegeName: string
}

export default function ReviewModal({ isOpen, onClose, collegeName }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '')
      }
    })
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) return alert('Please select a rating')

    setLoading(true)
    const { error } = await supabase
      .from('reviews')
      .insert([
        {
          student_name: name,
          college_name: collegeName,
          rating: rating,
          review_text: comment,
          verified: !!user,
          initials: name.charAt(0).toUpperCase()
        }
      ])

    if (!error) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
        setRating(0)
        setComment('')
      }, 2000)
    } else {
      alert('Error submitting review: ' + error.message)
    }
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-20"
          >
            <X size={20} />
          </button>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-sky-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400">Student Feedback</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Review {collegeName}</h2>
            <p className="text-white/60 text-sm font-medium">Your honest review helps thousands of other students make better decisions.</p>
          </div>
          
          <Star size={120} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
        </div>

        {/* Body */}
        <div className="p-8">
          {success ? (
            <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Review Submitted!</h3>
              <p className="text-slate-500 font-medium">Thank you for sharing your experience. Your review is now live.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Rating Section */}
              <div className="flex flex-col items-center gap-3 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Overall Rating</p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={cn(
                        "transition-all duration-200 transform hover:scale-110",
                        (hover || rating) >= star ? "text-amber-400" : "text-slate-200"
                      )}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star 
                        size={32} 
                        fill={(hover || rating) >= star ? "currentColor" : "none"} 
                        strokeWidth={2}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-600">
                  {rating === 1 && "Disappointed"}
                  {rating === 2 && "Could be better"}
                  {rating === 3 && "It's Okay"}
                  {rating === 4 && "Great Experience"}
                  {rating === 5 && "Excellence Guaranteed!"}
                  {rating === 0 && "Select a star"}
                </p>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={16} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Comment Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Review Comment</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={16} />
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe your experience with this college, placements, faculty, and campus life..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Review <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

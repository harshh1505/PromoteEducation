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
  const [agreed, setAgreed] = useState(false)

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
    const { error } = await supabase.from('reviews').insert([{
      student_name: name,
      college_name: collegeName,
      rating: rating,
      review_text: comment,
      verified: !!user,
      initials: name.charAt(0).toUpperCase()
    }])

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

  const ratingLabels: Record<number, string> = {
    1: 'Disappointed', 2: 'Could be better', 3: "It's Okay", 4: 'Great Experience', 5: 'Excellence Guaranteed!'
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[28px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-slate-900 px-8 py-9 text-white relative overflow-hidden">
          <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/15 rounded-full transition-all z-20">
            <X size={16} />
          </button>
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#38b6ff]/8 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[2px] bg-[#38b6ff] rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#38b6ff]">Student Feedback</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight mb-1">Review {collegeName}</h2>
            <p className="text-slate-400 text-xs leading-relaxed">Your honest review helps thousands of other students make better decisions.</p>
          </div>
          
          <Star size={100} className="absolute -bottom-8 -right-8 text-white/4 rotate-12" />
        </div>

        {/* Body */}
        <div className="p-7">
          {success ? (
            <div className="py-10 flex flex-col items-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Review Submitted!</h3>
              <p className="text-slate-400 text-sm">Thank you for sharing your experience. Your review is now live.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Rating */}
              <div className="flex flex-col items-center gap-3 py-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Overall Rating</p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button"
                      className={cn("transition-all duration-200 hover:scale-110", (hover || rating) >= star ? "text-amber-400" : "text-slate-200")}
                      onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} onClick={() => setRating(star)}>
                      <Star size={30} fill={(hover || rating) >= star ? "currentColor" : "none"} strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-600 h-4">
                  {rating > 0 ? ratingLabels[rating] : 'Select a star'}
                </p>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Your Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" size={14} />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#38b6ff] focus:bg-white focus:ring-4 focus:ring-[#38b6ff]/8 transition-all" />
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 pl-1">Review Comment</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 text-slate-300 group-focus-within:text-[#38b6ff] transition-colors pointer-events-none" size={14} />
                  <textarea required rows={3} value={comment} onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe your experience with this college, placements, faculty, and campus life..."
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#38b6ff] focus:bg-white focus:ring-4 focus:ring-[#38b6ff]/8 transition-all resize-none" />
                </div>
              </div>

              {/* T&C */}
              <div className="flex items-start gap-2.5">
                <div className="flex items-center h-5 mt-0.5">
                  <input id="terms-review" type="checkbox" required checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 text-[#38b6ff] bg-slate-50 border-slate-300 rounded focus:ring-[#38b6ff] cursor-pointer" />
                </div>
                <label htmlFor="terms-review" className="text-[10px] text-slate-400 leading-normal cursor-pointer select-none">
                  I agree to the{' '}
                  <a href="/terms" className="text-[#38b6ff] font-bold hover:underline">Terms & Conditions</a>
                  {' '}for submitting reviews
                </label>
              </div>

              <button type="submit" disabled={loading || !agreed}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Submit Review <Send size={14} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

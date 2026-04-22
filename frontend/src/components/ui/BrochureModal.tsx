'use client'

import React, { useState } from 'react'
import { X, Mail, Phone, User, Download, CheckCircle2, Loader2, Info, Share2, Bell } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type ModalMode = 'brochure' | 'details' | 'share' | 'remind'

const MODAL_CONFIG: Record<ModalMode, {
  title: string
  highlight: string
  description: (name: string) => string
  buttonText: string
  buttonIcon: React.ReactNode
  source: string
}> = {
  brochure: {
    title: 'Download',
    highlight: 'Brochure',
    description: (name) => `Enter your details to receive the official brochure and fee structure for ${name}.`,
    buttonText: 'Send Me the Brochure',
    buttonIcon: <Download size={18} />,
    source: 'brochure_download',
  },
  details: {
    title: 'View',
    highlight: 'College Details',
    description: (name) => `Enter your details to unlock the full profile, placement stats, and reviews for ${name}.`,
    buttonText: 'View Full Details',
    buttonIcon: <Info size={18} />,
    source: 'college_details',
  },
  share: {
    title: 'Share',
    highlight: 'College Info',
    description: (name) => `Enter your details to share the profile of ${name} with friends and family.`,
    buttonText: 'Share Now',
    buttonIcon: <Share2 size={18} />,
    source: 'share_college',
  },
  remind: {
    title: 'Set',
    highlight: 'Exam Reminder',
    description: (name) => `Enter your details and we'll remind you about important dates and deadlines for ${name}.`,
    buttonText: 'Set Reminder',
    buttonIcon: <Bell size={18} />,
    source: 'exam_reminder',
  },
}

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
  collegeName: string
  collegeId?: string
  stream: string
  mode?: ModalMode
}

export default function BrochureModal({ isOpen, onClose, collegeName, collegeId, stream, mode = 'brochure' }: BrochureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const config = MODAL_CONFIG[mode]

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            ...(collegeId ? { college_id: collegeId } : {}),
            college_name: collegeName,
            stream: stream,
            source: config.source
          }
        ])

      if (error) throw error
      setIsSuccess(true)

      if (mode === 'details') {
        // Redirect to college detail page after a brief success message
        setTimeout(() => {
          const slug = collegeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          window.location.href = `/college/${slug}`
        }, 1500)
      } else if (mode === 'share') {
        // Trigger native share after success
        const shareUrl = `${window.location.origin}/college/${collegeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
        setTimeout(async () => {
          if (navigator.share) {
            try {
              await navigator.share({
                title: collegeName,
                text: `Check out ${collegeName} on Promote Education — rankings, fees, placements & more.`,
                url: shareUrl,
              })
            } catch {
              // User cancelled or share failed — silently ignore
            }
          } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(shareUrl)
            alert('Link copied to clipboard!')
          }
          onClose()
          setIsSuccess(false)
          setFormData({ name: '', email: '', phone: '' })
        }, 1500)
      } else {
        // Brochure / Remind: auto-close after success
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
          setFormData({ name: '', email: '', phone: '' })
        }, 2500)
      }

    } catch (err) {
      console.error('Lead capture error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const successMessages: Record<ModalMode, string> = {
    brochure: `We've sent the official brochure of <strong>${collegeName}</strong> to your email. Our counselor will contact you shortly.`,
    details: `Redirecting you to the full profile of <strong>${collegeName}</strong>...`,
    share: `Preparing to share <strong>${collegeName}</strong>...`,
    remind: `Reminder set! We'll notify you about all important dates for <strong>${collegeName}</strong>.`,
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-midnight/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-20"
        >
          <X size={20} className="text-ink-4" />
        </button>

        {isSuccess ? (
          <div className="py-16 px-10 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold text-ink mb-2">
              {mode === 'details' ? 'Redirecting...' : mode === 'share' ? 'Sharing...' : 'Request Received!'}
            </h3>
            <p className="text-ink-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: successMessages[mode] }} />
          </div>
        ) : (
          <div className="p-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-px bg-action" />
                <span className="text-[10px] font-bold text-action uppercase tracking-[0.2em]">Promote Education</span>
              </div>
              <h3 className="text-2xl font-bold text-ink mb-2">{config.title} <span className="text-action">{config.highlight}</span></h3>
              <p className="text-ink-3 text-sm leading-relaxed">
                {config.description(collegeName)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-ink-4 uppercase tracking-widest px-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-4" />
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Rahul Sharma" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-action/20 focus:bg-white transition-all transition-duration-300"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-ink-4 uppercase tracking-widest px-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-4" />
                  <input 
                    required
                    type="email" 
                    placeholder="rahul@example.com" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-action/20 focus:bg-white transition-all transition-duration-300"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-ink-4 uppercase tracking-widest px-1">Mobile Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-4" />
                  <input 
                    required
                    type="tel" 
                    placeholder="+91 99XXXXXX01" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-action/20 focus:bg-white transition-all transition-duration-300"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-4 bg-midnight text-white py-4 rounded-2xl font-bold text-sm hover:bg-midnight/90 transition-all shadow-xl shadow-midnight/10 flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    {config.buttonIcon} {config.buttonText}
                  </>
                )}
              </button>
            </form>
            
            <p className="mt-6 text-center text-[10px] text-ink-4 leading-relaxed">
              By clicking the button above, you agree to our <a href="/terms" className="text-action hover:underline">Terms of Service</a> and allow our counselors to contact you.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

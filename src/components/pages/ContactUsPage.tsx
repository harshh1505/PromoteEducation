'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2,
  PhoneCall,
  ExternalLink,
  ArrowRight
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'

const OFFICES = [
  {
    city: 'Delhi NCR Office',
    address: 'U-179, Office No. 303, The Eduguide, 3rd Floor, Shakarpur, Laxmi Nagar, New Delhi - 110092',
    landmark: 'Near Laxmi Nagar Metro Station Gate No. 4 (Landmark: Kotak Mahindra Bank)',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=U-179+Office+no+-+303+The+Eduguide,+3rd+floor+near+Laxmi+nagar+metro+station+gate+no+4'
  },
  {
    city: 'Kolkata Office',
    address: 'Ecosuite Business Tower, Street No. 676, Action Area II, Newtown, Kolkata, West Bengal - 700161',
    landmark: 'Action Area IID',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ecosuite+Business+Tower,+Street+No.+676,+Action+Area+II,+Newtown,+Kolkata,+West+Bengal+700161'
  },
  {
    city: 'Bangalore Office',
    address: 'S5, Hiprofiles Business Centre, 1/A Church Street, Bangalore - 560001',
    landmark: 'Opposite Tata Starbucks Coffee Shop',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=S5,+Hiprofiles+Business+center,+1/A+CHURCH+STREET,+Bangalore+-+560001'
  }
]

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    stream: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.stream) {
      setErrorMsg('Please fill in all required fields.')
      setIsSubmitting(false)
      return
    }

    try {
      const { error } = await supabase.from('leads').insert([
        {
          full_name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          stream: formData.stream,
          source: `contact_us_form: ${formData.message.trim() || 'No message provided'}`,
          status: 'new'
        }
      ])

      if (error) throw error

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        stream: '',
        message: ''
      })
    } catch (err: any) {
      console.error('Contact Form Submission Error:', err)
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-body selection:bg-sky-500 selection:text-white">
      <Navbar />
      
      <main className="flex-1 pt-28">
        {/* HERO SECTION */}
        <section className="relative py-20 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-sky-500/10 text-sky-400 text-[10px] font-black uppercase tracking-widest rounded-md border border-sky-500/20 inline-block mb-4"
            >
              Get In Touch
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contact Our Advisors
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
            >
              Have questions about engineering or medical admissions, counselling rounds, or college rankings? 
              Reach out and get direct, unbiased guidance.
            </motion.p>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="py-20 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* CONTACT FORM CONTAINER */}
              <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
                <h2 
                  className="text-2xl font-black text-slate-900 mb-2 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Send Us a Message
                </h2>
                <p className="text-sm text-slate-500 font-medium mb-8">
                  Fill out the form below and one of our academic counselors will get back to you within 24 hours.
                </p>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-8 bg-emerald-50 border border-emerald-100 rounded-2xl text-center text-emerald-950 flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-xl font-black mb-2 tracking-tight">Message Sent Successfully!</h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-md">
                        Thank you for contacting Promote Education. A senior academic advisor has been assigned to your query and will contact you shortly via phone or email.
                      </p>
                      <button 
                        onClick={() => setSuccess(false)}
                        className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md"
                      >
                        Submit Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {errorMsg && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm flex items-center gap-2 font-medium">
                          <AlertCircle size={16} className="shrink-0" />
                          {errorMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input 
                            required
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white text-slate-900 rounded-2xl outline-none transition-all text-sm font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input 
                            required
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="johndoe@example.com"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white text-slate-900 rounded-2xl outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-2">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <input 
                            required
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 99001 16101"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white text-slate-900 rounded-2xl outline-none transition-all text-sm font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-2">
                            Interested Course Stream <span className="text-red-500">*</span>
                          </label>
                          <select 
                            required
                            name="stream"
                            value={formData.stream}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white text-slate-900 rounded-2xl outline-none transition-all text-sm font-semibold appearance-none"
                          >
                            <option value="">Select your stream</option>
                            <option value="Medical">Medical (MBBS, BDS, etc.)</option>
                            <option value="Engineering">Engineering (B.Tech, B.Arch, etc.)</option>
                            <option value="Management">Management (MBA, BBA, etc.)</option>
                            <option value="Other">Other Courses</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-2">
                          Your Message / Query
                        </label>
                        <textarea 
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about the colleges, exams or guidance you need help with..."
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white text-slate-900 rounded-2xl outline-none transition-all text-sm font-medium resize-none"
                        />
                      </div>

                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-4.5 bg-slate-900 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send size={14} /> Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* CONTACT DETAILS COLUMN */}
              <div className="lg:col-span-5 space-y-8">
                {/* DIRECT SUPPORT CHANNELS */}
                <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
                  <h3 
                    className="text-xl font-black mb-6 tracking-tight flex items-center gap-2 border-b border-white/10 pb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Direct Support
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-400 flex items-center justify-center shrink-0">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1 leading-none">Admission Helpline</p>
                        <a 
                          href="tel:+919900116101" 
                          className="text-base font-extrabold text-white hover:text-sky-400 transition-colors"
                        >
                          +91 99001 16101
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-400 flex items-center justify-center shrink-0">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1 leading-none">Email Address</p>
                        <a 
                          href="mailto:info@promoteducation.com" 
                          className="text-base font-extrabold text-white hover:text-sky-400 transition-colors"
                        >
                          info@promoteducation.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-400 flex items-center justify-center shrink-0">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1 leading-none">Counseling Hours</p>
                        <p className="text-sm font-semibold text-slate-300">
                          Monday – Saturday: 9:00 AM – 7:00 PM IST
                        </p>
                        <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mt-1">
                          * 24/7 Helpline Available for Enrolled Students
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OFFICE LOCATIONS */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 
                      className="text-lg font-black text-slate-900 tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Our Office Locations
                    </h3>
                    <Building2 size={18} className="text-slate-400" />
                  </div>

                  {OFFICES.map((office, idx) => (
                    <div 
                      key={idx}
                      className="p-6 bg-white border border-slate-100 hover:border-sky-100 hover:shadow-md rounded-2xl transition-all shadow-sm group"
                    >
                      <h4 className="text-base font-black text-slate-900 mb-2 tracking-tight flex items-center gap-2">
                        <MapPin size={16} className="text-sky-500" />
                        {office.city}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold mb-2 leading-relaxed">
                        {office.address}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold mb-4">
                        Landmark: {office.landmark}
                      </p>
                      <a 
                        href={office.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-black text-sky-600 hover:text-sky-700 uppercase tracking-wider transition-colors group/link"
                      >
                        Directions in Google Maps 
                        <ExternalLink size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

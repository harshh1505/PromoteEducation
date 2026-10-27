'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  MessageSquare, X, Send, Bot, User,
  PhoneCall, RotateCcw, ChevronDown, CheckCircle2,
  ExternalLink, Building2, GraduationCap, AlertCircle, Loader2
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const STARTER_PROMPTS = [
  { icon: '🎯', text: 'What NEET rank is needed for Govt MBBS?' },
  { icon: '💼', text: 'Highest & average placement packages of top B.Tech colleges' },
  { icon: '🏛️', text: 'Tell me about AIIMS Kalyani cutoff & fees' },
  { icon: '📅', text: 'Upcoming exam registration deadlines & alerts' },
]

export default function ChatAssistant() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **Hello! I'm EduBot**, your 24/7 AI Admission Counselor at **Promote Education**.\n\nI have access to verified data on **950+ colleges, 5,100+ cutoffs, placement packages, fees, and exam dates**.\n\nHow can I help you today? You can ask about:\n- **NEET / JEE Cutoffs** by rank, category, or state\n- **College fees & average/highest packages**\n- **Upcoming exam deadlines & counseling guidance**`,
      timestamp: 'Just now'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showLeadCard, setShowLeadCard] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', course: '' })
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadSubmitting, setLeadSubmitting] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSendRef = useRef<(textToSend?: string) => Promise<void>>()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [isOpen, messages, loading])

  // Listen for global custom event to open chat from searchbar/chips
  useEffect(() => {
    const handleOpenChat = (e: any) => {
      setIsOpen(true)
      if (e.detail?.query) {
        handleSendRef.current?.(e.detail.query)
      }
    }
    window.addEventListener('open-ai-chat', handleOpenChat)
    return () => window.removeEventListener('open-ai-chat', handleOpenChat)
  }, [])

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim()
    if (!text || loading) return

    setHasInteracted(true)
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      const data = await res.json()

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.message || "I apologize, I couldn't process that response. Please ask again or contact our counseling line at **+91 99001 16101**.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, botMessage])
    } catch (err) {
      console.error('[Chat Widget] Error:', err)
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          content: "I'm having trouble connecting to our counseling server. Please check your network or call our counseling team directly at **+91 99001 16101**.",
          timestamp: 'Now'
        }
      ])
    } finally {
      setLoading(false)
    }
  }
  handleSendRef.current = handleSend

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Conversation reset! How else can I assist your admissions journey? Feel free to ask about colleges, cutoffs, or fees.`,
        timestamp: 'Just now'
      }
    ])
    setShowLeadCard(false)
    setLeadSubmitted(false)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.name || !leadForm.phone) return

    setLeadSubmitting(true)
    try {
      const res = await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          course: leadForm.course,
          message: 'Requested counseling callback from Chatbot assistant'
        })
      })

      if (res.ok) {
        setLeadSubmitted(true)
        setTimeout(() => {
          setShowLeadCard(false)
        }, 3500)
      }
    } catch (err) {
      console.error('Lead submission failed', err)
    } finally {
      setLeadSubmitting(false)
    }
  }

  return (
    <>
      {/* ── FLOATING LAUNCHER BUTTON (shown on all non-homepage pages, or on homepage when modal is open) ── */}
      {(!isHomepage || isOpen) && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
          {/* Subtle tooltip prompt bubble if not opened yet */}
          {!isOpen && !hasInteracted && (
            <div
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-900/10 cursor-pointer hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold text-slate-800">
                Need admission or cutoff help? <span className="text-sky-600">Ask EduBot</span>
              </p>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle AI Counselor Chat"
            className={`group flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 active:scale-95 ${
              isOpen
                ? 'bg-slate-900 text-white shadow-slate-900/30 rotate-0'
                : 'bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 text-white shadow-sky-600/40 hover:shadow-sky-600/60 hover:-translate-y-0.5'
            }`}
          >
            {isOpen ? (
              <>
                <X size={20} strokeWidth={2.5} />
                <span className="text-xs font-bold tracking-wide uppercase">Close</span>
              </>
            ) : (
              <>
                <div className="relative">
                  <Bot size={22} strokeWidth={2.2} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-sky-600 animate-pulse" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black tracking-wide leading-none uppercase">AI Counselor</p>
                  <p className="text-[10px] text-sky-200 font-semibold leading-none mt-1">24/7 Verified Data</p>
                </div>
              </>
            )}
          </button>
        </div>
      )}

      {/* ── CHAT WINDOW CONTAINER ───────────────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[95vw] sm:w-[440px] h-[82vh] max-h-[680px] bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-900/25 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/20">
                <Bot size={22} className="text-white" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm tracking-tight text-white">EduBot</h3>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold text-[9px] uppercase tracking-wider border border-sky-400/20">
                    Live Counselor
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Promote Education Knowledge Base</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart conversation"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <RotateCcw size={16} />
              </button>
              <a
                href="tel:+919900116101"
                title="Call Senior Counselor"
                className="p-2 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/80 transition-colors"
              >
                <PhoneCall size={16} />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex-shrink-0 flex items-center justify-center shadow-sm mt-0.5">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-headings:my-2 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-table:my-2 prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1 prose-a:text-sky-600 prose-a:font-bold hover:prose-a:underline">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => {
                            const isInternal = props.href?.startsWith('/')
                            if (isInternal) {
                              return (
                                <Link
                                  href={props.href || '#'}
                                  onClick={() => setIsOpen(false)}
                                  className="text-sky-600 font-bold underline inline-flex items-center gap-0.5 hover:text-sky-700"
                                >
                                  {props.children}
                                </Link>
                              )
                            }
                            return (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-600 font-bold underline inline-flex items-center gap-0.5 hover:text-sky-700"
                              >
                                {props.children} <ExternalLink size={10} />
                              </a>
                            )
                          }
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}

                  <span
                    className={`block text-[9px] mt-1.5 font-medium ${
                      msg.role === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex gap-3 justify-start animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex-shrink-0 flex items-center justify-center shadow-sm">
                  <Bot size={16} />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-sky-600" />
                  <span className="text-xs font-semibold text-slate-500">Searching cutoffs & colleges...</span>
                </div>
              </div>
            )}

            {/* Quick Starter Pills (shown only on first message) */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Suggested Inquiries</p>
                <div className="grid grid-cols-1 gap-2">
                  {STARTER_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt.text)}
                      className="text-left px-3.5 py-2.5 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl text-xs font-semibold text-slate-700 hover:text-sky-700 transition-all flex items-center gap-2.5 shadow-2xs group"
                    >
                      <span className="text-sm">{prompt.icon}</span>
                      <span className="flex-1">{prompt.text}</span>
                      <span className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action: Human Counselor Callback */}
            {showLeadCard && (
              <div className="bg-gradient-to-br from-indigo-50 to-sky-50 border border-sky-200 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                      <PhoneCall size={14} />
                    </div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">Speak with Senior Advisor</h4>
                  </div>
                  <button onClick={() => setShowLeadCard(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Leave your number for 1-on-1 counseling, state choice filling & NRI/management seat guidance.
                </p>

                {leadSubmitted ? (
                  <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} /> Callback requested! Our advisor will call shortly.
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      required
                      value={leadForm.name}
                      onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (10 digits)"
                      required
                      value={leadForm.phone}
                      onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full py-2 bg-slate-900 hover:bg-sky-600 text-white rounded-lg text-xs font-black uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      {leadSubmitting ? 'Requesting...' : 'Request Free Callback'}
                    </button>
                  </form>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Banner for Human Counselor trigger */}
          {!showLeadCard && messages.length > 2 && (
            <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Need 1-on-1 human guidance?</span>
              <button
                onClick={() => setShowLeadCard(true)}
                className="text-sky-600 font-bold hover:underline inline-flex items-center gap-1"
              >
                <PhoneCall size={11} /> Request Callback
              </button>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSend()
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about cutoffs, colleges, packages, fees..."
                className="flex-1 px-4 py-3 bg-slate-100 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="w-11 h-11 rounded-2xl bg-slate-900 hover:bg-sky-600 disabled:opacity-40 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md shadow-slate-900/10"
              >
                <Send size={16} />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between px-1">
              <span className="text-[10px] text-slate-400 font-medium">
                Answers powered by verified Promote Education datasets
              </span>
              <a href="tel:+919900116101" className="text-[10px] text-slate-400 hover:text-emerald-600 font-bold">
                Helpline: +91 99001 16101
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

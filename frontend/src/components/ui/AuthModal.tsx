'use client'

import { useState } from 'react'
import { X, Mail, Lock, User, Github, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        alert('Check your email for the confirmation link!')
      }
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAppleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-3 hover:text-ink transition-colors"
        >
          <X size={20} />
        </button>

        <div className="px-8 pt-10 pb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-ink tracking-tight mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-sm text-ink-3">
              {isLogin ? "Enter your details to access your account" : "Join 2M+ students finding their dream college"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink-2 ml-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4" size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 italic">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-midnight text-white text-sm font-medium rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (isLogin ? 'Sign in' : 'Sign up')}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-ink-4 uppercase tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-surface-2 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button 
              onClick={handleAppleLogin}
              className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-surface-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-ink-3">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-gold-dark font-medium hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

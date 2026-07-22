'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Profile {
  id: string
  role: string
  full_name: string | null
}

interface AuthContextType {
  user: any | null
  profile: Profile | null
  authLoading: boolean
  authError: string | null
  setUser: React.Dispatch<React.SetStateAction<any | null>>
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
  setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>
  setAuthError: React.Dispatch<React.SetStateAction<string | null>>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  const currentUserRef = useRef<any>(null)
  const isFetchingRef = useRef<boolean>(false)

  const fetchProfileAndSet = async (sessionUser: any) => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, role, full_name')
        .eq('id', sessionUser.id)
        .single()
      
      if (error) throw error
      
      setProfile(data)
      setUser(sessionUser)
      currentUserRef.current = sessionUser
      setAuthError(null)
    } catch (err: any) {
      console.error('Error fetching admin profile:', err)
      setAuthError('Failed to verify administrator profile.')
      // Reset auth state if profile fetch fails
      setUser(null)
      setProfile(null)
      currentUserRef.current = null
    } finally {
      setAuthLoading(false)
      isFetchingRef.current = false
    }
  }

  useEffect(() => {
    let active = true

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!active) return

        if (session?.user) {
          await fetchProfileAndSet(session.user)
        } else {
          setAuthLoading(false)
        }
      } catch (err) {
        console.error('Failed to get initial session:', err)
        if (active) setAuthLoading(false)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!active) return

      // We only care about sign-in / session initialization / sign-out events
      if (event !== 'INITIAL_SESSION' && event !== 'SIGNED_IN' && event !== 'SIGNED_OUT') {
        return
      }

      if (session?.user) {
        // Prevent duplicate authentication and reload if user is already the same
        if (currentUserRef.current?.id === session.user.id) {
          return
        }
        
        setAuthLoading(true)
        await fetchProfileAndSet(session.user)
      } else {
        setUser(null)
        setProfile(null)
        currentUserRef.current = null
        setAuthLoading(false)
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    currentUserRef.current = null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        authLoading,
        authError,
        setUser,
        setProfile,
        setAuthLoading,
        setAuthError,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

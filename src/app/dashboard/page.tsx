'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  LayoutDashboard, 
  BookMarked, 
  Calculator, 
  Target, 
  Brain, 
  FileText, 
  ChevronRight,
  TrendingUp,
  Settings,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/')
      } else {
        setUser(session.user)
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  if (loading) return null

  const tools = [
    { id: 'prob', name: 'Probability Calculator', icon: Calculator, color: 'var(--gold)', status: 'Beta' },
    { id: 'pred', name: 'College Predictor', icon: Target, color: '#4ADE80', status: 'Active' },
    { id: 'roi', name: 'ROI Calculator', icon: TrendingUp, color: '#60A5FA', status: 'Live' },
    { id: 'brain', name: 'Brainstorming Test', icon: Brain, color: '#A855F7', status: 'New' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-[240px,1fr] gap-8">
          
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="p-4 rounded-2xl bg-midnight text-white shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold/10 rounded-full -mr-8 -mt-8" />
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold mb-3">
                {user?.email?.[0].toUpperCase()}
              </div>
              <p className="text-sm font-medium truncate">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Premium Student</p>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'colleges', label: 'My Colleges', icon: BookMarked },
                { id: 'tools', label: 'My Tools', icon: Calculator },
                { id: 'reports', label: 'Tool Reports', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    activeTab === item.id 
                      ? "bg-midnight text-white shadow-lg shadow-midnight/10" 
                      : "text-ink-3 hover:bg-surface-2 hover:text-ink"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>

            <button 
              onClick={() => supabase.auth.signOut()}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-8"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="space-y-6">
            
            {activeTab === 'overview' && (
              <>
                <header className="mb-8">
                  <h1 className="text-3xl font-medium text-ink tracking-tight">Student Dashboard</h1>
                  <p className="text-ink-3">Track your applications and explore admission possibilities.</p>
                </header>

                <div className="grid md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl border border-border bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gold/10 text-gold-dark"><BookMarked size={20} /></div>
                      <span className="text-sm font-medium text-ink-2">Saved Colleges</span>
                    </div>
                    <div className="text-3xl font-medium text-ink mb-1">08</div>
                    <div className="text-xs text-ink-4">3 updated recently</div>
                  </div>
                  <div className="p-5 rounded-2xl border border-border bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-green-50 text-green-600"><Target size={20} /></div>
                      <span className="text-sm font-medium text-ink-2">Probable Fits</span>
                    </div>
                    <div className="text-3xl font-medium text-ink mb-1">12</div>
                    <div className="text-xs text-ink-4">Based on your marks</div>
                  </div>
                  <div className="p-5 rounded-2xl border border-border bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-50 text-purple-600"><Brain size={20} /></div>
                      <span className="text-sm font-medium text-ink-2">Brainstorming</span>
                    </div>
                    <div className="text-3xl font-medium text-ink mb-1">72%</div>
                    <div className="text-xs text-ink-4">Progress to career match</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="p-6 rounded-2xl bg-midnight text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Calculator size={120} />
                    </div>
                    <h3 className="text-xl font-medium mb-2 pr-12">Run Admission Predictor</h3>
                    <p className="text-sm text-white/60 mb-6 max-w-[240px]">See which premium colleges match your current rank and entrance marks.</p>
                    <button className="px-6 py-2 bg-gold text-midnight text-sm font-bold rounded-pill hover:brightness-110 transition-all">
                      Check Now
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-medium text-ink">Recent Tool Reports</h3>
                      <button className="text-xs text-action hover:underline">View all</button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-2 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-white rounded-lg shadow-sm"><TrendingUp size={14} className="text-blue-500" /></div>
                          <div>
                            <p className="text-xs font-medium text-ink">ROI Analysis Report</p>
                            <p className="text-[10px] text-ink-3">Generated Apr 18, 2026</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-ink-4" />
                      </div>
                      <div className="flex items-center justify-center py-6 border border-dashed border-border rounded-xl">
                        <p className="text-xs text-ink-4 italic">No other reports found yet.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium text-ink mb-4">Quick Access Tools</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {tools.map((tool) => (
                      <button 
                        key={tool.id}
                        className="group flex flex-col items-center p-4 rounded-2xl bg-white border border-border shadow-sm hover:border-gold hover:shadow-lg transition-all"
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                          style={{ background: 'var(--surface-2)', color: tool.color }}
                        >
                          <tool.icon size={24} />
                        </div>
                        <span className="text-xs font-medium text-ink text-center mb-1">{tool.name}</span>
                        <span className="text-[10px] text-ink-4 bg-surface-2 px-2 py-0.5 rounded-full">{tool.status}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab !== 'overview' && (
              <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-border border-dashed">
                <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mb-4">
                  <LayoutDashboard size={32} className="text-ink-4" />
                </div>
                <h3 className="text-lg font-medium text-ink">Section coming soon</h3>
                <p className="text-sm text-ink-3 max-w-[280px] text-center mt-2">
                  We're currently building out this feature to provide you with the most accurate data.
                </p>
              </div>
            )}

          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}

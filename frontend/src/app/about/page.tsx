'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
    ArrowRight, Award, Target, Users, BookOpen, ChevronLeft, ChevronRight,
    Shield, TrendingUp, Globe, MessageSquare, Quote, ExternalLink,
    Rocket, Heart, Lightbulb, Stethoscope, GraduationCap, CheckCircle,
    Briefcase, Code, Palette, Search, Clock, FileCheck, ClipboardList,
    CheckCircle2, Star, Zap, Gamepad2, Compass, Trophy,
    Dice1, Dice2, Dice3, Dice4, Dice5, Dice6
} from 'lucide-react'
import CollegeCard from '@/components/ui/CollegeCard'
import { College } from '@/types'
import { featuredColleges } from '@/components/sections/CollegesSection'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

function stripMarkdown(text: string): string {
  if (!text) return ''
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/^#+\s+/gm, '')
    .replace(/([*_~`]{1,3})(\s*(?:(?!\1).)+?\s*)\1/g, '$2')
    .replace(/[*_~`]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*_]{3,}\s*$/gm, '')
    .replace(/^\s*>\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}
import { useRouter } from 'next/navigation'
import { useLeadCapture } from '@/hooks/useLeadCapture'
import LeadModal from '@/components/ui/LeadModal'
import ReviewModal from '@/components/ui/ReviewModal'

// ─── Data ────────────────────────────────────────────────────────────────────

const educationQuotes = [
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
    { text: "Investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { text: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "Knowledge is power. Information is liberating. Education is the premise of progress.", author: "Kofi Annan" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
    { text: "The goal of education is the advancement of knowledge and the dissemination of truth.", author: "John F. Kennedy" },
    { text: "Develop a passion for learning. If you do, you will never cease to grow.", author: "Anthony J. D'Angelo" },
    { text: "Education is the movement from darkness to light.", author: "Allan Bloom" },
    { text: "An investment in knowledge always pays the best interest.", author: "Benjamin Franklin" },
    { text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.", author: "Abigail Adams" },
    { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
    { text: "The purpose of education is to replace an empty mind with an open one.", author: "Malcolm Forbes" },
    { text: "Education is simply the soul of a society as it passes from one generation to another.", author: "G.K. Chesterton" },
    { text: "Change is the end result of all true learning.", author: "Leo Buscaglia" },
    { text: "Intelligence plus character - that is the goal of true education.", author: "Martin Luther King Jr." },
    { text: "The function of education is to teach one to think intensively and to think critically.", author: "Martin Luther King Jr." },
    { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
    { text: "He who opens a school door, closes a prison.", author: "Victor Hugo" },
    { text: "Education is not the filling of a pail, but the lighting of a fire.", author: "William Butler Yeats" },
    { text: "The direction in which education starts a man will determine his future in life.", author: "Plato" },
    { text: "I have never let my schooling interfere with my education.", author: "Mark Twain" },
    { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
    { text: "The whole purpose of education is to turn mirrors into windows.", author: "Sydney J. Harris" },
    { text: "Teachers open the door, but you must enter by yourself.", author: "Chinese Proverb" },
    { text: "Education is the key to unlock the golden door of freedom.", author: "George Washington Carver" },
    { text: "Learning is a treasure that will follow its owner everywhere.", author: "Chinese Proverb" },
    { text: "Upon the subject of education, I can only say that I view it as the most important subject which we as a people may be engaged in.", author: "Abraham Lincoln" },
    { text: "Education's purpose is to replace an empty mind with an open one.", author: "Malcolm Forbes" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "Education is our passport to the future, for tomorrow belongs to the people who prepare for it today.", author: "Malcolm X" },
    { text: "The foundation of every state is the education of its youth.", author: "Diogenes" },
    { text: "Instruction ends in the schoolroom, but education ends only with life.", author: "Frederick W. Robertson" },
    { text: "What sculpture is to a block of marble, education is to the human soul.", author: "Joseph Addison" },
    { text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein" },
    { text: "To educate a man in mind and not in morals is to educate a menace to society.", author: "Theodore Roosevelt" },
    { text: "The highest result of education is tolerance.", author: "Helen Keller" },
    { text: "Real learning comes about when the competitive spirit has ceased.", author: "Jiddu Krishnamurti" },
    { text: "Formal education will make you a living; self-education will make you a fortune.", author: "Jim Rohn" },
    { text: "Education is a better safeguard of liberty than a standing army.", author: "Edward Everett" },
    { text: "All of life is a constant education.", author: "Eleanor Roosevelt" },
    { text: "The aim of education is the knowledge, not of facts, but of values.", author: "William S. Burroughs" },
    { text: "The task of the modern educator is not to cut down jungles, but to irrigate deserts.", author: "C.S. Lewis" },
    { text: "Don't limit a child to your own learning, for he was born in another time.", author: "Rabindranath Tagore" },
    { text: "Every student can learn, just not on the same day, or the same way.", author: "George Evans" },
    { text: "Education is the ability to listen to almost anything without losing your temper or your self-confidence.", author: "Robert Frost" },
    { text: "Great teachers empathize with kids, respect them, and believe that each one has something special that can be built upon.", author: "Ann Lieberman" },
    { text: "If you think education is expensive, try ignorance.", author: "Derek Bok" }
]

const leadership = [
    { name: 'Ritesh Rastogi', role: 'MD & Founder', image: '/images/Leadership/RiteshRastogi.jpeg' },
    { name: 'Aman Rastogi', role: 'Managing Director', image: '/images/Leadership/AmanRastogi.jpeg' },
    { name: 'Somnath Ghosh', role: 'Head of Operations', image: '/images/Leadership/SomnathGhosh.jpeg' },
    { name: 'Ritu Choudhury', role: 'Media Head', image: '/images/Leadership/RituChoudhury.jpeg' },
]

const gameOptions = [
    { id: 'medical', label: 'Medicine', result: 'Aim for top AIIMS or state-govt colleges with our NEET strategy.', icon: Stethoscope },
    { id: 'tech', label: 'Technology', result: 'IITs or Tier-1 private unis await. Focus on JEE & CS fundamentals.', icon: Code },
    { id: 'business', label: 'Business', result: 'IIMs and top B-Schools require profile building + CAT excellence.', icon: Briefcase },
    { id: 'design', label: 'Creative', result: 'NID or NIFT could be your destination. Build a stellar portfolio.', icon: Palette },
]

// ─── Board Config ─────────────────────────────────────────────────────────────

const SNAKES: Record<number, number> = {
    17: 4,
    54: 34,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    99: 78,
}

const LADDERS: Record<number, number> = {
    3: 22,
    8: 30,
    28: 84,
    32: 44,
    48: 67,
    71: 91,
    80: 99,
}

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]

function getCenter(square: number): { cx: number; cy: number } {
    const idx = square - 1
    const row = Math.floor(idx / 10)
    const col = idx % 10
    const visualCol = row % 2 === 0 ? col : 9 - col
    const cx = visualCol * 10 + 5
    const cy = 95 - row * 10
    return { cx, cy }
}

// ─── Sub-component: SnakeLadderGame ──────────────────────────────────────────

const SnakeLadderGame: React.FC = () => {
    const [position, setPosition] = useState(0)
    const [isRolling, setIsRolling] = useState(false)
    const [diceValue, setDiceValue] = useState(1)
    const [gameStatus, setGameStatus] = useState<'ready' | 'playing' | 'won'>('ready')
    const [message, setMessage] = useState('Roll the dice to begin your journey!')
    const [highlight, setHighlight] = useState<number | null>(null)

    const rollDice = useCallback(() => {
        if (isRolling || gameStatus === 'won') return

        setIsRolling(true)
        setHighlight(null)

        let ticks = 0
        const interval = setInterval(() => {
            setDiceValue(Math.floor(Math.random() * 6) + 1)
            ticks++
            if (ticks >= 8) clearInterval(interval)
        }, 60)

        const roll = Math.floor(Math.random() * 6) + 1

        setTimeout(() => {
            setDiceValue(roll)
            setIsRolling(false)

            const newRaw = position + roll

            if (newRaw > 100) {
                setMessage(`Need exactly ${100 - position} to finish. Try again!`)
                return
            }

            if (newRaw === 100) {
                setPosition(100)
                setGameStatus('won')
                setMessage('🎉 You reached 100! Congratulations!')
                return
            }

            if (LADDERS[newRaw]) {
                const dest = LADDERS[newRaw]
                setPosition(dest)
                setHighlight(dest)
                setMessage(`🪜 Ladder! Climbed from ${newRaw} → ${dest}`)
            } else if (SNAKES[newRaw]) {
                const dest = SNAKES[newRaw]
                setPosition(dest)
                setHighlight(dest)
                setMessage(`🐍 Snake! Slid from ${newRaw} → ${dest}`)
            } else {
                setPosition(newRaw)
                setMessage(`Moved to square ${newRaw}. Roll again!`)
            }

            setGameStatus('playing')
        }, 550)
    }, [isRolling, gameStatus, position])

    const resetGame = () => {
        setPosition(0)
        setGameStatus('ready')
        setMessage('Roll the dice to begin your journey!')
        setDiceValue(1)
        setHighlight(null)
    }

    const DiceIcon = DICE_ICONS[diceValue - 1]
    const playerPos = position > 0 ? getCenter(position) : null

    return (
        <div className="w-full max-w-4xl bg-white border border-slate-100 rounded-[40px] p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-200/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-100/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-12 relative z-10">
                {/* Board grid (Left) */}
                <div className="w-full max-w-[420px] aspect-square select-none shrink-0 bg-slate-50 border border-slate-150/70 p-2.5 rounded-3xl shadow-inner">
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 grid grid-cols-10 gap-1 p-0">
                            {Array.from({ length: 100 }).map((_, i) => {
                                const row = Math.floor(i / 10)
                                const col = i % 10
                                const boardRow = 9 - row
                                const displayNum = boardRow % 2 === 0
                                    ? boardRow * 10 + col + 1
                                    : boardRow * 10 + (9 - col) + 1

                                const isSnakeHead = SNAKES[displayNum] !== undefined
                                const isLadderBase = LADDERS[displayNum] !== undefined
                                const isPlayer = position === displayNum

                                return (
                                    <div
                                        key={displayNum}
                                        className={cn(
                                            'flex items-center justify-center text-[9px] font-black rounded-lg relative transition-all duration-300 shadow-sm aspect-square',
                                            isPlayer
                                                ? 'bg-sky-500 text-white z-30 ring-4 ring-sky-200 scale-110 shadow-lg'
                                                : isSnakeHead
                                                    ? 'bg-rose-50 text-rose-500 border border-rose-100/50'
                                                    : isLadderBase
                                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50'
                                                        : 'bg-white text-slate-450 border border-slate-100/70 hover:border-slate-200',
                                            highlight === displayNum && !isPlayer ? 'ring-2 ring-amber-400 bg-amber-50 text-amber-600' : ''
                                        )}
                                    >
                                        {isPlayer ? (
                                            <span className="relative z-10 text-white font-extrabold">{displayNum}</span>
                                        ) : (
                                            displayNum
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* SVG Snakes & Ladders */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <marker id="arrowGreen" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                                    <path d="M0,0 L4,2 L0,4 Z" fill="#10b981" />
                                </marker>
                            </defs>

                            {/* Ladders */}
                            {Object.entries(LADDERS).map(([startStr, end]) => {
                                const start = parseInt(startStr)
                                const s = getCenter(start)
                                const e = getCenter(end)
                                const dx = e.cx - s.cx
                                const dy = e.cy - s.cy
                                const len = Math.sqrt(dx * dx + dy * dy) || 1
                                const px = (-dy / len) * 1.8
                                const py = (dx / len) * 1.8
                                const numRungs = 5
                                return (
                                    <g key={`ladder-${start}`} opacity="0.8">
                                        <line x1={s.cx - px} y1={s.cy - py} x2={e.cx - px} y2={e.cy - py} stroke="#10b981" strokeWidth="1" strokeLinecap="round" />
                                        <line x1={s.cx + px} y1={s.cy + py} x2={e.cx + px} y2={e.cy + py} stroke="#10b981" strokeWidth="1" strokeLinecap="round" />
                                        {Array.from({ length: numRungs }).map((_, ri) => {
                                            const t = (ri + 1) / (numRungs + 1)
                                            const rx = s.cx + dx * t
                                            const ry = s.cy + dy * t
                                            return (
                                                <line
                                                    key={ri}
                                                    x1={rx - px} y1={ry - py}
                                                    x2={rx + px} y2={ry + py}
                                                    stroke="#10b981" strokeWidth="0.8" strokeLinecap="round"
                                                />
                                            )
                                        })}
                                    </g>
                                )
                            })}

                            {/* Snakes */}
                            {Object.entries(SNAKES).map(([headStr, tail]) => {
                                const head = parseInt(headStr)
                                const h = getCenter(head)
                                const t = getCenter(tail)
                                const midX = (h.cx + t.cx) / 2
                                const midY = (h.cy + t.cy) / 2
                                const perpOffset = (h.cx > t.cx ? 1 : -1) * 12
                                const cpX = midX + perpOffset
                                const cpY = midY
                                const angle = Number((Math.atan2(cpY - h.cy, cpX - h.cx) * (180 / Math.PI)).toFixed(2))

                                return (
                                    <g key={`snake-${head}`} opacity="0.9">
                                        <path
                                            d={`M ${h.cx} ${h.cy} Q ${cpX} ${cpY} ${t.cx} ${t.cy}`}
                                            stroke="rgba(244,63,94,0.15)" strokeWidth="5.5" fill="none" strokeLinecap="round"
                                        />
                                        <path
                                            d={`M ${h.cx} ${h.cy} Q ${cpX} ${cpY} ${t.cx} ${t.cy}`}
                                            stroke="#f43f5e" strokeWidth="3.2" fill="none" strokeLinecap="round"
                                        />
                                        <path
                                            d={`M ${h.cx} ${h.cy} Q ${cpX} ${cpY} ${t.cx} ${t.cy}`}
                                            stroke="#fecdd3" strokeWidth="1" fill="none" strokeLinecap="round"
                                            strokeDasharray="2 3"
                                        />
                                        <g transform={`translate(${h.cx}, ${h.cy}) rotate(${(angle + 90).toFixed(2)})`}>
                                            <path d="M 0 0 L -0.8 -4 M 0 0 L 0.8 -4" stroke="#f43f5e" strokeWidth="0.5" fill="none" />
                                            <path d="M 0 -2.5 L 2.5 0 L 0 3.5 L -2.5 0 Z" fill="#e11d48" />
                                            <circle cx="-0.8" cy="-0.5" r="0.5" fill="white" />
                                            <circle cx="0.8" cy="-0.5" r="0.5" fill="white" />
                                        </g>
                                        <g transform={`translate(${t.cx}, ${t.cy}) rotate(${(Math.atan2(t.cy - cpY, t.cx - cpX) * (180 / Math.PI)).toFixed(2)})`}>
                                            <path d="M 0 0 L -2.5 -1.5 L -2.5 1.5 Z" fill="#be123c" />
                                        </g>
                                    </g>
                                )
                            })}

                            {playerPos && position !== 0 && (
                                <g>
                                    <circle cx={playerPos.cx} cy={playerPos.cy} r="4" fill="#0ea5e9" opacity="0.25" />
                                    <circle cx={playerPos.cx} cy={playerPos.cy} r="2.5" fill="#0ea5e9" stroke="white" strokeWidth="0.8" />
                                    <circle cx={playerPos.cx} cy={playerPos.cy} r="1" fill="white" />
                                </g>
                            )}
                        </svg>
                    </div>
                </div>

                {/* Control Panel (Right) */}
                <div className="flex-1 flex flex-col justify-center gap-6 md:border-l md:border-slate-100 md:pl-10">
                    <div className="text-left">
                        <p className={cn(
                            'text-[9px] font-black uppercase tracking-[0.25em] mb-2.5',
                            gameStatus === 'won' ? 'text-emerald-600' : 'text-slate-400'
                        )}>
                            {gameStatus === 'won' ? 'Victory Achieved!' : `Player Progress: Square ${position}`}
                        </p>
                        <h3 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                            {message}
                        </h3>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
                        <button
                            onClick={rollDice}
                            disabled={isRolling || gameStatus === 'won'}
                            className={cn(
                                'w-24 h-24 md:w-28 md:h-28 rounded-[36px] flex flex-col items-center justify-center gap-1.5 transition-all shadow-xl',
                                isRolling
                                    ? 'bg-slate-100 scale-95 cursor-wait'
                                    : gameStatus === 'won'
                                        ? 'bg-emerald-100 opacity-40 cursor-not-allowed text-emerald-800'
                                        : 'bg-gradient-to-br from-sky-400 to-indigo-600 hover:from-sky-500 hover:to-indigo-700 active:scale-95 text-white cursor-pointer hover:shadow-sky-200 hover:shadow-lg'
                            )}
                            aria-label="Roll dice"
                        >
                            <DiceIcon
                                className={cn(
                                    'w-10 h-10 md:w-12 md:h-12',
                                    isRolling ? 'text-slate-400 animate-spin' : 'text-white'
                                )}
                            />
                            {!isRolling && (
                                <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Roll Dice</span>
                            )}
                        </button>

                        {gameStatus !== 'ready' && (
                            <button
                                onClick={resetGame}
                                className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-850 transition-all hover:scale-105 active:scale-95 shadow-md shadow-slate-900/10"
                            >
                                Restart Game
                            </button>
                        )}
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span className="flex items-center gap-2.5 bg-emerald-50/50 py-2 px-3.5 rounded-xl border border-emerald-100/50">
                            <span className="inline-block w-4 h-1.5 bg-emerald-500 rounded" />
                            <span className="text-emerald-700">Ladders climb</span>
                        </span>
                        <span className="flex items-center gap-2.5 bg-rose-50/50 py-2 px-3.5 rounded-xl border border-rose-100/50">
                            <span className="inline-block w-4 h-1.5 bg-rose-400 rounded" />
                            <span className="text-rose-700">Snakes slide</span>
                        </span>
                    </div>

                    {/* Reward Panel */}
                    {gameStatus === 'won' && (
                        <div className="p-6 bg-emerald-600 rounded-[30px] border border-emerald-500 text-white animate-in zoom-in duration-500 shadow-xl shadow-emerald-500/20">
                            <div className="flex items-center gap-3.5 mb-4">
                                <div className="p-2.5 bg-white/20 rounded-xl">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-100 mb-0.5">Reward Unlocked</p>
                                    <p className="text-base font-bold">Premium Admission Pack!</p>
                                </div>
                            </div>

                            <ul className="space-y-2 mb-6">
                                {[
                                    "1-on-1 Dedicated Senior Counselor",
                                    "Direct Fast-Track College Appointments",
                                    "Priority Documentation & SOP Support",
                                    "Guaranteed Scholarship Eligibility Check"
                                ].map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[11px] font-medium text-emerald-50">
                                        <CheckCircle2 size={12} className="text-white shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 text-center">
                                <p className="text-[8px] font-black uppercase tracking-widest text-emerald-100 mb-0.5">Use Promo Code:</p>
                                <p className="text-xl font-black tracking-widest">PREMIUMFREE</p>
                                <p className="text-[8px] font-medium text-emerald-150 mt-1.5 italic">Mention this code during your consultation!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── Main Component: AboutPage ───────────────────────────────────────────────

export default function AboutPage() {
    const router = useRouter()
    const { isAuthorized } = useLeadCapture()
    
    const [dailyQuote, setDailyQuote] = useState(educationQuotes[0])
    const [gameResult, setGameResult] = useState<string | null>(null)
    const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
    const [reviewCollege, setReviewCollege] = useState<College | null>(null)

    const handleOpenLead = async (college: College) => {
        if (isAuthorized) {
            router.push(`/colleges/${college.id}`)
        } else {
            setSelectedCollege(college)
        }
    }

    useEffect(() => {
        const day = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
        setDailyQuote(educationQuotes[day % educationQuotes.length])
    }, [])

    const [topCollegesPage, setTopCollegesPage] = useState(0)
    const itemsPerMiniPage = 2
    const totalMiniPages = Math.ceil(featuredColleges.length / itemsPerMiniPage)

    useEffect(() => {
        const interval = setInterval(() => {
            setTopCollegesPage((prev) => (prev + 1) % totalMiniPages)
        }, 6000)
        return () => clearInterval(interval)
    }, [totalMiniPages])

    const [aboutNews, setAboutNews] = useState<any[]>([])
    const [newsPage, setNewsPage] = useState(0)
    const itemsPerNewsPage = 3
    const totalNewsPages = Math.max(1, Math.ceil(aboutNews.length / itemsPerNewsPage))

    useEffect(() => {
        const interval = setInterval(() => {
            if (totalNewsPages > 1) {
                setNewsPage((prev) => (prev + 1) % totalNewsPages)
            }
        }, 8000)
        return () => clearInterval(interval)
    }, [totalNewsPages])

    useEffect(() => {
        async function fetchAboutNews() {
            const { data, error } = await supabase
                .from('news_articles')
                .select('*')
                .order('date', { ascending: false })
                .order('created_at', { ascending: false })
            if (error) {
                console.error('Error fetching news on about page:', error)
            } else if (data) {
                const mapped = data.map((item: any) => {
                    const cleanedContent = stripMarkdown(item.content || '')
                    return {
                        isLive: item.is_live,
                        title: item.heading,
                        excerpt: cleanedContent ? (cleanedContent.length > 100 ? cleanedContent.slice(0, 97) + '...' : cleanedContent) : '',
                        author: item.editor,
                        date: new Date(item.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        }),
                        image: item.image_link || 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=400',
                        slug: item.slug
                    }
                })
                setAboutNews(mapped)
            }
        }
        fetchAboutNews()
    }, [])

    return (
        <main className="min-h-screen bg-slate-50/50 selection:bg-sky-500 selection:text-white font-sans">
            <Navbar />

            {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Left Column: Mission Content & Career Compass */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase">
                                    About Promote Education
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-[62px] font-black text-slate-900 leading-[1.08] tracking-tighter mb-8">
                                Guidance that <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600">
                                    Defines Your Destiny.
                                </span>
                            </h1>

                            <div className="space-y-6 max-w-2xl leading-relaxed text-slate-500 text-sm md:text-base font-medium mb-12">
                                <p className="text-slate-700 text-base md:text-lg">
                                    Promote Education stands as India's premier admissions authority, bridging the gap between student aspirations and institutional excellence. For over 15 years, we have meticulously analyzed the academic landscape to provide data-driven, empathetic counselling to over 50,000 students.
                                </p>
                                <p>
                                    Our mission is simple: To democratize high-end career guidance. We leverage proprietary institutional data, placement metrics, and real-world outcomes to ensure that your choice of college is a strategic step toward a lifelong career, not just a four-year degree.
                                </p>
                            </div>

                            {/* Career Compass Widget */}
                            <div className="bg-white border border-slate-100 rounded-[30px] p-8 shadow-xl shadow-slate-100/50 relative overflow-hidden group mb-10">
                                <div className="absolute top-0 right-0 p-4 text-sky-500/5 pointer-events-none">
                                    <Compass size={110} className="group-hover:rotate-45 transition-transform duration-1000" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2.5 mb-4">
                                        <Gamepad2 size={20} className="text-sky-500" />
                                        <h3 className="text-base font-extrabold text-slate-900">The Career Compass</h3>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-6 max-w-md">What's your primary field of interest? Pick one to see your ideal path recommendation.</p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                        {gameOptions.map((opt) => {
                                            const Icon = opt.icon
                                            const isActive = gameResult === opt.result
                                            return (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setGameResult(opt.result)}
                                                    className={cn(
                                                        "p-4 rounded-xl border flex flex-col items-center gap-2.5 transition-all text-center",
                                                        isActive
                                                            ? "bg-slate-900 border-slate-900 text-white shadow-md scale-95"
                                                            : "bg-slate-50 border-slate-100 text-slate-650 hover:bg-white hover:border-slate-300"
                                                    )}
                                                >
                                                    <Icon size={16} />
                                                    <span className="text-[9px] font-black uppercase tracking-wider">{opt.label}</span>
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {gameResult && (
                                        <div className="p-5 bg-sky-50/50 border border-sky-100 rounded-2xl animate-in fade-in slide-in-from-top-3">
                                            <p className="text-[9px] font-black text-sky-600 uppercase tracking-widest mb-1.5">Your Strategy</p>
                                            <p className="text-slate-800 font-bold leading-relaxed text-xs md:text-sm">{gameResult}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Daily Quote Box */}
                            <div className="max-w-xl bg-white border border-slate-100 p-6 rounded-2xl shadow-md relative overflow-hidden group mb-10">
                                <Quote className="absolute -top-3 -right-3 w-16 h-16 text-slate-50 group-hover:text-sky-50 transition-colors" />
                                <p className="text-slate-800 text-sm md:text-base leading-relaxed italic relative z-10">"{dailyQuote.text}"</p>
                                <p className="text-sky-650 text-[10px] font-black mt-3 uppercase tracking-wider relative z-10">— {dailyQuote.author}</p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl hover:-translate-y-0.5 active:scale-95 transition-all shadow-md text-xs uppercase tracking-widest">
                                    Book Free Consultation
                                </button>
                                <Link href="/courses" className="px-8 py-4 bg-white border border-slate-150 text-slate-850 font-bold rounded-xl hover:bg-slate-50 transition-all text-xs uppercase tracking-widest text-center shadow-sm">
                                    Explore Programs
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Sliding News & Sliding Colleges */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* News Carousel Widget */}
                            <div className="bg-white border border-slate-100 rounded-[30px] p-6 md:p-8 shadow-xl shadow-slate-150/10">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-slate-900 font-extrabold text-lg">Latest News & Articles</h3>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setNewsPage((prev) => (prev - 1 + totalNewsPages) % totalNewsPages)}
                                            className="w-7 h-7 rounded-full border border-slate-150 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-100 transition-all"
                                        >
                                            <ChevronLeft size={14} />
                                        </button>
                                        <button 
                                            onClick={() => setNewsPage((prev) => (prev + 1) % totalNewsPages)}
                                            className="w-7 h-7 rounded-full border border-slate-150 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-100 transition-all"
                                        >
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6 min-h-[360px]">
                                    {aboutNews.length > 0 ? (
                                        aboutNews.slice(newsPage * itemsPerNewsPage, (newsPage + 1) * itemsPerNewsPage).map((it, i) => (
                                            <Link href={it.slug ? `/news/${it.slug}` : '#'} key={i} className="flex gap-4 group cursor-pointer border-b border-slate-50 pb-5 last:border-0 last:pb-0 animate-in fade-in duration-500 block">
                                                <div className="flex-1">
                                                    <div className="flex items-start gap-1.5 mb-1.5">
                                                        {it.isLive && (
                                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-rose-500 text-white text-[7px] font-black uppercase rounded-full animate-pulse shrink-0">
                                                                LIVE
                                                            </span>
                                                        )}
                                                        <h4 className="text-slate-900 text-xs md:text-sm font-bold leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
                                                            {it.title}
                                                        </h4>
                                                    </div>
                                                    <p className="text-slate-450 text-[11px] leading-relaxed line-clamp-2 mb-2">{it.excerpt}</p>
                                                    <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold">
                                                        <span>{it.author}</span>
                                                        <span>•</span>
                                                        <span>{it.date}</span>
                                                    </div>
                                                </div>
                                                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 self-start group-hover:scale-103 transition-transform">
                                                    <img src={it.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        [...Array(3)].map((_, i) => (
                                            <div key={i} className="h-[100px] rounded-xl bg-slate-100 animate-pulse border border-slate-150" />
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Top Institutions Slider Widget */}
                            <div className="bg-sky-600 rounded-[30px] p-6 md:p-8 relative overflow-hidden group shadow-xl shadow-sky-600/10">
                                <Globe size={90} className="absolute -bottom-8 -right-8 text-white/10 group-hover:rotate-12 transition-transform duration-1000" />
                                
                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <h3 className="text-white font-extrabold text-lg">Top Institutions</h3>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setTopCollegesPage((prev) => (prev - 1 + totalMiniPages) % totalMiniPages)}
                                            className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                                        >
                                            <ChevronLeft size={14} />
                                        </button>
                                        <button 
                                            onClick={() => setTopCollegesPage((prev) => (prev + 1) % totalMiniPages)}
                                            className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                                        >
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 min-h-[170px]">
                                    {featuredColleges.slice(topCollegesPage * itemsPerMiniPage, (topCollegesPage + 1) * itemsPerMiniPage).map((college) => (
                                        <div key={college.id} className="animate-in fade-in duration-550">
                                            <CollegeCard 
                                                college={college} 
                                                onOpenLead={handleOpenLead}
                                                onOpenReview={(c) => setReviewCollege(c)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── THE MANIFESTO: WHY CHOOSE US & CORE VALUES ───────────────────────── */}
            <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-center mb-20">
                        {/* Text description */}
                        <div className="lg:col-span-7">
                            <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase mb-2 block">
                                About Promote Education
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-6">
                                Why Choose Promote Education?
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-8">
                                At Promote Education, we believe education is the foundation of success—and the right guidance changes everything. As a trusted admission consultancy in India, we help students secure seats in <span className="text-sky-900 font-bold border-b-2 border-sky-500/20">Medical, Engineering, Management</span>, and other professional programs across India and abroad.
                            </p>
                            <div className="flex items-center gap-12">
                                <div className="group">
                                    <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter group-hover:text-sky-600 transition-colors">50K+</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Counseled</p>
                                </div>
                                <div className="group">
                                    <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter group-hover:text-sky-600 transition-colors">15+</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Years Exp</p>
                                </div>
                            </div>
                        </div>

                        {/* Image decoration */}
                        <div className="lg:col-span-5 relative">
                            <div className="aspect-[16/10] rounded-[36px] overflow-hidden shadow-xl relative border border-slate-100">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                                <Quote size={24} className="text-sky-500 mb-3" />
                                <p className="text-slate-655 font-medium italic leading-relaxed text-xs">"We don't just find you a college; we find you the right foundation for your entire career."</p>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision Cards */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-10 relative group hover:bg-white hover:shadow-lg transition-all duration-500">
                            <div className="w-12 h-12 bg-sky-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                                <Target size={22} />
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-4">Our Mission</h3>
                            <p className="text-slate-550 leading-relaxed font-medium text-sm">
                                To democratize high-end career guidance by providing every student with data-backed, empathetic, and transparent admission support. We aim to ensure that financial or geographical barriers never prevent a deserving student from reaching their dream institution.
                            </p>
                        </div>
                        <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-10 relative group hover:bg-white hover:shadow-lg transition-all duration-500">
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6 shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform">
                                <TrendingUp size={22} />
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 mb-4">Our Vision</h3>
                            <p className="text-slate-550 leading-relaxed font-medium text-sm">
                                To become India's most trusted and technologically advanced educational gateway, where every academic journey is optimized for success through a perfect blend of human expertise and institutional intelligence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── THE DIFFERENTIATORS (Why choose us detail list) ──────────────────── */}
            <section className="py-24 bg-slate-50/30 border-b border-slate-100 relative overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.25em] mb-2 block">
                            The Differentiators
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            What Sets Us Apart
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 max-w-6xl mx-auto">
                        {[
                            {
                                title: 'Student-First Counselling',
                                desc: 'Unbiased, research-backed guidance aligned to your goals. We don\'t just look at grades; we look at aspirations, budget, and long-term career viability.',
                                icon: Heart
                            },
                            {
                                title: 'Course & College Fit',
                                desc: 'Data-driven college shortlisting and course selection (India & abroad). We utilize a massive internal database of placement statistics and faculty quality scores.',
                                icon: Target
                            },
                            {
                                title: 'End-to-End Admission Support',
                                desc: 'SOP/LOR guidance, accurate form filling, deadline tracking, mock interviews. We manage the paperwork so you can focus on your entrance exams.',
                                icon: CheckCircle
                            },
                            {
                                title: 'Scholarship & Loan Help',
                                desc: 'Pointers on scholarships and education loans (where eligible). Our financial advisors help navigate the complex world of student lending and grants.',
                                icon: GraduationCap
                            },
                            {
                                title: 'Network & Experience',
                                desc: 'Strong relationships with reputed institutions; transparent processes. Over 15 years, we\'ve built a network that provides students with inside insights into campus life.',
                                icon: Globe
                            },
                            {
                                title: 'Ethical & Compliant',
                                desc: 'We do not sell or guarantee seats—admissions are per official rules and merit. We maintain strict compliance with all institutional and government guidelines.',
                                icon: Shield
                            },
                        ].map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div key={i} className="flex gap-6 group items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-sky-500 group-hover:bg-slate-900 group-hover:text-white transition-all shrink-0 shadow-sm">
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── THE BLUEPRINT: HOW WE WORK (Step checklist) ────────────────────────── */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.25em] mb-2 block">
                            The Blueprint
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            Simple & Structured Workflows
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                        {[
                            { step: '01', title: 'Profile & Goals', desc: 'Evaluate academics, interests, budget, timelines.' },
                            { step: '02', title: 'Shortlist & Plan', desc: 'Create a Dream/Target/Safe list + application calendar.' },
                            { step: '03', title: 'Docs & Forms', desc: 'SOP/LOR/resume polish, error-free applications.' },
                            { step: '04', title: 'Interview & Results', desc: 'Mock interviews, status tracking, next steps.' },
                            { step: '05', title: 'Financials & Joining', desc: 'Scholarship/loan guidance, joining formalities.' },
                        ].map((s, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center mb-6 shadow-sm group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-300">
                                    <span className="text-base font-extrabold text-slate-800 group-hover:text-white">{s.step}</span>
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                                    {s.title}
                                </h4>
                                <p className="text-slate-450 text-[11px] leading-relaxed font-medium">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CORE VALUES SECTION ────────────────────────────────────────────────── */}
            <section className="py-24 bg-slate-50/50 border-b border-slate-100">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase mb-2 block">
                            Our DNA
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            Our Core Values
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            { title: 'Trust', desc: 'Building lasting relationships through transparency and integrity.', icon: Shield },
                            { title: 'Excellence', desc: 'Committed to delivering the highest quality guidance and support.', icon: Award },
                            { title: 'Empathy', desc: 'Understanding and addressing each student\'s unique needs.', icon: Heart },
                            { title: 'Innovation', desc: 'Embracing new technologies to enhance the admission process.', icon: Lightbulb },
                        ].map((v, i) => {
                            const Icon = v.icon
                            return (
                                <div key={i} className="text-center group p-8 bg-white rounded-3xl shadow-sm border border-slate-100/85 hover:shadow-md transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl bg-sky-50 mx-auto flex items-center justify-center text-sky-500 mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-sm font-extrabold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                                        {v.title}
                                    </h3>
                                    <p className="text-slate-450 text-xs leading-relaxed font-semibold">
                                        {v.desc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── LEADERSHIP SECTION ─────────────────────────────────────────────────── */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black text-sky-600 tracking-[0.25em] uppercase mb-2 block">
                            Our Leadership
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            The Advisory Team
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {leadership.map((member, i) => (
                            <div key={i} className="text-center group">
                                <div className="aspect-[4/5] rounded-[30px] overflow-hidden mb-6 shadow-sm relative border-4 border-slate-50/50 bg-slate-100">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                                    />
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
                                    {member.name}
                                </h4>
                                <p className="text-[9px] font-black text-sky-500 uppercase tracking-widest">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── THE SNAKE & LADDERS INTERACTIVE SECTION ──────────────────────────── */}
            <section className="py-24 bg-slate-50/50">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-150/10">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-full mb-12">
                                <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-full mb-4">
                                    <span className="text-[9px] font-black text-sky-600 uppercase tracking-widest">Interactive Challenge</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                                    The Path to Success Isn't Linear.
                                </h2>
                                <p className="text-slate-500 text-sm md:text-base mb-10 leading-relaxed mx-auto max-w-2xl font-medium">
                                    Reach the final square on our board to unlock <strong>Free Premium Admission Support</strong>. Our journey is full of leaps (ladders) and lessons (snakes) — just like your career.
                                </p>

                                {/* Instruction Cards */}
                                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left mb-16">
                                    {/* Reward details */}
                                    <div className="rounded-3xl bg-slate-50/50 border border-slate-100 p-8 flex flex-col justify-between gap-10 hover:shadow-lg transition-all duration-300 group hover:bg-white">
                                        <div>
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                                                    <Trophy className="text-white w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-slate-900 font-extrabold text-xl leading-tight">
                                                        Winner's Reward
                                                    </h4>
                                                    <p className="text-sky-600 text-[10px] font-black uppercase tracking-wider mt-1">
                                                        Premium Admission Package — Free
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold">
                                                Reach square 100 and unlock India's most comprehensive admission package — worth ₹15,000 — at zero cost. Our experts handle everything so you focus on what matters: your entrance exams.
                                            </p>
                                        </div>

                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                { t: "1-on-1 Senior Counselor", d: "Dedicated expert for your journey" },
                                                { t: "Direct College Appointments", d: "Fast-track access, no queues" },
                                                { t: "Priority SOP & LOR Writing", d: "Editorial-grade documents" },
                                                { t: "Scholarship Eligibility Audit", d: "Identify every waiver" },
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-2.5">
                                                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-slate-900 text-xs font-bold leading-none mb-1">
                                                            {item.t}
                                                        </p>
                                                        <p className="text-slate-400 text-[10px] leading-relaxed font-medium">
                                                            {item.d}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Game instructions details */}
                                    <div className="rounded-3xl bg-slate-50/50 border border-slate-100 p-8 flex flex-col justify-between gap-10 hover:shadow-lg transition-all duration-300 group hover:bg-white">
                                        <div>
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                                                    <Award className="text-white w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-slate-900 font-extrabold text-xl leading-tight">
                                                        Rules of the Road
                                                    </h4>
                                                    <p className="text-sky-600 text-[10px] font-black uppercase tracking-wider mt-1">
                                                        Simple Rules, Big Reward
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 font-semibold">
                                                Roll the dice and navigate from square 1 to square <span className="text-sky-600 font-bold underline">100</span>. Land exactly on 100 to win.
                                            </p>
                                            <p className="text-slate-400 text-xs italic leading-relaxed font-medium">
                                                "Every setback on this board is a lesson. Every ladder is the result of preparation."
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <span className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-100 text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 shadow-sm">
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                                Green ladders — climb higher
                                            </span>
                                            <span className="w-full px-4 py-3 rounded-xl bg-white border border-rose-100 text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2 shadow-sm">
                                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                                Red snakes — slide back down
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* The Game Render */}
                            <div className="w-full flex justify-center">
                                <SnakeLadderGame />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Modals */}
            {selectedCollege && (
                <LeadModal 
                    isOpen={!!selectedCollege} 
                    onClose={() => setSelectedCollege(null)} 
                    collegeName={selectedCollege.name} 
                    stream={selectedCollege.stream}
                />
            )}
            {reviewCollege && (
                <ReviewModal
                    isOpen={!!reviewCollege}
                    onClose={() => setReviewCollege(null)}
                    collegeName={reviewCollege.name}
                />
            )}
        </main>
    )
}
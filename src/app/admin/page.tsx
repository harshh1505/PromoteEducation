'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthProvider'
import { fixMarkdownBold } from '@/lib/utils'
import rehypeRaw from 'rehype-raw'
import {
  FileText, Newspaper, BookOpen, Plus, Search, Edit2, Trash2,
  LogOut, LogIn, Lock, AlertCircle, CheckCircle, RefreshCw,
  Eye, Calendar, User, LayoutDashboard, ExternalLink, ChevronRight,
  Bold, Italic, Underline, List, Link2, Table as TableIcon
} from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import UnderlineExtension from '@tiptap/extension-underline'
import LinkExtension from '@tiptap/extension-link'
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'

type TabKey = 'blogs' | 'news' | 'articles'

interface RichTextareaProps {
  label: string
  id: string
  value: string
  onChange: (val: string) => void
  rows?: number
  placeholder?: string
}

function markdownToHtml(markdown: string): string {
  if (!markdown) return ''
  
  // Escape HTML entities to prevent rendering raw HTML tags, but preserve <u>
  let html = markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;u&gt;/gi, '<u>')
    .replace(/&lt;\/u&gt;/gi, '</u>')
    .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
    
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    
    // Italic
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: underline;">$1</a>')

  // Lists and Tables
  const lines = html.split('\n')
  let inList = false
  let inTable = false
  let tableHeaderParsed = false
  let result = []

  for (let line of lines) {
    const trimmed = line.trim()
    
    // Check if line is part of a table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      
      if (!inTable) {
        result.push('<table style="width:100%; border-collapse:collapse; margin:1rem 0; border:1px solid #e2e8f0;">')
        inTable = true
        tableHeaderParsed = false
      }
      
      const cells = trimmed.split('|').slice(1, -1).map(c => c.trim())
      const isSeparator = cells.every(cell => /^:?-+:?$/.test(cell))
      
      if (isSeparator) {
        tableHeaderParsed = true
        continue
      }
      
      if (!tableHeaderParsed) {
        result.push('<thead style="background-color:#f8fafc; border-bottom:2px solid #e2e8f0;"><tr>')
        cells.forEach(cell => {
          result.push(`<th style="padding:0.75rem; text-align:left; font-weight:bold; border:1px solid #e2e8f0;">${cell}</th>`)
        })
        result.push('</tr></thead><tbody>')
        tableHeaderParsed = true
      } else {
        result.push('<tr>')
        cells.forEach(cell => {
          result.push(`<td style="padding:0.75rem; border:1px solid #e2e8f0;">${cell}</td>`)
        })
        result.push('</tr>')
      }
      continue
    } else {
      if (inTable) {
        result.push('</tbody></table>')
        inTable = false
      }
    }

    if (trimmed.startsWith('- ')) {
      if (!inList) {
        result.push('<ul>')
        inList = true
      }
      result.push(`<li>${trimmed.substring(2)}</li>`)
    } else {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      if (trimmed === '') {
        result.push('<p><br></p>')
      } else {
        result.push(`<p>${line}</p>`)
      }
    }
  }
  
  if (inTable) {
    result.push('</tbody></table>')
  }
  if (inList) {
    result.push('</ul>')
  }

  return result.join('')
}

function htmlToMarkdown(html: string): string {
  if (!html || html === '<p><br></p>' || html === '<br>' || html === '<p></p>') return ''
  
  // Extract and convert tables first
  let tempHtml = html
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi
  tempHtml = tempHtml.replace(tableRegex, (tableHtml) => {
    const rows: string[] = []
    const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
    let match
    let isFirstRow = true
    let columnsCount = 0
    
    while ((match = trRegex.exec(tableHtml)) !== null) {
      const rowContent = match[1]
      const cells: string[] = []
      const cellRegex = /<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi
      let cellMatch
      while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        let cellText = cellMatch[2]
          .replace(/<span[^>]*style="[^"]*text-decoration:\s*underline;?[^"]*"[^>]*>(.*?)<\/span>/gi, '<u>$1</u>')
          .replace(/<(strong|b)[^>]*>(.*?)<\/\1>/gi, '**$2**')
          .replace(/<(em|i)[^>]*>(.*?)<\/\1>/gi, '*$2*')
          .replace(/<u[^>]*>(.*?)<\/u>/gi, '<u>$1</u>')
          .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
          .replace(/<[^>]+>/g, '') // Strip remaining tags
          .replace(/&nbsp;/g, ' ')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .trim()
        cells.push(cellText)
      }
      
      if (cells.length > 0) {
        rows.push(`| ${cells.join(' | ')} |`)
        if (isFirstRow) {
          columnsCount = cells.length
          const separator = Array(columnsCount).fill('---').join(' | ')
          rows.push(`| ${separator} |`)
          isFirstRow = false
        }
      }
    }
    return '\n\n' + rows.join('\n') + '\n\n'
  })

  let markdown = tempHtml
    // Handle inline tags
    .replace(/<span[^>]*style="[^"]*text-decoration:\s*underline;?[^"]*"[^>]*>(.*?)<\/span>/gi, '<u>$1</u>')
    .replace(/<(strong|b)[^>]*>(.*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)[^>]*>(.*?)<\/\1>/gi, '*$2*')
    .replace(/<u[^>]*>(.*?)<\/u>/gi, '<u>$1</u>')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    
    // Handle structural tags
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '\n- $1')
    .replace(/<\/li>/gi, '')
    .replace(/<ul[^>]*>/gi, '')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/div>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

  return markdown.trim().replace(/\n{3,}/g, '\n\n')
}

function RichTextarea({
  label,
  id,
  value,
  onChange,
  rows = 10,
  placeholder = ''
}: RichTextareaProps) {
  const [isPreview, setIsPreview] = useState(false)
  // Track the last value emitted by onUpdate so we can skip redundant setContent calls
  const lastEmittedRef = useRef<string>(value)

  const extensions = useMemo(() => [
    StarterKit,
    UnderlineExtension,
    LinkExtension.configure({
      openOnClick: false,
      HTMLAttributes: {
        style: 'color: #0284c7; text-decoration: underline; cursor: pointer;'
      }
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ], [])

  const editor = useEditor({
    extensions,
    content: markdownToHtml(value),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const md = htmlToMarkdown(html)
      lastEmittedRef.current = md
      onChange(md)
    },
    immediatelyRender: false,
  })

  // Sync external value into editor ONLY when the parent changes it from outside
  // (e.g. switching edit items). Skip if value matches what we just emitted.
  useEffect(() => {
    if (!editor) return
    if (value === lastEmittedRef.current) return
    lastEmittedRef.current = value
    editor.commands.setContent(markdownToHtml(value))
  }, [value, editor])

  if (!editor) return null

  const handleLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = prompt('Enter link URL:', previousUrl || 'https://')
    
    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div>
      <style>{`
        .ProseMirror {
          min-height: ${rows * 20}px;
          outline: none;
        }
        .ProseMirror ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        .ProseMirror li {
          margin-top: 0.25rem !important;
          margin-bottom: 0.25rem !important;
        }
        .ProseMirror p {
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }
        .ProseMirror a {
          color: #0284c7 !important;
          text-decoration: underline !important;
        }
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1rem 0;
          overflow: hidden;
        }
        .ProseMirror td,
        .ProseMirror th {
          min-width: 1em;
          border: 1px solid #cbd5e1;
          padding: 8px 12px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror th {
          font-weight: bold;
          text-align: left;
          background-color: #f8fafc;
        }
        .ProseMirror .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }
        .ProseMirror .column-resize-handle {
          position: absolute;
          right: -2px; top: 0; bottom: -2px;
          width: 4px;
          background-color: #a1a1aa;
          cursor: col-resize;
          z-index: 10;
        }
        /* Custom placeholder when empty */
        .ProseMirror p.is-editor-empty:first-child::before {
          content: "${placeholder.replace(/"/g, '\\"')}";
          float: left;
          color: #94a3b8;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
      `}</style>

      <div className="flex items-center justify-between mb-2">
        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest">{label}</label>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
            isPreview 
              ? 'bg-sky-500/10 border-sky-500/20 text-sky-400' 
              : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye size={12} /> {isPreview ? 'Editor' : 'Preview'}
        </button>
      </div>

      <div className="border border-slate-850 rounded-2xl overflow-hidden focus-within:border-sky-500 transition-all flex flex-col bg-slate-950">
        {/* Toolbar (Only visible in editor mode) */}
        {!isPreview && (
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-2 border-b border-slate-850">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1.5 rounded-lg transition-all ${
                editor.isActive('bold') 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
              title="Bold"
            >
              <Bold size={13} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1.5 rounded-lg transition-all ${
                editor.isActive('italic') 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
              title="Italic"
            >
              <Italic size={13} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1.5 rounded-lg transition-all ${
                editor.isActive('underline') 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
              title="Underline"
            >
              <Underline size={13} />
            </button>
            <div className="w-[1px] h-4 bg-slate-800 mx-1" />
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1.5 rounded-lg transition-all ${
                editor.isActive('bulletList') 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
              title="Bullet List"
            >
              <List size={13} />
            </button>
            <button
              type="button"
              onClick={handleLink}
              className={`p-1.5 rounded-lg transition-all ${
                editor.isActive('link') 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-450 hover:text-slate-200 hover:bg-slate-850'
              }`}
              title="Hyperlink"
            >
              <Link2 size={13} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
              className={`p-1.5 rounded-lg transition-all ${
                editor.isActive('table') 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
              title="Insert Table"
            >
              <TableIcon size={13} />
            </button>
            {editor.isActive('table') && (
              <>
                <div className="w-[1px] h-4 bg-slate-800 mx-1" />
                <button
                  type="button"
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                  className="px-2 py-1 rounded-lg transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-850 text-[10px] font-bold border border-slate-800"
                  title="Add Row Below"
                >
                  Row+
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                  className="px-2 py-1 rounded-lg transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-850 text-[10px] font-bold border border-slate-800"
                  title="Add Column After"
                >
                  Col+
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().deleteRow().run()}
                  className="px-2 py-1 rounded-lg transition-all text-red-400 hover:text-red-300 hover:bg-slate-850 text-[10px] font-bold border border-slate-800"
                  title="Delete Row"
                >
                  Row-
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                  className="px-2 py-1 rounded-lg transition-all text-red-400 hover:text-red-300 hover:bg-slate-850 text-[10px] font-bold border border-slate-800"
                  title="Delete Column"
                >
                  Col-
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().deleteTable().run()}
                  className="px-2 py-1 rounded-lg transition-all text-red-400 hover:text-red-300 hover:bg-slate-850 text-[10px] font-bold border border-slate-800"
                  title="Delete Table"
                >
                  Table-
                </button>
              </>
            )}
          </div>
        )}

        {/* Editor Area */}
        {isPreview ? (
          <div className="p-5 bg-slate-950 min-h-[300px] max-h-[500px] overflow-y-auto prose prose-slate prose-invert prose-xs max-w-none 
            prose-p:text-slate-350 prose-p:leading-relaxed prose-p:my-2
            prose-headings:text-slate-100 prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-2
            prose-a:text-[#38b6ff] hover:prose-a:underline
            prose-ul:list-disc prose-ul:pl-4 prose-li:text-slate-350 prose-li:my-1">
            {value ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{fixMarkdownBold(value)}</ReactMarkdown>
            ) : (
              <span className="text-slate-650 text-xs italic">Nothing to preview yet.</span>
            )}
          </div>
        ) : (
          <div className="w-full bg-white text-slate-900 p-6 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none prose prose-slate max-w-none leading-relaxed text-sm font-sans">
            <EditorContent editor={editor} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  // Auth state from global provider
  const {
    user,
    profile,
    authLoading,
    authError,
    setUser,
    setProfile,
    setAuthLoading,
    setAuthError,
    logout
  } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // CMS state
  const [activeTab, setActiveTab] = useState<TabKey>('blogs')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'sections' | 'faqs' | 'seo'>('info')

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  // Stats
  const [stats, setStats] = useState({ blogs: 0, news: 0, articles: 0 })


  // Ref to track the active tab inside async callbacks without stale closures
  const activeTabRef = useRef<TabKey>(activeTab)
  useEffect(() => { activeTabRef.current = activeTab }, [activeTab])

  // Per-tab data cache — serves instant data on tab switch without a loading spinner
  const tabCacheRef = useRef<Partial<Record<TabKey, any[]>>>({})

  // ─── Core data fetcher: pre-fetches ALL 3 tabs in parallel so every tab
  //     switch is instant after the first load ───
  const runFetchCMSData = async (profileData: any, tab: TabKey) => {
    if (!profileData || profileData.role !== 'admin') return
    setLoading(true)
    try {
      // 6 parallel queries: 3 list queries (one per tab) + 3 count queries
      const [
        { data: blogsData,    error: blogsErr    },
        { data: newsData,     error: newsErr     },
        { data: articlesData, error: articlesErr },
        { count: blogsCount    },
        { count: newsCount     },
        { count: articlesCount }
      ] = await Promise.all([
        supabase
          .from('blogs')
          .select('id, title, slug, category, is_live, featured, read_time, created_at, updated_at, featured_image, author')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('news_articles')
          .select('id, heading, slug, is_live, created_at, updated_at, featured_image, editor, published_at, synopsis')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('articles')
          .select('id, title, category, sub_category, tag, is_hot, is_featured, created_at, author, date')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase.from('blogs').select('*', { count: 'exact', head: true }),
        supabase.from('news_articles').select('*', { count: 'exact', head: true }),
        supabase.from('articles').select('*', { count: 'exact', head: true })
      ])

      // Handle each table independently — a missing/inaccessible table won't block the others
      if (blogsErr)    console.warn('blogs fetch error:',    blogsErr.message    || JSON.stringify(blogsErr))
      if (newsErr)     console.warn('news_articles error:',  newsErr.message     || JSON.stringify(newsErr))
      if (articlesErr) console.warn('articles fetch error:', articlesErr.message || JSON.stringify(articlesErr))

      // Cache whatever succeeded (empty array fallback for failed tables)
      tabCacheRef.current['blogs']    = blogsData    ?? []
      tabCacheRef.current['news']     = newsData     ?? []
      tabCacheRef.current['articles'] = articlesData ?? []

      // Render the currently active tab
      const activeData: Record<TabKey, any[]> = {
        blogs:    blogsData    ?? [],
        news:     newsData     ?? [],
        articles: articlesData ?? []
      }
      setItems(activeData[tab])
      setStats({
        blogs:    blogsCount    ?? 0,
        news:     newsCount     ?? 0,
        articles: articlesCount ?? 0
      })
    } catch (err: any) {
      console.error('Error fetching CMS data:', err?.message ?? JSON.stringify(err))
      showStatus('error', 'Failed to retrieve records from the database.')
    } finally {
      setLoading(false)
    }
  }

  // ─── fetch list only (post-save, no stat re-count needed) ───
  const fetchListOnly = async () => {
    if (!profile || profile.role !== 'admin') return
    setLoading(true)
    try {
      const tab = activeTabRef.current
      let listQuery
      if (tab === 'blogs') {
        listQuery = supabase
          .from('blogs')
          .select('id, title, slug, category, is_live, featured, read_time, created_at, updated_at, featured_image, author')
          .order('created_at', { ascending: false })
          .limit(50)
      } else if (tab === 'news') {
        listQuery = supabase
          .from('news_articles')
          .select('id, heading, slug, is_live, created_at, updated_at, featured_image, editor, published_at, synopsis')
          .order('created_at', { ascending: false })
          .limit(50)
      } else {
        listQuery = supabase
          .from('articles')
          .select('id, title, category, sub_category, tag, is_hot, is_featured, created_at, author, date')
          .order('created_at', { ascending: false })
          .limit(50)
      }
      const { data, error } = await listQuery
      if (error) throw error
      // Update cache for the active tab
      tabCacheRef.current[tab] = data || []
      setItems(data || [])
    } catch (err: any) {
      showStatus('error', 'Failed to retrieve records.')
    } finally {
      setLoading(false)
    }
  }

  // Wrapper used by tab-switch useEffect
  const fetchCMSData = async () => {
    if (!profile || profile.role !== 'admin') return
    await runFetchCMSData(profile, activeTab)
  }

  // ─── 1. Initial CMS data fetch on profile validation ───
  const hasFetchedRef = useRef(false)
  useEffect(() => {
    if (profile && profile.role === 'admin') {
      if (!hasFetchedRef.current) {
        hasFetchedRef.current = true
        runFetchCMSData(profile, activeTabRef.current)
      }
    } else {
      hasFetchedRef.current = false
      setItems([])
    }
  }, [profile])

  // ─── 2. Instant tab switch: always served from cache (all tabs pre-loaded) ───
  const isFirstMount = useRef(true)
  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return }
    // All 3 tabs are pre-cached on initial load — just swap items, no fetch needed
    const cached = tabCacheRef.current[activeTab]
    if (cached !== undefined) {
      setItems(cached)
    }
  }, [activeTab])

  // ─── 3. Log In ───
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (err: any) {
      setAuthError(err.message || 'Invalid login credentials.')
      setAuthLoading(false)
    }
  }

  // ─── 4. Log Out ───
  const handleLogout = async () => {
    await logout()
  }

  // Helper for Status Banner
  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text })
    setTimeout(() => setStatusMessage(null), 5000)
  }

  // Auto-slug generator helper
  const handleTitleChange = (titleVal: string) => {
    const generatedSlug = titleVal
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .replace(/\s+/g, '-')         // replace spaces with hyphens
      .replace(/-+/g, '-')          // replace multiple hyphens
    
    setFormData((prev: any) => ({
      ...prev,
      slug: prev.slug === undefined || prev.slug === '' || prev.slug === editingItem?.slug
        ? generatedSlug
        : prev.slug
    }))
  }

  const handleEditClick = async (item: any) => {
    setLoading(true)
    try {
      if (activeTab === 'blogs') {
        // Fetch sections and FAQs in parallel instead of sequentially
        const [
          { data: secData, error: secErr },
          { data: faqData, error: faqErr }
        ] = await Promise.all([
          supabase
            .from('blog_sections')
            .select('*')
            .eq('blog_id', item.id)
            .order('section_order', { ascending: true }),
          supabase
            .from('blog_faqs')
            .select('*')
            .eq('blog_id', item.id)
            .order('faq_order', { ascending: true })
        ])

        if (secErr || faqErr) throw secErr || faqErr

        openForm({
          ...item,
          sections: secData || [],
          faqs: faqData || [],
          seo_keywords: item.seo_keywords ? item.seo_keywords.join(', ') : ''
        })
      } else if (activeTab === 'news') {
        const { data: secData, error: secErr } = await supabase
          .from('news_sections')
          .select('*')
          .eq('article_id', item.id)
          .order('section_order', { ascending: true })
        if (secErr) throw secErr

        openForm({
          ...item,
          sections: secData || [],
          seo_keywords: item.seo_keywords ? item.seo_keywords.join(', ') : ''
        })
      } else {
        openForm(item)
      }
    } catch (err: any) {
      console.error('Error fetching blog related items:', err)
      showStatus('error', 'Failed to load details for editing.')
    } finally {
      setLoading(false)
    }
  }

  // Open Form modal
  const openForm = (item: any = null) => {
    setActiveSubTab('info')
    setEditingItem(item)
    if (item) {
      setFormData({ ...item })
    } else {
      // Default forms initialization
      if (activeTab === 'blogs') {
        setFormData({
          title: '',
          slug: '',
          summary: '',
          featured_image: '',
          category: 'Education',
          read_time: 5,
          author: 'Promote Education Editorial',
          featured: false,
          is_live: false,
          seo_title: '',
          seo_description: '',
          seo_keywords: '',
          sections: [],
          faqs: []
        })
      } else if (activeTab === 'news') {
        setFormData({
          heading: '',
          slug: '',
          synopsis: '',
          featured_image: '',
          editor: 'Promote Education Editor',
          is_live: false,
          seo_title: '',
          seo_description: '',
          seo_keywords: '',
          published_at: new Date().toISOString(),
          sections: [],
          comments_count: 0,
          shares_count: 0
        })
      } else {
        setFormData({
          title: '',
          excerpt: '',
          category: 'btech',
          sub_category: 'General',
          tag: 'Must Read',
          read_time: '10 min',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          author: 'Ritesh Rastogi',
          author_role: 'MD & Founder',
          views: '0',
          image: '',
          is_hot: false,
          is_featured: false,
          level: 'beginner'
        })
      }
    }
    setIsFormOpen(true)
  }

  // Save / Update logic
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      let response
      if (activeTab === 'blogs') {
        const blogPayload = {
          title: formData.title,
          slug: formData.slug,
          summary: formData.summary,
          featured_image: formData.featured_image || '',
          category: formData.category || 'Education',
          read_time: parseInt(formData.read_time) || 5,
          author: formData.author || 'Promote Education Editorial',
          featured: formData.featured || false,
          is_live: formData.is_live || false,
          seo_title: formData.seo_title || null,
          seo_description: formData.seo_description || null,
          seo_keywords: formData.seo_keywords
            ? typeof formData.seo_keywords === 'string'
              ? formData.seo_keywords.split(',').map((s: string) => s.trim()).filter(Boolean)
              : formData.seo_keywords
            : []
        }

        let blogId = editingItem?.id

        if (editingItem) {
          response = await supabase.from('blogs').update(blogPayload).eq('id', editingItem.id)
          if (response.error) throw response.error
        } else {
          const insertRes = await supabase.from('blogs').insert([blogPayload]).select().single()
          if (insertRes.error) throw insertRes.error
          blogId = insertRes.data.id
          response = { error: null }
        }

        // Delete old sections and insert new ones
        await supabase.from('blog_sections').delete().eq('blog_id', blogId)
        if (formData.sections && formData.sections.length > 0) {
          const sectionsPayload = formData.sections.map((sec: any, idx: number) => ({
            blog_id: blogId,
            section_order: idx + 1,
            heading: sec.heading || null,
            subheading: sec.subheading || null,
            content: sec.content || '',
            image_url: sec.image_url || null
          }))
          const secInsertRes = await supabase.from('blog_sections').insert(sectionsPayload)
          if (secInsertRes.error) throw secInsertRes.error
        }

        // Delete old FAQs and insert new ones
        await supabase.from('blog_faqs').delete().eq('blog_id', blogId)
        if (formData.faqs && formData.faqs.length > 0) {
          const faqsPayload = formData.faqs.map((faq: any, idx: number) => ({
            blog_id: blogId,
            faq_order: idx + 1,
            question: faq.question || '',
            answer: faq.answer || ''
          }))
          const faqInsertRes = await supabase.from('blog_faqs').insert(faqsPayload)
          if (faqInsertRes.error) throw faqInsertRes.error
        }
      } else if (activeTab === 'news') {
        const newsPayload = {
          heading: formData.heading,
          slug: formData.slug,
          synopsis: formData.synopsis,
          featured_image: formData.featured_image || '',
          editor: formData.editor || 'Promote Education Editor',
          is_live: formData.is_live || false,
          seo_title: formData.seo_title || null,
          seo_description: formData.seo_description || null,
          seo_keywords: formData.seo_keywords
            ? typeof formData.seo_keywords === 'string'
              ? formData.seo_keywords.split(',').map((s: string) => s.trim()).filter(Boolean)
              : formData.seo_keywords
            : [],
          published_at: formData.published_at || (formData.is_live ? new Date().toISOString() : null)
        }

        let articleId = editingItem?.id

        if (editingItem) {
          response = await supabase.from('news_articles').update(newsPayload).eq('id', editingItem.id)
          if (response.error) throw response.error
        } else {
          const insertRes = await supabase.from('news_articles').insert([newsPayload]).select().single()
          if (insertRes.error) throw insertRes.error
          articleId = insertRes.data.id
          response = { error: null }
        }

        // Delete old sections and insert new ones
        await supabase.from('news_sections').delete().eq('article_id', articleId)
        if (formData.sections && formData.sections.length > 0) {
          const sectionsPayload = formData.sections.map((sec: any, idx: number) => ({
            article_id: articleId,
            section_order: idx + 1,
            content: sec.content || '',
            image_url: sec.image_url || null
          }))
          const secInsertRes = await supabase.from('news_sections').insert(sectionsPayload)
          if (secInsertRes.error) throw secInsertRes.error
        }
      } else {
        if (editingItem) {
          response = await supabase.from('articles').update(formData).eq('id', editingItem.id)
        } else {
          response = await supabase.from('articles').insert([formData])
        }
      }

      if (response.error) throw response.error
      
      showStatus('success', `Record ${editingItem ? 'updated' : 'created'} successfully!`)
      setIsFormOpen(false)
      // After save, only refresh the list — no need to re-fetch stats counts
      fetchListOnly()
    } catch (err: any) {
      console.error('Error saving record:', err)
      showStatus('error', err.message || 'Error occurred while saving the record.')
    } finally {
      setLoading(false)
    }
  }

  // Delete logic
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this item?')) return
    setLoading(true)
    try {
      let response
      if (activeTab === 'blogs') {
        response = await supabase.from('blogs').delete().eq('id', id)
      } else if (activeTab === 'news') {
        response = await supabase.from('news_articles').delete().eq('id', id)
      } else {
        response = await supabase.from('articles').delete().eq('id', id)
      }

      if (response.error) throw response.error

      showStatus('success', 'Record deleted successfully.')
      fetchCMSData()
    } catch (err: any) {
      console.error('Error deleting record:', err)
      showStatus('error', err.message || 'Error occurred while deleting the record.')
    } finally {
      setLoading(false)
    }
  }

  // Filter listings by query
  const filteredItems = items.filter(item => {
    const term = searchQuery.toLowerCase()
    if (activeTab === 'blogs') {
      return (item.title || '').toLowerCase().includes(term) || (item.category || '').toLowerCase().includes(term)
    } else if (activeTab === 'news') {
      return (item.heading || '').toLowerCase().includes(term) || (item.editor || '').toLowerCase().includes(term)
    } else {
      return (item.title || '').toLowerCase().includes(term) || (item.category || '').toLowerCase().includes(term)
    }
  })

  // Loading Session Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin text-sky-500" size={32} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Authenticating Portal Session...</p>
        </div>
      </div>
    )
  }

  // Login Screen
  if (!user || !profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" />
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 mx-auto mb-4 border border-sky-500/20">
              <Lock size={22} />
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-2">Admin Control Center</h1>
            <p className="text-slate-400 text-xs font-semibold leading-relaxed">
              {user ? 'Verify admin authorization permissions' : 'Sign in to access publishing tools'}
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-900/30 text-red-400 text-xs rounded-2xl flex items-start gap-3">
              <AlertCircle className="shrink-0 mt-0.5" size={16} />
              <p className="font-semibold leading-relaxed">{authError}</p>
            </div>
          )}

          {user && profile?.role !== 'admin' ? (
            <div className="text-center">
              <div className="p-4 bg-amber-950/40 border border-amber-900/30 text-amber-400 text-xs rounded-2xl text-left leading-relaxed mb-6 font-medium">
                You are authenticated as <strong>{user.email}</strong>, but this account is not registered as an administrator. 
                Please contact the lead database manager to assign the <code>admin</code> role.
              </div>
              <button 
                onClick={handleLogout}
                className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Portal Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all"
                  placeholder="admin@promoteeducation.org"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Access Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all"
                  placeholder="••••••••••••"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-600/10 mt-6"
              >
                <LogIn size={18} /> Authenticate Portal
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* ── TOP HEADER ────────────────────────────────────────────────────────── */}
      <header className="bg-slate-900 border-b border-slate-850 px-6 py-4 flex items-center justify-between z-10 shadow-lg shadow-slate-950/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 border border-sky-500/20 font-black text-sm">
            PE
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight flex items-center gap-1.5">
              Promote Education <span className="text-[10px] text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/10">CMS Console</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Logged in as {user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all border border-slate-700">
            View Live <ExternalLink size={12} />
          </Link>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/30 text-red-400 font-bold text-xs rounded-xl transition-all border border-red-900/20"
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </header>

      {/* ── CORE CMS WRAPPER ──────────────────────────────────────────────────── */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
        
        {/* Status Toast Banner */}
        {statusMessage && (
          <div className={`p-4 rounded-2xl flex items-start gap-3 border shadow-lg transition-all animate-in fade-in duration-300 ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-950/40 border-emerald-900/30 text-emerald-400' 
              : 'bg-red-950/40 border-red-900/30 text-red-400'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <p className="text-xs font-semibold leading-relaxed">{statusMessage.text}</p>
          </div>
        )}

        {/* ── STATS CARDS ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Blogs & Essays', value: stats.blogs, icon: FileText, color: 'sky' },
            { label: 'News Updates', value: stats.news, icon: Newspaper, color: 'indigo' },
            { label: 'Course Articles', value: stats.articles, icon: BookOpen, color: 'emerald' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-slate-850 p-6 rounded-[24px] flex items-center justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-slate-800 transition-all group-hover:bg-sky-500" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-sky-400 transition-all`}>
                <stat.icon size={22} />
              </div>
            </div>
          ))}
        </div>

        {/* ── CENTRAL CONTROL PANEL ────────────────────────────────────────────── */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-[32px] overflow-hidden flex flex-col shadow-xl flex-1 min-h-[500px]">
          
          {/* Dashboard Tabs & Actions Header */}
          <div className="px-6 py-5 border-b border-slate-850 bg-slate-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Tab switchers */}
            <div className="flex gap-2 p-1 bg-slate-950 rounded-2xl self-start border border-slate-850">
              {[
                { key: 'blogs', label: 'Blogs', icon: FileText },
                { key: 'news', label: 'News Articles', icon: Newspaper },
                { key: 'articles', label: 'Educational Articles', icon: BookOpen }
              ].map(tab => {
                const isActive = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key as TabKey); setSearchQuery(''); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-slate-900 text-white shadow-lg' 
                        : 'text-slate-450 hover:text-slate-200'
                    }`}
                  >
                    <tab.icon size={14} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 pl-10 pr-4 py-2.5 rounded-2xl text-xs focus:outline-none transition-all"
                />
              </div>
              <button 
                onClick={() => openForm()}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-sky-600/10 shrink-0"
              >
                <Plus size={16} /> Create New
              </button>
            </div>
          </div>

          {/* Records Table View */}
          <div className="flex-1 overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <RefreshCw className="animate-spin text-sky-500" size={24} />
                <p className="text-slate-450 text-[10px] font-black uppercase tracking-widest">Loading Records...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                  <LayoutDashboard size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-300">No records found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">No matching entries are registered in the current database table context.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-850 bg-slate-950/20 text-[10px] font-black text-slate-450 uppercase tracking-widest">
                    <th className="p-4">Title / Heading</th>
                    <th className="p-4">Details</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Views</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredItems.map(item => {
                    const title = item.title || item.heading
                    const author = item.author || item.editor || 'PE Staff'
                    const date = item.published_at || item.date || item.created_at
                    const dateFormatted = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    
                    return (
                      <tr key={item.id} className="hover:bg-slate-900/20 transition-colors group">
                        <td className="p-4 max-w-sm">
                          <div className="font-bold text-slate-200 text-xs md:text-sm truncate">{title}</div>
                          <div className="text-[10px] text-slate-450 font-bold truncate mt-1 flex items-center gap-1">
                            <span>{item.slug || 'no-slug'}</span>
                          </div>
                        </td>
                        <td className="p-4 text-xs font-semibold text-slate-400">
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1"><User size={12} className="text-slate-500" /> {author}</span>
                            <span className="flex items-center gap-1"><Calendar size={12} className="text-slate-500" /> {dateFormatted}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {item.is_live === undefined || item.is_live ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/10">
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-xs font-bold text-slate-350">
                          <div className="flex items-center gap-1">
                            <Eye size={12} className="text-slate-500" />
                            {item.views !== undefined ? item.views : 'N/A'}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button 
                              onClick={() => handleEditClick(item)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all border border-slate-700"
                              title="Edit item"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-2 bg-red-950/40 hover:bg-red-900/30 text-red-400 rounded-xl transition-all border border-red-900/20"
                              title="Delete item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ── EDITOR MODAL / PANEL ──────────────────────────────────────────────── */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl h-full bg-slate-900 border-l border-slate-850 flex flex-col shadow-2xl relative overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-sky-500" />
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-850 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white">{editingItem ? 'Edit Entry' : 'Create New Entry'}</h2>
                <p className="text-[10px] text-slate-450 font-bold uppercase tracking-widest mt-1">Publishing to {activeTab}</p>
              </div>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 border border-slate-850 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* === BLOG FIELDS === */}
              {activeTab === 'blogs' && (
                <>
                  {/* Blog sub tabs */}
                  <div className="flex gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-850 mb-6">
                    {[
                      { key: 'info', label: 'General Info' },
                      { key: 'sections', label: `Content Sections (${(formData.sections || []).length})` },
                      { key: 'faqs', label: `FAQs (${(formData.faqs || []).length})` },
                      { key: 'seo', label: 'SEO Metadata' }
                    ].map(subTab => (
                      <button
                        key={subTab.key}
                        type="button"
                        onClick={() => setActiveSubTab(subTab.key as any)}
                        className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all ${
                          activeSubTab === subTab.key
                            ? 'bg-slate-900 text-white shadow-lg'
                            : 'text-slate-450 hover:text-slate-200'
                        }`}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </div>

                  {/* SUB TAB: INFO */}
                  {activeSubTab === 'info' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Blog Title</label>
                          <input 
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => {
                              setFormData((prev: any) => ({ ...prev, title: e.target.value }))
                              handleTitleChange(e.target.value)
                            }}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                            placeholder="Mastering NextJS 16 features..."
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">URL Slug</label>
                          <input 
                            type="text"
                            value={formData.slug || ''}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all font-mono"
                            placeholder="slug-url-endpoint"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Category</label>
                          <input 
                            type="text"
                            value={formData.category || ''}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, category: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                            placeholder="Education"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Read Time (minutes)</label>
                          <input 
                            type="number"
                            value={formData.read_time || 5}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, read_time: parseInt(e.target.value) || 5 }))}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                            placeholder="5"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Author Name</label>
                          <input 
                            type="text"
                            value={formData.author || ''}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, author: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                            placeholder="Promote Education Editorial"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Featured Image URL</label>
                        <input 
                          type="text"
                          value={formData.featured_image || ''}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, featured_image: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all font-mono"
                          placeholder="https://images.unsplash.com/photo-..."
                          required
                        />
                      </div>

                      <RichTextarea
                        label="Executive Summary"
                        id="blog_summary"
                        value={formData.summary || ''}
                        onChange={(val) => setFormData((prev: any) => ({ ...prev, summary: val }))}
                        rows={3}
                        placeholder="Short excerpt or description outlining the main focus..."
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-slate-950/40 rounded-2xl border border-slate-850">
                          <input 
                            type="checkbox" 
                            id="blog_featured"
                            checked={formData.featured || false}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, featured: e.target.checked }))}
                            className="w-4 h-4 text-sky-600 bg-slate-950 border-slate-800 rounded focus:ring-sky-500"
                          />
                          <label htmlFor="blog_featured" className="text-xs font-bold text-slate-300 select-none font-sans">Featured Post</label>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-950/40 rounded-2xl border border-slate-850">
                          <input 
                            type="checkbox" 
                            id="blog_live"
                            checked={formData.is_live || false}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, is_live: e.target.checked }))}
                            className="w-4 h-4 text-sky-600 bg-slate-950 border-slate-800 rounded focus:ring-sky-500"
                          />
                          <label htmlFor="blog_live" className="text-xs font-bold text-slate-300 select-none font-sans">Publish immediately (Live)</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB TAB: SECTIONS */}
                  {activeSubTab === 'sections' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Content Sections</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newSecs = [...(formData.sections || []), { heading: '', subheading: '', content: '', image_url: '' }]
                            setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold rounded-xl border border-slate-750 transition-all"
                        >
                          <Plus size={14} /> Add Content Block
                        </button>
                      </div>

                      {(formData.sections || []).length === 0 ? (
                        <div className="p-8 text-center bg-slate-950/20 border border-dashed border-slate-850 rounded-2xl">
                          <p className="text-slate-500 text-xs font-medium">No sections added yet. Click the button to add a visual content block.</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {(formData.sections || []).map((sec: any, idx: number) => (
                            <div key={idx} className="p-5 bg-slate-950/40 border border-slate-850 rounded-[24px] space-y-4 relative group">
                              <div className="flex items-center justify-between">
                                <span className="px-2.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 font-black text-[10px] rounded-lg">
                                  BLOCK #{idx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSecs = (formData.sections || []).filter((_: any, sidx: number) => sidx !== idx)
                                    setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                                  }}
                                  className="text-red-400 hover:text-red-300 text-xs font-bold transition-all px-2.5 py-1 hover:bg-red-950/30 rounded-lg"
                                >
                                  Delete Block
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-1.5">Section Heading</label>
                                  <input 
                                    type="text"
                                    value={sec.heading || ''}
                                    onChange={(e) => {
                                      const newSecs = [...formData.sections]
                                      newSecs[idx].heading = e.target.value
                                      setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                                    }}
                                    className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-3 py-2.5 rounded-xl text-xs focus:outline-none transition-all"
                                    placeholder="Enter section heading..."
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-1.5">Section Subheading</label>
                                  <input 
                                    type="text"
                                    value={sec.subheading || ''}
                                    onChange={(e) => {
                                      const newSecs = [...formData.sections]
                                      newSecs[idx].subheading = e.target.value
                                      setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                                    }}
                                    className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-3 py-2.5 rounded-xl text-xs focus:outline-none transition-all"
                                    placeholder="Enter subheading..."
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-1.5">Section Image URL (Optional)</label>
                                <input 
                                  type="text"
                                  value={sec.image_url || ''}
                                  onChange={(e) => {
                                    const newSecs = [...formData.sections]
                                    newSecs[idx].image_url = e.target.value
                                    setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                                  }}
                                  className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-3 py-2.5 rounded-xl text-xs focus:outline-none transition-all font-mono"
                                  placeholder="https://images.unsplash.com/photo-..."
                                />
                              </div>

                              <RichTextarea
                                label="Section Content"
                                id={`sec_content_${idx}`}
                                value={sec.content || ''}
                                onChange={(val) => {
                                  const newSecs = [...formData.sections]
                                  newSecs[idx].content = val
                                  setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                                }}
                                rows={6}
                                placeholder="Enter section body content..."
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUB TAB: FAQS */}
                  {activeSubTab === 'faqs' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Frequently Asked Questions</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newFaqs = [...(formData.faqs || []), { question: '', answer: '' }]
                            setFormData((prev: any) => ({ ...prev, faqs: newFaqs }))
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold rounded-xl border border-slate-750 transition-all"
                        >
                          <Plus size={14} /> Add FAQ
                        </button>
                      </div>

                      {(formData.faqs || []).length === 0 ? (
                        <div className="p-8 text-center bg-slate-950/20 border border-dashed border-slate-850 rounded-2xl">
                          <p className="text-slate-500 text-xs font-medium">No FAQs configured yet. Click the button to add an FAQ pair.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {(formData.faqs || []).map((faq: any, idx: number) => (
                            <div key={idx} className="p-5 bg-slate-950/40 border border-slate-850 rounded-[24px] space-y-4 relative">
                              <div className="flex items-center justify-between">
                                <span className="px-2.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-450 font-black text-[10px] rounded-lg">
                                  FAQ #{idx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newFaqs = (formData.faqs || []).filter((_: any, fidx: number) => fidx !== idx)
                                    setFormData((prev: any) => ({ ...prev, faqs: newFaqs }))
                                  }}
                                  className="text-red-400 hover:text-red-300 text-xs font-bold transition-all px-2.5 py-1 hover:bg-red-950/30 rounded-lg"
                                >
                                  Delete FAQ
                                </button>
                              </div>

                              <div>
                                <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-1.5">Question</label>
                                <input 
                                  type="text"
                                  value={faq.question || ''}
                                  onChange={(e) => {
                                    const newFaqs = [...formData.faqs]
                                    newFaqs[idx].question = e.target.value
                                    setFormData((prev: any) => ({ ...prev, faqs: newFaqs }))
                                  }}
                                  className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-3 py-2.5 rounded-xl text-xs focus:outline-none transition-all"
                                  placeholder="e.g. What is the eligibility criteria?"
                                  required
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-1.5">Answer</label>
                                <textarea 
                                  value={faq.answer || ''}
                                  onChange={(e) => {
                                    const newFaqs = [...formData.faqs]
                                    newFaqs[idx].answer = e.target.value
                                    setFormData((prev: any) => ({ ...prev, faqs: newFaqs }))
                                  }}
                                  rows={3}
                                  className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 p-3 rounded-xl text-xs focus:outline-none transition-all leading-relaxed"
                                  placeholder="Enter the answer text..."
                                  required
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUB TAB: SEO */}
                  {activeSubTab === 'seo' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">SEO Title Tag (Page Title)</label>
                        <input 
                          type="text"
                          value={formData.seo_title || ''}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, seo_title: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                          placeholder="e.g. Top Engineering Exams 2026 Strategy Guide"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">SEO Meta Description</label>
                        <textarea 
                          value={formData.seo_description || ''}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, seo_description: e.target.value }))}
                          rows={3}
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 p-4 rounded-2xl text-xs focus:outline-none transition-all leading-relaxed"
                          placeholder="Teaser metadata shown in Google search results (150-160 characters suggested)..."
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">SEO Keywords (Comma Separated)</label>
                        <input 
                          type="text"
                          value={formData.seo_keywords || ''}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, seo_keywords: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                          placeholder="nextjs, react, web development, code tips"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* === NEWS ARTICLES FIELDS === */}
              {activeTab === 'news' && (
                <>
                  {/* News sub tabs */}
                  <div className="flex gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-850 mb-6">
                    {[
                      { key: 'info', label: 'General Info' },
                      { key: 'sections', label: `Content Sections (${(formData.sections || []).length})` },
                      { key: 'seo', label: 'SEO Metadata' }
                    ].map(subTab => (
                      <button
                        key={subTab.key}
                        type="button"
                        onClick={() => setActiveSubTab(subTab.key as any)}
                        className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all ${
                          activeSubTab === subTab.key
                            ? 'bg-slate-900 text-white shadow-lg'
                            : 'text-slate-450 hover:text-slate-200'
                        }`}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </div>

                  {/* SUB TAB: INFO */}
                  {activeSubTab === 'info' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">News Heading</label>
                          <input 
                            type="text"
                            value={formData.heading || ''}
                            onChange={(e) => {
                              setFormData((prev: any) => ({ ...prev, heading: e.target.value }))
                              handleTitleChange(e.target.value)
                            }}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                            placeholder="JEE Mains 2026 Registration Opens..."
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">URL Slug</label>
                          <input 
                            type="text"
                            value={formData.slug || ''}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all font-mono"
                            placeholder="slug-url-endpoint"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Author / Editor</label>
                          <input 
                            type="text"
                            value={formData.editor || ''}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, editor: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                            placeholder="Promote Education Editor"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Published Date/Time</label>
                          <input 
                            type="datetime-local"
                            value={formData.published_at ? new Date(formData.published_at).toISOString().slice(0, 16) : ''}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, published_at: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                            className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Featured Image URL</label>
                        <input 
                          type="text"
                          value={formData.featured_image || ''}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, featured_image: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all font-mono"
                          placeholder="https://images.unsplash.com/photo-..."
                          required
                        />
                      </div>

                      <RichTextarea
                        label="Synopsis / Summary"
                        id="news_synopsis"
                        value={formData.synopsis || ''}
                        onChange={(val) => setFormData((prev: any) => ({ ...prev, synopsis: val }))}
                        rows={4}
                        placeholder="Short summary of the news update..."
                      />

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 p-4 bg-slate-950/40 rounded-2xl border border-slate-850 flex-1">
                          <input 
                            type="checkbox" 
                            id="news_live"
                            checked={formData.is_live ?? true}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, is_live: e.target.checked }))}
                            className="w-4 h-4 text-sky-600 bg-slate-950 border-slate-800 rounded focus:ring-sky-500"
                          />
                          <label htmlFor="news_live" className="text-xs font-bold text-slate-300 select-none">Live / Active Announcement</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB TAB: SECTIONS */}
                  {activeSubTab === 'sections' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Content Sections</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newSecs = [...(formData.sections || []), { content: '', image_url: '' }]
                            setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold rounded-xl border border-slate-750 transition-all"
                        >
                          <Plus size={14} /> Add Content Block
                        </button>
                      </div>

                      {(formData.sections || []).length === 0 ? (
                        <div className="p-8 text-center bg-slate-950/20 border border-dashed border-slate-850 rounded-2xl">
                          <p className="text-slate-500 text-xs font-medium">No sections added yet. Click the button to add a visual content block.</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {(formData.sections || []).map((sec: any, idx: number) => (
                            <div key={idx} className="p-5 bg-slate-950/40 border border-slate-850 rounded-[24px] space-y-4 relative group">
                              <div className="flex items-center justify-between">
                                <span className="px-2.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 font-black text-[10px] rounded-lg">
                                  BLOCK #{idx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newSecs = (formData.sections || []).filter((_: any, sidx: number) => sidx !== idx)
                                    setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                                  }}
                                  className="text-red-400 hover:text-red-300 text-xs font-bold transition-all px-2.5 py-1 hover:bg-red-950/30 rounded-lg"
                                >
                                  Delete Block
                                </button>
                              </div>

                              <div>
                                <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-1.5">Section Image URL (Optional)</label>
                                <input 
                                  type="text"
                                  value={sec.image_url || ''}
                                  onChange={(e) => {
                                    const newSecs = [...formData.sections]
                                    newSecs[idx].image_url = e.target.value
                                    setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                                  }}
                                  className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-3 py-2.5 rounded-xl text-xs focus:outline-none transition-all font-mono"
                                  placeholder="https://images.unsplash.com/photo-..."
                                />
                              </div>

                              <RichTextarea
                                label="Section Content"
                                id={`news_sec_content_${idx}`}
                                value={sec.content || ''}
                                onChange={(val) => {
                                  const newSecs = [...formData.sections]
                                  newSecs[idx].content = val
                                  setFormData((prev: any) => ({ ...prev, sections: newSecs }))
                                }}
                                rows={6}
                                placeholder="Enter section body content..."
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUB TAB: SEO */}
                  {activeSubTab === 'seo' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">SEO Title</label>
                        <input 
                          type="text"
                          value={formData.seo_title || ''}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, seo_title: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                          placeholder="Search engine optimized title tag..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">SEO Meta Description</label>
                        <textarea 
                          value={formData.seo_description || ''}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, seo_description: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all font-sans"
                          rows={3}
                          placeholder="Short Google search snippet summary (150-160 characters)..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Keywords (comma separated)</label>
                        <input 
                          type="text"
                          value={formData.seo_keywords || ''}
                          onChange={(e) => setFormData((prev: any) => ({ ...prev, seo_keywords: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                          placeholder="jee main 2026, registration date, updates"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* === EDUCATIONAL ARTICLES FIELDS === */}
              {activeTab === 'articles' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Article Title</label>
                      <input 
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                        placeholder="Admission Roadmap Guide 2026..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Category Stream</label>
                      <select 
                        value={formData.category || 'btech'}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all select-none"
                      >
                        <option value="btech">B.Tech Engineering</option>
                        <option value="mba">MBA Management</option>
                        <option value="mtech">M.Tech Postgraduate</option>
                        <option value="mbbs">MBBS Medical</option>
                        <option value="bds">BDS Dental</option>
                        <option value="bsc nursing">B.Sc Nursing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Sub Category</label>
                      <input 
                        type="text"
                        value={formData.sub_category || ''}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, sub_category: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                        placeholder="Admission Guide / Prep Tips"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Tag badge</label>
                      <input 
                        type="text"
                        value={formData.tag || ''}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, tag: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                        placeholder="Must Read / Trending"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Read Time</label>
                      <input 
                        type="text"
                        value={formData.read_time || ''}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, read_time: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                        placeholder="12 min"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Author</label>
                      <input 
                        type="text"
                        value={formData.author || ''}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, author: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                        placeholder="Ritesh Rastogi"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Author Role</label>
                      <input 
                        type="text"
                        value={formData.author_role || ''}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, author_role: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all"
                        placeholder="MD & Founder"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Difficulty Level</label>
                      <select 
                        value={formData.level || 'beginner'}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, level: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all select-none"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-450 uppercase tracking-widest mb-2">Featured Image URL</label>
                    <input 
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData((prev: any) => ({ ...prev, image: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-sky-500 text-slate-200 px-4 py-3 rounded-2xl text-xs focus:outline-none transition-all font-mono"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>

                  <RichTextarea
                    label="Excerpt"
                    id="article_excerpt"
                    value={formData.excerpt || ''}
                    onChange={(val) => setFormData((prev: any) => ({ ...prev, excerpt: val }))}
                    rows={4}
                    placeholder="Enter a brief teaser or introduction segment..."
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-950/40 rounded-2xl border border-slate-850">
                      <input 
                        type="checkbox" 
                        id="art_featured"
                        checked={formData.is_featured || false}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, is_featured: e.target.checked }))}
                        className="w-4 h-4 text-sky-600 bg-slate-950 border-slate-800 rounded focus:ring-sky-500"
                      />
                      <label htmlFor="art_featured" className="text-xs font-bold text-slate-300 select-none">Mark as Featured</label>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-950/40 rounded-2xl border border-slate-850">
                      <input 
                        type="checkbox" 
                        id="art_hot"
                        checked={formData.is_hot || false}
                        onChange={(e) => setFormData((prev: any) => ({ ...prev, is_hot: e.target.checked }))}
                        className="w-4 h-4 text-sky-600 bg-slate-950 border-slate-800 rounded focus:ring-sky-500"
                      />
                      <label htmlFor="art_hot" className="text-xs font-bold text-slate-300 select-none">Mark as Hot Topic</label>
                    </div>
                  </div>
                </>
              )}

              {/* Form Save Action */}
              <button 
                type="submit" 
                className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-600/10 mt-6"
                disabled={loading}
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                {editingItem ? 'Update Database Entry' : 'Publish New Entry'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

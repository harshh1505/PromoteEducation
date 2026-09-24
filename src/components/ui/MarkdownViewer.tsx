'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { fixMarkdownBold } from '@/lib/utils'

interface MarkdownViewerProps {
  content: string
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {fixMarkdownBold(content)}
    </ReactMarkdown>
  )
}

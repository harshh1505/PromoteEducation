import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCTC(value: number | string | null | undefined): string {
  if (!value) return 'N/A'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num as number)) return value.toString()
  if (num >= 100) return `₹${num}Cr`
  return `₹${num}L`
}

export function formatFee(value: number | string | null | undefined): string {
  if (!value) return 'N/A'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num as number)) return value.toString()
  if (num < 1) return `₹${(num * 100).toFixed(0)}K`
  return `₹${num}L`
}

export function getTypeColor(type: string): string {
  switch (type) {
    case 'government': return 'gold'
    case 'private': return 'surface'
    case 'deemed': return 'surface'
    default: return 'surface'
  }
}

export function getTypeLabel(type: string): string {
  switch (type) {
    case 'government': return 'Govt. funded'
    case 'private': return 'Private'
    case 'deemed': return 'Deemed'
    default: return type
  }
}

export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  // Automatically convert Google Drive view links to direct image hotlink URLs
  const driveIdMatch = url.match(/(?:file\/d\/|id=|v\/|uc\?id=)([a-zA-Z0-9_-]{20,})/i);
  if (driveIdMatch && driveIdMatch[1] && url.includes('drive.google.com')) {
    // lh3.googleusercontent.com is much more reliable for image hotlinking than drive.google.com/uc
    return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}=w1000`;
  }

  return url;
}

export function fixMarkdownBold(text: string | null | undefined): string {
  if (!text) return '';
  
  // Resolve spacing issues around double asterisks.
  // Match bold tags within a line, correcting inside spacing and ensuring outside spacing to letters/numbers.
  return text.replace(/(\w)?\*\*([^*\r\n]+)\*\*(\w)?/g, (match, before, content, after) => {
    const trimmedContent = content.trim();
    const prefix = before ? `${before} ` : '';
    const suffix = after ? ` ${after}` : '';
    return `${prefix}**${trimmedContent}**${suffix}`;
  });
}

export function stripMarkdown(text: string | null | undefined): string {
  if (!text) return '';
  // Remove markdown headings, bold/italic, links, blockquotes, code blocks, lists, etc.
  return text
    .replace(/[#_*~`]/g, '')           // Basic symbols
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/^\s*>\s+/gm, '')         // Blockquotes
    .replace(/^\s*[-+*]\s+/gm, '')     // Unordered lists
    .replace(/^\s*\d+\.\s+/gm, '')     // Ordered lists
    .trim();
}

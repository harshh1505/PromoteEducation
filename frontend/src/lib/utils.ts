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
  if (num < 1) return `₹${(num * 100).toFixed(0)}K/yr`
  return `₹${num}L/yr`
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

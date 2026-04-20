import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCTC(value: number): string {
  if (value >= 100) return `₹${value}Cr`
  return `₹${value}L`
}

export function formatFee(value: number): string {
  if (value < 1) return `₹${(value * 100).toFixed(0)}K/yr`
  return `₹${value}L/yr`
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

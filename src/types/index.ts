export interface College {
  id: string
  name: string
  location: string
  state: string
  stream: string
  type: 'government' | 'private' | 'deemed'
  avgCTC: string
  totalFee: string
  verified: boolean
  image?: string
  logo?: string
  numCourses?: number
  establishmentYear?: number
  rating?: number
}

export interface Exam {
  id: string
  name: string
  fullName: string
  conductedBy: string
  date: string
  registrationDeadline: string
  stream: string
  level: 'national' | 'state' | 'university'
  applicants: string
}

export interface Review {
  id: string
  studentName: string
  initials: string
  college: string
  course: string
  year: number
  rating: number
  reviewText: string
  verified: boolean
  pros: string[]
  cons: string[]
}

export interface Testimonial {
  id: string
  studentName: string
  initials: string
  college: string
  course?: string
  year: number
  rating: number
  reviewText: string
  verified: boolean
  pros: string[]
  cons: string[]
}

export interface FilterOption {
  label: string
  value: string
}

export type Stream = 'all' | 'engineering' | 'medical' | 'mba' | 'law' | 'design' | 'arts'

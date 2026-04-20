export interface College {
  id: string
  name: string
  location: string
  state: string
  rank: number
  rankingBody: string
  stream: string
  type: 'government' | 'private' | 'deemed'
  avgCTC: number
  highestCTC: number
  cutoff: string
  cutoffExam: string
  tags: string[]
  accreditation: string[]
  established: number
  totalFee: number
  matchScore?: number
  admissionChance?: number
  verified: boolean
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

export interface FilterOption {
  label: string
  value: string
}

export type Stream = 'all' | 'engineering' | 'medical' | 'mba' | 'law' | 'design' | 'arts'

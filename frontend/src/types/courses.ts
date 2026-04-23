export interface CourseInfo {
  title: string
  fullName: string
  duration: string
  level: string
  avgSalary: string
  topRoles: string[]
  description: string
  eligibility: string[]
  curriculum: { year: string; subjects: string[] }[]
  topSpecializations: string[]
  specializationDetails?: { title: string; description: string }[]
  topColleges?: string[]
  skills?: string[]
  color: string
  icon: any
}

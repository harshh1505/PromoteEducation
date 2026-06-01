export interface MasterCourse {
  slug: string
  shortName: string
  fullName: string
  description: string
  duration: string
  level: 'UG' | 'PG'
  stream: string
}

export const MASTER_COURSES: Record<string, MasterCourse> = {
  btech: {
    slug: 'btech',
    shortName: 'B.Tech',
    fullName: 'Bachelor of Technology',
    description: 'A comprehensive undergraduate engineering degree focusing on technical and practical skills across various disciplines like Computer Science, Mechanical, and Civil Engineering.',
    duration: '4 Years',
    level: 'UG',
    stream: 'Engineering'
  },
  mba: {
    slug: 'mba',
    shortName: 'MBA',
    fullName: 'Master of Business Administration',
    description: 'A premier postgraduate degree in business management focusing on leadership, finance, marketing, and strategic operations.',
    duration: '2 Years',
    level: 'PG',
    stream: 'Management'
  },
  bba: {
    slug: 'bba',
    shortName: 'BBA',
    fullName: 'Bachelor of Business Administration',
    description: 'An undergraduate program designed to provide foundational knowledge in business management and entrepreneurial skills.',
    duration: '3 Years',
    level: 'UG',
    stream: 'Management'
  },
  bca: {
    slug: 'bca',
    shortName: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    description: 'An undergraduate degree focusing on software development, programming languages, and computing technologies.',
    duration: '3 Years',
    level: 'UG',
    stream: 'Computer Applications'
  },
  ba: {
    slug: 'ba',
    shortName: 'BA',
    fullName: 'Bachelor of Arts',
    description: 'A versatile undergraduate program exploring disciplines in humanities, social sciences, and liberal arts.',
    duration: '3 Years',
    level: 'UG',
    stream: 'Arts & Humanities'
  },
  bcom: {
    slug: 'bcom',
    shortName: 'B.Com',
    fullName: 'Bachelor of Commerce',
    description: 'An undergraduate degree focused on commerce, accounting, finance, and economics.',
    duration: '3 Years',
    level: 'UG',
    stream: 'Commerce'
  },
  bsc: {
    slug: 'bsc',
    shortName: 'B.Sc',
    fullName: 'Bachelor of Science',
    description: 'An undergraduate academic degree in science disciplines covering subjects like Physics, Chemistry, Mathematics, and Biology.',
    duration: '3 Years',
    level: 'UG',
    stream: 'Science'
  },
  mbbs: {
    slug: 'mbbs',
    shortName: 'MBBS',
    fullName: 'Bachelor of Medicine and Bachelor of Surgery',
    description: 'The premier undergraduate medical degree required to become a certified medical doctor.',
    duration: '5.5 Years',
    level: 'UG',
    stream: 'Medical'
  },
  mtech: {
    slug: 'mtech',
    shortName: 'M.Tech',
    fullName: 'Master of Technology',
    description: 'A postgraduate engineering master\'s degree focused on advanced technical specialization and research.',
    duration: '2 Years',
    level: 'PG',
    stream: 'Engineering'
  },
  mca: {
    slug: 'mca',
    shortName: 'MCA',
    fullName: 'Master of Computer Applications',
    description: 'A postgraduate degree emphasizing advanced software application development and enterprise computing.',
    duration: '2 Years',
    level: 'PG',
    stream: 'Computer Applications'
  },
  ma: {
    slug: 'ma',
    shortName: 'MA',
    fullName: 'Master of Arts',
    description: 'A postgraduate specialization in humanities, arts, or social sciences disciplines.',
    duration: '2 Years',
    level: 'PG',
    stream: 'Arts & Humanities'
  },
  mcom: {
    slug: 'mcom',
    shortName: 'M.Com',
    fullName: 'Master of Commerce',
    description: 'A postgraduate master\'s degree focusing on advanced commerce, accounting, and macroeconomic principles.',
    duration: '2 Years',
    level: 'PG',
    stream: 'Commerce'
  },
  msc: {
    slug: 'msc',
    shortName: 'M.Sc',
    fullName: 'Master of Science',
    description: 'A postgraduate program focused on advanced research and specialization in pure or applied sciences.',
    duration: '2 Years',
    level: 'PG',
    stream: 'Science'
  },
  llb: {
    slug: 'llb',
    shortName: 'LLB',
    fullName: 'Bachelor of Legislative Law',
    description: 'An undergraduate law degree providing the necessary foundational education to practice law.',
    duration: '3 Years',
    level: 'UG',
    stream: 'Law'
  },
  llm: {
    slug: 'llm',
    shortName: 'LLM',
    fullName: 'Master of Laws',
    description: 'An advanced postgraduate academic degree focusing on specialized legal practice and theory.',
    duration: '1-2 Years',
    level: 'PG',
    stream: 'Law'
  },
  bpharm: {
    slug: 'bpharm',
    shortName: 'B.Pharm',
    fullName: 'Bachelor of Pharmacy',
    description: 'An undergraduate degree in the field of pharmacy focusing on drug discovery, development, and dispensation.',
    duration: '4 Years',
    level: 'UG',
    stream: 'Pharmacy'
  },
  mpharm: {
    slug: 'mpharm',
    shortName: 'M.Pharm',
    fullName: 'Master of Pharmacy',
    description: 'A postgraduate degree focusing on advanced pharmaceutical sciences, clinical trials, and drug formulation.',
    duration: '2 Years',
    level: 'PG',
    stream: 'Pharmacy'
  },
  'medical-pg': {
    slug: 'medical-pg',
    shortName: 'Medical PG',
    fullName: 'Postgraduate Medical Degrees (MD/MS/Diploma)',
    description: 'Advanced medical specialization degrees taken after MBBS to practice as specialized physicians or surgeons.',
    duration: '2-3 Years',
    level: 'PG',
    stream: 'Medical'
  }
}

export const getAllMasterCourses = () => Object.values(MASTER_COURSES)
export const getMasterCourseBySlug = (slug: string) => MASTER_COURSES[slug]

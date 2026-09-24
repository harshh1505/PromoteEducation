import { supabase } from '@/lib/supabase'

export interface CourseSpecialisation {
  id?: string
  name: string
  slug?: string
  description?: string
  duration?: string
  avg_salary?: string
  display_order?: number
}

export interface CourseCareer {
  id?: string
  job_role: string
  industry?: string
  avg_salary?: string
  top_salary?: string
  top_recruiters?: string[]
  description?: string
  display_order?: number
}

export interface CourseExam {
  id?: string
  exam_name: string
  exam_slug?: string
  exam_level?: string
  conducting_body?: string
  exam_date?: string
  description?: string
  display_order?: number
}

export interface CourseFaq {
  id?: string
  question: string
  answer: string
  display_order?: number
}

export interface CourseData {
  id: string
  slug: string
  course_name: string
  short_name: string
  title: string
  short_description: string
  long_description: string
  category: string
  degree_type: string
  duration: string
  mode: string
  eligibility: string
  admission_process: string
  average_fees: string
  starting_salary?: string
  top_salary?: string
  display_order?: number
  status?: string
  featured?: boolean
  cover_image?: string
  icon_url?: string
  key_highlights?: Array<{ label: string; value: string; icon?: string }>
  fee_details?: {
    tuition_fees?: string
    hostel_fees?: string
    exam_fees?: string
    other_fees?: string
    total_estimated_cost?: string
  }
  admission_details?: {
    application_process?: string
    important_dates?: string
    counselling_info?: string
    documents_required?: string[]
  }
  placement_details?: {
    average_package?: string
    highest_package?: string
    median_package?: string
    placement_rate?: string
    top_recruiters?: string[]
  }
  specialisations?: CourseSpecialisation[]
  careers?: CourseCareer[]
  exams?: CourseExam[]
  faqs?: CourseFaq[]
  related_courses?: Array<{ slug: string; name: string; short_name: string }>
}

// Built-in curated dataset matching backend/courses_cms_schema.sql
export const FALLBACK_COURSES: Record<string, CourseData> = {
  'btech': {
    id: 'btech-core-001',
    slug: 'btech',
    course_name: 'Bachelor of Technology',
    short_name: 'B.Tech',
    title: 'B.Tech Admission 2026: Eligibility, Syllabus, Top Colleges, Fees & Scope',
    short_description: 'Bachelor of Technology (B.Tech) is India\'s flagship 4-year undergraduate professional engineering degree offering career opportunities across software, hardware, civil, and emerging tech sectors.',
    long_description: `Bachelor of Technology (B.Tech) is a comprehensive four-year undergraduate engineering degree designed to combine foundational scientific principles with advanced practical technical skills. Spanning eight semesters, the curriculum equips students with problem-solving capabilities, computational thinking, and hands-on laboratory experience.

B.Tech graduates form the core workforce driving global innovations in artificial intelligence, software engineering, aerospace, robotics, green energy, and sustainable infrastructure. Top institutions such as IITs, NITs, IIITs, and premier private universities deliver rigorous academic training with cutting-edge industry collaborations.`,
    category: 'Engineering & Technology',
    degree_type: 'Undergraduate (UG)',
    duration: '4 Years (8 Semesters)',
    mode: 'Full-Time',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 50% - 75% aggregate marks.',
    admission_process: 'National/State Entrance Examination (JEE Main, JEE Advanced, WBJEE, COMEDK, etc.) followed by Centralized Counseling (JoSAA / CSAB) or Institute-level rounds.',
    average_fees: '₹2.5 Lakhs - ₹10 Lakhs (Total)',
    starting_salary: '₹4.5 - ₹8 LPA',
    top_salary: '₹45 - ₹65+ LPA',
    status: 'published',
    featured: true,
    cover_image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200',
    key_highlights: [
      { label: 'Degree Level', value: 'Undergraduate (UG)' },
      { label: 'Program Duration', value: '4 Years (8 Semesters)' },
      { label: 'Top Exams', value: 'JEE Main, JEE Adv, WBJEE, BITSAT' },
      { label: 'Average Package', value: '₹6.5 - 12.5 LPA' },
      { label: 'Highest Package', value: '₹55+ LPA' },
      { label: 'Approved By', value: 'AICTE / UGC' }
    ],
    fee_details: {
      tuition_fees: '₹60,000 - ₹2,50,000 per year',
      hostel_fees: '₹40,000 - ₹1,20,000 per year',
      exam_fees: '₹3,000 - ₹8,000 per year',
      other_fees: '₹15,000 - ₹35,000 (One-time security & lab fee)',
      total_estimated_cost: '₹2,50,000 - ₹10,00,000'
    },
    admission_details: {
      application_process: 'Apply for relevant entrance exams (JEE Main / State CETs). After exam results, register for centralized counseling (JoSAA/CSAB/WBJEE/State bodies) and submit choices.',
      important_dates: 'JEE Main: Jan & April sessions; State CETs: April - June; Counseling: June - August.',
      counselling_info: 'JoSAA oversees admissions to IITs, NITs, IIITs, and GFTIs across 6 rounds. State quota counseling handles state government and private institutions.',
      documents_required: [
        'Class 10 & 12 Marksheets and Passing Certificates',
        'Entrance Exam Admit Card and Rank Card',
        'Category / Domicile Certificate (if applicable)',
        'Transfer & Character Certificate from previous institution',
        'Government Photo ID Proof (Aadhaar / Passport)'
      ]
    },
    placement_details: {
      average_package: '₹7.5 LPA',
      highest_package: '₹58 LPA',
      median_package: '₹6.8 LPA',
      placement_rate: '85% - 98% across top B-schools & engineering colleges',
      top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Tata Consultancy Services', 'Infosys', 'L&T', 'Qualcomm', 'Texas Instruments']
    },
    specialisations: [
      { name: 'Computer Science & Engineering', slug: 'cse', description: 'Algorithms, systems software, full-stack programming, and software development.', duration: '4 Years', avg_salary: '₹8.5 - 18 LPA' },
      { name: 'Artificial Intelligence & Machine Learning', slug: 'ai-ml', description: 'Deep learning, neural networks, natural language processing, and computer vision.', duration: '4 Years', avg_salary: '₹10 - 22 LPA' },
      { name: 'Data Science', slug: 'data-science', description: 'Big data systems, statistical computing, predictive modeling, and business analytics.', duration: '4 Years', avg_salary: '₹9 - 20 LPA' },
      { name: 'Electronics & Communication (ECE)', slug: 'ece', description: 'Semiconductors, VLSI chip design, embedded systems, and wireless communications.', duration: '4 Years', avg_salary: '₹7 - 16 LPA' },
      { name: 'Mechanical Engineering', slug: 'mechanical', description: 'Thermal systems, CAD/CAM, automotive engineering, manufacturing, and robotics.', duration: '4 Years', avg_salary: '₹5.5 - 12 LPA' },
      { name: 'Civil Engineering', slug: 'civil', description: 'Structural design, transportation, smart city planning, and environmental engineering.', duration: '4 Years', avg_salary: '₹5 - 10 LPA' }
    ],
    careers: [
      { job_role: 'Software Development Engineer (SDE)', industry: 'Information Technology & SaaS', avg_salary: '₹8.5 LPA', top_salary: '₹45+ LPA', top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Uber'], description: 'Designs, builds, and optimizes large-scale software systems and cloud backend architectures.' },
      { job_role: 'Data Scientist / ML Engineer', industry: 'Artificial Intelligence & Analytics', avg_salary: '₹11.5 LPA', top_salary: '₹50+ LPA', top_recruiters: ['Meta', 'NVIDIA', 'Walmart Labs', 'Adobe'], description: 'Builds machine learning models, neural networks, and scalable data analytics pipelines.' },
      { job_role: 'VLSI / Chip Design Engineer', industry: 'Semiconductors & Hardware', avg_salary: '₹12 LPA', top_salary: '₹38+ LPA', top_recruiters: ['Qualcomm', 'Intel', 'Texas Instruments', 'AMD'], description: 'Architects microscopic integrated circuits, microprocessors, and hardware accelerators.' },
      { job_role: 'Systems / Cloud Architect', industry: 'Enterprise Cloud & DevOps', avg_salary: '₹14 LPA', top_salary: '₹42+ LPA', top_recruiters: ['AWS', 'Microsoft Azure', 'Oracle Cloud', 'IBM'], description: 'Manages multi-region cloud infrastructures, Kubernetes clusters, and security policies.' }
    ],
    exams: [
      { exam_name: 'JEE Main', exam_slug: 'jee-main', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'Session 1: Jan | Session 2: April', description: 'The national gateway exam for admission to NITs, IIITs, GFTIs, and the prerequisite for JEE Advanced.' },
      { exam_name: 'JEE Advanced', exam_slug: 'jee-advanced', exam_level: 'National', conducting_body: 'IIT Organising Body', exam_date: 'May (Annual)', description: 'The elite entrance exam exclusively for admission to the Indian Institutes of Technology (IITs).' },
      { exam_name: 'WBJEE', exam_slug: 'wbjee', exam_level: 'State', conducting_body: 'West Bengal Joint Entrance Examinations Board', exam_date: 'April (Annual)', description: 'State engineering entrance examination for top institutions like Jadavpur University and Heritage.' },
      { exam_name: 'BITSAT', exam_slug: 'bitsat', exam_level: 'University', conducting_body: 'BITS Pilani', exam_date: 'May & June', description: 'Online computer-based test for BITS Pilani, Goa, and Hyderabad engineering campuses.' }
    ],
    faqs: [
      { question: 'What is the eligibility criteria for B.Tech in 2026?', answer: 'Candidates must have completed 10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 50% to 75% aggregate marks (75% for JEE Main IIT/NIT eligibility).' },
      { question: 'What is the average starting salary for a B.Tech graduate in India?', answer: 'The starting salary ranges from ₹4.5 LPA to ₹12 LPA on average, with top tier college graduates (IITs/NITs/BITS) regularly commanding packages between ₹20 LPA and ₹60+ LPA.' },
      { question: 'Can a non-science student pursue B.Tech?', answer: 'Under latest AICTE guidelines, certain interdisciplinary branches allow students with related subject combinations, but core branches (CSE, Mechanical, Electrical) strictly require Physics and Mathematics in Class 12.' },
      { question: 'Which B.Tech branch has the highest placement package?', answer: 'Computer Science & Engineering (CSE) and Artificial Intelligence & Machine Learning (AI & ML) consistently command the highest domestic and international compensation packages.' }
    ],
    related_courses: [
      { slug: 'bca', name: 'Bachelor of Computer Applications', short_name: 'BCA' },
      { slug: 'mtech', name: 'Master of Technology', short_name: 'M.Tech' },
      { slug: 'mca', name: 'Master of Computer Applications', short_name: 'MCA' },
      { slug: 'mba', name: 'Master of Business Administration', short_name: 'MBA' }
    ]
  },
  'mba': {
    id: 'mba-core-002',
    slug: 'mba',
    course_name: 'Master of Business Administration',
    short_name: 'MBA',
    title: 'MBA Admission 2026: CAT, Eligibility, Top Colleges, Fees & Placements',
    short_description: 'Master of Business Administration (MBA) is India\'s premiere 2-year postgraduate management degree delivering transformative leadership, strategy, finance, and entrepreneurial skills.',
    long_description: `The Master of Business Administration (MBA) is a globally recognized professional postgraduate credential designed to cultivate strategic leadership, organizational acumen, and managerial excellence. Over two years, candidates engage with real-world case studies, corporate internships, and multi-disciplinary coursework in marketing, finance, analytics, and organizational behavior.

Graduates step directly into mid-to-senior level roles in consulting, investment banking, technology product management, and FMCG corporate strategy. Premium institutions like IIMs, XLRI, FMS Delhi, and SPJIMR offer unmatched placement return on investment with active alumni networks worldwide.`,
    category: 'Management',
    degree_type: 'Postgraduate (PG)',
    duration: '2 Years (4 Semesters)',
    mode: 'Full-Time',
    eligibility: 'Bachelor\'s degree in any discipline with minimum 50% aggregate marks (45% for reserved categories).',
    admission_process: 'National Entrance Exam (CAT, XAT, CMAT, MAT, GMAT) followed by Written Ability Test (WAT), Group Discussion (GD), and Personal Interview (PI).',
    average_fees: '₹4 Lakhs - ₹25 Lakhs (Total)',
    starting_salary: '₹8.5 - ₹16 LPA',
    top_salary: '₹35 - ₹70+ LPA',
    status: 'published',
    featured: true,
    cover_image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
    key_highlights: [
      { label: 'Degree Level', value: 'Postgraduate (PG)' },
      { label: 'Program Duration', value: '2 Years (4 Semesters)' },
      { label: 'Top Exams', value: 'CAT, XAT, CMAT, MAT, SNAP' },
      { label: 'Average Package', value: '₹12.5 - 24.5 LPA' },
      { label: 'Highest Package', value: '₹65+ LPA' },
      { label: 'Approved By', value: 'AICTE / UGC / AACSB' }
    ],
    fee_details: {
      tuition_fees: '₹1,50,000 - ₹12,00,000 per year',
      hostel_fees: '₹60,000 - ₹1,80,000 per year',
      exam_fees: '₹5,000 - ₹15,000 per year',
      other_fees: '₹25,000 - ₹75,000 (Library, Alumni, Courseware)',
      total_estimated_cost: '₹4,00,000 - ₹25,00,000'
    },
    admission_details: {
      application_process: 'Register and appear for CAT/XAT/CMAT. Apply to individual B-schools using entrance percentiles. Attend GD/WAT/PI rounds upon shortlist call.',
      important_dates: 'CAT Registration: Aug - Sep; Exam: Nov; Results: Jan; GD-PI: Feb - April.',
      counselling_info: 'IIMs use CAP (Common Admission Process) or individual institute shortlists based on CAT percentile, academic diversity, and work experience.',
      documents_required: [
        'Graduation Marksheets & Degree Certificate',
        'Class 10 & 12 Certificates',
        'CAT / XAT / CMAT Scorecard',
        'Work Experience Letters & Salary Slips (if applicable)',
        'Valid Photo Identification Card'
      ]
    },
    placement_details: {
      average_package: '₹15.8 LPA',
      highest_package: '₹68 LPA',
      median_package: '₹14.2 LPA',
      placement_rate: '95% - 100%',
      top_recruiters: ['McKinsey & Company', 'Boston Consulting Group', 'Goldman Sachs', 'J.P. Morgan', 'Hindustan Unilever', 'Amazon', 'Deloitte']
    },
    specialisations: [
      { name: 'Finance & Banking', slug: 'finance', description: 'Investment banking, corporate valuation, portfolio management, and venture capital.', duration: '2 Years', avg_salary: '₹14 - 28 LPA' },
      { name: 'Marketing & Brand Strategy', slug: 'marketing', description: 'Digital growth marketing, brand management, consumer psychology, and market research.', duration: '2 Years', avg_salary: '₹12 - 24 LPA' },
      { name: 'Business Analytics & AI', slug: 'business-analytics', description: 'Data-driven business decisions, econometric modeling, and executive dashboarding.', duration: '2 Years', avg_salary: '₹15 - 30 LPA' },
      { name: 'Operations & Supply Chain', slug: 'operations', description: 'Global logistics, procurement, lean six sigma, and warehouse automation.', duration: '2 Years', avg_salary: '₹11 - 22 LPA' },
      { name: 'Human Resource Management', slug: 'hr', description: 'Talent acquisition, organizational development, compensation, and corporate culture.', duration: '2 Years', avg_salary: '₹10 - 18 LPA' }
    ],
    careers: [
      { job_role: 'Management Consultant', industry: 'Strategy & Consulting', avg_salary: '₹18 LPA', top_salary: '₹55+ LPA', top_recruiters: ['McKinsey & Co', 'BCG', 'Bain & Co', 'EY Parthenon'], description: 'Advises Fortune 500 leadership on corporate growth, digital transformation, and restructuring.' },
      { job_role: 'Investment Banking Associate', industry: 'Financial Services', avg_salary: '₹22 LPA', top_salary: '₹65+ LPA', top_recruiters: ['Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan'], description: 'Structures high-stakes mergers and acquisitions (M&A), IPOs, and corporate debt offerings.' },
      { job_role: 'Product Manager', industry: 'Technology & Startups', avg_salary: '₹19 LPA', top_salary: '₹48+ LPA', top_recruiters: ['Google', 'Microsoft', 'Flipkart', 'Swiggy'], description: 'Defines product roadmaps, user requirements, and leads cross-functional engineering teams.' }
    ],
    exams: [
      { exam_name: 'CAT', exam_slug: 'cat', exam_level: 'National', conducting_body: 'Indian Institutes of Management (IIMs)', exam_date: 'Last Sunday of November', description: 'India\'s premier management test accepted by all 21 IIMs, FMS Delhi, SPJIMR, and IIT B-schools.' },
      { exam_name: 'XAT', exam_slug: 'xat', exam_level: 'National', conducting_body: 'XLRI Jamshedpur', exam_date: 'First Sunday of January', description: 'High-repute exam accepted by XLRI, IMT Ghaziabad, XIMB, and over 160 associate management schools.' },
      { exam_name: 'CMAT', exam_slug: 'cmat', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'February / May', description: 'National-level testing exam accepted by over 1,300 AICTE-approved B-schools nationwide.' }
    ],
    faqs: [
      { question: 'Is work experience mandatory for MBA admission?', answer: 'No, work experience is not mandatory. Both fresh graduates and working professionals can apply. However, premier institutes like IIMs award additional selection weightage for relevant experience.' },
      { question: 'What is the difference between MBA and PGDM?', answer: 'MBA degrees are granted by universities recognized by UGC, while PGDM (Post Graduate Diploma in Management) diplomas are offered by autonomous institutes approved by AICTE. Both hold equivalent corporate and government recognition.' },
      { question: 'Which entrance exam is best for MBA in India?', answer: 'The Common Admission Test (CAT) is the most prestigious and widely accepted, opening admission to all 21 IIMs, FMS Delhi, SPJIMR, and top IIT Department of Management Studies.' }
    ],
    related_courses: [
      { slug: 'btech', name: 'Bachelor of Technology', short_name: 'B.Tech' },
      { slug: 'mca', name: 'Master of Computer Applications', short_name: 'MCA' }
    ]
  },
  'mbbs': {
    id: 'mbbs-core-003',
    slug: 'mbbs',
    course_name: 'Bachelor of Medicine, Bachelor of Surgery',
    short_name: 'MBBS',
    title: 'MBBS Admission 2026: NEET UG, Eligibility, Cutoffs, Colleges & Fees',
    short_description: 'Bachelor of Medicine and Bachelor of Surgery (MBBS) is the premier 5.5-year medical undergraduate degree qualifying students as licensed medical doctors in India.',
    long_description: `MBBS is the benchmark undergraduate medical program that equips students with clinical diagnostics, pharmacology, patient care, surgery fundamentals, and community health. The program spans 4.5 academic years followed by a mandatory 1-year rotating residential internship in accredited hospitals.

Admission to all medical colleges in India, including AIIMS, JIPMER, and state government medical colleges, is conducted strictly through the single-window National Eligibility cum Entrance Test (NEET UG). Graduates have diverse pathways into post-graduate specialization (MD/MS), civil medical services, hospital administration, and healthcare research.`,
    category: 'Medical',
    degree_type: 'Undergraduate (UG)',
    duration: '5.5 Years (Includes 1-Year Internship)',
    mode: 'Full-Time',
    eligibility: '10+2 with Physics, Chemistry, Biology/Biotechnology with minimum 50% aggregate (40% for SC/ST/OBC) and qualifying score in NEET UG.',
    admission_process: 'NEET UG qualified score followed by MCC All India Quota (15%) or State Medical Quota (85%) Centralized Counseling.',
    average_fees: '₹50,000 - ₹20 Lakhs (Government vs Private)',
    starting_salary: '₹6.5 - ₹12 LPA',
    top_salary: '₹25 - ₹45+ LPA',
    status: 'published',
    featured: true,
    cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
    key_highlights: [
      { label: 'Degree Level', value: 'Undergraduate (UG)' },
      { label: 'Program Duration', value: '5.5 Years (4.5 Yrs + 1 Yr Internship)' },
      { label: 'Mandatory Exam', value: 'NEET UG (National Single-Window)' },
      { label: 'Regulating Body', value: 'National Medical Commission (NMC)' },
      { label: 'Starting Stipend', value: '₹25,000 - ₹45,000/mo' },
      { label: 'Career Pathways', value: 'Clinical Practice, MD/MS Specialization' }
    ],
    fee_details: {
      tuition_fees: 'Govt: ₹5,000 - ₹50,000/yr | Private: ₹6,00,000 - ₹20,00,000/yr',
      hostel_fees: '₹25,000 - ₹1,50,000 per year',
      exam_fees: '₹5,000 - ₹12,00,000 per year',
      other_fees: '₹20,000 - ₹60,000 (Lab, Library, Hospital clinical charges)',
      total_estimated_cost: 'Govt: ₹50,000 - ₹2,50,000 | Private: ₹35,00,000 - ₹1,10,00,000'
    },
    admission_details: {
      application_process: 'Register for NEET UG through NTA portal. Appear for exam in May. Register on MCC.nic.in for 15% All India Quota and State Counseling Portals for 85% state quota.',
      important_dates: 'NEET UG Exam: May; Result: June; MCC Counseling: July - September.',
      counselling_info: 'Medical Counseling Committee (MCC) conducts 4 rounds of online counseling for AIQ, Deemed/Central Universities, AIIMS, and JIPMER.',
      documents_required: [
        'NEET UG Admit Card and Scorecard',
        'Class 10 & 12 Marksheets and Passing Certificates',
        'Provisional Allotment Letter from MCC/State Portal',
        'Identity Verification (Aadhaar / Voter ID / Passport)',
        'Medical Fitness Certificate & Domicile/Category Certificate'
      ]
    },
    placement_details: {
      average_package: '₹9.5 LPA',
      highest_package: '₹32 LPA',
      median_package: '₹8.8 LPA',
      placement_rate: '100% (High Clinical Demand)',
      top_recruiters: ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Medanta', 'Manipal Hospitals', 'Government Health Services']
    },
    specialisations: [
      { name: 'General Medicine', slug: 'general-medicine', description: 'Internal disease diagnosis, chronic illness management, and adult care.', duration: '3 Years (MD)', avg_salary: '₹14 - 26 LPA' },
      { name: 'General Surgery', slug: 'general-surgery', description: 'Operative surgical management of abdominal, vascular, and emergency traumas.', duration: '3 Years (MS)', avg_salary: '₹16 - 32 LPA' },
      { name: 'Pediatrics', slug: 'pediatrics', description: 'Medical diagnosis and healthcare treatment of infants, children, and adolescents.', duration: '3 Years (MD)', avg_salary: '₹12 - 24 LPA' }
    ],
    careers: [
      { job_role: 'Medical Officer / Resident Doctor', industry: 'Hospitals & Healthcare', avg_salary: '₹8.5 LPA', top_salary: '₹18+ LPA', top_recruiters: ['Apollo', 'Fortis', 'Max Healthcare'], description: 'Manages inpatient and outpatient clinical diagnosis, emergency triage, and treatment planning.' },
      { job_role: 'Clinical Research Physician', industry: 'Pharmaceutical & Clinical Trials', avg_salary: '₹12 LPA', top_salary: '₹28+ LPA', top_recruiters: ['Pfizer', 'Novartis', 'Cipla'], description: 'Oversees safety and efficacy monitoring in regulated pharmaceutical clinical trials.' }
    ],
    exams: [
      { exam_name: 'NEET UG', exam_slug: 'neet-ug', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'First Sunday of May', description: 'Mandatory single-window national examination for MBBS and BDS admissions throughout India.' }
    ],
    faqs: [
      { question: 'How many years does it take to complete an MBBS degree in India?', answer: 'An MBBS degree requires 5.5 years in total, consisting of 4.5 years of academic and clinical training followed by a compulsory 1-year paid rotating internship in a hospital.' },
      { question: 'Is NEET UG compulsory for MBBS admission in India?', answer: 'Yes. Under NMC regulations, qualifying NEET UG is 100% compulsory for admission to all government, private, deemed, and central medical universities across India, as well as for studying abroad.' }
    ],
    related_courses: [
      { slug: 'bds', name: 'Bachelor of Dental Surgery', short_name: 'BDS' }
    ]
  },
  'bds': {
    id: 'bds-core-004',
    slug: 'bds',
    course_name: 'Bachelor of Dental Surgery',
    short_name: 'BDS',
    title: 'BDS Admission 2026: NEET Cutoff, Eligibility, Top Colleges & Career Scope',
    short_description: 'Bachelor of Dental Surgery (BDS) is the primary 5-year dental education program in India qualifying students as professional dental surgeons and oral healthcare specialists.',
    long_description: `BDS is a five-year undergraduate professional healthcare program that trains students in oral anatomy, dental radiology, prosthodontics, periodontics, and oral maxillofacial surgery. It incorporates four academic years of classroom and clinical instruction alongside a mandatory 1-year rotatory clinical internship.

Governed by the Dental Council of India (DCI), admissions are granted solely through NEET UG. Dental graduates can operate private dental practices, work in multispecialty hospital dental wings, or pursue MDS (Master of Dental Surgery) for specialized orthodontics and surgical careers.`,
    category: 'Medical',
    degree_type: 'Undergraduate (UG)',
    duration: '5 Years (Includes 1-Year Internship)',
    mode: 'Full-Time',
    eligibility: '10+2 with Physics, Chemistry, Biology and English with minimum 50% aggregate marks and NEET UG qualification.',
    admission_process: 'NEET UG Score followed by MCC counseling for Central/Deemed Universities and State Dental Counseling.',
    average_fees: '₹1.5 Lakhs - ₹15 Lakhs (Total)',
    starting_salary: '₹4 - ₹7 LPA',
    top_salary: '₹18 - ₹30+ LPA',
    status: 'published',
    featured: true,
    cover_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200',
    key_highlights: [
      { label: 'Degree Level', value: 'Undergraduate (UG)' },
      { label: 'Program Duration', value: '5 Years (4 Yrs + 1 Yr Internship)' },
      { label: 'Governing Council', value: 'Dental Council of India (DCI)' },
      { label: 'Entrance Exam', value: 'NEET UG' },
      { label: 'Average Package', value: '₹5.5 - 9.5 LPA' },
      { label: 'Higher Studies', value: 'MDS (Master of Dental Surgery)' }
    ],
    fee_details: {
      tuition_fees: 'Govt: ₹15,000 - ₹50,000/yr | Private: ₹2,50,000 - ₹8,00,000/yr',
      hostel_fees: '₹30,000 - ₹1,20,000 per year',
      exam_fees: '₹4,000 - ₹10,000 per year',
      other_fees: '₹15,000 - ₹40,000 (Dental kit, materials & clinical charges)',
      total_estimated_cost: 'Govt: ₹1,50,000 - ₹3,00,000 | Private: ₹12,00,000 - ₹35,00,000'
    },
    admission_details: {
      application_process: 'Qualify NEET UG. Participate in MCC 15% AIQ rounds or respective State Medical/Dental counseling sessions.',
      important_dates: 'NEET UG: May; Counseling: July - October.',
      counselling_info: 'Both central and state counseling allocate seats based on NEET ranks and student preferred college selections.',
      documents_required: [
        'NEET Scorecard & Admit Card',
        'Class 10 & 12 Marksheets & Passing Certificates',
        'Seat Allotment Letter',
        'Government Photo ID Proof',
        'Caste/Domicile Certificate (if claiming reservation)'
      ]
    },
    placement_details: {
      average_package: '₹6.2 LPA',
      highest_package: '₹22 LPA',
      median_package: '₹5.5 LPA',
      placement_rate: '88%',
      top_recruiters: ['Clove Dental', 'Apollo Dental', 'Fortis Healthcare', 'Smile Care', 'Army Dental Corps', 'Private Practice']
    },
    specialisations: [
      { name: 'Orthodontics & Dentofacial Orthopedics', slug: 'orthodontics', description: 'Correction of teeth alignment, malocclusions, and jaw growth anomalies.', duration: '3 Years (MDS)', avg_salary: '₹12 - 25 LPA' },
      { name: 'Oral & Maxillofacial Surgery', slug: 'oral-surgery', description: 'Surgical treatment of diseases, injuries, and defects in the head, neck, face, and jaws.', duration: '3 Years (MDS)', avg_salary: '₹15 - 30 LPA' }
    ],
    careers: [
      { job_role: 'Dental Surgeon', industry: 'Dental Clinics & Hospitals', avg_salary: '₹6 LPA', top_salary: '₹20+ LPA', top_recruiters: ['Clove Dental', 'Apollo Dental'], description: 'Performs clinical dental exams, restorative tooth treatments, extractions, and root canals.' }
    ],
    exams: [
      { exam_name: 'NEET UG', exam_slug: 'neet-ug', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'First Sunday of May', description: 'Mandatory single-window national examination for all Dental Surgery admissions across India.' }
    ],
    faqs: [
      { question: 'Can BDS graduates perform surgeries?', answer: 'Yes, BDS graduates are trained oral and dental surgeons authorized to perform dental extractions, oral maxillofacial procedures, and periodontal surgeries.' },
      { question: 'What is the career scope after BDS?', answer: 'Graduates can establish private clinical dental clinics, work in corporate dental chains (like Clove Dental), join the Army Dental Corps, or pursue MDS for advanced orthodontic and cosmetic specialization.' }
    ],
    related_courses: [
      { slug: 'mbbs', name: 'Bachelor of Medicine, Bachelor of Surgery', short_name: 'MBBS' }
    ]
  },
  'bca': {
    id: 'bca-core-005',
    slug: 'bca',
    course_name: 'Bachelor of Computer Applications',
    short_name: 'BCA',
    title: 'BCA Admission 2026: Eligibility, Syllabus, Top Colleges, Fees & Placements',
    short_description: 'Bachelor of Computer Applications (BCA) is a high-demand 3-year undergraduate course focusing on software engineering, web technologies, database design, and cloud development.',
    long_description: `BCA is an intensive 3-year undergraduate program tailored for aspirants keen on establishing careers in the software industry without requiring an engineering degree. Spanning six semesters, the curriculum focuses on computer languages (C++, Java, Python), database management systems, data structures, web application architecture, and computer networking.

With India's booming IT, SaaS, and fintech sectors, BCA graduates enjoy widespread placement opportunities in full-stack development, mobile app engineering, QA testing, and systems administration. Many students choose to combine BCA with an MCA or professional cloud certifications for exponential salary growth.`,
    category: 'Computer Applications',
    degree_type: 'Undergraduate (UG)',
    duration: '3 Years (6 Semesters)',
    mode: 'Full-Time',
    eligibility: '10+2 in any stream (Science, Commerce, Arts) with Mathematics/Computer Science as a subject preferred and minimum 45% - 50% aggregate.',
    admission_process: 'Merit-based on Class 12 marks or University Entrance Tests (CUET UG, IPU CET, SET, etc.) followed by counseling.',
    average_fees: '₹1.5 Lakhs - ₹4.5 Lakhs (Total)',
    starting_salary: '₹3.5 - ₹6 LPA',
    top_salary: '₹15 - ₹25+ LPA',
    status: 'published',
    featured: true,
    cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
    key_highlights: [
      { label: 'Degree Level', value: 'Undergraduate (UG)' },
      { label: 'Program Duration', value: '3 Years (6 Semesters)' },
      { label: 'Key Exams', value: 'CUET UG, IPU CET, SET, Symbiosis' },
      { label: 'Average Package', value: '₹4.5 - 7.5 LPA' },
      { label: 'Highest Package', value: '₹22+ LPA' },
      { label: 'Degree Pathway', value: 'BCA + MCA or Direct IT Career' }
    ],
    fee_details: {
      tuition_fees: '₹40,000 - ₹1,40,000 per year',
      hostel_fees: '₹35,000 - ₹90,000 per year',
      exam_fees: '₹2,500 - ₹6,000 per year',
      other_fees: '₹10,000 - ₹25,000 (Computer Lab, Registration & Activity fee)',
      total_estimated_cost: '₹1,50,000 - ₹4,50,000'
    },
    admission_details: {
      application_process: 'Register for CUET UG or individual university portals. Submit Class 12 scores and program preferences. Attend counseling or merit selection.',
      important_dates: 'CUET UG: May; University Admissions: May - July.',
      counselling_info: 'State and central universities publish merit cutoff lists based on standardized test percentiles or Class 12 scores.',
      documents_required: [
        'Class 10 & 12 Marksheet & Passing Certificate',
        'Entrance Exam Scorecard (CUET / IPU CET)',
        'Transfer Certificate / Migration Certificate',
        'Aadhaar Card or Government Photo ID',
        'Passport Size Photographs'
      ]
    },
    placement_details: {
      average_package: '₹4.8 LPA',
      highest_package: '₹24 LPA',
      median_package: '₹4.2 LPA',
      placement_rate: '82%',
      top_recruiters: ['Tata Consultancy Services', 'Wipro', 'Infosys', 'Cognizant', 'Accenture', 'Capgemini', 'HCL Tech']
    },
    specialisations: [
      { name: 'Cloud Computing & DevOps', slug: 'cloud-devops', description: 'AWS, Azure cloud deployment, virtualization, containerization, and automated pipelines.', duration: '3 Years', avg_salary: '₹5 - 9 LPA' },
      { name: 'Data Analytics', slug: 'data-analytics', description: 'Python data science, business intelligence, SQL warehousing, and Tableau analytics.', duration: '3 Years', avg_salary: '₹5.5 - 10 LPA' },
      { name: 'Cyber Security', slug: 'cyber-security', description: 'Network protection, ethical hacking, digital forensics, and security audits.', duration: '3 Years', avg_salary: '₹6 - 12 LPA' }
    ],
    careers: [
      { job_role: 'Software Developer', industry: 'IT & Software Services', avg_salary: '₹4.5 LPA', top_salary: '₹16+ LPA', top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Accenture'], description: 'Develops, tests, and maintains responsive enterprise web and mobile applications.' },
      { job_role: 'Database Administrator', industry: 'Banking & Technology', avg_salary: '₹5.5 LPA', top_salary: '₹18+ LPA', top_recruiters: ['Oracle', 'Cognizant', 'IBM'], description: 'Designs and secures high-availability relational databases and cloud datastores.' }
    ],
    exams: [
      { exam_name: 'CUET UG', exam_slug: 'cuet-ug', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'May - June', description: 'Common entrance test for undergraduate admissions across Central, State, and Deemed Universities.' }
    ],
    faqs: [
      { question: 'Is BCA a good alternative to B.Tech CSE?', answer: 'Yes. BCA is a focused, cost-effective 3-year alternative centered purely on software development, web applications, and database management, with excellent placement pathways into IT giants.' },
      { question: 'Can I apply for BCA without Maths in 12th?', answer: 'Many recognized universities permit students from Arts or Commerce streams without Mathematics to enroll in BCA, provided they complete bridge computing courses during semester 1.' }
    ],
    related_courses: [
      { slug: 'mca', name: 'Master of Computer Applications', short_name: 'MCA' },
      { slug: 'btech', name: 'Bachelor of Technology', short_name: 'B.Tech' }
    ]
  },
  'mca': {
    id: 'mca-core-006',
    slug: 'mca',
    course_name: 'Master of Computer Applications',
    short_name: 'MCA',
    title: 'MCA Admission 2026: NIMCET, Eligibility, Top NITs, Fees & Placements',
    short_description: 'Master of Computer Applications (MCA) is an advanced 2-year postgraduate program designed to cultivate elite software engineers, system architects, and technical team leads.',
    long_description: `The Master of Computer Applications (MCA) is a comprehensive two-year postgraduate degree designed to produce high-caliber software engineering and computing professionals. Over four semesters, students master advanced algorithms, distributed cloud architectures, artificial intelligence, cybersecurity, and enterprise application frameworks.

Regulated by AICTE, admissions into top national institutions such as NITs are conducted through the premier NIMCET examination. MCA holders compete head-to-head with B.Tech CSE graduates for coveted Tier-1 software engineering and tech architect roles in global product firms.`,
    category: 'Computer Applications',
    degree_type: 'Postgraduate (PG)',
    duration: '2 Years (4 Semesters)',
    mode: 'Full-Time',
    eligibility: 'BCA / B.Sc. Computer Science / B.Tech or any graduate degree with Mathematics at 10+2 or Graduation level with minimum 50% aggregate.',
    admission_process: 'National Entrance (NIMCET, CUET PG, MAH MCA CET) followed by centralized counseling.',
    average_fees: '₹1.8 Lakhs - ₹5.5 Lakhs (Total)',
    starting_salary: '₹6.5 - ₹10 LPA',
    top_salary: '₹30 - ₹50+ LPA',
    status: 'published',
    featured: true,
    cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
    key_highlights: [
      { label: 'Degree Level', value: 'Postgraduate (PG)' },
      { label: 'Program Duration', value: '2 Years (4 Semesters)' },
      { label: 'Premier Exam', value: 'NIMCET (for NITs), CUET PG' },
      { label: 'Average Package', value: '₹8.5 - 14.5 LPA' },
      { label: 'Highest Package', value: '₹48+ LPA' },
      { label: 'Equivalence', value: 'Competes directly with B.Tech CSE' }
    ],
    fee_details: {
      tuition_fees: 'Govt/NITs: ₹60,000 - ₹1,20,000/yr | Private: ₹1,00,000 - ₹2,50,000/yr',
      hostel_fees: '₹35,000 - ₹90,000 per year',
      exam_fees: '₹3,000 - ₹7,000 per year',
      other_fees: '₹15,000 - ₹30,000 (Lab, Library & Placement charges)',
      total_estimated_cost: '₹1,80,000 - ₹5,50,000'
    },
    admission_details: {
      application_process: 'Register for NIMCET or CUET PG. Rank holders participate in national counseling for seat allocation across participating NITs and state universities.',
      important_dates: 'NIMCET: June; Results: late June; Counseling: July.',
      counselling_info: 'NIMCET counseling is conducted online across 3 main rounds followed by an institutional spot round.',
      documents_required: [
        'Graduation Degree & Semester Marksheets',
        'Class 10 & 12 Marksheets with Mathematics proof',
        'NIMCET / CUET PG Scorecard and Admit Card',
        'Category Certificate / Domicile (if applicable)',
        'Photo Identification Proof'
      ]
    },
    placement_details: {
      average_package: '₹9.2 LPA',
      highest_package: '₹52 LPA',
      median_package: '₹8.5 LPA',
      placement_rate: '92%',
      top_recruiters: ['Amazon', 'Microsoft', 'Oracle', 'Goldman Sachs', 'Cisco', 'Adobe', 'Cognizant', 'Infosys']
    },
    specialisations: [
      { name: 'Artificial Intelligence & Machine Learning', slug: 'ai-ml', description: 'Advanced neural networks, generative AI, LLM fine-tuning, and computer vision.', duration: '2 Years', avg_salary: '₹10 - 22 LPA' },
      { name: 'Enterprise Cloud Architecture', slug: 'cloud-architecture', description: 'Microservices, distributed architectures, serverless computing, and Kubernetes.', duration: '2 Years', avg_salary: '₹9 - 20 LPA' }
    ],
    careers: [
      { job_role: 'Lead Software Architect', industry: 'Product Engineering', avg_salary: '₹14 LPA', top_salary: '₹48+ LPA', top_recruiters: ['Amazon', 'Microsoft', 'Adobe'], description: 'Leads engineering teams in architecting high-scale distributed backend platforms.' }
    ],
    exams: [
      { exam_name: 'NIMCET', exam_slug: 'nimcet', exam_level: 'National', conducting_body: 'National Institutes of Technology', exam_date: 'June (Annual)', description: 'The premier national common entrance test for MCA admission across participating NIT campuses.' },
      { exam_name: 'CUET PG', exam_slug: 'cuet-pg', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'March (Annual)', description: 'National examination for postgraduate admissions into Central, State, and top private universities.' }
    ],
    faqs: [
      { question: 'Is MCA duration 2 years or 3 years now?', answer: 'As per AICTE revised guidelines, the MCA program duration across India has been officially reduced from 3 years to 2 years (4 semesters).' },
      { question: 'What is the average package for MCA graduates from NITs?', answer: 'Graduates from top NITs through NIMCET achieve average packages ranging from ₹10 LPA to ₹16 LPA, with top domestic packages exceeding ₹45 LPA.' }
    ],
    related_courses: [
      { slug: 'bca', name: 'Bachelor of Computer Applications', short_name: 'BCA' },
      { slug: 'btech', name: 'Bachelor of Technology', short_name: 'B.Tech' }
    ]
  }
}

/**
 * Fetch course by slug from Supabase, falling back to curated datasets.
 */
export async function getCourseBySlug(rawSlug: string): Promise<CourseData | null> {
  const slug = (rawSlug || '').toLowerCase().trim()

  try {
    // 1. Attempt query from Supabase courses table with all relations
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        specialisations:course_specialisations(*),
        careers:course_careers(*),
        exams:course_exams(*),
        faqs:course_faqs(*)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()

    if (!error && data && data.course_name) {
      // Sort relational arrays if present
      const specialisations = (data.specialisations || []).sort(
        (a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)
      )
      const careers = (data.careers || []).sort(
        (a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)
      )
      const exams = (data.exams || []).sort(
        (a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)
      )
      const faqs = (data.faqs || []).sort(
        (a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)
      )

      return {
        ...data,
        specialisations,
        careers,
        exams,
        faqs,
        related_courses: FALLBACK_COURSES[slug]?.related_courses || []
      }
    }
  } catch (err) {
    // If Supabase query fails during migration transition, fallback seamlessly
    console.warn(`Supabase course lookup fallback for '${slug}':`, err)
  }

  // 2. Return fallback curated dataset if available
  if (FALLBACK_COURSES[slug]) {
    return FALLBACK_COURSES[slug]
  }

  return null
}

/**
 * Fetch top colleges for a given course stream/category from existing colleges table
 */
export async function getCollegesForCourse(category: string, limit = 6) {
  try {
    let streamQuery = 'Engineering'
    const cat = (category || '').toLowerCase()
    if (cat.includes('management') || cat.includes('business')) streamQuery = 'Management'
    else if (cat.includes('medical') || cat.includes('health') || cat.includes('dental')) streamQuery = 'Medical'
    else if (cat.includes('computer') || cat.includes('application')) streamQuery = 'Engineering'
    else if (cat.includes('law')) streamQuery = 'Law'

    const { data, error } = await supabase
      .from('colleges')
      .select('id, name, short_name, slug, location, state, ranking, avg_ctc, total_fee, image_url, cover_image')
      .eq('is_active', true)
      .eq('stream', streamQuery)
      .order('ranking', { ascending: true, nullsFirst: false })
      .limit(limit)

    if (!error && data) {
      return data
    }
  } catch (err) {
    console.warn('Error fetching colleges for course:', err)
  }
  return []
}

/**
 * Fetch all available course slugs for sitemap & static params
 */
export async function getAllCourseSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('slug')
      .eq('status', 'published')

    if (!error && data && data.length > 0) {
      return Array.from(new Set(data.map((c: any) => c.slug).filter(Boolean)))
    }
  } catch (err) {
    console.warn('Error fetching course slugs from Supabase:', err)
  }

  return Object.keys(FALLBACK_COURSES)
}

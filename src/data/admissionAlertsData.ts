export interface AdmissionAlert {
  id: string
  title: string
  examName: string
  examSlug?: string
  authority: string
  category: 'Engineering' | 'Medical' | 'Management' | 'Law' | 'Design' | 'Scholarships'
  type: 'Application' | 'Admit Card' | 'Exam Date' | 'Counselling' | 'Result' | 'Cutoff'
  urgency: 'urgent' | 'closing_soon' | 'active' | 'upcoming'
  badge: string
  deadline: string
  eventDate?: string
  postedDate: string
  summary: string
  keyHighlights: string[]
  officialUrl: string
  examUrl?: string
  isHot?: boolean
  isNew?: boolean
}

export const URGENT_DEADLINES = [
  {
    id: 'urgent-cat-2027',
    exam: 'CAT 2027',
    event: 'Registration & City Preference Window Closes',
    deadline: 'November 12, 2026',
    daysLeft: 5,
    category: 'Management',
    officialUrl: 'https://iimcat.ac.in',
    guideUrl: '/exams/cat',
    status: 'Closing Soon'
  },
  {
    id: 'urgent-clat-2027',
    exam: 'CLAT 2027',
    event: 'Last Date for Online Application & Test Centre Choice',
    deadline: 'November 15, 2026',
    daysLeft: 8,
    category: 'Law',
    officialUrl: 'https://consortiumofnlus.ac.in',
    guideUrl: '/exams/clat',
    status: 'Final Window'
  },
  {
    id: 'urgent-inicet-2027',
    exam: 'INI CET Jan 2027',
    event: 'Admit Card & Centre Allotment Slips Released',
    deadline: 'Exam on Nov 15, 2026',
    daysLeft: 7,
    category: 'Medical',
    officialUrl: 'https://aiimsexams.ac.in',
    guideUrl: '/exams/ini-cet',
    status: 'Admit Card Live'
  },
  {
    id: 'urgent-jee-2027',
    exam: 'JEE Main 2027',
    event: 'Session 1 Information Brochure & Registration Portal',
    deadline: 'Opens Mid-November 2026',
    daysLeft: 12,
    category: 'Engineering',
    officialUrl: 'https://jeemain.nta.nic.in',
    guideUrl: '/exams/jee-main',
    status: 'Notification Out'
  }
]

export const ADMISSION_ALERTS: AdmissionAlert[] = [
  {
    id: 'alert-jee-main-2027',
    title: 'JEE Main 2027 Session 1 Registration Window Opening This Month',
    examName: 'JEE Main 2027',
    examSlug: 'jee-main',
    authority: 'National Testing Agency (NTA)',
    category: 'Engineering',
    type: 'Application',
    urgency: 'active',
    badge: 'REGISTRATION LIVE SOON',
    deadline: 'Late December 2026 (Expected)',
    eventDate: 'January 21 – 30, 2027 (Exam Session 1)',
    postedDate: 'Today, 10:30 AM',
    summary: 'NTA has issued the advance advisory for JEE Main 2027. Online application portal on jeemain.nta.nic.in goes live for B.Tech/B.Arch aspirants targeting IITs, NITs, and IIITs.',
    keyHighlights: [
      'Two sessions available: January 2027 and April 2027',
      'Aadhaar / DigiLocker verification mandatory during registration',
      'No change in syllabus from recent NTA rationalized framework',
      'Application fee: ₹1,000 (General Male) / ₹800 (Female/Reserved)'
    ],
    officialUrl: 'https://jeemain.nta.nic.in',
    examUrl: '/exams/jee-main',
    isHot: true,
    isNew: true
  },
  {
    id: 'alert-cat-2027',
    title: 'CAT 2027 Admit Card Download Live & Exam City Slip Published',
    examName: 'CAT 2027',
    examSlug: 'cat',
    authority: 'Indian Institutes of Management (IIM)',
    category: 'Management',
    type: 'Admit Card',
    urgency: 'closing_soon',
    badge: 'ADMIT CARD ACTIVE',
    deadline: 'Exam Date: Nov 29, 2026',
    eventDate: 'November 29, 2026',
    postedDate: '1 hour ago',
    summary: 'Registered candidates can now download their CAT 2027 hall tickets using their user ID and password. The exam will be held in 3 slots across 170 cities nationwide.',
    keyHighlights: [
      'Slot 1 (8:30 AM - 10:30 AM), Slot 2 (12:30 PM - 2:30 PM), Slot 3 (4:30 PM - 6:30 PM)',
      'Reporting time is strictly 90 minutes prior to exam commencement',
      'Admit card printout must be in colour with valid government photo ID',
      'Calculator provided on-screen for Quant/DILR sections'
    ],
    officialUrl: 'https://iimcat.ac.in',
    examUrl: '/exams/cat',
    isHot: true,
    isNew: true
  },
  {
    id: 'alert-neet-ug-2027',
    title: 'NEET UG 2027 Eligibility & Tie-Breaking Rules Circular Released',
    examName: 'NEET UG 2027',
    examSlug: 'neet-ug',
    authority: 'National Medical Commission (NMC) & NTA',
    category: 'Medical',
    type: 'Exam Date',
    urgency: 'active',
    badge: 'OFFICIAL NOTICE',
    deadline: 'Applications Open: Jan 2027',
    eventDate: 'May 2, 2027 (Single Shift Pen & Paper)',
    postedDate: 'Yesterday',
    summary: 'NMC has reaffirmed the revised tie-breaking regulations for NEET UG 2027 admissions into MBBS, BDS, AYUSH, and BVSc courses across India.',
    keyHighlights: [
      'Age limit: Minimum 17 years as on December 31, 2027; no upper age limit',
      'Subjects: Physics, Chemistry, Biology/Biotechnology & English',
      'Tie-breaking order: Biology marks > Chemistry > Physics > Computerized lottery',
      'Exam conducted in 13 languages in single offline shift'
    ],
    officialUrl: 'https://neet.nta.nic.in',
    examUrl: '/exams/neet-ug',
    isHot: true,
    isNew: false
  },
  {
    id: 'alert-clat-2027',
    title: 'CLAT 2027 Final Registration Extension & Sample Papers Available',
    examName: 'CLAT 2027',
    examSlug: 'clat',
    authority: 'Consortium of National Law Universities',
    category: 'Law',
    type: 'Application',
    urgency: 'closing_soon',
    badge: 'CLOSING SOON',
    deadline: 'November 15, 2026 (11:59 PM)',
    eventDate: 'December 6, 2026 (2:00 PM – 4:00 PM)',
    postedDate: '3 hours ago',
    summary: 'Consortium of NLUs has alerted aspirants that registration for CLAT 2027 (UG & PG) for admissions to 24 National Law Universities will permanently close on Nov 15.',
    keyHighlights: [
      'Offline pen-and-paper mode for 120 comprehension-based questions',
      'UG eligibility: 45% in Class 12 (40% for SC/ST); no upper age bar',
      'Admit cards scheduled for release on November 25, 2026',
      'Test centers allocated strictly on first-cum-first-served city preferences'
    ],
    officialUrl: 'https://consortiumofnlus.ac.in',
    examUrl: '/exams/clat',
    isHot: true,
    isNew: true
  },
  {
    id: 'alert-gate-2027',
    title: 'GATE 2027 Form Correction Window Open with Late Fee Waivers',
    examName: 'GATE 2027',
    examSlug: 'gate',
    authority: 'IIT Organizing Committee',
    category: 'Engineering',
    type: 'Application',
    urgency: 'active',
    badge: 'CORRECTION WINDOW OPEN',
    deadline: 'November 20, 2026',
    eventDate: 'February 6, 7, 13 & 14, 2027',
    postedDate: '2 days ago',
    summary: 'Candidates can now modify paper selection, exam city preferences, category details, and gender on the GOAPS candidate portal.',
    keyHighlights: [
      'Two-paper combination modifications permitted without penalties',
      'City change fee of ₹500 applicable per paper',
      'Exam will span 30 disciplines including Data Science and Artificial Intelligence',
      'Admit cards will be available for download starting January 3, 2027'
    ],
    officialUrl: 'https://gate2027.iitr.ac.in',
    examUrl: '/exams/gate',
    isHot: false,
    isNew: false
  },
  {
    id: 'alert-xat-2027',
    title: 'XAT 2027 Registration Open: XLRI Extends Test City Options to 100+ Centres',
    examName: 'XAT 2027',
    examSlug: 'xat',
    authority: 'XLRI Jamshedpur',
    category: 'Management',
    type: 'Application',
    urgency: 'active',
    badge: 'APPLICATIONS OPEN',
    deadline: 'December 10, 2026',
    eventDate: 'January 3, 2027 (2:00 PM – 5:30 PM)',
    postedDate: 'Yesterday',
    summary: 'Xavier Aptitude Test (XAT) 2027 portal is open for BM and HRM programs at XLRI and 250+ premier associate B-schools.',
    keyHighlights: [
      'Single registration fee covers XLRI and score sharing with partner schools',
      'Includes Decision Making, Verbal Ability, Quantitative Ability & GK',
      'Mock test links enabled on candidate dashboard for enrolled students',
      'No sectional time limit within Part 1 of the question paper'
    ],
    officialUrl: 'https://xatonline.in',
    examUrl: '/exams/xat',
    isHot: false,
    isNew: false
  },
  {
    id: 'alert-mcc-counselling-2027',
    title: 'MCC All India Quota: Special Stray Round Seat Allotment Results Published',
    examName: 'NEET Counselling',
    authority: 'Medical Counselling Committee (MCC / DGHS)',
    category: 'Medical',
    type: 'Counselling',
    urgency: 'urgent',
    badge: 'COUNSELLING LIVE',
    deadline: 'Reporting Closes in 48 Hours',
    eventDate: 'Ongoing Allocation',
    postedDate: '4 hours ago',
    summary: 'MCC has announced the provisional seat allotment for the final special stray vacancy round for MBBS/BDS AIQ seats across AIIMS, JIPMER, and Central Universities.',
    keyHighlights: [
      'Allotted candidates must upload original documents on intramcc portal',
      'Physical reporting at allotted medical colleges required by deadline',
      'Non-reporting will lead to forfeiture of security deposit and 1-year debarment',
      'State counseling cells instructed to sync joined-candidate lists'
    ],
    officialUrl: 'https://mcc.nic.in',
    examUrl: '/counselling',
    isHot: true,
    isNew: true
  },
  {
    id: 'alert-uceed-ceed-2027',
    title: 'UCEED & CEED 2027 Registration with Regular Fee Ending Soon',
    examName: 'UCEED 2027',
    examSlug: 'uceed',
    authority: 'IIT Bombay',
    category: 'Design',
    type: 'Application',
    urgency: 'closing_soon',
    badge: 'REGISTRATION CLOSING',
    deadline: 'November 18, 2026',
    eventDate: 'January 17, 2027',
    postedDate: '3 days ago',
    summary: 'IIT Bombay will conclude regular registrations for UCEED (B.Des at IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad, IIITDM Jabalpur) and CEED (M.Des).',
    keyHighlights: [
      'Late fee window open until November 25 with ₹500 additional fee',
      'Part A is computer-based; Part B is offline sketching and design aptitude',
      'Candidates can apply simultaneously for design institutes through UCEED score sharing',
      'Results to be declared on March 6, 2027'
    ],
    officialUrl: 'https://uceed.iitb.ac.in',
    examUrl: '/exams/uceed',
    isHot: false,
    isNew: false
  },
  {
    id: 'alert-bitsat-2027',
    title: 'BITSAT 2027 Session Dates Announced: Pilani, Goa & Hyderabad Campuses',
    examName: 'BITSAT 2027',
    examSlug: 'bitsat',
    authority: 'BITS Pilani',
    category: 'Engineering',
    type: 'Exam Date',
    urgency: 'upcoming',
    badge: 'DATES ANNOUNCED',
    deadline: 'Applications Open: Jan 2027',
    eventDate: 'Session 1: May 19–24, 2027 | Session 2: June 22–26, 2027',
    postedDate: '2 days ago',
    summary: 'Birla Institute of Technology and Science has outlined its two-session admission calendar for Integrated First Degree programmes for 2027-28.',
    keyHighlights: [
      'Aspirants can choose to appear in either Session 1, Session 2, or both',
      'Best score between the two sessions will be considered for final merit list',
      'Direct admission offered to Board Toppers of Central & State Boards',
      'PCM eligibility: 75% aggregate in Physics, Chemistry, and Math with min 60% in each'
    ],
    officialUrl: 'https://bitsadmission.com',
    examUrl: '/exams/bitsat',
    isHot: false,
    isNew: false
  },
  {
    id: 'alert-nsp-scholarship-2027',
    title: 'National Scholarship Portal (NSP 2026-27): Institute Verification Window Extended',
    examName: 'NSP Scholarships',
    authority: 'Ministry of Electronics & IT / Ministry of Education',
    category: 'Scholarships',
    type: 'Counselling',
    urgency: 'active',
    badge: 'DEADLINE EXTENSION',
    deadline: 'November 30, 2026',
    eventDate: 'Academic Year 2026-27 Disbursements',
    postedDate: 'Yesterday',
    summary: 'NSP has extended the timeline for Higher Education Institutions to complete biometric authentication and Level-1/Level-2 student application verification.',
    keyHighlights: [
      'Covers Central Sector Scheme, Post-Matric SC/ST/OBC, and Merit-cum-Means',
      'Aadhaar-seeded bank account mandatory for direct DBT benefit transfer',
      'Students can track status through One-Time Registration (OTR) credentials',
      'Eligible students receive ₹12,000 to ₹50,000 per annum depending on scheme'
    ],
    officialUrl: 'https://scholarships.gov.in',
    examUrl: '/scholarships',
    isHot: false,
    isNew: false
  },
  {
    id: 'alert-cuet-ug-2027',
    title: 'CUET UG 2027 Exam Structure Update: Hybrid Mode & Subject Cap Clarification',
    examName: 'CUET UG 2027',
    examSlug: 'cuet-ug',
    authority: 'University Grants Commission (UGC) & NTA',
    category: 'Management',
    type: 'Exam Date',
    urgency: 'upcoming',
    badge: 'POLICY UPDATE',
    deadline: 'Applications Open: Feb 2027',
    eventDate: 'May 15 – 31, 2027',
    postedDate: '3 days ago',
    summary: 'UGC has issued updated guidelines confirming hybrid mode (OMR + CBT) for high-registration domain subjects for admissions into 250+ central, state, and private universities.',
    keyHighlights: [
      'Maximum 6 test papers allowed per student across Languages, Domains, and General Test',
      'Normalized percentile scores used by Delhi University, BHU, JNU, and Jamia Millia',
      'No negative marking for unattempted questions; -1 for incorrect responses',
      'Syllabus strictly mapped to NCERT Class 12 curriculum'
    ],
    officialUrl: 'https://cuetug.nta.nic.in',
    examUrl: '/exams/cuet-ug',
    isHot: false,
    isNew: false
  },
  {
    id: 'alert-nift-2027',
    title: 'NIFT 2027 Entrance Exam Notification: Design & Fashion Tech Programs',
    examName: 'NIFT 2027',
    examSlug: 'nift',
    authority: 'National Institute of Fashion Technology & NTA',
    category: 'Design',
    type: 'Application',
    urgency: 'active',
    badge: 'APPLICATIONS OPEN',
    deadline: 'December 28, 2026',
    eventDate: 'February 7, 2027',
    postedDate: '4 days ago',
    summary: 'National Testing Agency has initiated registrations for B.Des, B.F.Tech, M.Des, M.F.M, and M.F.Tech across 18 NIFT campuses across India.',
    keyHighlights: [
      'GAT (General Ability Test) is computer-based; CAT (Creative Ability Test) is pen & paper',
      'Campus admission counseling based strictly on Common Merit Rank (CMR)',
      'Lateral entry scheme (NIFT NLEA) available for eligible diploma holders',
      'Situation test and personal interview scheduled for April 2027'
    ],
    officialUrl: 'https://nift.nta.ac.in',
    examUrl: '/exams/nift',
    isHot: false,
    isNew: false
  },
  {
    id: 'alert-ini-cet-2027',
    title: 'INI CET January 2027 Session: Examination City Slip & Protocol Released',
    examName: 'INI CET 2027',
    examSlug: 'ini-cet',
    authority: 'AIIMS New Delhi',
    category: 'Medical',
    type: 'Admit Card',
    urgency: 'closing_soon',
    badge: 'EXAM IN 7 DAYS',
    deadline: 'Exam: Nov 15, 2026',
    eventDate: 'November 15, 2026 (9:00 AM – 12:00 PM)',
    postedDate: '5 hours ago',
    summary: 'AIIMS New Delhi has published the candidate test centre verification portal for MD, MS, M.Ch (6 yrs), DM (6 yrs), and MDS admissions across 22 institutes of national importance.',
    keyHighlights: [
      'Covers AIIMS New Delhi & 21 other AIIMS, JIPMER Puducherry, NIMHANS, and PGIMER',
      'Admit card printout must include EUC (Exam Unique Code) bar code verification',
      'Results expected on November 21, 2026',
      'Seat allocation round 1 begins within 10 days of score release'
    ],
    officialUrl: 'https://aiimsexams.ac.in',
    examUrl: '/exams/ini-cet',
    isHot: true,
    isNew: true
  },
  {
    id: 'alert-ailet-2027',
    title: 'AILET 2027: Admit Cards Scheduled for Release on November 20',
    examName: 'AILET 2027',
    examSlug: 'ailet',
    authority: 'National Law University, Delhi (NLU Delhi)',
    category: 'Law',
    type: 'Admit Card',
    urgency: 'upcoming',
    badge: 'ADMIT CARD SCHEDULED',
    deadline: 'Exam Date: Dec 13, 2026',
    eventDate: 'December 13, 2026 (11:00 AM – 1:00 PM)',
    postedDate: '2 days ago',
    summary: 'NLU Delhi has confirmed that hall tickets for the All India Law Entrance Test (AILET 2027) for BA LLB (Hons), LLM, and Ph.D. will go live on nationallawuniversitydelhi.in.',
    keyHighlights: [
      '120-minute offline test comprising English, Logical Reasoning, and Current Affairs',
      'Total 123 seats available for BA LLB (Hons) at NLU Delhi',
      'Negative marking of 0.25 marks per wrong answer',
      'Cutoff ranks and first merit list will be published in January 2027'
    ],
    officialUrl: 'https://nationallawuniversitydelhi.in',
    examUrl: '/exams/ailet',
    isHot: false,
    isNew: false
  }
]

export const COUNSELLING_BOARDS = [
  {
    name: 'JoSAA / CSAB',
    fullForm: 'Joint Seat Allocation Authority & Central Seat Allocation Board',
    coverage: '23 IITs, 32 NITs, 26 IIITs & 38 GFTIs',
    exam: 'JEE Main & Advanced',
    status: '2027 Guidelines Ready',
    officialUrl: 'https://josaa.nic.in',
    badge: 'Engineering'
  },
  {
    name: 'MCC (DGHS)',
    fullForm: 'Medical Counselling Committee',
    coverage: '15% All India Quota, 100% Deemed/Central Univs, AIIMS, JIPMER, AMU, BHU',
    exam: 'NEET UG & NEET PG',
    status: 'AIQ Special Rounds Active',
    officialUrl: 'https://mcc.nic.in',
    badge: 'Medical'
  },
  {
    name: 'Consortium of NLUs',
    fullForm: 'Centralised Law Counselling Committee',
    coverage: '24 National Law Universities across India',
    exam: 'CLAT 2027',
    status: 'Application Active',
    officialUrl: 'https://consortiumofnlus.ac.in',
    badge: 'Law'
  },
  {
    name: 'State CET Cells',
    fullForm: 'Maharashtra CET, WBJEEB, KEA (Karnataka), ACPC (Gujarat)',
    coverage: 'State Government, Aided & Top Private Engineering/Medical Colleges',
    exam: 'MHT CET, WBJEE, KCET, GUJCET',
    status: '2027 Schedules Rolling Out',
    officialUrl: 'https://cetcell.mahacet.org',
    badge: 'State Admissions'
  }
]

export const ROADMAP_TIMELINE = [
  {
    quarter: 'Q4 2026 (Oct – Dec 2026)',
    title: 'Autumn Registrations & Premier Exam Kickoff',
    items: [
      'CAT 2027 MBA Entrance Exam (Nov 29, 2026)',
      'CLAT 2027 Law Exam (Dec 6, 2026) & AILET (Dec 13, 2026)',
      'INI CET Jan 2027 Session for AIIMS & JIPMER (Nov 15, 2026)',
      'JEE Main 2027 Session 1 Application Window Opens',
      'NMAT 2027 & SNAP 2027 Test Delivery Windows'
    ]
  },
  {
    quarter: 'Q1 2027 (Jan – Mar 2027)',
    title: 'Winter National Entrances & Board Convergence',
    items: [
      'JEE Main 2027 Session 1 Exam (Jan 21 – 30, 2027)',
      'XAT 2027 (Jan 3, 2027) & UCEED/CEED 2027 (Jan 17, 2027)',
      'GATE 2027 Engineering Exam (Feb 6–14, 2027)',
      'NIFT 2027 Design Entrance (Feb 7, 2027)',
      'NEET UG 2027 Application Form Release (Jan/Feb 2027)'
    ]
  },
  {
    quarter: 'Q2 2027 (Apr – June 2027)',
    title: 'Mega Entrance Peak & High-Stakes Tests',
    items: [
      'JEE Main 2027 Session 2 (Apr 3 – 12, 2027)',
      'WBJEE, VITEEE & SRMJEEE Engineering Tests (April 2027)',
      'NEET UG 2027 Medical Entrance (May 2, 2027)',
      'CUET UG 2027 Nationwide University Testing (May 15–31, 2027)',
      'JEE Advanced 2027 for IITs (May 23, 2027)',
      'BITSAT 2027 Sessions 1 & 2 (May & June 2027)'
    ]
  },
  {
    quarter: 'Q3 2027 (June – Aug 2027)',
    title: 'National Counselling & Seat Allocation Rounds',
    items: [
      'JoSAA 2027 6-Round Choice Filling for IITs, NITs & IIITs',
      'MCC All India Medical Counselling (Round 1, 2, Mop-Up & Stray)',
      'State Engineering & Medical Merit Lists (MHT CET, KEA, WBJEE)',
      'CSAB Special Rounds for Vacant Engineering Seats',
      'College Reporting, Document Verification & Academic Session Onset'
    ]
  }
]

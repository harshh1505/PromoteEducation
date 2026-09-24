const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found in environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read fallback courses from courseService.ts by compiling or parsing
async function seed() {
  console.log('🌱 Starting Course CMS Data Seeding...\n');

  // Check if master courses table has the slug column
  const { data: testCheck, error: testErr } = await supabase
    .from('courses')
    .select('id, slug')
    .limit(1);

  if (testErr) {
    console.error('❌ Cannot query courses table:', testErr.message);
    console.log('\n👉 PLEASE RUN "backend/01_create_tables.sql" in your Supabase SQL Editor first!');
    console.log('   URL: https://supabase.com/dashboard/project/cnfmhdlkdjgnaqhngpin/sql\n');
    process.exit(1);
  }

  // Course dataset to seed
  const coursesToSeed = [
    {
      slug: 'btech',
      course_name: 'Bachelor of Technology',
      short_name: 'B.Tech',
      title: 'B.Tech Admission 2026: Eligibility, Syllabus, Top Colleges, Fees & Scope',
      short_description: 'Bachelor of Technology (B.Tech) is India\'s flagship 4-year undergraduate professional engineering degree offering career opportunities across software, hardware, civil, and emerging tech sectors.',
      long_description: 'Bachelor of Technology (B.Tech) is a comprehensive four-year undergraduate engineering degree designed to combine foundational scientific principles with advanced practical technical skills. Spanning eight semesters, the curriculum equips students with problem-solving capabilities, computational thinking, and hands-on laboratory experience.\n\nB.Tech graduates form the core workforce driving global innovations in artificial intelligence, software engineering, aerospace, robotics, green energy, and sustainable infrastructure. Top institutions such as IITs, NITs, IIITs, and premier private universities deliver rigorous academic training with cutting-edge industry collaborations.',
      category: 'Engineering & Technology',
      degree_type: 'Undergraduate (UG)',
      duration: '4 Years (8 Semesters)',
      mode: 'Full-Time',
      eligibility: '10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 50% - 75% aggregate marks.',
      admission_process: 'National/State Entrance Examination (JEE Main, JEE Advanced, WBJEE, COMEDK, etc.) followed by Centralized Counseling (JoSAA / CSAB) or Institute-level rounds.',
      average_fees: '₹2.5 Lakhs - ₹10 Lakhs (Total)',
      starting_salary: '₹4.5 - ₹8 LPA',
      top_salary: '₹45 - ₹65+ LPA',
      display_order: 1,
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
        tuition_fees: '₹50,000 - ₹2,50,000 per year',
        hostel_fees: '₹35,000 - ₹1,20,000 per year',
        exam_fees: '₹3,000 - ₹8,000 per year',
        other_fees: '₹15,000 - ₹40,000 (Lab, Library, Gymkhana)',
        total_estimated_cost: 'Govt: ₹2.5L - ₹4.5L | Private: ₹6L - ₹18L'
      },
      admission_details: {
        application_process: 'Apply for relevant entrance exams (JEE Main / State CETs). After exam results, register for centralized counseling (JoSAA/CSAB/WBJEE/State bodies) and submit choices.',
        important_dates: 'JEE Main: Jan & April sessions | State CETs: April - June | Counseling: June - August.',
        counselling_info: 'Joint Seat Allocation Authority (JoSAA) coordinates counseling for IITs, NITs, and IIITs across 6 rounds.',
        documents_required: [
          'Class 10 and 12 marksheets & certificates',
          'Entrance Exam Scorecard & Admit Card',
          'Provisional Seat Allotment Letter',
          'Category / Domicile / Income Certificate (if applicable)',
          'Transfer Certificate (TC) & Migration Certificate'
        ]
      },
      placement_details: {
        average_package: '₹6.5 - 12.5 LPA',
        highest_package: '₹1.2 Crore (International) / ₹58 LPA (Domestic)',
        median_package: '₹8.0 LPA',
        placement_rate: '85% - 98%',
        top_recruiters: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'L&T', 'Tata Motors']
      },
      specialisations: [
        { name: 'Computer Science & Engineering (CSE)', slug: 'cse', description: 'Software engineering, algorithms, system architecture, cloud platforms, and full stack engineering.', duration: '4 Years', avg_salary: '₹8 - ₹16 LPA', display_order: 1 },
        { name: 'Artificial Intelligence & Machine Learning (AI & ML)', slug: 'ai-ml', description: 'Deep learning, neural networks, computer vision, natural language processing, and LLM systems.', duration: '4 Years', avg_salary: '₹9 - ₹18 LPA', display_order: 2 },
        { name: 'Electronics & Communication Engineering (ECE)', slug: 'ece', description: 'VLSI circuit design, embedded systems, IoT architecture, 5G wireless networks, and robotics.', duration: '4 Years', avg_salary: '₹6 - ₹12 LPA', display_order: 3 },
        { name: 'Mechanical Engineering', slug: 'mechanical', description: 'Thermodynamics, robotics, automotive engineering, CAD/CAM manufacturing, and industrial automation.', duration: '4 Years', avg_salary: '₹5 - ₹9 LPA', display_order: 4 },
        { name: 'Civil Engineering', slug: 'civil', description: 'Structural analysis, smart transportation networks, environmental engineering, and BIM architecture.', duration: '4 Years', avg_salary: '₹4.5 - ₹8 LPA', display_order: 5 }
      ],
      careers: [
        { job_role: 'Software Development Engineer (SDE)', industry: 'Information Technology', avg_salary: '₹9 - ₹18 LPA', top_salary: '₹45+ LPA', top_recruiters: ['Google', 'Amazon', 'Microsoft', 'Adobe'], description: 'Design, develop, test, and deploy large-scale distributed software applications and web systems.', display_order: 1 },
        { job_role: 'Data Scientist / AI Engineer', industry: 'Data & Analytics', avg_salary: '₹10 - ₹20 LPA', top_salary: '₹50+ LPA', top_recruiters: ['Meta', 'Fractal', 'NVIDIA', 'Walmart Labs'], description: 'Build predictive machine learning pipelines, deep learning models, and automated business intelligence.', display_order: 2 },
        { job_role: 'Cloud & DevOps Architect', industry: 'Cloud Computing', avg_salary: '₹8 - ₹16 LPA', top_salary: '₹35+ LPA', top_recruiters: ['AWS', 'Microsoft Azure', 'Oracle', 'IBM'], description: 'Maintain CI/CD pipelines, container orchestration (Kubernetes), and multi-cloud infrastructure.', display_order: 3 },
        { job_role: 'VLSI & Embedded Systems Engineer', industry: 'Semiconductor & Hardware', avg_salary: '₹7 - ₹15 LPA', top_salary: '₹32+ LPA', top_recruiters: ['Qualcomm', 'Intel', 'Texas Instruments', 'AMD'], description: 'Design microchips, integrate firmware, and optimize silicon hardware for edge devices.', display_order: 4 }
      ],
      exams: [
        { exam_name: 'JEE Main', exam_slug: 'jee-main', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'Session 1: Jan | Session 2: Apr', description: 'Primary national entrance exam for admission into NITs, IIITs, CFTIs, and qualification for JEE Advanced.', display_order: 1 },
        { exam_name: 'JEE Advanced', exam_slug: 'jee-advanced', exam_level: 'National', conducting_body: 'IITs (Rotational)', exam_date: 'May (Annual)', description: 'Exclusive entrance exam for top 2,50,000 JEE Main rankers to secure admission into the 23 IITs.', display_order: 2 },
        { exam_name: 'WBJEE', exam_slug: 'wbjee', exam_level: 'State', conducting_body: 'WBJEEB', exam_date: 'April', description: 'West Bengal Joint Entrance Exam for premier engineering institutes including Jadavpur University.', display_order: 3 },
        { exam_name: 'BITSAT', exam_slug: 'bitsat', exam_level: 'University', conducting_body: 'BITS Pilani', exam_date: 'May - June', description: 'Computer-based entrance test for integrated degree programs at BITS Pilani, Goa, and Hyderabad.', display_order: 4 }
      ],
      faqs: [
        { question: 'What is the eligibility criteria for B.Tech in 2026?', answer: 'Candidates must have completed 10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 50% to 75% aggregate marks (75% for JEE Main IIT/NIT eligibility).', display_order: 1 },
        { question: 'What is the average starting salary for a B.Tech graduate in India?', answer: 'The starting salary ranges from ₹4.5 LPA to ₹12 LPA on average, with top tier college graduates (IITs/NITs/BITS) regularly commanding packages between ₹20 LPA and ₹60+ LPA.', display_order: 2 },
        { question: 'Can a non-science student pursue B.Tech?', answer: 'Under latest AICTE guidelines, certain interdisciplinary branches allow students with related subject combinations, but core branches (CSE, Mechanical, Electrical) strictly require Physics and Mathematics in Class 12.', display_order: 3 },
        { question: 'Which B.Tech branch has the highest placement package?', answer: 'Computer Science & Engineering (CSE) and Artificial Intelligence & Machine Learning (AI & ML) consistently command the highest domestic and international compensation packages.', display_order: 4 }
      ]
    },
    {
      slug: 'mba',
      course_name: 'Master of Business Administration',
      short_name: 'MBA',
      title: 'MBA Admission 2026: CAT Cutoffs, Eligibility, Syllabus, Top B-Schools & Placements',
      short_description: 'Master of Business Administration (MBA) is India\'s top 2-year postgraduate management qualification preparing future leaders in Finance, Marketing, Operations, and Business Analytics.',
      long_description: 'Master of Business Administration (MBA) is an internationally accredited two-year postgraduate degree designed to cultivate advanced managerial, analytical, and leadership acumen. Through case-study methodologies, live corporate consulting projects, and global immersion programs, students gain end-to-end expertise in enterprise operations.\n\nGraduates excel as management consultants, investment bankers, brand strategists, and executive business heads across multinational conglomerates, high-growth startups, and venture capital firms.',
      category: 'Management & Business',
      degree_type: 'Postgraduate (PG)',
      duration: '2 Years (4 Semesters / 6 Trimesters)',
      mode: 'Full-Time',
      eligibility: 'Bachelor\'s degree in any discipline with minimum 50% aggregate marks (45% for reserved categories). Final year students are also eligible.',
      admission_process: 'National Management Entrance Test (CAT, XAT, MAT, CMAT, SNAP, NMAT) followed by GD/WAT and Personal Interview (PI) rounds.',
      average_fees: '₹4.5 Lakhs - ₹25 Lakhs (Total)',
      starting_salary: '₹8 - ₹16 LPA',
      top_salary: '₹55 - ₹1.2 Crore LPA',
      display_order: 2,
      status: 'published',
      featured: true,
      cover_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200',
      key_highlights: [
        { label: 'Degree Level', value: 'Postgraduate (PG)' },
        { label: 'Program Duration', value: '2 Years' },
        { label: 'Top Entrance Exams', value: 'CAT, XAT, CMAT, MAT, SNAP' },
        { label: 'Average Package', value: '₹14 - 32 LPA (Top Tiers)' },
        { label: 'Highest Package', value: '₹1.15 Crore' },
        { label: 'Accreditation', value: 'AICTE / AACSB / AMBA / EQUIS' }
      ],
      fee_details: {
        tuition_fees: '₹1,50,000 - ₹11,00,000 per year',
        hostel_fees: '₹45,000 - ₹1,80,000 per year',
        exam_fees: '₹5,000 - ₹15,000 per year',
        other_fees: '₹25,000 - ₹80,000 (Case study libraries, Global immersion)',
        total_estimated_cost: 'Tier-1: ₹18L - ₹30L | Tier-2/3: ₹4.5L - ₹12L'
      },
      admission_details: {
        application_process: 'Register and appear for national MBA entrance exams (CAT/XAT/CMAT). Apply individually to targeted business schools. Shortlisted candidates undergo GD, WAT (Written Ability Test), and PI.',
        important_dates: 'CAT Registration: Aug - Sep | Exam: Nov | Results: Jan | GD-PI: Feb - April.',
        counselling_info: 'IIMs use CAP (Common Admission Process) or individual institute shortlists based on CAT percentile, academic diversity, work experience, and gender diversity points.',
        documents_required: [
          'Undergraduate Degree Marksheets & Provisional Degree Certificate',
          'Class 10 & 12 Marksheets',
          'Entrance Exam Scorecard (CAT/XAT/CMAT/MAT)',
          'Work Experience Certificates (if applicable)',
          'Identity Proof & Category Certificate'
        ]
      },
      placement_details: {
        average_package: '₹14.5 - 28.5 LPA (Top 30 B-Schools)',
        highest_package: '₹1.15 Crore (International) / ₹65 LPA (Domestic)',
        median_package: '₹16.0 LPA',
        placement_rate: '96% - 100%',
        top_recruiters: ['McKinsey & Co', 'BCG', 'Bain', 'Goldman Sachs', 'J.P. Morgan', 'HUL', 'Amazon']
      },
      specialisations: [
        { name: 'MBA in Finance', slug: 'finance', description: 'Investment banking, equity research, corporate treasury, risk management, and valuation.', duration: '2 Years', avg_salary: '₹12 - ₹24 LPA', display_order: 1 },
        { name: 'MBA in Marketing', slug: 'marketing', description: 'Brand management, digital customer acquisition, market research, and omnichannel retail.', duration: '2 Years', avg_salary: '₹10 - ₹22 LPA', display_order: 2 },
        { name: 'MBA in Business Analytics', slug: 'business-analytics', description: 'Data storytelling, predictive business modelling, SQL/Python analytics, and AI strategy.', duration: '2 Years', avg_salary: '₹14 - ₹26 LPA', display_order: 3 },
        { name: 'MBA in Human Resource Management (HRM)', slug: 'hrm', description: 'Strategic talent acquisition, executive coaching, compensation structuring, and industrial law.', duration: '2 Years', avg_salary: '₹9 - ₹18 LPA', display_order: 4 }
      ],
      careers: [
        { job_role: 'Management / Strategy Consultant', industry: 'Management Consulting', avg_salary: '₹18 - ₹32 LPA', top_salary: '₹60+ LPA', top_recruiters: ['McKinsey', 'BCG', 'Bain & Co', 'PwC Strategy&'], description: 'Advise Fortune 500 executives on operational transformation, corporate growth, and M&A.', display_order: 1 },
        { job_role: 'Investment Banker / Private Equity Associate', industry: 'Banking & Financial Services', avg_salary: '₹20 - ₹35 LPA', top_salary: '₹75+ LPA', top_recruiters: ['Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan'], description: 'Structure capital raises, execute initial public offerings (IPOs), and underwrite cross-border acquisitions.', display_order: 2 },
        { job_role: 'Product Manager', industry: 'Technology & E-Commerce', avg_salary: '₹16 - ₹30 LPA', top_salary: '₹55+ LPA', top_recruiters: ['Amazon', 'Google', 'Flipkart', 'Uber'], description: 'Lead cross-functional engineering, UX, and marketing teams to build digital SaaS and consumer apps.', display_order: 3 }
      ],
      exams: [
        { exam_name: 'CAT (Common Admission Test)', exam_slug: 'cat', exam_level: 'National', conducting_body: 'IIMs (Rotational)', exam_date: 'Last Sunday of November', description: 'Premier management entrance test for the 21 IIMs and over 1,200 Indian B-schools.', display_order: 1 },
        { exam_name: 'XAT (Xavier Aptitude Test)', exam_slug: 'xat', exam_level: 'National', conducting_body: 'XLRI Jamshedpur', exam_date: 'First Sunday of January', description: 'National exam for XLRI and 160+ leading partner business schools.', display_order: 2 },
        { exam_name: 'CMAT', exam_slug: 'cmat', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'May (Annual)', description: 'AICTE-approved entrance test accepted by over 1,000 top management institutions across India.', display_order: 3 }
      ],
      faqs: [
        { question: 'What is the minimum percentile required for IIM admissions in CAT?', answer: 'For older IIMs (Ahmedabad, Bangalore, Calcutta), general category candidates typically need 99+ percentile, though composite scores also account for 10th/12th/Graduation marks and work experience.', display_order: 1 },
        { question: 'Is work experience mandatory for pursuing an MBA in India?', answer: 'No, work experience is not strictly mandatory for standard 2-year full-time MBA/PGDM programs in India. Fresh graduates from all streams are eligible, though work experience grants additional composite score weightage.', display_order: 2 },
        { question: 'What is the key difference between MBA and PGDM in India?', answer: 'MBA is a degree awarded by universities or affiliated colleges, whereas PGDM is a postgraduate diploma offered by autonomous AICTE-approved institutions (e.g., IIMs, XLRI, SPJIMR). When AIU-accredited, PGDM holds complete equivalence to an MBA.', display_order: 3 }
      ]
    },
    {
      slug: 'mbbs',
      course_name: 'Bachelor of Medicine and Bachelor of Surgery',
      short_name: 'MBBS',
      title: 'MBBS Admission 2026: NEET UG, Cutoff, Fees, Top Medical Colleges & Career Path',
      short_description: 'Bachelor of Medicine and Bachelor of Surgery (MBBS) is India\'s gold-standard 5.5-year undergraduate medical degree qualifying candidates as licensed medical physicians.',
      long_description: 'Bachelor of Medicine and Bachelor of Surgery (MBBS) is the premier 5.5-year undergraduate medical degree in India that confers the title of Doctor upon graduation. Regulated by the National Medical Commission (NMC), the curriculum spans 4.5 years of preclinical, paraclinical, and clinical coursework followed by a mandatory 1-year rotatory clinical internship.\n\nMBBS graduates serve on the front lines of patient diagnostics, surgery, epidemiology, and specialized clinical care across governmental and private healthcare networks, or proceed to postgraduate specializations (MD/MS).',
      category: 'Medical',
      degree_type: 'Undergraduate (UG)',
      duration: '5.5 Years (4.5 Yrs Academic + 1 Yr Internship)',
      mode: 'Full-Time',
      eligibility: '10+2 with Physics, Chemistry, Biology/Biotechnology, and English with minimum 50% aggregate marks (40% for SC/ST/OBC) and valid NEET UG qualifying percentile.',
      admission_process: 'NEET UG qualified score followed by MCC All India Quota (15%) or State Medical Quota (85%) Centralized Counseling.',
      average_fees: '₹50,000 - ₹25 Lakhs (Per Year)',
      starting_salary: '₹6 - ₹12 LPA',
      top_salary: '₹35 - ₹60+ LPA',
      display_order: 3,
      status: 'published',
      featured: true,
      cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
      key_highlights: [
        { label: 'Degree Level', value: 'Undergraduate (UG)' },
        { label: 'Program Duration', value: '5.5 Years' },
        { label: 'Mandatory Exam', value: 'NEET UG' },
        { label: 'Governing Body', value: 'National Medical Commission (NMC)' },
        { label: 'Total MBBS Seats', value: '1,08,000+ (India)' },
        { label: 'Future Pathways', value: 'MD / MS / DNB / USMLE' }
      ],
      fee_details: {
        tuition_fees: 'Govt: ₹1,500 - ₹50,000/yr | Private: ₹8,00,000 - ₹25,00,000/yr',
        hostel_fees: '₹25,000 - ₹1,50,000 per year',
        exam_fees: '₹5,000 - ₹12,000 per year',
        other_fees: '₹20,000 - ₹60,000 (Lab, Library, Hospital clinical charges)',
        total_estimated_cost: 'Govt: ₹50,000 - ₹2,50,000 | Private: ₹35,00,000 - ₹1,10,00,000'
      },
      admission_details: {
        application_process: 'Register for NEET UG through NTA portal. Appear for exam in May. Register on MCC.nic.in for 15% All India Quota and State Counseling Portals for 85% state quota.',
        important_dates: 'NEET UG Exam: May | Result: June | MCC Counseling: July - September.',
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
        placement_rate: '100% (Clinical Fellowship / Junior Residency)',
        top_recruiters: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Medanta', 'Manipal Hospitals']
      },
      specialisations: [
        { name: 'General Medicine', slug: 'general-medicine', description: 'Non-surgical disease diagnosis, adult healthcare management, pathology evaluation, and preventative therapy.', duration: '5.5 Years', avg_salary: '₹8 - ₹14 LPA', display_order: 1 },
        { name: 'General Surgery', slug: 'general-surgery', description: 'Clinical surgical interventions, trauma management, wound care, and preoperative/postoperative patient care.', duration: '5.5 Years', avg_salary: '₹10 - ₹18 LPA', display_order: 2 },
        { name: 'Pediatrics', slug: 'pediatrics', description: 'Neonatal intensive care, infant development, childhood immunizations, and developmental medical diagnostics.', duration: '5.5 Years', avg_salary: '₹9 - ₹15 LPA', display_order: 3 },
        { name: 'Obstetrics & Gynecology (OB-GYN)', slug: 'ob-gyn', description: 'Maternal health, prenatal care, labor management, and comprehensive female reproductive healthcare.', duration: '5.5 Years', avg_salary: '₹10 - ₹20 LPA', display_order: 4 }
      ],
      careers: [
        { job_role: 'Junior Resident Doctor / Medical Officer', industry: 'Hospital & Healthcare', avg_salary: '₹8 - ₹14 LPA', top_salary: '₹22+ LPA', top_recruiters: ['Apollo', 'Max', 'Fortis', 'Govt Hospitals'], description: 'Provide emergency care, diagnostic consultations, ward management, and inpatient clinical monitoring.', display_order: 1 },
        { job_role: 'Clinical Research Physician', industry: 'Pharmaceutical & Clinical Trials', avg_salary: '₹10 - ₹18 LPA', top_salary: '₹30+ LPA', top_recruiters: ['Novartis', 'Pfizer', 'IQVIA', 'Sun Pharma'], description: 'Monitor novel pharmaceutical compound safety profiles, Phase I-IV trials, and regulatory compliance.', display_order: 2 },
        { job_role: 'Specialist Consultant (Post-MD/MS)', industry: 'Super-Specialty Healthcare', avg_salary: '₹20 - ₹45 LPA', top_salary: '₹80+ LPA', top_recruiters: ['Medanta', 'Narayana Health', 'Apollo'], description: 'Conduct complex surgeries, specialized inpatient treatments, and clinical department leadership.', display_order: 3 }
      ],
      exams: [
        { exam_name: 'NEET UG', exam_slug: 'neet-ug', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'First Sunday of May', description: 'Mandatory single-window national examination for MBBS and BDS admissions throughout India.', display_order: 1 }
      ],
      faqs: [
        { question: 'What is the total duration of the MBBS course in India?', answer: 'The total duration is 5.5 years, which includes 4.5 years of academic study divided into 9 semesters and 1 year of compulsory rotatory clinical internship.', display_order: 1 },
        { question: 'Is NEET UG compulsory for MBBS admission in India?', answer: 'Yes. Under NMC regulations, qualifying NEET UG is 100% compulsory for admission to all government, private, deemed, and central medical universities across India, as well as for studying abroad.', display_order: 2 },
        { question: 'What is the salary of an MBBS graduate during internship?', answer: 'Internship stipends vary widely: Central government institutes like AIIMS offer ₹25,000 to ₹30,000/month, state government colleges pay between ₹12,000 and ₹25,000/month, while private colleges provide nominal stipends.', display_order: 3 }
      ]
    },
    {
      slug: 'bds',
      course_name: 'Bachelor of Dental Surgery',
      short_name: 'BDS',
      title: 'BDS Admission 2026: NEET Cutoff, Eligibility, Top Colleges & Career Scope',
      short_description: 'Bachelor of Dental Surgery (BDS) is the primary 5-year dental education program in India qualifying students as professional dental surgeons and oral healthcare specialists.',
      long_description: 'BDS is a five-year undergraduate professional healthcare program that trains students in oral anatomy, dental radiology, prosthodontics, periodontics, and oral maxillofacial surgery. It incorporates four academic years of classroom and clinical instruction alongside a mandatory 1-year rotatory clinical internship.\n\nGoverned by the Dental Council of India (DCI), admissions are granted solely through NEET UG. Dental graduates can operate private dental practices, work in multispecialty hospital dental wings, or pursue MDS (Master of Dental Surgery) for specialized orthodontics and surgical careers.',
      category: 'Medical',
      degree_type: 'Undergraduate (UG)',
      duration: '5 Years (Includes 1-Year Internship)',
      mode: 'Full-Time',
      eligibility: '10+2 with Physics, Chemistry, Biology and English with minimum 50% aggregate marks and NEET UG qualification.',
      admission_process: 'NEET UG Score followed by MCC counseling for Central/Deemed Universities and State Dental Counseling.',
      average_fees: '₹1.5 Lakhs - ₹15 Lakhs (Total)',
      starting_salary: '₹4 - ₹7 LPA',
      top_salary: '₹18 - ₹30+ LPA',
      display_order: 4,
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
        tuition_fees: 'Govt: ₹15,000 - ₹60,000/yr | Private: ₹2,50,000 - ₹7,00,000/yr',
        hostel_fees: '₹30,000 - ₹1,20,000 per year',
        exam_fees: '₹4,000 - ₹10,000 per year',
        other_fees: '₹15,000 - ₹45,000 (Clinical instruments, Lab kits)',
        total_estimated_cost: 'Govt: ₹1L - ₹2.5L | Private: ₹12L - ₹28L'
      },
      admission_details: {
        application_process: 'Qualify NEET UG. Participate in MCC 15% AIQ rounds or respective State Medical/Dental counseling sessions.',
        important_dates: 'NEET UG: May | Counseling: July - October.',
        counselling_info: 'Both central and state counseling allocate seats based on NEET ranks and student preferred college selections.',
        documents_required: [
          'NEET Scorecard and Admit Card',
          '10th and 12th Marks Statements',
          'Provisional Allotment Letter',
          'Caste / PwD Certificate (if claiming quota)',
          'Valid Photo ID (Aadhaar / Passport)'
        ]
      },
      placement_details: {
        average_package: '₹5.5 LPA',
        highest_package: '₹18 LPA',
        median_package: '₹5.0 LPA',
        placement_rate: '92%',
        top_recruiters: ['Clove Dental', 'Apollo White Dental', 'Fortis Dental Clinics', 'Max Healthcare', 'Government PHCs']
      },
      specialisations: [
        { name: 'Orthodontics & Dentofacial Orthopedics', slug: 'orthodontics', description: 'Malocclusion correction, braces, aligners, and skeletal facial alignment procedures.', duration: '5 Years', avg_salary: '₹6 - ₹12 LPA', display_order: 1 },
        { name: 'Prosthodontics', slug: 'prosthodontics', description: 'Dental implants, dentures, crowns, bridges, and maxillofacial prosthetics.', duration: '5 Years', avg_salary: '₹5.5 - ₹10 LPA', display_order: 2 },
        { name: 'Oral and Maxillofacial Surgery', slug: 'oral-surgery', description: 'Tooth extractions, jaw reconstructions, trauma management, and facial pathology surgery.', duration: '5 Years', avg_salary: '₹7 - ₹15 LPA', display_order: 3 }
      ],
      careers: [
        { job_role: 'Dental Surgeon / Practitioner', industry: 'Healthcare & Clinical Practice', avg_salary: '₹5 - ₹10 LPA', top_salary: '₹25+ LPA', top_recruiters: ['Clove Dental', 'Apollo White Dental', 'Private Clinics'], description: 'Diagnose and treat dental cavities, periodontal disease, root canals, and cosmetic dental procedures.', display_order: 1 },
        { job_role: 'Oral Health Consultant / Hospital Dentist', industry: 'Hospital Care', avg_salary: '₹6 - ₹12 LPA', top_salary: '₹20+ LPA', top_recruiters: ['Max Healthcare', 'Fortis', 'Government Hospitals'], description: 'Provide inpatient oral hygiene care, coordinate surgical interventions with medical units.', display_order: 2 }
      ],
      exams: [
        { exam_name: 'NEET UG', exam_slug: 'neet-ug', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'First Sunday of May', description: 'Mandatory single-window national examination for all Dental Surgery admissions across India.', display_order: 1 }
      ],
      faqs: [
        { question: 'Is BDS a good career option compared to MBBS?', answer: 'Yes, BDS offers independent private practice opportunities with lower setup stress, regular clinic hours, and growing demand for cosmetic dentistry and orthodontics.', display_order: 1 },
        { question: 'What is the scope of higher education after BDS?', answer: 'Graduates can pursue MDS (Master of Dental Surgery) across 9 recognized specialties, pursue public health (MPH), hospital management (MHA), or clinical research.', display_order: 2 }
      ]
    },
    {
      slug: 'bca',
      course_name: 'Bachelor of Computer Applications',
      short_name: 'BCA',
      title: 'BCA Admission 2026: Eligibility, Syllabus, Top Colleges, Fees & Scope',
      short_description: 'Bachelor of Computer Applications (BCA) is a high-demand 3-year undergraduate course focusing on software programming, web development, and cloud computing.',
      long_description: 'Bachelor of Computer Applications (BCA) is a three-year undergraduate degree designed to develop strong foundations in computer systems, programming languages, database management, and web application development.\n\nRegarded as a practical alternative to B.Tech CSE, BCA equips students with industry-relevant skills in Python, Java, Full Stack Development, and Data Structures, opening doorways to leading IT services firms, product startups, or postgraduate MCA programs.',
      category: 'Information Technology',
      degree_type: 'Undergraduate (UG)',
      duration: '3 Years (6 Semesters)',
      mode: 'Full-Time',
      eligibility: '10+2 from any recognized board with minimum 45% - 50% aggregate marks (Mathematics/Computer Science preferred in some universities).',
      admission_process: 'Merit-based on Class 12 marks or Entrance Exams (CUET UG, IPU CET, SET, NIMSEE).',
      average_fees: '₹1.5 Lakhs - ₹5 Lakhs (Total)',
      starting_salary: '₹3.5 - ₹6 LPA',
      top_salary: '₹12 - ₹20+ LPA',
      display_order: 5,
      status: 'published',
      featured: true,
      cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
      key_highlights: [
        { label: 'Degree Level', value: 'Undergraduate (UG)' },
        { label: 'Program Duration', value: '3 Years (6 Semesters)' },
        { label: 'Key Subjects', value: 'Python, Java, DBMS, Web Tech, Cloud' },
        { label: 'Average Package', value: '₹4.5 - 7.5 LPA' },
        { label: 'Next Progression', value: 'MCA / M.Sc Computer Science' }
      ],
      fee_details: {
        tuition_fees: '₹30,000 - ₹1,20,000 per year',
        hostel_fees: '₹30,000 - ₹90,000 per year',
        exam_fees: '₹2,000 - ₹5,000 per year',
        other_fees: '₹10,000 - ₹25,000 (IT Lab, Software licenses)',
        total_estimated_cost: 'Govt: ₹60,000 - ₹1.5L | Private: ₹2.5L - ₹6L'
      },
      admission_details: {
        application_process: 'Apply directly via central/state university portals. Submit Class 12 scores and program preferences. Attend counseling or merit selection.',
        important_dates: 'CUET UG: May | University Admissions: May - July.',
        counselling_info: 'State and central universities publish merit cutoff lists based on standardized test percentiles or Class 12 scores.',
        documents_required: [
          'Class 10 & 12 Marksheets & Passing Certificates',
          'School Leaving Certificate (SLC) / Transfer Certificate',
          'Aadhaar / Identity Proof',
          'Category Certificate (if eligible)'
        ]
      },
      placement_details: {
        average_package: '₹4.8 LPA',
        highest_package: '₹15 LPA',
        median_package: '₹4.2 LPA',
        placement_rate: '88%',
        top_recruiters: ['TCS', 'Wipro', 'Infosys', 'Capgemini', 'Cognizant', 'Accenture', 'Tech Mahindra']
      },
      specialisations: [
        { name: 'Cloud Computing & Cyber Security', slug: 'cloud-security', description: 'Server administration, network penetration testing, AWS/Azure deployments, and threat remediation.', duration: '3 Years', avg_salary: '₹5 - ₹9 LPA', display_order: 1 },
        { name: 'Data Analytics', slug: 'data-analytics', description: 'Business intelligence, SQL querying, Python analytics, and interactive data visualization.', duration: '3 Years', avg_salary: '₹4.5 - ₹8 LPA', display_order: 2 },
        { name: 'Full Stack Web Development', slug: 'fullstack', description: 'React, Node.js, Next.js, relational and NoSQL database architecture.', duration: '3 Years', avg_salary: '₹5 - ₹10 LPA', display_order: 3 }
      ],
      careers: [
        { job_role: 'Web Developer / Software Engineer', industry: 'Information Technology', avg_salary: '₹4.5 - ₹8 LPA', top_salary: '₹16+ LPA', top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Startups'], description: 'Build responsive web apps, REST APIs, and client-side interfaces.', display_order: 1 },
        { job_role: 'Database Administrator', industry: 'Database & Infrastructure', avg_salary: '₹4 - ₹7.5 LPA', top_salary: '₹14+ LPA', top_recruiters: ['Cognizant', 'HCLTech', 'Accenture'], description: 'Manage relational database systems, ensure backup reliability, security, and query tuning.', display_order: 2 }
      ],
      exams: [
        { exam_name: 'CUET UG', exam_slug: 'cuet-ug', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'May - June', description: 'Common entrance test for undergraduate admissions across Central, State, and Deemed Universities.', display_order: 1 }
      ],
      faqs: [
        { question: 'Is Mathematics compulsory for BCA admission in India?', answer: 'Mathematics in 10+2 is compulsory in some universities (like IP University or Delhi University), but many state and private universities admit students from any stream (Arts, Commerce, Science) without 12th Math.', display_order: 1 },
        { question: 'What is the salary after completing BCA in India?', answer: 'Average starting salaries range from ₹3.5 LPA to ₹6 LPA in top IT service companies. With specializations in Cloud, Full Stack, or AI, packages can reach ₹8 - ₹12 LPA.', display_order: 2 }
      ]
    },
    {
      slug: 'mca',
      course_name: 'Master of Computer Applications',
      short_name: 'MCA',
      title: 'MCA Admission 2026: NIMCET, Syllabus, Top Colleges, Fees & Scope',
      short_description: 'Master of Computer Applications (MCA) is a premier 2-year postgraduate program engineered to develop advanced enterprise software engineers, systems architects, and AI developers.',
      long_description: 'Master of Computer Applications (MCA) is an intensive two-year postgraduate degree designed to bridge computational theory with cutting-edge industry software practices. Revamped by AICTE into a modern 2-year curriculum, the program covers advanced data structures, enterprise Java, microservices, cloud native architectures, and machine learning.\n\nGraduates command placement opportunities completely equivalent to B.Tech/M.Tech computer science engineers across global product and fintech corporations.',
      category: 'Information Technology',
      degree_type: 'Postgraduate (PG)',
      duration: '2 Years (4 Semesters)',
      mode: 'Full-Time',
      eligibility: 'BCA / B.Sc (Computer Science/IT) / B.Tech or graduation in any discipline with Mathematics at 10+2 or Graduation level with minimum 50% aggregate marks.',
      admission_process: 'National Entrance (NIMCET, CUET PG, MAH MCA CET) followed by centralized counseling.',
      average_fees: '₹1.8 Lakhs - ₹6.5 Lakhs (Total)',
      starting_salary: '₹5.5 - ₹10 LPA',
      top_salary: '₹25 - ₹45+ LPA',
      display_order: 6,
      status: 'published',
      featured: true,
      cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
      key_highlights: [
        { label: 'Degree Level', value: 'Postgraduate (PG)' },
        { label: 'Program Duration', value: '2 Years (AICTE Revised)' },
        { label: 'Top Entrance Exam', value: 'NIMCET, CUET PG' },
        { label: 'Average Package', value: '₹7 - 14 LPA (NITs)' },
        { label: 'Equivalent To', value: 'B.Tech / M.Tech Computer Science' }
      ],
      fee_details: {
        tuition_fees: '₹40,000 - ₹1,80,000 per year',
        hostel_fees: '₹35,000 - ₹1,00,000 per year',
        exam_fees: '₹3,000 - ₹8,000 per year',
        other_fees: '₹15,000 - ₹35,000 (Development & Library fees)',
        total_estimated_cost: 'NITs: ₹1.8L - ₹3L | Private: ₹3L - ₹7L'
      },
      admission_details: {
        application_process: 'Qualify NIMCET or state/central PG exams. High scorers participate in national counseling for seat allocation across participating NITs and state universities.',
        important_dates: 'NIMCET: June | Results: late June | Counseling: July.',
        counselling_info: 'NIMCET counseling is conducted online across 3 main rounds followed by an institutional spot round.',
        documents_required: [
          'Undergraduate Degree Certificate and Marksheets',
          'Class 10 & 12 Marksheets (verifying Math subject)',
          'NIMCET / CUET PG Scorecard and Admit Card',
          'Provisional Allotment Letter',
          'Category Certificate'
        ]
      },
      placement_details: {
        average_package: '₹7.5 LPA',
        highest_package: '₹48 LPA',
        median_package: '₹6.8 LPA',
        placement_rate: '94%',
        top_recruiters: ['Amazon', 'Microsoft', 'Oracle', 'Goldman Sachs', 'Samsung R&D', 'Cisco', 'Infosys']
      },
      specialisations: [
        { name: 'Artificial Intelligence & Machine Learning', slug: 'ai-ml', description: 'Advanced deep learning models, natural language processing, computer vision, and neural network optimization.', duration: '2 Years', avg_salary: '₹8 - ₹16 LPA', display_order: 1 },
        { name: 'Cloud Native & DevOps Engineering', slug: 'cloud-devops', description: 'Docker containerization, Kubernetes clusters, CI/CD automation, and cloud security frameworks.', duration: '2 Years', avg_salary: '₹7 - ₹14 LPA', display_order: 2 },
        { name: 'Enterprise Software & Microservices', slug: 'enterprise-software', description: 'Spring Boot, distributed cache architectures, Kafka message streaming, and distributed databases.', duration: '2 Years', avg_salary: '₹7 - ₹15 LPA', display_order: 3 }
      ],
      careers: [
        { job_role: 'Senior Software Development Engineer (SDE)', industry: 'Product & Enterprise Software', avg_salary: '₹10 - ₹20 LPA', top_salary: '₹45+ LPA', top_recruiters: ['Amazon', 'Oracle', 'Samsung', 'Paytm'], description: 'Architect, code, and scale core backend microservices and distributed database pipelines.', display_order: 1 },
        { job_role: 'Data Architect / Big Data Engineer', industry: 'Data Engineering', avg_salary: '₹9 - ₹18 LPA', top_salary: '₹38+ LPA', top_recruiters: ['Walmart', 'Cisco', 'JPMorgan', 'Adobe'], description: 'Build resilient data lakes, Spark transformations, and streaming pipelines.', display_order: 2 }
      ],
      exams: [
        { exam_name: 'NIMCET', exam_slug: 'nimcet', exam_level: 'National', conducting_body: 'National Institutes of Technology', exam_date: 'June (Annual)', description: 'The premier national common entrance test for MCA admission across participating NIT campuses.', display_order: 1 },
        { exam_name: 'CUET PG', exam_slug: 'cuet-pg', exam_level: 'National', conducting_body: 'National Testing Agency (NTA)', exam_date: 'March (Annual)', description: 'National examination for postgraduate admissions into Central, State, and top private universities.', display_order: 2 }
      ],
      faqs: [
        { question: 'What is the duration of MCA course now?', answer: 'The duration of the MCA course is now 2 years (4 semesters), revised from the older 3-year format by AICTE to align with global standards.', display_order: 1 },
        { question: 'Are MCA graduates placed with packages similar to B.Tech engineers?', answer: 'Yes. Top recruiters (Amazon, Microsoft, Oracle, Goldman Sachs) test candidates solely on Data Structures, Algorithms, and System Design without differentiating between MCA and B.Tech candidates. NIT MCA graduates regularly secure packages from ₹10 LPA to ₹45+ LPA.', display_order: 2 }
      ]
    }
  ];

  for (const c of coursesToSeed) {
    const { specialisations, careers, exams, faqs, ...courseData } = c;
    
    console.log(`⏳ Seeding course: ${courseData.short_name} (${courseData.slug})...`);

    // Upsert master course record
    const { data: insertedCourse, error: upsertErr } = await supabase
      .from('courses')
      .upsert(courseData, { onConflict: 'slug' })
      .select('id')
      .single();

    if (upsertErr) {
      console.error(`❌ Failed to upsert ${courseData.slug}:`, upsertErr.message);
      continue;
    }

    const courseId = insertedCourse.id;

    // Delete existing child records for this course to ensure clean state
    await supabase.from('course_specialisations').delete().eq('course_id', courseId);
    await supabase.from('course_careers').delete().eq('course_id', courseId);
    await supabase.from('course_exams').delete().eq('course_id', courseId);
    await supabase.from('course_faqs').delete().eq('course_id', courseId);

    // Insert specialisations
    if (specialisations && specialisations.length > 0) {
      const specRows = specialisations.map(s => ({ ...s, course_id: courseId }));
      const { error: specErr } = await supabase.from('course_specialisations').insert(specRows);
      if (specErr) console.warn(`   ⚠️ Error inserting specialisations:`, specErr.message);
      else console.log(`   ✅ Inserted ${specialisations.length} specialisations`);
    }

    // Insert careers
    if (careers && careers.length > 0) {
      const careerRows = careers.map(cr => ({ ...cr, course_id: courseId }));
      const { error: crErr } = await supabase.from('course_careers').insert(careerRows);
      if (crErr) console.warn(`   ⚠️ Error inserting careers:`, crErr.message);
      else console.log(`   ✅ Inserted ${careers.length} career pathways`);
    }

    // Insert exams
    if (exams && exams.length > 0) {
      const examRows = exams.map(e => ({ ...e, course_id: courseId }));
      const { error: exErr } = await supabase.from('course_exams').insert(examRows);
      if (exErr) console.warn(`   ⚠️ Error inserting exams:`, exErr.message);
      else console.log(`   ✅ Inserted ${exams.length} entrance exams`);
    }

    // Insert faqs
    if (faqs && faqs.length > 0) {
      const faqRows = faqs.map(f => ({ ...f, course_id: courseId }));
      const { error: fErr } = await supabase.from('course_faqs').insert(faqRows);
      if (fErr) console.warn(`   ⚠️ Error inserting faqs:`, fErr.message);
      else console.log(`   ✅ Inserted ${faqs.length} FAQs`);
    }
  }

  console.log('\n🎉 Finished seeding courses into Supabase!');
}

seed().catch(err => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});

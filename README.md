# PromoteEducation

PromoteEducation is a comprehensive educational platform designed to help students discover courses, compare colleges, view cutoffs, calculate loans, access counselling support, and make informed choices about their higher education journeys.

The platform integrates a modern Next.js frontend with Tailwind CSS, Framer Motion for premium animations, and a Supabase backend for robust data management, paired with Google Gemini AI for automated content generation and comparisons.

---

## 🚀 Key Features

- **Course Hub**: Browse and filter various degrees and specializations.
- **College Finder & Comparison**: Compare different colleges based on placements, fees, rankings, and cutoffs.
- **Cutoff Listings & Tools**: Real-time tools to check academic cutoffs and admission probabilities.
- **Interactive Tools**: 
  - Educational Loan Calculator
  - Personalized Counselling & Mentorship Booking
  - Admission Support Forms
- **Content Engine**: Automatically generates rich course overviews and comparisons using Google Gemini AI.
- **Sitemap & SEO Optimization**: Auto-generated dynamic sitemaps and robots settings for search engine discovery.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS
- **Animations**: Framer Motion
- **Icons & UI**: Lucide React
- **Data Visualization**: Recharts

### Backend & Database
- **Database**: PostgreSQL (via [Supabase](https://supabase.com/))
- **AI Integration**: Google Generative AI (Gemini API) & OpenAI API
- **Scripts**: Node.js automated scripts for database seeding, migrations, schema checks, and content generation.

---

## 📁 Project Structure

```bash
PromoteEducation/
├── backend/                  # Database scripts, SQL schemas, and AI content generators
│   ├── schema.sql            # Core database schema
│   ├── seed_data.sql         # Seed data for colleges, cutoffs, and placements
│   ├── generateContent.js    # Gemini AI integration script to seed descriptions
│   └── check_*.js            # Validation and health check utility scripts
│
├── frontend/                 # Next.js web application
│   ├── src/
│   │   ├── app/              # Next.js App Router (pages & api routes)
│   │   ├── components/       # Reusable React UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility configurations (e.g., Supabase client)
│   │   └── types/            # TypeScript type definitions
│   └── tailwind.config.ts    # Tailwind CSS styling configuration
│
└── README.md                 # Project documentation
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory (and optional `.env.local` inside `frontend/`) with the following environment variables:

```env
# Frontend (Next.js)
NEXT_PUBLIC_SUPABASE_URL=https://<your-supabase-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Backend (Supabase Admin & AI APIs)
SUPABASE_URL=https://<your-supabase-project-id>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
GEMINI_API_KEY=<your-google-gemini-api-key>
```

---

## 📦 Getting Started

### 1. Clone & Install Dependencies
First, navigate to each directory to install the required packages:

```bash
# Clone the repository and install Backend dependencies
cd backend
npm install

# Navigate to Frontend and install dependencies
cd ../frontend
npm install
```

### 2. Database Schema Setup
You can run the schema and seed scripts against your Supabase PostgreSQL instance:
1. Apply `backend/schema.sql` to set up tables and relationships.
2. Apply SQL seed files (e.g., `backend/seed_data.sql`, `backend/seed_courses.sql`) via the Supabase SQL Editor.

### 3. Run the Development Server
Navigate to the `frontend` directory and start the Next.js application:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
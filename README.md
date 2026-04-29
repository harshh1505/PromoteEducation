# Promote Education

A state-of-the-art, premium education platform designed to revolutionize college selection and admission support. Promote Education bridges the gap between students and their future institutions through data-driven insights and professional guidance.

---

## 🏛 Architecture Overview

Promote Education follows a modern **Full-Stack Serverless Architecture** designed for high performance, scalability, and security.

### 🌐 Frontend (Next.js 14)
The frontend is built with **Next.js 14** using the **App Router**, ensuring fast server-side rendering (SSR) and optimized client-side interactions.
- **Dynamic Routing**: Automatic page generation for thousands of colleges using `[slug]` patterns.
- **Modern UI/UX**: Built with **Tailwind CSS** for a sleek "Slate & Sky Blue" premium aesthetic.
- **Interactive Components**: Leveraging **Lucide Icons** and custom **Framer Motion** wrappers (like `ScrollReveal`) for a living, breathing interface.
- **Navigation**: Sophisticated mega-menus and sticky sidebars for seamless exploration across deep content hierarchies.

### ⚡ Backend & Database (Supabase)
We utilize **Supabase** (PostgreSQL) for a robust, real-time backend.
- **JSONB Content Engine**: A highly flexible schema using JSONB columns (`content`, `features`, `faqs`) to store unstructured editorial data, allowing for rapid content expansion without schema migrations.
- **Relational Integrity**: Structured tables for `colleges`, `courses`, `cutoffs`, `placements`, and `reviews` ensure data consistency.
- **Security**: Granular **Row Level Security (RLS)** policies protect student data and ensure administrative integrity.

---

## 🚀 Key Features

### 📅 Step-by-Step Selection
A flagship feature that visualizes the complex admission journey.
- **Data Source**: Fetched dynamically from `colleges.content->'selection_steps'`.
- **Logic**: Automatically adapts to specific institutional requirements (e.g., NEET vs JEE pathways).

### 🎓 Dynamic Admission Protocols
Fully editorial admission guides that synchronize instantly from Supabase.
- Supports rich-text descriptions and institution-specific entrance exam details.

### 🏢 Multi-Service Ecosystem
Dedicated specialized pages for:
- **Mentorship**: Career-defining student-mentor connections.
- **Scholarships**: Curated database of financial aid opportunities.
- **Counseling**: Professional psychological and academic guidance.
- **Consultation**: Direct expert advice for high-stakes decisions.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 14 (React 18) |
| **Database** | PostgreSQL (Supabase) |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Authentication** | Supabase Auth |
| **Deployment** | Vercel |

---

## 🏗 Setup & Installation

### Prerequisites
- Node.js (v18+)
- Supabase Project URL & Anon Key

### Environment Configuration
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Installation
```bash
# Clone the repository
git clone https://github.com/harshh1505/PromoteEducation.git

# Install Frontend dependencies
cd frontend
npm install

# Run the dev server
npm run dev
```

---

## 👤 Author
- **Harsh Singh** ([harshh1505](https://github.com/harshh1505))

---

## 📄 License
© 2026 Promote Education. All rights reserved.

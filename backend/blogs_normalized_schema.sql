-- ====================================================================
-- Consolidated normalized Blogs, Sections, and FAQs Migration Script
-- Run this complete script in your Supabase SQL Editor.
-- ====================================================================

-- 1. Drop existing tables if they exist
DROP TABLE IF EXISTS blog_faqs CASCADE;
DROP TABLE IF EXISTS blog_sections CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;

-- 2. Create Blogs table
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT,
    featured_image TEXT NOT NULL,
    category TEXT DEFAULT 'Education',
    author TEXT DEFAULT 'Promote Education Editorial',
    read_time INTEGER DEFAULT 5,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT[],
    featured BOOLEAN DEFAULT FALSE,
    is_live BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Blog Sections table (for normalized post layout content blocks)
CREATE TABLE blog_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    section_order INTEGER NOT NULL,
    heading TEXT,
    subheading TEXT,
    content TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(blog_id, section_order)
);

-- 4. Create Blog FAQs table
CREATE TABLE blog_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    faq_order INTEGER NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    UNIQUE(blog_id, faq_order)
);

-- 5. Create Performance Indexes
CREATE INDEX idx_blog_slug ON blogs(slug);
CREATE INDEX idx_blog_category ON blogs(category);
CREATE INDEX idx_blog_live ON blogs(is_live);
CREATE INDEX idx_blog_featured ON blogs(featured);
CREATE INDEX idx_blog_published ON blogs(published_at DESC);
CREATE INDEX idx_blog_sections_blog ON blog_sections(blog_id);
CREATE INDEX idx_blog_faq_blog ON blog_faqs(blog_id);

-- ====================================================================
-- Enable Row Level Security (RLS)
-- ====================================================================
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_faqs ENABLE ROW LEVEL SECURITY;

-- ====================================================================
-- RLS Read Policies (Allow everyone to browse published blogs, sections, & FAQs)
-- ====================================================================
CREATE POLICY "Allow public read access to blogs" ON public.blogs 
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to blog_sections" ON public.blog_sections 
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to blog_faqs" ON public.blog_faqs 
    FOR SELECT USING (true);

-- ====================================================================
-- RLS Write Policies (Allow CRUD access exclusively for administrators)
-- ====================================================================

-- Blogs table CRUD Policy
CREATE POLICY "Allow admin write access to blogs" ON public.blogs 
    FOR ALL 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE public.profiles.id = auth.uid()
            AND public.profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE public.profiles.id = auth.uid()
            AND public.profiles.role = 'admin'
        )
    );

-- Blog Sections table CRUD Policy
CREATE POLICY "Allow admin write access to blog_sections" ON public.blog_sections 
    FOR ALL 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE public.profiles.id = auth.uid()
            AND public.profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE public.profiles.id = auth.uid()
            AND public.profiles.role = 'admin'
        )
    );

-- Blog FAQs table CRUD Policy
CREATE POLICY "Allow admin write access to blog_faqs" ON public.blog_faqs 
    FOR ALL 
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE public.profiles.id = auth.uid()
            AND public.profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE public.profiles.id = auth.uid()
            AND public.profiles.role = 'admin'
        )
    );

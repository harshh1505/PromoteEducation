-- ====================================================================
-- Enable Admin Write Access for Blogs, News, and Articles in Supabase
-- Run this SQL in your Supabase SQL Editor to grant admin users write access.
-- ====================================================================

-- 1. Enable write access for public.profiles if the admin wants to modify profiles.
-- (By default, users can update their own profile, but this policy is for general admin control if needed.)

-- 2. Drop existing policies if any, to avoid duplication conflicts
DROP POLICY IF EXISTS "Allow admin write access to blogs" ON blogs;
DROP POLICY IF EXISTS "Allow admin write access to news_articles" ON news_articles;
DROP POLICY IF EXISTS "Allow admin write access to articles" ON articles;

-- 3. Create Policy for 'blogs' table
CREATE POLICY "Allow admin write access to blogs" ON blogs
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

-- 4. Create Policy for 'news_articles' table
CREATE POLICY "Allow admin write access to news_articles" ON news_articles
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

-- 5. Create Policy for 'articles' table
CREATE POLICY "Allow admin write access to articles" ON articles
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

-- ====================================================================
-- Utility: Script to assign the Admin role to a specific user
-- Replace 'your-user-uuid-here' with the actual user ID from Auth.users
-- ====================================================================
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = 'your-user-uuid-here';

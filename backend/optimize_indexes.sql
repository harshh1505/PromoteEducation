-- Ensure indexes exist for blogs table to optimize slugs, categorization, listing sorting and performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON public.blogs(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blogs_is_live ON public.blogs(is_live) WHERE is_live = true;

-- Ensure indexes exist for news_articles table to optimize dynamic route slugs, publication date sorting, and live flags
CREATE INDEX IF NOT EXISTS idx_news_articles_slug ON public.news_articles(slug);
CREATE INDEX IF NOT EXISTS idx_news_articles_created_at ON public.news_articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_published_at ON public.news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_is_live ON public.news_articles(is_live) WHERE is_live = true;

-- Ensure indexes exist for section table joins (to eliminate expensive joins/full-table scans on details page loads)
CREATE INDEX IF NOT EXISTS idx_blog_sections_blog_id ON public.blog_sections(blog_id);
CREATE INDEX IF NOT EXISTS idx_news_sections_article_id ON public.news_sections(article_id);
CREATE INDEX IF NOT EXISTS idx_blog_faqs_blog_id ON public.blog_faqs(blog_id);

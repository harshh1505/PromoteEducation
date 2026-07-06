require('dotenv').config({ path: 'frontend/.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { error: authErr } = await supabase.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  });
  console.log("Auth error:", authErr);

  const articleId = '5ceaf6ed-dcde-4029-ba9d-71b3e40be562'; // need a valid article id

  // First fetch an article
  const { data: articles } = await supabase.from('news_articles').select('id').limit(1);
  if (!articles || articles.length === 0) {
    console.log("No articles found");
    return;
  }
  const id = articles[0].id;

  const { data, error } = await supabase.from('news_sections').insert([{
    article_id: id,
    section_order: 1,
    content: "test content"
  }]);
  console.log("Insert news_sections error:", error);
}
check();

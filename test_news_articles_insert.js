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

  const { data, error } = await supabase.from('news_articles').insert([{
    heading: 'Test Heading',
    slug: 'test-heading-' + Date.now()
  }]);
  console.log("Insert news_articles error:", error);
}
check();

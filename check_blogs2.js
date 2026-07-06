require('dotenv').config({ path: 'frontend/.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_live', true)
    .order('published_at', { ascending: false });
  console.log("Error:", error);
  console.log("Data length:", data?.length);
  if (data?.length > 0) console.log("First item:", data[0].title);
}
check();

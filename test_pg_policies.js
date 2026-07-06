require('dotenv').config({ path: 'frontend/.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data, error } = await supabase.from('pg_policies').select('*').eq('tablename', 'news_sections');
  if (error) {
    // pg_policies might not be exposed via API, let's just use raw SQL via RPC or just query supabase directly
    // Wait, pg_policies is usually not exposed.
    console.log("Error querying pg_policies", error);
  } else {
    console.log("Policies for news_sections:", data);
  }
}
check();

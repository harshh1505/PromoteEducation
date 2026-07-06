require('dotenv').config({ path: 'frontend/.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  const { error: authErr } = await supabase.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  });
  console.log("Auth error:", authErr);
  
  const { data: user } = await supabase.auth.getUser();
  console.log("User UID:", user?.user?.id);

  const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.user?.id);
  console.log("Profiles output:", data, error);
}
check();

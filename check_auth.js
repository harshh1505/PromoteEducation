require('dotenv').config({ path: 'frontend/.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: users, error } = await supabase.auth.admin.listUsers();
  console.log("Users:", users?.users?.map(u => u.email));
  
  const { data: profiles } = await supabase.from('profiles').select('*');
  console.log("Profiles:", profiles);
}
check();

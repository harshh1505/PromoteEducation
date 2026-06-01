const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('master_courses').select('*').limit(5);
  if (error) {
    console.error('No master_courses table found or error:', error.message);
  } else {
    console.log(data);
  }
}
run();

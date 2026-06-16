const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('courses').select('degree, slug, course_name').in('degree', ['B.Tech', 'MBA', 'MBBS', 'BDS']).limit(20);
  if (error) console.error(error);
  else console.log(data);
}
run();

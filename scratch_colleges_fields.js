const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('colleges').select('*').limit(3);
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('Sample colleges properties:', Object.keys(data[0] || {}));
  console.log('Sample data (first college):', data[0]);

  // Let's count colleges with ranking and nirf_rank
  const { data: allColleges, error: err2 } = await supabase.from('colleges').select('id, name, ranking, nirf_rank, stream, location, state, ownership, type, total_fee');
  if (err2) {
    console.error('Error fetching all:', err2.message);
    return;
  }
  console.log('Total colleges:', allColleges.length);
  
  const hasRanking = allColleges.filter(c => c.ranking !== null);
  const hasNirf = allColleges.filter(c => c.nirf_rank !== null);
  
  console.log('Colleges with ranking column:', hasRanking.length);
  console.log('Colleges with nirf_rank column:', hasNirf.length);

  console.log('Sample ranking vs nirf_rank:');
  allColleges.slice(0, 10).forEach(c => {
    console.log(`College: ${c.name} | ranking: ${c.ranking} | nirf_rank: ${c.nirf_rank} | stream: ${c.stream} | location: ${c.location} | state: ${c.state}`);
  });

  // Unique streams
  const streams = [...new Set(allColleges.map(c => c.stream).filter(Boolean))];
  const states = [...new Set(allColleges.map(c => c.state).filter(Boolean))];
  const ownerships = [...new Set(allColleges.map(c => c.ownership).filter(Boolean))];
  const types = [...new Set(allColleges.map(c => c.type).filter(Boolean))];
  console.log('Unique streams:', streams);
  console.log('Unique states:', states);
  console.log('Unique ownerships:', ownerships);
  console.log('Unique types:', types);
}
run();

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'frontend/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function getBaseSlug(slug) {
  let base = slug.replace(/-\d+$/, '');
  const prefixes = [
    'department-of-management-studies-',
    'department-of-management-',
    'school-of-management-',
    'vinod-gupta-school-of-management-',
    'kiit-school-of-management-',
    'department-of-pharmacy-',
    'department-of-architecture-',
    'school-of-planning-and-architecture-',
    'department-of-business-',
    'institute-of-business-',
    'thapar-school-of-management-'
  ];
  for (const prefix of prefixes) {
    if (base.startsWith(prefix)) base = base.substring(prefix.length);
  }
  const suffixes = [
    '-sjmsom',
    '-dms',
    '-vgsom',
    '-som',
    '-mba',
    '-pharmacy',
    '-arch'
  ];
  for (const suffix of suffixes) {
    if (base.endsWith(suffix)) base = base.substring(0, base.length - suffix.length);
  }
  return base;
}

function getCollegeScore(c) {
  let score = 0;
  const nameLower = c.name.toLowerCase();
  
  // Department/School prefixes reduce score
  if (nameLower.includes('department of') || 
      nameLower.includes('school of') || 
      nameLower.includes('vinod gupta') || 
      nameLower.includes('rajiv gandhi') || 
      nameLower.includes('kiit school') || 
      nameLower.includes('thapar school') ||
      nameLower.includes('studies') ||
      nameLower.includes('business school') ||
      nameLower.includes('specialization')) {
    score -= 20;
  }
  
  // General/clean names have higher priority
  if (c.slug.match(/-\d+$/)) {
    score += 5; // e.g. -2 usually indicates the main one imported later
  }
  
  // Shorter names are usually cleaner
  score -= c.name.length * 0.1;
  
  return score;
}

async function run() {
  const { data: colleges, error } = await supabase.from('colleges').select('id, name, slug');
  if (error) {
    console.error(error);
    return;
  }

  const groups = {};
  colleges.forEach(c => {
    const base = getBaseSlug(c.slug);
    if (!groups[base]) groups[base] = [];
    groups[base].push(c);
  });

  console.log('--- MERGE PROJECTIONS ---');
  for (const [base, items] of Object.entries(groups)) {
    if (items.length > 1) {
      // Sort by score descending
      items.sort((a, b) => getCollegeScore(b) - getCollegeScore(a));
      const main = items[0];
      const duplicates = items.slice(1);
      
      console.log(`\nBase: ${base}`);
      console.log(`  [SURVIVOR/MAIN] Score: ${getCollegeScore(main).toFixed(1)} | Name: "${main.name}" | Slug: "${main.slug}" | ID: ${main.id}`);
      duplicates.forEach(d => {
        console.log(`  [DUPLICATE]    Score: ${getCollegeScore(d).toFixed(1)} | Name: "${d.name}" | Slug: "${d.slug}" | ID: ${d.id}`);
      });
    }
  }
}

run();

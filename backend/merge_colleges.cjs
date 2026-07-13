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
  
  if (c.slug.match(/-\d+$/)) {
    score += 5;
  }
  
  score -= c.name.length * 0.1;
  return score;
}

function cleanCollegeName(name) {
  return name.replace(/\s+\d+$/, '').trim();
}

async function mergeGroup(baseSlug, items) {
  // Sort items to find the survivor
  items.sort((a, b) => getCollegeScore(b) - getCollegeScore(a));
  const survivor = items[0];
  const duplicates = items.slice(1);

  console.log(`\nMerging group for base slug: "${baseSlug}"`);
  console.log(`  Survivor: "${survivor.name}" (ID: ${survivor.id}, Slug: ${survivor.slug})`);

  for (const dup of duplicates) {
    console.log(`  -> Merging duplicate: "${dup.name}" (ID: ${dup.id}, Slug: ${dup.slug})`);

    // A. Merge courses table (unique key: college_id, course_catalog_id)
    const { data: dupCourses } = await supabase.from('courses').select('*').eq('college_id', dup.id);
    if (dupCourses && dupCourses.length > 0) {
      for (const course of dupCourses) {
        const { data: existingCourse } = await supabase
          .from('courses')
          .select('id, fees, duration')
          .eq('college_id', survivor.id)
          .eq('course_catalog_id', course.course_catalog_id)
          .maybeSingle();

        if (existingCourse) {
          if (!existingCourse.fees && course.fees) {
            await supabase.from('courses').update({ fees: course.fees }).eq('id', existingCourse.id);
          }
          await supabase.from('courses').delete().eq('id', course.id);
        } else {
          await supabase.from('courses').update({ college_id: survivor.id }).eq('id', course.id);
        }
      }
    }

    // B. Merge placements table (unique key: college_id, year)
    const { data: dupPlacements } = await supabase.from('placements').select('*').eq('college_id', dup.id);
    if (dupPlacements && dupPlacements.length > 0) {
      for (const pl of dupPlacements) {
        const { data: existingPlacement } = await supabase
          .from('placements')
          .select('id')
          .eq('college_id', survivor.id)
          .eq('year', pl.year)
          .maybeSingle();

        if (existingPlacement) {
          await supabase.from('placements').delete().eq('id', pl.id);
        } else {
          await supabase.from('placements').update({ college_id: survivor.id }).eq('id', pl.id);
        }
      }
    }

    // C. Re-associate standard tables by simple update
    const simpleTables = [
      'cutoffs',
      'testimonials',
      'admission_support',
      'reviews',
      'similar_colleges',
      'college_relations'
    ];

    for (const table of simpleTables) {
      await supabase
        .from(table)
        .update({ college_id: survivor.id })
        .eq('college_id', dup.id);
    }

    // Special case for similar_colleges related_id
    await supabase.from('similar_colleges').update({ related_id: survivor.id }).eq('related_id', dup.id);

    // D. Delete the duplicate college record
    const { error: deleteErr } = await supabase.from('colleges').delete().eq('id', dup.id);
    if (deleteErr) {
      console.error(`  Failed to delete duplicate college ${dup.id}:`, deleteErr);
    } else {
      console.log(`  Deleted duplicate college: ${dup.name}`);
    }
  }

  // E. Update survivor's name and slug to the clean base slug & clean name
  const cleanName = cleanCollegeName(survivor.name);
  const { error: updateErr } = await supabase
    .from('colleges')
    .update({ 
      slug: baseSlug,
      name: cleanName
    })
    .eq('id', survivor.id);

  if (updateErr) {
    console.error(`  Failed to update survivor ${survivor.id} slug to "${baseSlug}":`, updateErr);
  } else {
    console.log(`  Updated survivor record to Name: "${cleanName}", Slug: "${baseSlug}"`);
  }
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

  console.log('Starting migration to merge duplicates...');
  for (const [base, items] of Object.entries(groups)) {
    if (items.length > 1) {
      await mergeGroup(base, items);
    }
  }
  console.log('\nMigration complete!');
}

run();

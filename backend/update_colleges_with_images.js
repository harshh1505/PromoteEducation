import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cnfmhdlkdjgnaqhngpin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZm1oZGxrZGpnbmFxaG5ncGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU2NTcxMywiZXhwIjoyMDkyMTQxNzEzfQ.MxNPt0jgaKTxtBdGNbw2ebaF0BhttNRqx3vcRWkQkEU'
);

// High-quality campus/building image mappings from Unsplash
const STREAM_IMAGES = {
  'Engineering': [
    'https://images.unsplash.com/photo-1562774053-701939374585?w=800', // Classic university brick
    'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=800', // Modern engineering campus
    'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800', // Ivy building
    'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800'  // Campus library
  ],
  'Management': [
    'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?w=800', // Business school courtyard
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800', // Professional building
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'  // Sleek business structure
  ],
  'Medical': [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800', // Clean medical facility
    'https://images.unsplash.com/photo-1586773860418-d3b3a998c65c?w=800', // Modern clinical building
    'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800'  // Hospital structure
  ],
  'Law': [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', // Law pillars
    'https://images.unsplash.com/photo-1505664194779-8bebcb95c539?w=800', // Courtroom library aesthetic
    'https://images.unsplash.com/photo-1453733190148-c44698c26588?w=800'  // Classic stone facade
  ],
  'Default': 'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800'
};

async function populateCoverImages() {
  console.log('Fetching all colleges...');
  const { data: colleges, error } = await supabase.from('colleges').select('id, name, stream, slug');
  if (error) {
    console.error('Error fetching colleges:', error.message);
    return;
  }

  console.log(`Found ${colleges.length} colleges. Populating cover images...`);
  
  let successCount = 0;
  for (let i = 0; i < colleges.length; i++) {
    const college = colleges[i];
    const stream = college.stream || 'Default';
    const images = STREAM_IMAGES[stream] || STREAM_IMAGES['Default'];
    // Deterministic selection based on index so the same college gets the same image
    const selectedImage = Array.isArray(images) ? images[i % images.length] : images;

    const { error: updateError } = await supabase
      .from('colleges')
      .update({ cover_image: selectedImage })
      .eq('id', college.id);

    if (updateError) {
      console.warn(`Failed to update ${college.name}: ${updateError.message}`);
    } else {
      successCount++;
    }
  }

  console.log(`Successfully updated ${successCount}/${colleges.length} colleges with cover images!`);
}

populateCoverImages();

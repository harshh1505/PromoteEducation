-- =============================================================
-- Migration: Add cover_image to colleges table
-- =============================================================

-- 1. Add the column if it does not already exist
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- 2. Populate the column with some initial Unsplash campus image mappings
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800' WHERE slug = 'iit-bombay';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=800' WHERE slug = 'iit-delhi';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800' WHERE slug = 'iit-madras';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800' WHERE slug = 'iit-kanpur';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800' WHERE slug = 'iit-kharagpur';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1525921429624-479b6c294548?w=800' WHERE slug = 'iit-roorkee';

UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=800' WHERE slug = 'nit-trichy';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800' WHERE slug = 'nit-warangal';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800' WHERE slug = 'nit-surathkal';

UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?w=800' WHERE slug = 'iim-ahmedabad';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800' WHERE slug = 'iim-bangalore';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800' WHERE slug = 'iim-calcutta';

UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=800' WHERE slug = 'bits-pilani';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800' WHERE slug = 'aiims-delhi';
UPDATE colleges SET cover_image = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800' WHERE slug = 'aiims-kalyani';

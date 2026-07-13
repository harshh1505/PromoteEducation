-- Migration to add bank_guarantee column to colleges table
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS bank_guarantee TEXT;

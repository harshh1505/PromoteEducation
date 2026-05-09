-- ============================================================
-- get_cutoff_distinct v2
-- Handles BOTH scalar cutoff columns AND the college name
-- (which lives in the `colleges` table, not in `cutoffs`).
-- Run this in your Supabase SQL Editor.
-- ============================================================

DROP FUNCTION IF EXISTS get_cutoff_distinct(TEXT, INT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT);

CREATE OR REPLACE FUNCTION get_cutoff_distinct(
  p_field TEXT,
  p_year INT DEFAULT NULL,
  p_course TEXT DEFAULT NULL,
  p_college_type TEXT DEFAULT NULL,
  p_state TEXT DEFAULT NULL,
  p_quota TEXT DEFAULT NULL,
  p_college_name TEXT DEFAULT NULL,
  p_category TEXT DEFAULT NULL
)
RETURNS TABLE (val TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  -- Columns that live directly on the cutoffs table
  scalar_fields TEXT[] := ARRAY['year', 'course', 'college_type', 'state', 'quota', 'category'];
  sql TEXT;
BEGIN
  -- ── Build the SELECT ──────────────────────────────────────────
  IF p_field = 'college_name' THEN
    -- College name lives in the colleges table, joined via college_id
    sql := 'SELECT DISTINCT c2.name::TEXT AS val FROM cutoffs c JOIN colleges c2 ON c2.id = c.college_id WHERE 1=1';
  ELSIF p_field = ANY(scalar_fields) THEN
    sql := format('SELECT DISTINCT c.%I::TEXT AS val FROM cutoffs c WHERE 1=1', p_field);
  ELSE
    RAISE EXCEPTION 'Invalid field: %', p_field;
  END IF;

  -- ── Append WHERE clauses for upstream filters ─────────────────
  IF p_year IS NOT NULL THEN
    sql := sql || ' AND c.year = ' || p_year;
  END IF;
  IF p_course IS NOT NULL THEN
    sql := sql || ' AND c.course = ' || quote_literal(p_course);
  END IF;
  IF p_college_type IS NOT NULL THEN
    sql := sql || ' AND c.college_type = ' || quote_literal(p_college_type);
  END IF;
  IF p_state IS NOT NULL THEN
    sql := sql || ' AND c.state = ' || quote_literal(p_state);
  END IF;
  IF p_quota IS NOT NULL THEN
    sql := sql || ' AND c.quota ILIKE ' || quote_literal('%' || p_quota || '%');
  END IF;
  IF p_college_name IS NOT NULL THEN
    -- Join to colleges to filter by name
    IF p_field != 'college_name' THEN
      sql := sql || ' AND c.college_id IN (SELECT id FROM colleges WHERE name ILIKE ' || quote_literal('%' || p_college_name || '%') || ')';
    ELSE
      sql := sql || ' AND c2.name ILIKE ' || quote_literal('%' || p_college_name || '%');
    END IF;
  END IF;
  IF p_category IS NOT NULL THEN
    sql := sql || ' AND c.category = ' || quote_literal(p_category);
  END IF;

  sql := sql || ' ORDER BY 1 NULLS LAST';

  RETURN QUERY EXECUTE sql;
END;
$$;

-- Grant access to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION get_cutoff_distinct TO anon, authenticated;

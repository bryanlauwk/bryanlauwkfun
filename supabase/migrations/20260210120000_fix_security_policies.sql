-- Security Fix 1: Guest Book - Remove public INSERT policy
-- Insertions now go through the submit-guest-book Edge Function
-- which enforces IP-based rate limiting and input validation
DROP POLICY IF EXISTS "Anyone can add guest book entries" ON public.guest_book;

-- Security Fix 2: Page Views - Remove public write access
-- The increment_page_view() function is SECURITY DEFINER and bypasses RLS,
-- so it will continue to work. Direct table manipulation is no longer allowed.
DROP POLICY IF EXISTS "Anyone can update page views" ON public.page_views;
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;

-- Restrict page_views SELECT to admins only
-- Public users get counts via the get_page_view_count() function below
DROP POLICY IF EXISTS "Anyone can read page views" ON public.page_views;

CREATE POLICY "Admins can read page views"
ON public.page_views
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin')
);

-- Create a SECURITY DEFINER function to safely read page view counts
-- This allows the public visitor counter to work without exposing the table
CREATE OR REPLACE FUNCTION public.get_page_view_count(p_page_path TEXT DEFAULT '/')
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result BIGINT;
BEGIN
  SELECT view_count INTO result
  FROM public.page_views
  WHERE page_path = p_page_path;

  RETURN COALESCE(result, 0);
END;
$$;

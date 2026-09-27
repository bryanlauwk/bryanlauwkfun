-- 1) page_views: replace open read with a security-definer helper
DROP POLICY IF EXISTS "Anyone can read page views" ON public.page_views;

CREATE OR REPLACE FUNCTION public.get_page_view_count(p_path text)
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE((SELECT view_count FROM public.page_views WHERE page_path = p_path), 0);
$$;

REVOKE SELECT ON public.page_views FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_page_view_count(text) TO anon, authenticated;

-- 2) site_settings: remove open read (admins keep full access via existing policies)
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;

-- 3) stamp_reactions: keep anonymous submissions but validate content
DROP POLICY IF EXISTS "Visitors can submit anonymous stamp reactions" ON public.stamp_reactions;
CREATE POLICY "Visitors can submit anonymous stamp reactions"
ON public.stamp_reactions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(label) BETWEEN 1 AND 50
  AND char_length(page_path) BETWEEN 1 AND 200
  AND char_length(area_key) BETWEEN 1 AND 50
);

-- Guest book: drop open policies
DROP POLICY IF EXISTS "Anyone can add guest book entries" ON public.guest_book;
DROP POLICY IF EXISTS "Anyone can view guest book entries" ON public.guest_book;

-- Admins can view all guest book entries (edge function uses service role, bypasses RLS)
CREATE POLICY "Admins can view guest book entries"
  ON public.guest_book
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Page views: drop open write policies (increment_page_view SECURITY DEFINER RPC handles writes)
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
DROP POLICY IF EXISTS "Anyone can update page views" ON public.page_views;

-- Lock down trigger-only SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.check_guest_book_rate_limit() FROM PUBLIC, anon, authenticated;

-- has_role is used by RLS: revoke from anon (not needed), keep for authenticated
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- Storage: drop broad listing policies. Public buckets still serve direct object URLs via CDN.
DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for audio assets" ON storage.objects;
DROP POLICY IF EXISTS "Public read for backgrounds" ON storage.objects;
DROP POLICY IF EXISTS "Sponsor logos are publicly accessible" ON storage.objects;

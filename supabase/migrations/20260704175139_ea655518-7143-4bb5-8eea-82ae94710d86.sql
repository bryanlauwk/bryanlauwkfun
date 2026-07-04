
-- Drop the SECURITY DEFINER RPC that anon/authenticated could call.
DROP FUNCTION IF EXISTS public.increment_page_view(text);

-- Make sure no writes to page_views are allowed from the client;
-- only the service_role (edge function) can write. Public may still read.
REVOKE INSERT, UPDATE, DELETE ON public.page_views FROM anon, authenticated, PUBLIC;
GRANT SELECT ON public.page_views TO anon, authenticated;
GRANT ALL ON public.page_views TO service_role;

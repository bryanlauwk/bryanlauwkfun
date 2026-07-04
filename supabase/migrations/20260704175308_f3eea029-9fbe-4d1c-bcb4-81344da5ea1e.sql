
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- projects
DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
CREATE POLICY "Admins can view all projects" ON public.projects FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update projects" ON public.projects FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete projects" ON public.projects FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

-- sponsors
DROP POLICY IF EXISTS "Admins can view all sponsors" ON public.sponsors;
DROP POLICY IF EXISTS "Admins can insert sponsors" ON public.sponsors;
DROP POLICY IF EXISTS "Admins can update sponsors" ON public.sponsors;
DROP POLICY IF EXISTS "Admins can delete sponsors" ON public.sponsors;
CREATE POLICY "Admins can view all sponsors" ON public.sponsors FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert sponsors" ON public.sponsors FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update sponsors" ON public.sponsors FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete sponsors" ON public.sponsors FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

-- site_settings
DROP POLICY IF EXISTS "Admins can insert site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can delete site settings" ON public.site_settings;
CREATE POLICY "Admins can insert site settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site settings" ON public.site_settings FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

-- guest_book
DROP POLICY IF EXISTS "Admins can view guest book entries" ON public.guest_book;
DROP POLICY IF EXISTS "Admins can delete guest book entries" ON public.guest_book;
CREATE POLICY "Admins can view guest book entries" ON public.guest_book FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete guest book entries" ON public.guest_book FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

-- storage
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload sponsor logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update sponsor logos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete sponsor logos" ON storage.objects;
CREATE POLICY "Admins can upload project images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update project images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-images' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete project images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-images' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can upload sponsor logos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'sponsor-logos' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update sponsor logos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'sponsor-logos' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete sponsor logos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'sponsor-logos' AND private.has_role(auth.uid(), 'admin'));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

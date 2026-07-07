
-- =====================================================
-- page_views: explicit deny for public writes
-- =====================================================
-- RLS is already enabled with only a public SELECT policy. No INSERT/UPDATE/DELETE
-- policy exists, so writes are already denied by default — but the scanner wants
-- an explicit restrictive policy so future permissive policies cannot silently
-- open it up. Restrictive policies AND together with any permissive policy.

CREATE POLICY "Block public inserts on page_views"
  ON public.page_views
  AS RESTRICTIVE
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "Block public updates on page_views"
  ON public.page_views
  AS RESTRICTIVE
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Block public deletes on page_views"
  ON public.page_views
  AS RESTRICTIVE
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- Revoke direct table privileges from anon/authenticated for writes.
-- SELECT stays granted (public read counter). service_role keeps ALL.
REVOKE INSERT, UPDATE, DELETE ON public.page_views FROM anon, authenticated;

-- =====================================================
-- Storage: audio-assets & backgrounds admin-only writes
-- =====================================================
-- These buckets are public-read (like project-images), but currently have no
-- explicit write policies on storage.objects. Add admin-only INSERT/UPDATE/DELETE
-- policies mirroring the project-images pattern. service_role bypasses RLS.

CREATE POLICY "Admins can upload audio assets"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'audio-assets'
    AND private.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can update audio assets"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'audio-assets'
    AND private.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can delete audio assets"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'audio-assets'
    AND private.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can upload backgrounds"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'backgrounds'
    AND private.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can update backgrounds"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'backgrounds'
    AND private.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can delete backgrounds"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'backgrounds'
    AND private.has_role(auth.uid(), 'admin'::app_role)
  );

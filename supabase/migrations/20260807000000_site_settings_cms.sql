-- =====================================================
-- site_settings: editable front-end copy (CMS)
-- =====================================================
-- The site_settings table stores key/value overrides for homepage copy. This
-- migration is idempotent: it ensures the table exists, is publicly readable
-- (the homepage reads it anonymously), admin-writable, and has a unique key so
-- the admin dashboard can upsert by key.

CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Upserts from the admin use ON CONFLICT (key); back it with a unique index.
CREATE UNIQUE INDEX IF NOT EXISTS site_settings_key_unique ON public.site_settings (key);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public (and authenticated) can read all settings — this drives homepage copy.
DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;
CREATE POLICY "Anyone can read site settings"
  ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin-only writes (mirrors the pattern used by other tables).
DROP POLICY IF EXISTS "Admins can insert site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can delete site settings" ON public.site_settings;
CREATE POLICY "Admins can insert site settings"
  ON public.site_settings FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site settings"
  ON public.site_settings FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- Keep updated_at fresh on every write.
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

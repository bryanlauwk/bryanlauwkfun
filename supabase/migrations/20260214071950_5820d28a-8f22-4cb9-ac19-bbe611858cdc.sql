
-- Create sponsors table
CREATE TABLE public.sponsors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

-- Public can view visible sponsors
CREATE POLICY "Anyone can view visible sponsors"
ON public.sponsors FOR SELECT
USING (is_visible = true);

-- Admins can view all sponsors
CREATE POLICY "Admins can view all sponsors"
ON public.sponsors FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert sponsors
CREATE POLICY "Admins can insert sponsors"
ON public.sponsors FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update sponsors
CREATE POLICY "Admins can update sponsors"
ON public.sponsors FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete sponsors
CREATE POLICY "Admins can delete sponsors"
ON public.sponsors FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Timestamp trigger
CREATE TRIGGER update_sponsors_updated_at
BEFORE UPDATE ON public.sponsors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create sponsor-logos storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('sponsor-logos', 'sponsor-logos', true);

-- Storage policies for sponsor logos
CREATE POLICY "Sponsor logos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'sponsor-logos');

CREATE POLICY "Admins can upload sponsor logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'sponsor-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sponsor logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'sponsor-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sponsor logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'sponsor-logos' AND public.has_role(auth.uid(), 'admin'));

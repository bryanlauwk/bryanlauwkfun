-- Create a table to track page views for the visitor counter
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL DEFAULT '/',
  view_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint on page_path for upsert
ALTER TABLE public.page_views ADD CONSTRAINT page_views_page_path_key UNIQUE (page_path);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read page views (public counter)
CREATE POLICY "Anyone can read page views"
ON public.page_views
FOR SELECT
USING (true);

-- Allow anyone to increment views (we'll handle this via a function)
CREATE POLICY "Anyone can update page views"
ON public.page_views
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can insert page views"
ON public.page_views
FOR INSERT
WITH CHECK (true);

-- Function to increment and return the view count
CREATE OR REPLACE FUNCTION public.increment_page_view(p_page_path TEXT DEFAULT '/')
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  INSERT INTO public.page_views (page_path, view_count)
  VALUES (p_page_path, 1)
  ON CONFLICT (page_path) 
  DO UPDATE SET 
    view_count = page_views.view_count + 1,
    updated_at = now()
  RETURNING view_count INTO new_count;
  
  RETURN new_count;
END;
$$;

-- Add trigger for updated_at
CREATE TRIGGER update_page_views_updated_at
BEFORE UPDATE ON public.page_views
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
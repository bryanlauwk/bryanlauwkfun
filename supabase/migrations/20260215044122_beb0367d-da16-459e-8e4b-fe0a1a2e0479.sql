-- Create storage bucket for AI-generated backgrounds
INSERT INTO storage.buckets (id, name, public)
VALUES ('backgrounds', 'backgrounds', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access for backgrounds
CREATE POLICY "Public read for backgrounds"
ON storage.objects FOR SELECT
USING (bucket_id = 'backgrounds');

-- No explicit write policy needed (service role bypasses RLS)
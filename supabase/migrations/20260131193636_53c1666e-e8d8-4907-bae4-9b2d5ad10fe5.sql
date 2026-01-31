-- Create storage bucket for audio assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio-assets', 'audio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to audio files
CREATE POLICY "Public read access for audio assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'audio-assets');
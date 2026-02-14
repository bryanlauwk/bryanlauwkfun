
-- Add email (optional) and category columns to guest_book
ALTER TABLE public.guest_book 
  ADD COLUMN email text,
  ADD COLUMN category text NOT NULL DEFAULT 'feedback';

-- Update the CHECK constraint for message length to allow 1000 chars for unified form
-- (existing constraint may limit to 500, increase to 1000)
ALTER TABLE public.guest_book DROP CONSTRAINT IF EXISTS guest_book_message_check;
ALTER TABLE public.guest_book ADD CONSTRAINT guest_book_message_check CHECK (char_length(message) <= 1000);

-- Add constraint for email length
ALTER TABLE public.guest_book ADD CONSTRAINT guest_book_email_check CHECK (email IS NULL OR char_length(email) <= 255);

-- Add constraint for valid categories
ALTER TABLE public.guest_book ADD CONSTRAINT guest_book_category_check CHECK (category IN ('feedback', 'idea', 'sponsorship', 'private'));

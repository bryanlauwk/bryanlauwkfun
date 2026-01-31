-- Create a guest book table for visitor feedback
CREATE TABLE public.guest_book (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.guest_book ENABLE ROW LEVEL SECURITY;

-- Anyone can read guest book entries
CREATE POLICY "Anyone can view guest book entries" 
ON public.guest_book 
FOR SELECT 
USING (true);

-- Anyone can add guest book entries
CREATE POLICY "Anyone can add guest book entries" 
ON public.guest_book 
FOR INSERT 
WITH CHECK (true);

-- Add index for ordering by date
CREATE INDEX idx_guest_book_created_at ON public.guest_book(created_at DESC);
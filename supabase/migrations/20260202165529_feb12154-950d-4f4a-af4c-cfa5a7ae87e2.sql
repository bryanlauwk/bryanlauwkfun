-- Add CHECK constraints to guest_book table for server-side validation
-- This prevents bypassing client-side validation via direct API calls

-- Add name length constraint (1-50 characters)
ALTER TABLE public.guest_book 
ADD CONSTRAINT guest_book_name_length 
CHECK (char_length(name) <= 50 AND char_length(name) >= 1);

-- Add message length constraint (1-500 characters)
ALTER TABLE public.guest_book 
ADD CONSTRAINT guest_book_message_length 
CHECK (char_length(message) <= 500 AND char_length(message) >= 1);

-- Create a function to check rate limiting for guest book entries
-- Limits to 5 entries per hour based on created_at timestamps
CREATE OR REPLACE FUNCTION public.check_guest_book_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Count entries in the last hour
  -- Since we don't have IP tracking, we use a global rate limit
  -- This prevents mass insertion attacks while still allowing legitimate use
  SELECT COUNT(*) INTO recent_count
  FROM public.guest_book
  WHERE created_at > NOW() - INTERVAL '1 minute';
  
  -- Allow max 3 entries per minute globally to prevent spam floods
  IF recent_count >= 3 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please wait before posting again.';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to enforce rate limiting on insert
CREATE TRIGGER guest_book_rate_limit_trigger
BEFORE INSERT ON public.guest_book
FOR EACH ROW
EXECUTE FUNCTION public.check_guest_book_rate_limit();
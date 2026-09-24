CREATE TABLE public.stamp_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL CHECK (label IN (
    'CERTIFIED', '???', 'CERTIFIED DUMB', 'EVIDENCE', 'WHY?',
    'QUESTIONABLE', 'NO NOTES', 'I WAS HERE', 'SEND HELP'
  )),
  page_path TEXT NOT NULL CHECK (
    char_length(page_path) BETWEEN 1 AND 160
    AND left(page_path, 1) = '/'
    AND position('?' in page_path) = 0
    AND position('#' in page_path) = 0
  ),
  area_key TEXT NOT NULL DEFAULT 'page' CHECK (char_length(area_key) BETWEEN 1 AND 80),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX stamp_reactions_summary_idx
  ON public.stamp_reactions (label, page_path, area_key);
CREATE INDEX stamp_reactions_created_at_idx
  ON public.stamp_reactions (created_at DESC);

ALTER TABLE public.stamp_reactions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.stamp_reactions FROM PUBLIC, anon, authenticated;
GRANT INSERT ON public.stamp_reactions TO anon, authenticated;
GRANT SELECT ON public.stamp_reactions TO authenticated;

CREATE POLICY "Visitors can submit anonymous stamp reactions"
  ON public.stamp_reactions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view stamp reaction rows"
  ON public.stamp_reactions
  FOR SELECT
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.limit_stamp_reaction_rate()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Serialize submissions while enforcing an anonymous, site-wide ceiling.
  PERFORM pg_advisory_xact_lock(hashtext('stamp-reaction-rate-limit'));
  SELECT COUNT(*) INTO recent_count
  FROM public.stamp_reactions
  WHERE created_at > now() - INTERVAL '1 minute';

  IF recent_count >= 120 THEN
    RAISE EXCEPTION 'Stamp reaction limit reached. Please try again shortly.';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER stamp_reactions_rate_limit
  BEFORE INSERT ON public.stamp_reactions
  FOR EACH ROW
  EXECUTE FUNCTION public.limit_stamp_reaction_rate();

REVOKE EXECUTE ON FUNCTION public.limit_stamp_reaction_rate() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_stamp_reaction_summary()
RETURNS TABLE (
  label TEXT,
  page_path TEXT,
  area_key TEXT,
  reaction_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT private.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Admin access required.' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT r.label, r.page_path, r.area_key, COUNT(*)::BIGINT
  FROM public.stamp_reactions AS r
  GROUP BY r.label, r.page_path, r.area_key
  ORDER BY COUNT(*) DESC, r.label, r.page_path, r.area_key;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.get_stamp_reaction_summary() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_stamp_reaction_summary() TO authenticated;

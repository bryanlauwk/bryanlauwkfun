-- Allow admins to delete guest book entries
CREATE POLICY "Admins can delete guest book entries"
  ON public.guest_book
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
-- Fix privilege escalation vulnerability on user_roles table
-- Prevent users from inserting their own roles
CREATE POLICY "Prevent self-service role assignment"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Prevent users from modifying roles
CREATE POLICY "Prevent role modification"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (false);

-- Prevent users from deleting roles
CREATE POLICY "Prevent role deletion"
ON public.user_roles
FOR DELETE
TO authenticated
USING (false);
-- EMERGENCY RLS FIX (Hardcoded Emails)
-- This avoids "Infinite Recursion" by not querying the table to check permissions.

-- 1. Reset Policies
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Roles Access" ON public.user_roles;
DROP POLICY IF EXISTS "Read Own Role" ON public.user_roles;
DROP POLICY IF EXISTS "Owner Admin Read All" ON public.user_roles;
DROP POLICY IF EXISTS "Owner Admin Write" ON public.user_roles;

-- 2. Policy: Read Own Role (Everyone)
CREATE POLICY "Read Own Role" ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- 3. Policy: Owners can Read/Write Everything (Hardcoded Email Check)
-- This completely bypasses the DB recursion issue.
CREATE POLICY "Owner Super Access" ON public.user_roles
  FOR ALL
  TO authenticated
  USING (
    (SELECT email FROM auth.users WHERE id = auth.uid()) IN (
      'johanmanoj2009@gmail.com', 
      'vineyragesh333@gmail.com', 
      'rdp12356@outlook.com'
    )
  );

-- 4. No RAISE NOTICE command to avoid syntax errors.
-- Just run this and check the "Success" message in Supabase.

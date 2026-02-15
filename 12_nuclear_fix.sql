-- NUCLEAR FIX (Disable RLS temporarily)
-- This confirms if RLS is the cause of the 500 error.

-- 1. DISABLE RLS completely on user_roles
ALTER TABLE public.user_roles DISABLE ROW LEVEL SECURITY;

-- 2. Drop all policies just in case
DROP POLICY IF EXISTS "Roles Access" ON public.user_roles;
DROP POLICY IF EXISTS "Read Own Role" ON public.user_roles;
DROP POLICY IF EXISTS "Owner Super Access" ON public.user_roles;
DROP POLICY IF EXISTS "Owner Admin Read All" ON public.user_roles;
DROP POLICY IF EXISTS "Owner Admin Write" ON public.user_roles;

-- 3. Re-Enable RLS with ONLY the "Self Read" policy (Safest possible policy)
-- If this works, we know the "Admin Check" was the problem.
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Safe Self Read" ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- NOTE: This means ONLY you can see your own role. 
-- The Admin Panel permission check in `Setup.tsx` works by reading your OWN role, so this IS sufficient for the Setup page to work.

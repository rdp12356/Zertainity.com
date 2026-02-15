-- FIX RLS POLICIES (Recursion Prevention)
-- Run this in Supabase SQL Editor

-- 1. Helper function to bypass RLS (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT AS $$
DECLARE
  extracted_role TEXT;
BEGIN
  SELECT role INTO extracted_role FROM public.user_roles WHERE user_id = auth.uid();
  RETURN extracted_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to start fresh
DROP POLICY IF EXISTS "Roles Access" ON public.user_roles;
DROP POLICY IF EXISTS "Read Own Role" ON public.user_roles;
DROP POLICY IF EXISTS "Owner Admin Read All" ON public.user_roles;
DROP POLICY IF EXISTS "Owner Admin Write" ON public.user_roles;

-- 4. Create separate, clean policies

-- Policy A: Everyone can read their OWN role (No recursion, direct check)
CREATE POLICY "Read Own Role" ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Policy B: Owners/Admins can read ALL roles (Uses function to avoid recursion)
CREATE POLICY "Owner Admin Read All" ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (
    public.get_my_role() IN ('owner', 'admin')
  );

-- Policy C: Owners/Admins can update/insert/delete (Uses function)
CREATE POLICY "Owner Admin Write" ON public.user_roles
  FOR ALL
  TO authenticated
  USING (
    public.get_my_role() IN ('owner', 'admin')
  );

DO $$
BEGIN
  RAISE NOTICE 'RLS Policies Updated Successfully';
END $$;

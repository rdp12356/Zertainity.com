-- FIX MISSING TABLES (15_fix_missing_tables.sql)
-- Restores tables that were dropped but needed by Admin Panel

-- 1. SUSPENDED USERS (Required for User Management)
CREATE TABLE IF NOT EXISTS public.suspended_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT,
  suspended_by UUID REFERENCES auth.users(id),
  suspended_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.suspended_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only Admins/Owners can view suspended users
CREATE POLICY "Admin View Suspensions" ON public.suspended_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
    )
  );

-- Policy: Only Admins/Owners can manage suspensions
CREATE POLICY "Admin Manage Suspensions" ON public.suspended_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
    )
  );


-- 2. USER RESULTS (Required for storing Quiz Results later)
CREATE TABLE IF NOT EXISTS public.user_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_id UUID REFERENCES public.careers(id), -- Nullable if just text match
  archetype TEXT, -- e.g. "INTJ"
  top_careers JSONB, -- Store the AI result blob
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.user_results ENABLE ROW LEVEL SECURITY;

-- Policy: Users read own results
CREATE POLICY "Read Own Results" ON public.user_results
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Policy: Users insert own results
CREATE POLICY "Insert Own Results" ON public.user_results
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());


-- 3. AUDIT LOGS (Optional but good for Admin)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Read only by Admins
CREATE POLICY "Admin Read Logs" ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );

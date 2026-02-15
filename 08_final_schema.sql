-- FINAL CONSOLIDATED SCHEMA
-- This script represents the complete database state for the application.

-- 1. Enable RLS on Auth Users (System Table)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- 2. USER ROLES (RBAC)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'editor', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. SUSPENDED USERS
CREATE TABLE IF NOT EXISTS public.suspended_users (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    reason TEXT,
    suspended_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.suspended_users ENABLE ROW LEVEL SECURITY;

-- 4. CONTENT TABLES
CREATE TABLE IF NOT EXISTS public.colleges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    courses TEXT[],
    cutoffs TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.schools (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    board TEXT,
    grade_11_cutoff NUMERIC,
    latitude NUMERIC,
    longitude NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- 5. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 6. HELPER FUNCTIONS

-- Check Role
CREATE OR REPLACE FUNCTION public.has_role(check_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = check_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check Manager+
CREATE OR REPLACE FUNCTION public.is_manager_or_above()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('owner', 'admin', 'manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. RLS POLICIES

-- User Roles: Read (Owner/Admin/Self), Write (Owner/Admin)
CREATE POLICY "Roles Access" ON public.user_roles
    FOR ALL TO authenticated
    USING (
        (user_id = auth.uid()) OR 
        EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin'))
    );

-- Suspended Users: Managed by Managers+
CREATE POLICY "Suspension Access" ON public.suspended_users
    FOR ALL TO authenticated
    USING (is_manager_or_above());

-- Content (Colleges/Schools): Public Read, Staff Write
CREATE POLICY "Public Read Content" ON public.colleges FOR SELECT USING (true);
CREATE POLICY "Public Read Schools" ON public.schools FOR SELECT USING (true);

CREATE POLICY "Staff Write Content" ON public.colleges
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'manager', 'editor')));

CREATE POLICY "Staff Write Schools" ON public.schools
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'manager', 'editor')));

-- 8. AUTO-OWNER TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-assign owner to specific emails
  IF new.email ILIKE 'johanmanoj2009@gmail.com' 
     OR new.email ILIKE 'vineyragesh333@gmail.com' 
     OR new.email ILIKE 'rdp12356@outlook.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (new.id, 'owner');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (new.id, 'user');
  END IF;
  return new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Safely attach trigger
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

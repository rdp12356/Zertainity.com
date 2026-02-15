-- COMPREHENSIVE RECONFIGURATION SCRIPT
-- Run this in the Supabase SQL Editor.

-- 1. CLEANUP (Optional but recommended for clean slate on Permissions)
-- We drop user_roles to ensure we use the secure structure defined below.
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. ENABLE RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- 3. USER ROLES (RBAC)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'editor', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. SUSPENDED USERS (Handling Suspension)
CREATE TABLE IF NOT EXISTS public.suspended_users (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    reason TEXT,
    suspended_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.suspended_users ENABLE ROW LEVEL SECURITY;

-- 5. CONTENT TABLES (Colleges & Schools)
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

-- 6. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;


-- 7. HELPER FUNCTIONS

-- Check if user has specific role
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

-- Check if user is Manager or above
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


-- 8. SECURITY POLICIES (RLS)

-- A. User Roles Policies
CREATE POLICY "Owners, Admins can view roles" ON public.user_roles
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
        )
        OR user_id = auth.uid() -- Users can see their own role
    );

CREATE POLICY "Owners, Admins can assign roles" ON public.user_roles
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
        )
    );

CREATE POLICY "Owners, Admins can update roles" ON public.user_roles
    FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
        )
    )
    WITH CHECK (
        -- Protect Owners Protection: Non-Owners cannot change Owner roles
        (
            NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = public.user_roles.user_id AND role = 'owner')
            OR 
            EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'owner')
        )
    );

CREATE POLICY "Owners, Admins can delete roles" ON public.user_roles
    FOR DELETE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
        )
        AND role != 'owner' -- CRITICAL: PREVENT DELETING OWNERS
    );

-- B. Suspended Users Policies
CREATE POLICY "Admins/Owners manage suspensions" ON public.suspended_users
    FOR ALL TO authenticated
    USING (
        is_manager_or_above()
    );

-- C. Data Policies (Colleges & Schools)
-- Read: Public
CREATE POLICY "Public Read Colleges" ON public.colleges FOR SELECT USING (true);
CREATE POLICY "Public Read Schools" ON public.schools FOR SELECT USING (true);

-- Write: Editor/Manager/Admin/Owner
CREATE POLICY "Staff Write Colleges" ON public.colleges FOR INSERT TO authenticated
    WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'manager', 'editor')));

CREATE POLICY "Staff Update Colleges" ON public.colleges FOR UPDATE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'manager', 'editor')));

-- Delete: Manager/Admin/Owner ONLY (No Editors)
CREATE POLICY "Management Delete Colleges" ON public.colleges FOR DELETE TO authenticated
    USING (is_manager_or_above());

-- Schools Policies (Same as Colleges)
CREATE POLICY "Staff Write Schools" ON public.schools FOR INSERT TO authenticated
    WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'manager', 'editor')));

CREATE POLICY "Staff Update Schools" ON public.schools FOR UPDATE TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'manager', 'editor')));

CREATE POLICY "Management Delete Schools" ON public.schools FOR DELETE TO authenticated
    USING (is_manager_or_above());


-- 9. AUTO-OWNER TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check for specific emails to assign OWNER role
  IF new.email IN ('johanmanoj2009@gmail.com', 'vineyragesh333@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (new.id, 'owner');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (new.id, 'user');
  END IF;
  return new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

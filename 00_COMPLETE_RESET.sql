-- ==========================================
-- ZERTAINITY - COMPLETE DATABASE RESET
-- ==========================================
-- This script drops ALL existing tables and creates a fresh schema
-- Run this in Supabase SQL Editor

-- ==========================================
-- STEP 1: DROP EVERYTHING
-- ==========================================

-- Drop all tables
DROP TABLE IF EXISTS public.role_permissions CASCADE;
DROP TABLE IF EXISTS public.user_activity_log CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.user_results CASCADE;
DROP TABLE IF EXISTS public.suspended_users CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.pathway_steps CASCADE;
DROP TABLE IF EXISTS public.careers CASCADE;
DROP TABLE IF EXISTS public.quiz_questions CASCADE;
DROP TABLE IF EXISTS public.colleges CASCADE;
DROP TABLE IF EXISTS public.schools CASCADE;
DROP TABLE IF EXISTS public.admin_settings CASCADE;

-- Drop all types/enums
DROP TYPE IF EXISTS public.app_role CASCADE;
DROP TYPE IF EXISTS public.app_permission CASCADE;

-- Drop all functions
DROP FUNCTION IF EXISTS public.has_permission CASCADE;
DROP FUNCTION IF EXISTS public.has_role CASCADE;
DROP FUNCTION IF EXISTS public.is_owner CASCADE;
DROP FUNCTION IF EXISTS public.get_all_users_with_roles CASCADE;
DROP FUNCTION IF EXISTS public.log_user_activity CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user_profile CASCADE;
DROP FUNCTION IF EXISTS public.update_profile_updated_at CASCADE;


-- ==========================================
-- STEP 2: CREATE FRESH SCHEMA
-- ==========================================

-- 1. USER ROLES
CREATE TABLE public.user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'editor', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own role" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );


-- 2. USER PROFILES
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  phone_number TEXT,
  bio TEXT,
  location TEXT,
  date_of_birth DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile" ON public.user_profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users update own profile" ON public.user_profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins read all profiles" ON public.user_profiles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );


-- 3. ROLE PERMISSIONS
CREATE TABLE public.role_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'editor', 'user')),
  permission TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(role, permission)
);

ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone reads permissions" ON public.role_permissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Owners manage permissions" ON public.role_permissions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'owner'
    )
  );

-- Seed default permissions
INSERT INTO public.role_permissions (role, permission) VALUES
  ('owner', 'manage_users'),
  ('owner', 'edit_careers'),
  ('owner', 'edit_colleges'),
  ('owner', 'edit_schools'),
  ('owner', 'view_audit_log'),
  ('owner', 'manage_permissions'),
  ('owner', 'delete_users'),
  ('owner', 'invite_users'),
  ('owner', 'export_data'),
  ('admin', 'manage_users'),
  ('admin', 'edit_careers'),
  ('admin', 'edit_colleges'),
  ('admin', 'edit_schools'),
  ('admin', 'view_audit_log'),
  ('admin', 'invite_users'),
  ('admin', 'export_data'),
  ('manager', 'edit_careers'),
  ('manager', 'edit_colleges'),
  ('manager', 'edit_schools'),
  ('manager', 'view_audit_log'),
  ('editor', 'edit_careers'),
  ('editor', 'edit_colleges'),
  ('editor', 'edit_schools')
ON CONFLICT DO NOTHING;


-- 4. SUSPENDED USERS
CREATE TABLE public.suspended_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT,
  suspended_by UUID REFERENCES auth.users(id),
  suspended_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.suspended_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage suspensions" ON public.suspended_users
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager')
    )
  );


-- 5. AUDIT LOGS
CREATE TABLE public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read logs" ON public.audit_logs
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );


-- 6. USER ACTIVITY LOG
CREATE TABLE public.user_activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view activity" ON public.user_activity_log
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );


-- 7. CAREERS
CREATE TABLE public.careers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  salary_range TEXT,
  growth_rate TEXT,
  required_education TEXT,
  skills JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone reads careers" ON public.careers
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Editors manage careers" ON public.careers
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager', 'editor')
    )
  );


-- 8. COLLEGES
CREATE TABLE public.colleges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone reads colleges" ON public.colleges
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Editors manage colleges" ON public.colleges
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager', 'editor')
    )
  );


-- 9. SCHOOLS
CREATE TABLE public.schools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone reads schools" ON public.schools
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Editors manage schools" ON public.schools
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin', 'manager', 'editor')
    )
  );


-- 10. USER RESULTS
CREATE TABLE public.user_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_id UUID REFERENCES public.careers(id),
  archetype TEXT,
  top_careers JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own results" ON public.user_results
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users insert own results" ON public.user_results
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());


-- 11. ADMIN SETTINGS
CREATE TABLE public.admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners manage settings" ON public.admin_settings
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'owner'
    )
  );


-- ==========================================
-- STEP 3: CREATE FUNCTIONS
-- ==========================================

-- Check if user has specific permission
CREATE OR REPLACE FUNCTION public.has_permission(check_user_id UUID, check_permission TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role = rp.role
    WHERE ur.user_id = check_user_id 
    AND rp.permission = check_permission
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Get all users with roles
CREATE OR REPLACE FUNCTION public.get_all_users_with_roles()
RETURNS TABLE (
  user_id UUID,
  email TEXT,
  role TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  is_suspended BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    au.email,
    COALESCE(ur.role, 'user') as role,
    up.avatar_url,
    au.created_at,
    EXISTS(SELECT 1 FROM public.suspended_users WHERE user_id = au.id) as is_suspended
  FROM auth.users au
  LEFT JOIN public.user_roles ur ON au.id = ur.user_id
  LEFT JOIN public.user_profiles up ON au.id = up.id
  ORDER BY au.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Log user activity
CREATE OR REPLACE FUNCTION public.log_user_activity(
  p_user_id UUID,
  p_action TEXT,
  p_details JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.user_activity_log (user_id, action, details)
  VALUES (p_user_id, p_action, p_details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- STEP 4: CREATE TRIGGERS
-- ==========================================

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();


-- Auto-update profile timestamp
CREATE OR REPLACE FUNCTION public.update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_updated_at();


-- ==========================================
-- STEP 5: SEED OWNER ROLES
-- ==========================================

-- Insert owner roles for your emails
DO $$
DECLARE
  johan_id UUID;
  viney_id UUID;
BEGIN
  SELECT id INTO johan_id FROM auth.users WHERE email = 'johanmanoj2009@gmail.com';
  SELECT id INTO viney_id FROM auth.users WHERE email = 'vineyragesh333@gmail.com';

  IF johan_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) 
    VALUES (johan_id, 'owner')
    ON CONFLICT (user_id) DO UPDATE SET role = 'owner';
  END IF;

  IF viney_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) 
    VALUES (viney_id, 'owner')
    ON CONFLICT (user_id) DO UPDATE SET role = 'owner';
  END IF;
END $$;

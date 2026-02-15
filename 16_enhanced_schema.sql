-- ENHANCED DATABASE SCHEMA (16_enhanced_schema.sql)
-- Adds role_permissions, enhanced user_profiles, and utility functions

-- Drop existing enum if it exists (it's causing conflicts)
DROP TYPE IF EXISTS public.app_permission CASCADE;

-- ==========================================
-- 1. ROLE PERMISSIONS TABLE
-- ==========================================

-- Drop existing table to start fresh
DROP TABLE IF EXISTS public.role_permissions CASCADE;
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'editor', 'user')),
  permission TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(role, permission)
);

ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Policy: Only owners can manage permissions
CREATE POLICY "Owner Manage Permissions" ON public.role_permissions
  FOR ALL TO authenticated
  USING (
    (SELECT email FROM auth.users WHERE id = auth.uid()) IN ('johanmanoj2009@gmail.com', 'vineyragesh333@gmail.com')
  );

-- Seed default permissions
INSERT INTO public.role_permissions (role, permission) VALUES
  -- Owner permissions (all)
  ('owner', 'manage_users'),
  ('owner', 'edit_careers'),
  ('owner', 'edit_colleges'),
  ('owner', 'edit_schools'),
  ('owner', 'edit_pathways'),
  ('owner', 'edit_quiz'),
  ('owner', 'view_audit_log'),
  ('owner', 'view_analytics'),
  ('owner', 'manage_permissions'),
  ('owner', 'delete_users'),
  ('owner', 'invite_users'),
  ('owner', 'export_data'),
  
  -- Admin permissions
  ('admin', 'manage_users'),
  ('admin', 'edit_careers'),
  ('admin', 'edit_colleges'),
  ('admin', 'edit_schools'),
  ('admin', 'edit_pathways'),
  ('admin', 'edit_quiz'),
  ('admin', 'view_audit_log'),
  ('admin', 'invite_users'),
  ('admin', 'export_data'),
  
  -- Manager permissions
  ('manager', 'edit_careers'),
  ('manager', 'edit_colleges'),
  ('manager', 'edit_schools'),
  ('manager', 'view_audit_log'),
  
  -- Editor permissions
  ('editor', 'edit_careers'),
  ('editor', 'edit_colleges'),
  ('editor', 'edit_schools')
ON CONFLICT DO NOTHING;


-- ==========================================
-- 2. ENHANCED USER PROFILES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
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

-- Policies
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


-- ==========================================
-- 3. USER ACTIVITY LOG (Enhanced)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.user_activity_log (
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


-- ==========================================
-- 4. UTILITY FUNCTIONS
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

-- Get all users with their roles and profiles
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
-- 5. TRIGGERS
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

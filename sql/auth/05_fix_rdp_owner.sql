-- FORCE FIX OWNER ROLE
-- Run this in Supabase SQL Editor

DO $$
DECLARE
  target_user_id UUID;
BEGIN
  -- 1. Get User ID
  SELECT id INTO target_user_id FROM auth.users WHERE email = 'rdp12356@outlook.com';
  
  IF target_user_id IS NOT NULL THEN
    -- 2. Delete ALL existing roles for this user to prevent duplicates/conflicts
    DELETE FROM public.user_roles WHERE user_id = target_user_id;
    
    -- 3. Insert fresh OWNER role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, 'owner');
    
    RAISE NOTICE 'User % has been reset to OWNER role.', 'rdp12356@outlook.com';
  ELSE
    RAISE NOTICE 'User % not found in auth.users. Have they signed up yet?', 'rdp12356@outlook.com';
  END IF;
END $$;

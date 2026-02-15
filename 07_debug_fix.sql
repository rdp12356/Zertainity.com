-- DEBUG & FIX SCRIPT
-- Run in Supabase SQL Editor

DO $$
DECLARE
  target_id UUID;
  current_role TEXT;
BEGIN
  -- 1. Find User ID
  SELECT id INTO target_id FROM auth.users WHERE email ILIKE 'rdp12356@outlook.com';

  IF target_id IS NULL THEN
    RAISE EXCEPTION 'User rdp12356@outlook.com NOT FOUND in auth.users. Please sign up first!';
  END IF;

  RAISE NOTICE 'Found User ID: %', target_id;

  -- 2. Check existing role
  SELECT role INTO current_role FROM public.user_roles WHERE user_id = target_id;
  RAISE NOTICE 'Current Role in DB: %', current_role;

  -- 3. Delete existing role (to be sure)
  DELETE FROM public.user_roles WHERE user_id = target_id;

  -- 4. Insert OWNER role
  INSERT INTO public.user_roles (user_id, role) VALUES (target_id, 'owner');
  
  RAISE NOTICE 'SUCCESS: Role set to OWNER for rdp12356@outlook.com';

END $$;

-- 5. Verify Output
SELECT * FROM public.user_roles 
WHERE user_id = (SELECT id FROM auth.users WHERE email ILIKE 'rdp12356@outlook.com');

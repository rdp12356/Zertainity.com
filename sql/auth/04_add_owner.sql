-- Add new Owner
-- Run this in Supabase SQL Editor

-- 1. Update the Trigger Function (so if they sign up in the future, they get Owner role)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Added 'rdp12356@outlook.com' to the list
  IF new.email IN ('johanmanoj2009@gmail.com', 'vineyragesh333@gmail.com', 'rdp12356@outlook.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'owner')
    ON CONFLICT (user_id, role) DO NOTHING; -- Safety check
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'user');
  END IF;
  return new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update the user if they already exist in the database
-- We use a DO block to find the user_id from auth.users and update user_roles
DO $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Find the user ID for the email
  SELECT id INTO target_user_id FROM auth.users WHERE email = 'rdp12356@outlook.com';

  -- If user exists, update their role to owner
  IF target_user_id IS NOT NULL THEN
    -- Try to update existing role
    UPDATE public.user_roles
    SET role = 'owner'
    WHERE user_id = target_user_id;
    
    -- If no row was updated (maybe they had no role entry?), insert it
    IF NOT FOUND THEN
      INSERT INTO public.user_roles (user_id, role)
      VALUES (target_user_id, 'owner');
    END IF;
  END IF;
END $$;

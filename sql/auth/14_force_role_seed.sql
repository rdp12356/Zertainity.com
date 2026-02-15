-- FORCE ROLE SEED (14_force_role_seed.sql)
-- Run this if "Master Reset" left you as 'user'

DO $$
DECLARE
  johan_id UUID;
  viney_id UUID;
  rdp_id UUID;
BEGIN
  -- 1. GET USER IDs
  SELECT id INTO johan_id FROM auth.users WHERE email ILIKE 'johanmanoj2009@gmail.com';
  SELECT id INTO viney_id FROM auth.users WHERE email ILIKE 'vineyragesh333@gmail.com';
  SELECT id INTO rdp_id   FROM auth.users WHERE email ILIKE 'rdp12356@outlook.com';

  -- 2. DELETE EXISTING (To avoid conflicts)
  DELETE FROM public.user_roles WHERE user_id IN (johan_id, viney_id, rdp_id);

  -- 3. INSERT OWNERS
  IF johan_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (johan_id, 'owner');
    RAISE NOTICE 'johan: owner';
  ELSE
    RAISE NOTICE 'johan: NOT FOUND';
  END IF;

  IF viney_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (viney_id, 'owner');
    RAISE NOTICE 'viney: owner';
  END IF;

  IF rdp_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (rdp_id, 'manager');
    RAISE NOTICE 'rdp: manager';
  END IF;

END $$;

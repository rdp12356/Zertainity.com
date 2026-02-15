-- FIX ALL ROLES
-- Run this in Supabase SQL Editor

DO $$
DECLARE
  johan_id UUID;
  viney_id UUID;
  rdp_id UUID;
BEGIN
  -- 1. Get User IDs
  SELECT id INTO johan_id FROM auth.users WHERE email ILIKE 'johanmanoj2009@gmail.com';
  SELECT id INTO viney_id FROM auth.users WHERE email ILIKE 'vineyragesh333@gmail.com';
  SELECT id INTO rdp_id   FROM auth.users WHERE email ILIKE 'rdp12356@outlook.com';

  -- 2. Fix Johan (Owner)
  IF johan_id IS NOT NULL THEN
    DELETE FROM public.user_roles WHERE user_id = johan_id;
    INSERT INTO public.user_roles (user_id, role) VALUES (johan_id, 'owner');
    RAISE NOTICE 'johanmanoj2009@gmail.com set to OWNER';
  ELSE 
    RAISE NOTICE 'johanmanoj2009@gmail.com NOT FOUND';
  END IF;

  -- 3. Fix Viney (Owner)
  IF viney_id IS NOT NULL THEN
    DELETE FROM public.user_roles WHERE user_id = viney_id;
    INSERT INTO public.user_roles (user_id, role) VALUES (viney_id, 'owner');
    RAISE NOTICE 'vineyragesh333@gmail.com set to OWNER';
  ELSE 
    RAISE NOTICE 'vineyragesh333@gmail.com NOT FOUND';
  END IF;

  -- 4. Fix RDP (Manager)
  IF rdp_id IS NOT NULL THEN
    DELETE FROM public.user_roles WHERE user_id = rdp_id;
    INSERT INTO public.user_roles (user_id, role) VALUES (rdp_id, 'manager');
    RAISE NOTICE 'rdp12356@outlook.com set to MANAGER';
  ELSE 
    RAISE NOTICE 'rdp12356@outlook.com NOT FOUND';
  END IF;

END $$;

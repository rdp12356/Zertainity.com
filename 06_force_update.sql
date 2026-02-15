-- FORCE UPDATE ROLE (Case Insensitive)
-- Run this in Supabase SQL Editor

-- 1. Try to update existing entry
UPDATE public.user_roles
SET role = 'owner'
FROM auth.users
WHERE public.user_roles.user_id = auth.users.id
AND auth.users.email ILIKE 'rdp12356@outlook.com';

-- 2. Verify the result
SELECT u.email, r.role 
FROM auth.users u
JOIN public.user_roles r ON u.id = r.user_id
WHERE u.email ILIKE 'rdp12356@outlook.com';

-- Quick check to verify owner role is set correctly
SELECT 
  u.email,
  r.role,
  r.created_at
FROM auth.users u
JOIN public.user_roles r ON u.id = r.user_id
WHERE u.email ILIKE 'johanmanoj2009@gmail.com'
   OR u.email ILIKE 'vineyragesh333@gmail.com'
   OR u.email ILIKE 'rdp12356@outlook.com';

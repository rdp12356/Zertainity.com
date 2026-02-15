-- Create career_paths table
create table if not exists career_paths (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  summary text,
  description text,
  academic_weight integer default 0,
  interest_weight integer default 0,
  salary_min integer,
  salary_max integer,
  growth_potential text check (growth_potential in ('low', 'medium', 'high')),
  industries text[] default '{}',
  skills text[] default '{}',
  demand_level text,
  is_active boolean default true,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id)
);

-- Enable RLS
alter table career_paths enable row level security;

-- Policies
create policy "Enable read access for all users"
on career_paths for select
using (true);

create policy "Enable insert for authenticated users with role"
on career_paths for insert
with check (
  exists (
    select 1 from user_roles
    where user_id = auth.uid()
    and role in ('admin', 'editor')
  )
);

create policy "Enable update for authenticated users with role"
on career_paths for update
using (
  exists (
    select 1 from user_roles
    where user_id = auth.uid()
    and role in ('admin', 'editor')
  )
);

create policy "Enable delete for authenticated users with role"
on career_paths for delete
using (
  exists (
    select 1 from user_roles
    where user_id = auth.uid()
    and role in ('admin', 'editor')
  )
);

-- Grant permissions (if needed for public/anon role access via API)
grant select on career_paths to anon, authenticated;
grant all on career_paths to service_role;

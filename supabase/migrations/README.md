# Database Migration Instructions

## Running the Job Portal Migration

To set up the jobs database tables in Supabase, follow these steps:

### Option 1: Using Supabase Dashboard (Recommended)

1. Navigate to your Supabase project dashboard: https://supabase.com/dashboard/project/yxjqnnmknxzucnzjtniu

2. Click on "SQL Editor" in the left sidebar

3. Click "New Query"

4. Copy the entire contents of `supabase/migrations/create_jobs_tables.sql`

5. Paste into the SQL editor

6. Click "Run" to execute the migration

7. Verify the tables were created:
   - Go to "Table Editor" in the left sidebar
   - You should see three new tables: `jobs`, `job_applications`, and `saved_jobs`
   - Check that sample job data was inserted into the `jobs` table

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Link your project (if not already linked)
npx supabase link --project-ref yxjqnnmknxzucnzjtniu

# Run the migration
npx supabase db push
```

### Updating TypeScript Types

After running the migration, update your TypeScript types to include the new tables:

```bash
npx supabase gen types typescript --project-id yxjqnnmknxzucnzjtniu > src/integrations/supabase/types.ts
```

This will regenerate the types file with the new `jobs`, `job_applications`, and `saved_jobs` table definitions.

## Verification

After running the migration:

1. Check that the tables exist in Supabase Dashboard > Table Editor
2. Verify RLS policies are enabled (look for the shield icon next to each table)
3. Confirm sample data exists in the `jobs` table (should have 8 sample jobs)
4. Test the application by navigating to http://localhost:8080/jobs

## Troubleshooting

- **Error: relation already exists**: The tables may already be created. You can drop them first or skip this step.
- **Permission denied**: Make sure you're logged in as the project owner in Supabase.
- **RLS errors**: Ensure you have a user role set up in the `user_roles` table for testing.

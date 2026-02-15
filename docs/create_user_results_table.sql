-- Create user_results table to store AI recommendations
CREATE TABLE public.user_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  archetype TEXT,
  top_careers JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_results ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own results"
  ON public.user_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results"
  ON public.user_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own results"
  ON public.user_results FOR UPDATE
  USING (auth.uid() = user_id);

-- Add to types definition if needed manually, or run 'supabase gen types' after applying this migration.

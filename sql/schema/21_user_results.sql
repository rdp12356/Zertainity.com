-- USER RESULTS TABLE
-- Stores the results of the career quiz and AI analysis
CREATE TABLE IF NOT EXISTS public.user_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    archetype TEXT, -- e.g., 'ANALYZED', 'BUILDER', etc.
    top_careers JSONB, -- Stores the full JSON result from the AI/Quiz
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id) -- Ensure one result set per user for now, or remove if history is needed
);

-- ENABLE RLS
ALTER TABLE public.user_results ENABLE ROW LEVEL SECURITY;

-- POLICIES
-- Users can view their own results
CREATE POLICY "Users View Own Results" ON public.user_results
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert/update their own results
CREATE POLICY "Users Manage Own Results" ON public.user_results
    FOR ALL
    USING (auth.uid() = user_id);

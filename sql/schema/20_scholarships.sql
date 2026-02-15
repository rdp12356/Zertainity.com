-- SCHOLARSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.scholarships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    amount TEXT NOT NULL, -- keeping as text to allow "100% Fee Waiver", "50,000", etc.
    amount_type TEXT CHECK (amount_type IN ('one-time', 'per year', 'per month', 'renewable', 'full ride')),
    category TEXT[] NOT NULL, -- Array of categories like 'STEM', 'Arts', 'Sports'
    scholarship_type TEXT[], -- Array of types like 'Merit-based', 'Need-based'
    eligibility TEXT NOT NULL,
    deadline DATE NOT NULL,
    description TEXT,
    apply_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE RLS
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

-- POLICIES
-- Everyone can read scholarships
CREATE POLICY "Public Read Scholarships" ON public.scholarships
    FOR SELECT
    USING (true);

-- Only staff (admin, editor, etc.) can insert/update/delete
CREATE POLICY "Staff Manage Scholarships" ON public.scholarships
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('owner', 'admin', 'manager', 'editor')
        )
    );

-- SEED DATA (Optional, for development)
INSERT INTO public.scholarships (name, provider, amount, amount_type, category, scholarship_type, eligibility, deadline, description)
VALUES 
    ('Future Innovators Scholarship', 'TechFoundation Global', '₹50,000', 'per year', ARRAY['STEM'], ARRAY['Merit-based', 'STEM'], 'Class 12 students with >85% in Science stream.', '2024-10-15', 'Supporting the next generation of tech leaders.'),
    ('Creative Arts Grant', 'National Arts Council', '₹75,000', 'one-time', ARRAY['Arts & Humanities'], ARRAY['Need-based', 'Arts'], 'Undergraduate students pursuing Fine Arts degrees.', '2024-11-01', 'For aspiring artists demonstrating financial need.'),
    ('National Athletic Excellence', 'Sports Authority of India', '100% Fee Waiver', 'renewable', ARRAY['Sports'], ARRAY['Sports', 'Athletics'], 'State-level medalists in track & field events.', '2024-12-12', 'Rewarding sporting excellence.'),
    ('Dr. APJ Kalam Research Fellowship', 'Ministry of Education', '₹35,000', 'per month', ARRAY['Research'], ARRAY['Research', 'Post-Grad'], 'PhD candidates in Aerospace or Physics.', '2024-09-30', 'Research fellowship for advanced sciences.');

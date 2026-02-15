-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    job_type TEXT CHECK (job_type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
    work_mode TEXT CHECK (work_mode IN ('Remote', 'On-site', 'Hybrid')),
    experience_level TEXT CHECK (experience_level IN ('Internship', 'Entry Level', 'Mid Level', 'Senior Level')),
    salary_min INTEGER,
    salary_max INTEGER,
    salary_currency TEXT DEFAULT 'USD',
    salary_period TEXT CHECK (salary_period IN ('hourly', 'yearly')),
    skills_required TEXT[],
    industry TEXT,
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deadline TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
    cover_letter TEXT,
    resume_url TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(job_id, user_id)
);

-- Create saved_jobs table
CREATE TABLE IF NOT EXISTS public.saved_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(job_id, user_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON public.jobs(posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_job_type ON public.jobs(job_type);
CREATE INDEX IF NOT EXISTS idx_jobs_work_mode ON public.jobs(work_mode);
CREATE INDEX IF NOT EXISTS idx_jobs_experience_level ON public.jobs(experience_level);
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON public.job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON public.saved_jobs(user_id);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for jobs table
-- Anyone can view active jobs
CREATE POLICY "Anyone can view active jobs"
    ON public.jobs
    FOR SELECT
    USING (is_active = true);

-- Only admins can insert jobs
CREATE POLICY "Admins can insert jobs"
    ON public.jobs
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'owner', 'manager')
        )
    );

-- Only admins can update jobs
CREATE POLICY "Admins can update jobs"
    ON public.jobs
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'owner', 'manager')
        )
    );

-- Only admins can delete jobs
CREATE POLICY "Admins can delete jobs"
    ON public.jobs
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'owner', 'manager')
        )
    );

-- RLS Policies for job_applications table
-- Users can view their own applications
CREATE POLICY "Users can view their own applications"
    ON public.job_applications
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own applications
CREATE POLICY "Users can create applications"
    ON public.job_applications
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own applications
CREATE POLICY "Users can update their own applications"
    ON public.job_applications
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
    ON public.job_applications
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'owner', 'manager')
        )
    );

-- Admins can update all applications
CREATE POLICY "Admins can update all applications"
    ON public.job_applications
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'owner', 'manager')
        )
    );

-- RLS Policies for saved_jobs table
-- Users can view their own saved jobs
CREATE POLICY "Users can view their own saved jobs"
    ON public.saved_jobs
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can save jobs
CREATE POLICY "Users can save jobs"
    ON public.saved_jobs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can unsave jobs
CREATE POLICY "Users can unsave jobs"
    ON public.saved_jobs
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON public.job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample job data
INSERT INTO public.jobs (title, company, description, location, job_type, work_mode, experience_level, salary_min, salary_max, salary_period, skills_required, industry) VALUES
('Machine Learning Engineer Intern', 'Zertainity AI', 'Join our AI team to work on cutting-edge machine learning projects. You will collaborate with experienced engineers to develop and deploy ML models.', 'Remote', 'Internship', 'Remote', 'Internship', 30, 45, 'hourly', ARRAY['Python', 'TensorFlow', 'PyTorch', 'Machine Learning'], 'Technology'),
('Data Analyst', 'FinTech Corp', 'Analyze financial data to provide insights and drive business decisions. Work with large datasets and create visualizations.', 'New York, NY', 'Full-time', 'On-site', 'Entry Level', 80000, 100000, 'yearly', ARRAY['SQL', 'Python', 'Tableau', 'Excel'], 'Finance'),
('Product Designer', 'Creative Solutions', 'Design beautiful and intuitive user interfaces for our products. Collaborate with product managers and engineers.', 'San Francisco, CA', 'Contract', 'Hybrid', 'Mid Level', 120000, 140000, 'yearly', ARRAY['Figma', 'Sketch', 'UI/UX', 'Prototyping'], 'Design'),
('Cybersecurity Analyst', 'SecurNet Inc.', 'Protect our systems and data from security threats. Monitor networks, investigate incidents, and implement security measures.', 'Austin, TX', 'Full-time', 'On-site', 'Mid Level', 95000, 115000, 'yearly', ARRAY['Network Security', 'Penetration Testing', 'SIEM', 'Incident Response'], 'Cybersecurity'),
('Senior Software Engineer', 'Tech Giants Inc.', 'Lead development of scalable web applications. Mentor junior developers and drive technical decisions.', 'Seattle, WA', 'Full-time', 'Hybrid', 'Senior Level', 150000, 200000, 'yearly', ARRAY['JavaScript', 'React', 'Node.js', 'AWS'], 'Technology'),
('Frontend Developer', 'StartupXYZ', 'Build responsive and performant web applications using modern frameworks. Work in a fast-paced startup environment.', 'Remote', 'Full-time', 'Remote', 'Entry Level', 70000, 90000, 'yearly', ARRAY['React', 'TypeScript', 'CSS', 'HTML'], 'Technology'),
('DevOps Engineer', 'Cloud Solutions Ltd', 'Manage cloud infrastructure and CI/CD pipelines. Automate deployment processes and ensure system reliability.', 'Boston, MA', 'Full-time', 'Hybrid', 'Mid Level', 110000, 135000, 'yearly', ARRAY['Docker', 'Kubernetes', 'AWS', 'Terraform'], 'Technology'),
('UX Researcher', 'UserFirst Design', 'Conduct user research to inform product design decisions. Plan and execute usability studies.', 'Los Angeles, CA', 'Part-time', 'Remote', 'Entry Level', 35, 50, 'hourly', ARRAY['User Research', 'Usability Testing', 'Surveys', 'Analytics'], 'Design');

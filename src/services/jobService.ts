import { supabase } from '@/integrations/supabase/client';

export interface JobFilters {
    search?: string;
    salaryRanges?: string[];
    experienceLevel?: string;
    workModes?: string[];
    jobTypes?: string[];
    industries?: string[];
    page?: number;
    pageSize?: number;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    description: string | null;
    location: string;
    job_type: string | null;
    work_mode: string | null;
    experience_level: string | null;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string | null;
    salary_period: string | null;
    skills_required: string[] | null;
    industry: string | null;
    posted_date: string | null;
    deadline: string | null;
    is_active: boolean | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface JobApplication {
    id: string;
    job_id: string;
    user_id: string;
    status: string;
    cover_letter: string | null;
    resume_url: string | null;
    applied_at: string | null;
    updated_at: string | null;
}

export interface SavedJob {
    id: string;
    job_id: string;
    user_id: string;
    saved_at: string | null;
}

/**
 * Fetch jobs with optional filtering and pagination
 */
export const fetchJobs = async (filters: JobFilters = {}) => {
    const {
        search = '',
        salaryRanges = [],
        experienceLevel,
        workModes = [],
        jobTypes = [],
        industries = [],
        page = 1,
        pageSize = 10,
    } = filters;

    let query = supabase
        .from('jobs')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('posted_date', { ascending: false });

    // Search filter
    if (search) {
        query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Experience level filter
    if (experienceLevel) {
        query = query.eq('experience_level', experienceLevel);
    }

    // Work mode filter
    if (workModes.length > 0) {
        query = query.in('work_mode', workModes);
    }

    // Job type filter
    if (jobTypes.length > 0) {
        query = query.in('job_type', jobTypes);
    }

    // Industry filter
    if (industries.length > 0) {
        query = query.in('industry', industries);
    }

    // Salary range filter
    if (salaryRanges.length > 0) {
        const salaryConditions = salaryRanges.map(range => {
            switch (range) {
                case '$0 - $50k':
                    return { min: 0, max: 50000 };
                case '$50k - $100k':
                    return { min: 50000, max: 100000 };
                case '$100k - $150k':
                    return { min: 100000, max: 150000 };
                case '$150k+':
                    return { min: 150000, max: 999999999 };
                default:
                    return null;
            }
        }).filter(Boolean);

        if (salaryConditions.length > 0) {
            // For yearly salaries, check if salary_max falls within any of the selected ranges
            const orConditions = salaryConditions.map(condition =>
                `and(salary_period.eq.yearly,salary_max.gte.${condition!.min},salary_max.lte.${condition!.max})`
            ).join(',');
            query = query.or(orConditions);
        }
    }

    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }

    return {
        jobs: data as Job[],
        total: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
    };
};

/**
 * Fetch a single job by ID
 */
export const fetchJobById = async (id: string) => {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching job:', error);
        throw error;
    }

    return data as Job;
};

/**
 * Apply to a job
 */
export const applyToJob = async (
    jobId: string,
    applicationData: {
        cover_letter?: string;
        resume_url?: string;
    }
) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User must be logged in to apply');
    }

    const { data, error } = await supabase
        .from('job_applications')
        .insert({
            job_id: jobId,
            user_id: user.id,
            cover_letter: applicationData.cover_letter,
            resume_url: applicationData.resume_url,
            status: 'pending',
        })
        .select()
        .single();

    if (error) {
        console.error('Error applying to job:', error);
        throw error;
    }

    return data as JobApplication;
};

/**
 * Save a job for later
 */
export const saveJob = async (jobId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User must be logged in to save jobs');
    }

    const { data, error } = await supabase
        .from('saved_jobs')
        .insert({
            job_id: jobId,
            user_id: user.id,
        })
        .select()
        .single();

    if (error) {
        console.error('Error saving job:', error);
        throw error;
    }

    return data as SavedJob;
};

/**
 * Unsave a job
 */
export const unsaveJob = async (jobId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User must be logged in');
    }

    const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('job_id', jobId)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error unsaving job:', error);
        throw error;
    }
};

/**
 * Fetch user's saved jobs
 */
export const fetchSavedJobs = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User must be logged in');
    }

    const { data, error } = await supabase
        .from('saved_jobs')
        .select(`
      *,
      jobs (*)
    `)
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });

    if (error) {
        console.error('Error fetching saved jobs:', error);
        throw error;
    }

    return data;
};

/**
 * Fetch user's job applications
 */
export const fetchUserApplications = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User must be logged in');
    }

    const { data, error } = await supabase
        .from('job_applications')
        .select(`
      *,
      jobs (*)
    `)
        .eq('user_id', user.id)
        .order('applied_at', { ascending: false });

    if (error) {
        console.error('Error fetching applications:', error);
        throw error;
    }

    return data;
};

/**
 * Check if user has applied to a job
 */
export const hasAppliedToJob = async (jobId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return false;
    }

    const { data, error } = await supabase
        .from('job_applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('user_id', user.id)
        .maybeSingle();

    if (error) {
        console.error('Error checking application status:', error);
        return false;
    }

    return !!data;
};

/**
 * Check if user has saved a job
 */
export const hasJobSaved = async (jobId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return false;
    }

    const { data, error } = await supabase
        .from('saved_jobs')
        .select('id')
        .eq('job_id', jobId)
        .eq('user_id', user.id)
        .maybeSingle();

    if (error) {
        console.error('Error checking saved status:', error);
        return false;
    }

    return !!data;
};

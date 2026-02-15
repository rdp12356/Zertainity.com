
import { supabase } from "@/integrations/supabase/client";

export interface CareerPath {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string;
    academic_weight: number;
    interest_weight: number;
    salary_min: number;
    salary_max: number;
    growth_potential: 'low' | 'medium' | 'high';
    industries: string[];
    skills: string[];
    demand_level?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export const careerService = {
    async getAllCareers() {
        const { data, error } = await supabase

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .from('career_paths' as any)
            .select('*')
            .order('title');

        if (error) throw error;
        return data as unknown as CareerPath[];
    },

    async getCareerBySlug(slug: string) {
        const { data, error } = await supabase
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .from('career_paths' as any)
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data as unknown as CareerPath;
    },

    async createCareer(career: Omit<CareerPath, 'id' | 'created_at' | 'updated_at' | 'is_active'>) {
        const { data, error } = await supabase
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .from('career_paths' as any)
            .insert(career)
            .select()
            .single();

        if (error) throw error;
        return data as unknown as CareerPath;
    },

    async updateCareer(id: string, updates: Partial<CareerPath>) {
        const { data, error } = await supabase
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .from('career_paths' as any)
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as unknown as CareerPath;
    },

    async deleteCareer(id: string) {
        const { error } = await supabase
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .from('career_paths' as any)
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};

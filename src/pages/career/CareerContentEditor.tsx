import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { careerService, CareerPath } from '@/services/careerService';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Save,
    ArrowLeft,
    Plus,
    Trash2,
    Search,
    LayoutTemplate,
    FileText,
    BarChart3,
    Briefcase,
    Check,
    ChevronRight,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CareerContentEditor = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Form State
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [academicWeight, setAcademicWeight] = useState(50);
    const [interestWeight, setInterestWeight] = useState(50);
    const [salaryMin, setSalaryMin] = useState(50000);
    const [salaryMax, setSalaryMax] = useState(100000);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [growthPotential, setGrowthPotential] = useState<'low' | 'medium' | 'high'>('medium');

    // Fetch Careers
    const { data: careers, isLoading } = useQuery({
        queryKey: ['careers'],
        queryFn: careerService.getAllCareers
    });

    // Fetch Selected Career
    const { data: selectedCareer } = useQuery({
        queryKey: ['career', selectedCareerId],
        queryFn: () => careerService.getCareerBySlug(selectedCareerId || ''),
        enabled: !!selectedCareerId
    });

    useEffect(() => {
        if (selectedCareer) {
            setTitle(selectedCareer.title);
            setSummary(selectedCareer.summary);
            setDescription(selectedCareer.description);
            setAcademicWeight(selectedCareer.academic_weight);
            setInterestWeight(selectedCareer.interest_weight);
            setSalaryMin(selectedCareer.salary_min);
            setSalaryMax(selectedCareer.salary_max);
            setSelectedIndustries(selectedCareer.industries);
            setSkills(selectedCareer.skills);
            setGrowthPotential(selectedCareer.growth_potential as 'low' | 'medium' | 'high');
        } else {
            // Reset form
            setTitle("");
            setSummary("");
            setDescription("");
            setAcademicWeight(50);
            setInterestWeight(50);
            setSalaryMin(50000);
            setSalaryMax(100000);
            setSelectedIndustries([]);
            setSkills([]);
            setGrowthPotential('medium');
        }
    }, [selectedCareer, selectedCareerId]);

    // Mutations
    const createMutation = useMutation({
        mutationFn: careerService.createCareer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['careers'] });
            toast.success('Career created successfully');
        },
        onError: (error) => toast.error(`Error creating career: ${error.message}`)
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<CareerPath> }) => careerService.updateCareer(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['careers'] });
            toast.success('Career updated successfully');
        },
        onError: (error) => toast.error(`Error updating career: ${error.message}`)
    });

    const handleSave = () => {
        const careerData = {
            title,
            slug: title.toLowerCase().replace(/ /g, '-'),
            summary,
            description,
            academic_weight: academicWeight,
            interest_weight: interestWeight,
            salary_min: salaryMin,
            salary_max: salaryMax,
            industries: selectedIndustries,
            skills,
            growth_potential: growthPotential
        };

        if (selectedCareer?.id) {
            updateMutation.mutate({ id: selectedCareer.id, data: careerData });
        } else {
            createMutation.mutate(careerData);
        }
    };

    const toggleIndustry = (industry: string) => {
        if (selectedIndustries.includes(industry)) {
            setSelectedIndustries(prev => prev.filter(i => i !== industry));
        } else {
            setSelectedIndustries(prev => [...prev, industry]);
        }
    };

    const addSkill = () => {
        const skill = prompt("Enter new skill:");
        if (skill && !skills.includes(skill)) {
            setSkills([...skills, skill]);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const filteredCareers = careers?.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">

            {/* Sidebar List */}
            <aside className="w-80 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/admin')}>
                        <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-lg">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="font-bold tracking-tight">Back to Admin</span>
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search careers..."
                            className="pl-9 h-10 bg-gray-50 border-gray-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => setSelectedCareerId(null)}
                        className="w-full justify-start gap-2 bg-black text-white hover:bg-gray-800"
                    >
                        <Plus className="w-4 h-4" /> Create New Career
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
                    {isLoading ? (
                        <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
                    ) : filteredCareers?.map((career) => (
                        <button
                            key={career.id}
                            onClick={() => setSelectedCareerId(career.slug)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all ${selectedCareerId === career.slug
                                ? 'bg-gray-100 text-black font-semibold'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                }`}
                        >
                            <span className="truncate">{career.title}</span>
                            {selectedCareerId === career.slug && <ChevronRight className="w-4 h-4 text-gray-400" />}
                        </button>
                    ))}
                    {filteredCareers?.length === 0 && (
                        <div className="p-4 text-center text-sm text-gray-400">No careers found</div>
                    )}
                </div>
            </aside>

            {/* Main Editor */}
            <main className="flex-1 flex flex-col min-w-0 bg-gray-50">
                {/* Editor Header */}
                <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-lg font-bold flex items-center gap-2">
                            {selectedCareerId ? 'Edit Career' : 'New Career'}
                            {selectedCareerId && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">Published</span>}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </Button>
                        <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending} className="bg-black text-white hover:bg-gray-800 min-w-[140px]">
                            {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </header>

                {/* Editor Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto grid grid-cols-12 gap-8">

                        {/* Main Form */}
                        <div className="col-span-8 space-y-8">
                            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold flex items-center gap-2 text-gray-700">
                                        <LayoutTemplate className="w-4 h-4" /> Career Title
                                    </label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="h-12 text-lg font-semibold bg-gray-50 border-gray-200"
                                        placeholder="e.g. Senior Data Scientist"
                                    />
                                    <p className="text-xs text-gray-400">Slug: {title.toLowerCase().replace(/ /g, '-')}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold flex items-center gap-2 text-gray-700">
                                        <FileText className="w-4 h-4" /> Summary
                                    </label>
                                    <textarea
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        className="w-full min-h-[100px] p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all text-sm resize-none"
                                        placeholder="Brief overview for cards..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold flex items-center gap-2 text-gray-700">
                                        <FileText className="w-4 h-4" /> Full Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full min-h-[300px] p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all text-sm resize-none font-mono"
                                        placeholder="Markdown supported content..."
                                    />
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5" /> Requirements & Skills</h3>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-700">Skills</label>
                                    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200 min-h-[60px]">
                                        {skills.map(skill => (
                                            <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm font-medium shadow-sm">
                                                {skill}
                                                <button onClick={() => removeSkill(skill)} className="ml-2 text-gray-400 hover:text-red-500">
                                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                                </button>
                                            </span>
                                        ))}
                                        <button onClick={addSkill} className="inline-flex items-center px-3 py-1 rounded-full border border-dashed border-gray-300 hover:border-black hover:text-black text-sm text-gray-500 transition-colors">
                                            + Add Skill
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar Options */}
                        <div className="col-span-4 space-y-8">
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Metrics</h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-600">Academic Weight</span>
                                            <span className="font-bold">{academicWeight}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100"
                                            value={academicWeight}
                                            onChange={(e) => setAcademicWeight(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-black"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-600">Interest Weight</span>
                                            <span className="font-bold">{interestWeight}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100"
                                            value={interestWeight}
                                            onChange={(e) => setInterestWeight(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-black"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <label className="text-sm font-bold text-gray-700 block">Salary Range (Annual)</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500">Min</span>
                                            <Input type="number" value={salaryMin} onChange={(e) => setSalaryMin(Number(e.target.value))} className="h-9 bg-gray-50" />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500">Max</span>
                                            <Input type="number" value={salaryMax} onChange={(e) => setSalaryMax(Number(e.target.value))} className="h-9 bg-gray-50" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <label className="text-sm font-bold text-gray-700 block">Growth Potential</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Low', 'Medium', 'High'].map(level => (
                                            <button
                                                key={level}
                                                onClick={() => setGrowthPotential(level.toLowerCase() as 'low' | 'medium' | 'high')}
                                                className={`py-2 text-xs font-bold rounded-lg border transition-all ${growthPotential === level.toLowerCase()
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                                <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wide">Industries</h3>
                                <div className="space-y-2">
                                    {["Technology", "Research & Science", "Finance", "Healthcare", "Design", "Engineering"].map((industry) => (
                                        <label key={industry} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedIndustries.includes(industry) ? 'bg-black border-black text-white' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                                                {selectedIndustries.includes(industry) && <Check className="w-3 h-3" />}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{industry}</span>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedIndustries.includes(industry)}
                                                onChange={() => toggleIndustry(industry)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default CareerContentEditor;

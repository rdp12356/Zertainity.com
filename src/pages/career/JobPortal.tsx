import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, MapPin, Clock, DollarSign, ChevronLeft, ChevronRight, Bell, Sparkles, Lightbulb, Loader2, Bookmark, BookmarkCheck, Briefcase, Filter, ArrowUpRight } from 'lucide-react';
import { fetchJobs, type JobFilters, saveJob, unsaveJob } from '@/services/jobService';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const JobPortal = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter states
    const [salaryRanges, setSalaryRanges] = useState<string[]>([]);
    const [experienceLevel, setExperienceLevel] = useState<string>('');
    const [workModes, setWorkModes] = useState<string[]>([]);
    const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

    const filters: JobFilters = {
        search: debouncedSearch,
        salaryRanges,
        experienceLevel,
        workModes,
        page: currentPage,
        pageSize: 10,
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['jobs', filters],
        queryFn: () => fetchJobs(filters),
    });

    // Reset to page 1 when filters change
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [debouncedSearch, salaryRanges, experienceLevel, workModes]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSalaryRangeChange = (range: string) => {
        setSalaryRanges(prev =>
            prev.includes(range)
                ? prev.filter(r => r !== range)
                : [...prev, range]
        );
    };

    const handleWorkModeChange = (mode: string) => {
        setWorkModes(prev =>
            prev.includes(mode)
                ? prev.filter(m => m !== mode)
                : [...prev, mode]
        );
    };

    const handleClearFilters = () => {
        setSalaryRanges([]);
        setExperienceLevel('');
        setWorkModes([]);
        setSearchQuery('');
        setCurrentPage(1);
    };

    const handleSaveJob = async (jobId: string) => {
        try {
            if (savedJobIds.has(jobId)) {
                await unsaveJob(jobId);
                setSavedJobIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(jobId);
                    return newSet;
                });
                toast({
                    title: "Job unsaved",
                    description: "Job removed from your saved list",
                });
            } else {
                await saveJob(jobId);
                setSavedJobIds(prev => new Set(prev).add(jobId));
                toast({
                    title: "Job saved",
                    description: "Job added to your saved list",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save job. Please try again.",
                variant: "destructive",
            });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatSalary = (job: any) => {
        if (!job.salary_min && !job.salary_max) return 'Salary not specified';

        if (job.salary_period === 'hourly') {
            return `$${job.salary_min} - $${job.salary_max} / hr`;
        } else {
            const min = job.salary_min ? `$${(job.salary_min / 1000).toFixed(0)}k` : '';
            const max = job.salary_max ? `$${(job.salary_max / 1000).toFixed(0)}k` : '';
            return `${min} - ${max}`;
        }
    };

    const formatPostedDate = (dateString: string | null) => {
        if (!dateString) return 'Recently posted';

        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Posted today';
        if (diffDays === 1) return 'Posted yesterday';
        if (diffDays < 7) return `Posted ${diffDays} days ago`;
        if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} weeks ago`;
        return `Posted ${Math.floor(diffDays / 30)} months ago`;
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white">

            {/* Header */}
            <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 h-16">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                        <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-lg">
                            <span className="text-lg font-bold">∞</span>
                        </div>
                        <span className="font-bold tracking-tight">Zertainity</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium text-gray-500 hover:text-black transition-colors cursor-pointer" onClick={() => navigate("/careers")}>Careers</a>
                        <a className="text-sm font-medium text-gray-500 hover:text-black transition-colors cursor-pointer" onClick={() => navigate("/mentorship")}>Mentorship</a>
                        <a className="text-sm font-medium text-black cursor-pointer">Jobs</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                            JS
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <main className="pt-24 px-6 max-w-7xl mx-auto w-full pb-20">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left Sidebar: Filters */}
                    <aside className="lg:col-span-3 space-y-8 h-fit sticky top-24 hidden lg:block">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</h3>
                                <button
                                    onClick={handleClearFilters}
                                    className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Salary Range */}
                                <div>
                                    <h4 className="text-sm font-bold mb-3">Salary Range</h4>
                                    <div className="space-y-2">
                                        {['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+'].map((range) => (
                                            <label key={range} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer group hover:text-black transition-colors">
                                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${salaryRanges.includes(range) ? 'bg-black border-black' : 'border-gray-300'}`}>
                                                    {salaryRanges.includes(range) && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                                                </div>
                                                <input
                                                    className="hidden"
                                                    type="checkbox"
                                                    checked={salaryRanges.includes(range)}
                                                    onChange={() => handleSalaryRangeChange(range)}
                                                />
                                                <span>{range}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100"></div>

                                {/* Experience Level */}
                                <div>
                                    <h4 className="text-sm font-bold mb-3">Experience Level</h4>
                                    <div className="space-y-2">
                                        {['Internship', 'Entry Level', 'Mid Level', 'Senior Level'].map((level) => (
                                            <label key={level} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer group hover:text-black transition-colors">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${experienceLevel === level ? 'border-black' : 'border-gray-300'}`}>
                                                    {experienceLevel === level && <div className="w-2 h-2 rounded-full bg-black"></div>}
                                                </div>
                                                <input
                                                    className="hidden"
                                                    name="experience"
                                                    type="radio"
                                                    checked={experienceLevel === level}
                                                    onChange={() => setExperienceLevel(level)}
                                                />
                                                <span>{level}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100"></div>

                                {/* Work Mode */}
                                <div>
                                    <h4 className="text-sm font-bold mb-3">Work Mode</h4>
                                    <div className="space-y-2">
                                        {['On-site', 'Remote', 'Hybrid'].map((mode) => (
                                            <label key={mode} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer group hover:text-black transition-colors">
                                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${workModes.includes(mode) ? 'bg-black border-black' : 'border-gray-300'}`}>
                                                    {workModes.includes(mode) && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                                                </div>
                                                <input
                                                    className="hidden"
                                                    type="checkbox"
                                                    checked={workModes.includes(mode)}
                                                    onChange={() => handleWorkModeChange(mode)}
                                                />
                                                <span>{mode}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Career Tip */}
                        <div className="rounded-2xl bg-gray-900 text-white p-6 shadow-lg shadow-gray-900/20">
                            <div className="flex items-center gap-2 mb-3">
                                <Lightbulb size={20} className="text-yellow-400" />
                                <h4 className="font-bold">Pro Tip</h4>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                Tailoring your resume for each application increases your interview chances by <span className="text-white font-bold">40%</span>.
                            </p>
                            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-8 text-xs bg-transparent">
                                Fix my resume
                            </Button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9 flex flex-col gap-8">

                        {/* Search & Header */}
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-4">Find your next role</h1>
                            <div className="relative shadow-lg shadow-gray-200/50 rounded-2xl bg-white border border-gray-200">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                                    <Search size={20} />
                                </div>
                                <Input
                                    className="block w-full rounded-2xl border-none pl-12 pr-4 h-14 text-lg placeholder:text-gray-400 focus-visible:ring-0"
                                    placeholder="Search for jobs, skills, or companies..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Results Header */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-500">
                                {isLoading ? 'Searching...' : `Found ${data?.total || 0} opportunities`}
                            </span>
                            <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-black transition-colors">
                                Sort by: <span className="font-bold text-black">Relevance</span>
                            </div>
                        </div>

                        {/* Job List */}
                        <div className="flex flex-col gap-4">
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <Loader2 className="size-8 animate-spin text-black" />
                                    <p className="text-gray-500">Curating jobs for you...</p>
                                </div>
                            )}

                            {error && (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <p className="text-red-500 font-medium">Unable to load jobs right now.</p>
                                    <Button onClick={() => refetch()}>Try Again</Button>
                                </div>
                            )}

                            {!isLoading && !error && data?.jobs.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 gap-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                                        <Search className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p className="text-gray-500 font-medium">No jobs found matching your criteria.</p>
                                    <Button variant="outline" onClick={handleClearFilters}>Clear all filters</Button>
                                </div>
                            )}

                            {!isLoading && !error && data?.jobs.map((job, index) => (
                                <motion.article
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={job.id}
                                    className="group relative flex flex-col sm:flex-row gap-6 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-black hover:shadow-lg hover:shadow-gray-200/50 cursor-pointer"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-14 h-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform">
                                            <Briefcase size={24} />
                                        </div>
                                        <div className="flex flex-col gap-1 flex-1">
                                            <div className="flex items-start justify-between">
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {job.title}
                                                </h3>
                                                <span className="text-xs font-medium text-gray-400 whitespace-nowrap hidden sm:block">
                                                    {formatPostedDate(job.posted_date)}
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-700">{job.company}</p>

                                            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500 mt-2">
                                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
                                                    <MapPin size={14} /> {job.location}
                                                </span>
                                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
                                                    <Clock size={14} /> {job.job_type || 'Full-time'}
                                                </span>
                                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
                                                    <DollarSign size={14} /> {formatSalary(job)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                                        <span className="text-xs font-medium text-gray-400 sm:hidden">
                                            {formatPostedDate(job.posted_date)}
                                        </span>
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <Button
                                                variant="outline"
                                                onClick={(e) => { e.stopPropagation(); handleSaveJob(job.id); }}
                                                className="w-10 h-10 p-0 rounded-xl border-gray-200 hover:border-black hover:bg-white"
                                            >
                                                {savedJobIds.has(job.id) ? <BookmarkCheck size={18} className="text-black fill-black" /> : <Bookmark size={18} />}
                                            </Button>
                                            <Button className="flex-1 sm:flex-none rounded-xl bg-black text-white hover:bg-gray-800 font-bold px-6">
                                                Apply <ArrowUpRight className="w-4 h-4 ml-1.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {!isLoading && !error && data && data.totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-8 pb-12">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-xl"
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft size={18} />
                                </Button>

                                {Array.from({ length: Math.min(data.totalPages, 5) }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${page === currentPage ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}

                                {data.totalPages > 5 && <span className="text-gray-400 px-2">...</span>}

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-xl"
                                    onClick={() => setCurrentPage(Math.min(data.totalPages, currentPage + 1))}
                                    disabled={currentPage === data.totalPages}
                                >
                                    <ChevronRight size={18} />
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </main>
        </div>
    );
};

export default JobPortal;

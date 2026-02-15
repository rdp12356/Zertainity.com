import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Scholarship {
    id: string;
    name: string;
    provider: string;
    amount: string;
    amount_type: string;
    category: string[];
    scholarship_type: string[];
    eligibility: string;
    deadline: string;
    description: string;
}

const Scholarships = () => {
    const navigate = useNavigate();
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<string[]>([]);

    useEffect(() => {
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        try {
            const { data, error } = await supabase
                .from('scholarships')
                .select('*');

            if (error) throw error;

            if (data) {
                setScholarships(data);
            }
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredScholarships = scholarships.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.provider.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory.length === 0 || s.category.some(c => filterCategory.includes(c));
        const matchesType = filterType.length === 0 || s.scholarship_type.some(t => filterType.includes(t));

        return matchesSearch && matchesCategory && matchesType;
    });

    const toggleFilter = (set: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        set(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#111318] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden antialiased">
            <header className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark bg-white/80 dark:bg-black/80 backdrop-blur-md">
                <div className="px-4 md:px-8 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-lg">
                            <span className="text-lg font-bold">∞</span>
                        </div>
                        <h2 className="text-[#111318] dark:text-white text-lg font-semibold tracking-tight">Zertainity</h2>
                    </div>
                </div>
            </header>
            <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-black dark:text-white">Scholarship Finder</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Discover opportunities tailored to your academic profile.</p>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined">search</span>
                            <input
                                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-shadow placeholder-gray-400"
                                placeholder="Search by name, provider, or keywords..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 sticky top-28">
                        <div>
                            <h3 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">Category</h3>
                            <div className="space-y-3">
                                {['STEM', 'Arts & Humanities', 'Sports', 'Research'].map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            className="filter-checkbox rounded border-gray-300 text-black focus:ring-0 focus:ring-offset-0 transition-all w-4 h-4"
                                            type="checkbox"
                                            checked={filterCategory.includes(cat)}
                                            onChange={() => toggleFilter(setFilterCategory, cat)}
                                        />
                                        <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>
                    <div className="flex-1 w-full space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500 font-medium">Showing {filteredScholarships.length} results</span>
                        </div>

                        {loading ? (
                            <div className="flex justify-center p-12">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            </div>
                        ) : filteredScholarships.length === 0 ? (
                            <div className="text-center p-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">No scholarships found matching your criteria.</p>
                            </div>
                        ) : (
                            filteredScholarships.map((scholarship) => (
                                <div key={scholarship.id} className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                {scholarship.scholarship_type.map(type => (
                                                    <span key={type} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">{type}</span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{scholarship.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Offered by <span className="font-bold text-black dark:text-white">{scholarship.provider}</span></p>
                                        </div>
                                        <div className="text-right sm:text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-end">
                                            <p className="text-lg font-bold text-black dark:text-white">{scholarship.amount}</p>
                                            <p className="text-xs text-gray-500">{scholarship.amount_type}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Eligibility</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{scholarship.eligibility}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Deadline</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(scholarship.deadline).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex justify-end items-center">
                                            <button className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Scholarships;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AcademicMarks = () => {
    const navigate = useNavigate();
    const [marks, setMarks] = useState({
        physics: '',
        chemistry: '',
        math: '',
        english: '',
        optionalScore: ''
    });

    const [aggregate, setAggregate] = useState<number | null>(null);
    const [totalMarks, setTotalMarks] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMarks(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const calculateAggregate = () => {
            const p = parseFloat(marks.physics) || 0;
            const c = parseFloat(marks.chemistry) || 0;
            const m = parseFloat(marks.math) || 0;
            const e = parseFloat(marks.english) || 0;
            const o = parseFloat(marks.optionalScore) || 0;

            // Simple logic: If all main 4 are present, calculate
            // Assuming best 4 functionality roughly as per UI snippet showing 4 subjects + optional
            // The HTML says "aggregate score is calculated based on the best 4 subjects including English"

            // For now, let's just sum all entered components if there are enough
            const subjects = [p, c, m, e];
            if (marks.optionalScore) subjects.push(o);

            // Assuming all out of 100
            // Simple sum for "Total Marks" shown in UI example (442/500)
            const total = subjects.reduce((a, b) => a + b, 0);
            const count = subjects.length || 1;
            const percentage = (total / (count * 100)) * 100;

            // Override with UI "best 4" logic if implied? 
            // The UI shows 88.4% and 442/500 which is 88.4%. 442/500 implies 5 subjects were counted.
            // So default behavior: Sum all / (Count * 100)

            if (subjects.some(s => s > 0)) {
                setTotalMarks(total);
                setAggregate(parseFloat(percentage.toFixed(1)));
            } else {
                setTotalMarks(null);
                setAggregate(null);
            }
        };
        calculateAggregate();
    }, [marks]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/auth');
    };

    const handleNext = () => {
        navigate('/quiz');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden antialiased selection:bg-slate-900/20 selection:text-slate-900 dark:selection:bg-white/20 dark:selection:text-white">
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-6 py-3 lg:px-10">
                <div className="flex items-center gap-4 text-slate-900 dark:text-white">
                    <div className="flex items-center justify-center size-8 bg-slate-900/10 dark:bg-white/10 rounded-lg text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Zertainity</h2>
                </div>
                <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                    <nav className="flex items-center gap-6">
                        <a className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
                        <a className="text-slate-900 dark:text-white font-semibold text-sm leading-normal" href="#">Assessments</a>
                        <a className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium leading-normal" href="#">Profile</a>
                    </nav>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                    <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span className="truncate">Sign Out</span>
                    </button>
                </div>
                <button className="md:hidden p-2 text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </header>
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
                <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center size-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold">2</span>
                            <p className="text-slate-900 dark:text-white text-sm font-semibold uppercase tracking-wider">Academic Details</p>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Step 2 of 5</p>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-900 dark:bg-white w-2/5 rounded-full shadow-[0_0_10px_rgba(15,23,42,0.3)]"></div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto w-full">
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                                Enter Academic Marks
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                                Please enter your Grade 12 results. Accurate data helps our AI tailor the best career paths for you.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="physics">Physics</label>
                                    <div className="relative">
                                        <input
                                            autoFocus
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-900 dark:focus:border-white transition-all text-base font-medium"
                                            id="physics"
                                            max="100"
                                            min="0"
                                            name="physics"
                                            placeholder="0-100"
                                            type="number"
                                            value={marks.physics}
                                            onChange={handleChange}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">/100</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="chemistry">Chemistry</label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-900 dark:focus:border-white transition-all text-base font-medium"
                                            id="chemistry"
                                            max="100"
                                            min="0"
                                            name="chemistry"
                                            placeholder="0-100"
                                            type="number"
                                            value={marks.chemistry}
                                            onChange={handleChange}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">/100</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="math">Mathematics</label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-900 dark:focus:border-white transition-all text-base font-medium"
                                            id="math"
                                            max="100"
                                            min="0"
                                            name="math"
                                            placeholder="0-100"
                                            type="number"
                                            value={marks.math}
                                            onChange={handleChange}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">/100</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="english">English</label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-900 dark:focus:border-white transition-all text-base font-medium"
                                            id="english"
                                            max="100"
                                            min="0"
                                            name="english"
                                            placeholder="0-100"
                                            type="number"
                                            value={marks.english}
                                            onChange={handleChange}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">/100</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Optional Subject</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                <span className="material-symbols-outlined text-[20px]">edit_note</span>
                                            </div>
                                            <input className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-900 dark:focus:border-white transition-all text-base font-medium" placeholder="e.g. Computer Science" type="text" />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-900 dark:focus:border-white transition-all text-base font-medium"
                                            max="100"
                                            min="0"
                                            name="optionalScore"
                                            placeholder="Score"
                                            type="number"
                                            value={marks.optionalScore}
                                            onChange={handleChange}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">/100</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <button className="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-semibold transition-all flex items-center gap-2 group" onClick={() => navigate(-1)}>
                                <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1 text-sm">arrow_back</span>
                                Back
                            </button>
                            <button className="px-8 py-3 rounded-lg bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold shadow-lg shadow-slate-900/20 dark:shadow-white/10 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group" onClick={handleNext}>
                                Next Step
                                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-80 flex flex-col gap-6">
                        <div className="sticky top-24">
                            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full blur-2xl group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-all duration-700"></div>
                                <div className="relative z-10 flex flex-col gap-1">
                                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Aggregate Percentage</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{aggregate ?? '--'}</span>
                                        <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">%</span>
                                    </div>
                                </div>
                                <div className="h-px w-full bg-slate-100 dark:bg-slate-800"></div>
                                <div className="relative z-10 flex flex-col gap-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Total Marks</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{totalMarks ?? '--'} / {(marks.optionalScore ? 500 : 400)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Eligibility Status</span>
                                        {aggregate && aggregate > 85 ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
                                                <span className="size-1.5 rounded-full bg-slate-900 dark:bg-white animate-pulse"></span>
                                                High
                                            </span>
                                        ) : (
                                            <span className="text-slate-400">--</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex gap-3">
                                <span className="material-symbols-outlined text-slate-500 shrink-0">info</span>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your aggregate score is calculated based on the best 4 subjects including English. This score is used to unlock specific universities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AcademicMarks;

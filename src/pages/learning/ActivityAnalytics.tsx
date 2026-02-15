import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ActivityAnalytics = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-black dark:text-white font-display min-h-screen overflow-x-hidden">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 flex flex-col bg-white dark:bg-black">
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center rounded">
                                <span className="text-white dark:text-black font-bold text-xl">Z</span>
                            </div>
                            <div>
                                <h1 className="text-sm font-bold tracking-tight">ZERTAINITY</h1>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Guidance</p>
                            </div>
                        </div>
                    </div>
                    <nav className="flex-1 p-4 flex flex-col gap-2">
                        <Link className="flex items-center gap-3 px-3 py-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors" to="/">
                            <span className="material-symbols-outlined text-[20px]">dashboard</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-black dark:text-white" to="/activity-analytics">
                            <span className="material-symbols-outlined text-[20px]">analytics</span>
                            <span className="text-sm font-medium">Activity Analytics</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors" to="/pathways">
                            <span className="material-symbols-outlined text-[20px]">conversion_path</span>
                            <span className="text-sm font-medium">Skill Paths</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-3 py-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors" to="/mentorship">
                            <span className="material-symbols-outlined text-[20px]">groups</span>
                            <span className="text-sm font-medium">Mentorship</span>
                        </Link>
                        <div className="mt-auto border-t border-neutral-200 dark:border-neutral-800 pt-4 flex flex-col gap-2">
                            <Link className="flex items-center gap-3 px-3 py-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors" to="/profile">
                                <span className="material-symbols-outlined text-[20px]">settings</span>
                                <span className="text-sm font-medium">Settings</span>
                            </Link>
                        </div>
                    </nav>
                </aside>
                {/* Main Content */}
                <main className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-black">
                    {/* Header */}
                    <header className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-8 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <nav className="flex text-xs font-medium text-neutral-500 gap-2">
                                <span>Dashboard</span>
                                <span>/</span>
                                <span className="text-black dark:text-white">Activity Analytics</span>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/notifications')} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors">
                                <span className="material-symbols-outlined text-[20px]">notifications</span>
                            </button>
                            <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                                <div className="w-full h-full bg-cover bg-center flex items-center justify-center text-xs font-bold" title="Student profile minimalist avatar">
                                    JD
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="p-8 max-w-7xl mx-auto space-y-12">
                        {/* Summary Stats */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="border-b-4 border-black dark:border-white pb-4">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Skills Mastered</p>
                                <h2 className="text-6xl font-black tracking-tighter">24</h2>
                            </div>
                            <div className="border-b-4 border-neutral-200 dark:border-neutral-800 pb-4">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Assessments Completed</p>
                                <h2 className="text-6xl font-black tracking-tighter">12</h2>
                            </div>
                            <div className="border-b-4 border-neutral-200 dark:border-neutral-800 pb-4">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Hours of Mentorship</p>
                                <h2 className="text-6xl font-black tracking-tighter">15.5</h2>
                            </div>
                        </section>
                        {/* Data Visualizations */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Line Chart: Skill Growth */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex items-end justify-between">
                                    <h3 className="text-lg font-bold tracking-tight">Skill Growth</h3>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">6 Month Trend</div>
                                </div>
                                <div className="h-64 w-full relative border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-neutral-50 dark:bg-neutral-900/50">
                                    {/* SVG Placeholder for Line Chart */}
                                    <svg className="w-full h-full" viewBox="0 0 400 150">
                                        <path className="line-graph-path stroke-black dark:stroke-white stroke-2 fill-none" d="M0,130 L50,110 L100,120 L150,80 L200,90 L250,50 L300,60 L350,20 L400,30"></path>
                                        <circle cx="350" cy="20" fill="currentColor" r="4" className="text-black dark:text-white"></circle>
                                        <g className="text-[8px] fill-neutral-500">
                                            <text x="0" y="145">JAN</text>
                                            <text x="80" y="145">MAR</text>
                                            <text x="160" y="145">MAY</text>
                                            <text x="240" y="145">JUL</text>
                                            <text x="320" y="145">SEP</text>
                                            <text x="400" y="145">NOV</text>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            {/* Radar Chart: Career Match */}
                            <div className="space-y-6">
                                <div className="flex items-end justify-between">
                                    <h3 className="text-lg font-bold tracking-tight">Career Match Accuracy</h3>
                                    <span className="text-[10px] px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black rounded">89%</span>
                                </div>
                                <div className="aspect-square w-full border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center p-8 bg-neutral-50 dark:bg-neutral-900/50">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                                        <polygon className="radar-grid stroke-neutral-800 dark:stroke-neutral-200 stroke-1 fill-none" points="50,10 90,40 75,90 25,90 10,40"></polygon>
                                        <polygon className="radar-grid stroke-neutral-800 dark:stroke-neutral-200 stroke-1 fill-none" opacity="0.5" points="50,30 70,45 65,70 35,70 25,45"></polygon>
                                        <polygon fill="none" points="50,15 85,38 70,85 30,85 15,42" stroke="currentColor" strokeWidth="2" className="text-black dark:text-white"></polygon>
                                        <g className="text-[5px] fill-neutral-500 font-bold">
                                            <text textAnchor="middle" x="50" y="5">PYTHON</text>
                                            <text textAnchor="start" x="95" y="42">DATA VIZ</text>
                                            <text textAnchor="start" x="80" y="95">SQL</text>
                                            <text textAnchor="end" x="20" y="95">MATH</text>
                                            <text textAnchor="end" x="5" y="42">LOGIC</text>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </section>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                            {/* Milestone Timeline */}
                            <div className="lg:col-span-3 space-y-6">
                                <h3 className="text-lg font-bold tracking-tight">Milestone Timeline</h3>
                                <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1px] before:bg-neutral-200 dark:before:bg-neutral-800">
                                    {/* Milestone 1 */}
                                    <div className="relative">
                                        <div className="absolute -left-[36px] top-1.5 w-4 h-4 bg-white dark:bg-black border-2 border-black dark:border-white rounded-full"></div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-tight">Top 10% in Python Quiz</h4>
                                                <p className="text-xs text-neutral-500 mt-1">Advanced programming assessment completed with high accuracy.</p>
                                            </div>
                                            <span className="text-[10px] text-neutral-400 font-medium">OCT 14</span>
                                        </div>
                                    </div>
                                    {/* Milestone 2 */}
                                    <div className="relative">
                                        <div className="absolute -left-[36px] top-1.5 w-4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-tight text-neutral-400">Resume Completed (v2)</h4>
                                                <p className="text-xs text-neutral-500 mt-1">Verified by career mentor for technical placement readiness.</p>
                                            </div>
                                            <span className="text-[10px] text-neutral-400 font-medium">SEP 28</span>
                                        </div>
                                    </div>
                                    {/* Milestone 3 */}
                                    <div className="relative">
                                        <div className="absolute -left-[36px] top-1.5 w-4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-tight text-neutral-400">30-Day Streak Milestone</h4>
                                                <p className="text-xs text-neutral-500 mt-1">Consistent learning engagement for four consecutive weeks.</p>
                                            </div>
                                            <span className="text-[10px] text-neutral-400 font-medium">SEP 12</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* AI Next Best Action Sidebar */}
                            <aside className="space-y-6">
                                <h3 className="text-lg font-bold tracking-tight">Next Best Action</h3>
                                <div className="flex flex-col gap-4">
                                    {/* Action 1 */}
                                    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl group hover:border-black dark:hover:border-white transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-[16px] text-neutral-500">auto_awesome</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Recommended</span>
                                        </div>
                                        <h4 className="text-xs font-bold mb-2">Enroll in Data Structures</h4>
                                        <p className="text-[11px] text-neutral-500 leading-relaxed mb-4">Complete this path to improve your Career Match Accuracy by 12%.</p>
                                        <button onClick={() => navigate('/pathways')} className="w-full py-2 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold uppercase tracking-tighter rounded group-hover:invert transition-all">
                                            Start Path
                                        </button>
                                    </div>
                                    {/* Action 2 */}
                                    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl group hover:border-black dark:hover:border-white transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-[16px] text-neutral-500">calendar_today</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Upcoming</span>
                                        </div>
                                        <h4 className="text-xs font-bold mb-2">Schedule Mock Interview</h4>
                                        <p className="text-[11px] text-neutral-500 leading-relaxed mb-4">Practice your technical communication with a Senior Engineer.</p>
                                        <button onClick={() => navigate('/mentorship')} className="w-full py-2 border border-black dark:border-white text-black dark:text-white text-[11px] font-bold uppercase tracking-tighter rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                                            Find Slot
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </main>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default ActivityAnalytics;

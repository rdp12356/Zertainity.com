import React, { useState } from 'react';

const ApplicationTracker = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white transition-colors duration-200 min-h-screen font-display">
            <div className="relative flex min-h-screen w-full flex-col">
                <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-10 py-4">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-black dark:bg-white text-white dark:text-black p-1.5 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px] font-bold">bolt</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Zertainity AI</h2>
                        </div>
                        <nav className="hidden lg:flex items-center gap-8">
                            <a className="text-sm font-medium border-b-2 border-black dark:border-white pb-1" href="#">Applications</a>
                            <a className="text-sm font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors" href="#">Events</a>
                            <a className="text-sm font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors" href="#">Guidance</a>
                            <a className="text-sm font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors" href="#">Network</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                        </button>
                        <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-800">
                            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6-v0MWqc015bqlCDzOJ1VrzZGhkEIl1fW0iXOa44SPF_y2S5f9aRu4dkz07Pd6TuIaPrzSRR1fG7uJu9CzXJiNjfX8eowIrtlZeNhIlJOhuZu2iRWWb_f7-vpLFw7VyGyon2QiKg3zq16S2ERu6ZpEsE6b92p4N7v3Vb08K6JBiPObjAT3G5Eef9avwMhF-YmFmVXPnJDafUxwOhdeJKzcuA61KkSuGvwZMRrg8CKLUMbnduYaUuneQohWaEva0KqSwOBuzRB8w" />
                        </div>
                    </div>
                </header>
                <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 md:px-10 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-2">Application Tracker</h1>
                            <p className="text-gray-500 dark:text-gray-400">Manage and track your career opportunities in one place.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-5 py-2.5 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 rounded-full text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                Filter
                            </button>
                            <button className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">add</span>
                                Quick Add
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-9">
                            <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
                                <div className="kanban-column flex-1 min-w-[300px]">
                                    <div className="flex items-center justify-between mb-6 px-1">
                                        <h3 className="font-bold flex items-center gap-2">
                                            Applied <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-md text-xs">4</span>
                                        </h3>
                                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                            <span className="material-symbols-outlined text-xl">more_horiz</span>
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] p-5 rounded-xl hover:border-black dark:hover:border-white transition-all group shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="h-10 w-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center font-bold text-lg">G</div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">2 days ago</span>
                                            </div>
                                            <h4 className="font-bold text-base mb-1">Product Designer</h4>
                                            <p className="text-sm text-gray-500 mb-4">Google • Remote</p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                                                <button className="text-xs font-bold hover:underline">View Details</button>
                                                <button className="text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white">Update Status</button>
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] p-5 rounded-xl hover:border-black dark:hover:border-white transition-all group shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="h-10 w-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center font-bold text-lg">A</div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">5 days ago</span>
                                            </div>
                                            <h4 className="font-bold text-base mb-1">Frontend Engineer</h4>
                                            <p className="text-sm text-gray-500 mb-4">Apple • Cupertino, CA</p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                                                <button className="text-xs font-bold hover:underline">View Details</button>
                                                <button className="text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white">Update Status</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="kanban-column flex-1 min-w-[300px]">
                                    <div className="flex items-center justify-between mb-6 px-1">
                                        <h3 className="font-bold flex items-center gap-2">
                                            In Review <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-md text-xs">2</span>
                                        </h3>
                                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                            <span className="material-symbols-outlined text-xl">more_horiz</span>
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] p-5 rounded-xl hover:border-black dark:hover:border-white transition-all group shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="h-10 w-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center font-bold text-lg">F</div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">Oct 24</span>
                                            </div>
                                            <h4 className="font-bold text-base mb-1">UI Engineer</h4>
                                            <p className="text-sm text-gray-500 mb-4">Figma • San Francisco</p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                                                <button className="text-xs font-bold hover:underline">View Details</button>
                                                <button className="text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white">Update Status</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="kanban-column flex-1 min-w-[300px]">
                                    <div className="flex items-center justify-between mb-6 px-1">
                                        <h3 className="font-bold flex items-center gap-2">
                                            Interviewing <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-md text-xs">1</span>
                                        </h3>
                                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                            <span className="material-symbols-outlined text-xl">more_horiz</span>
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-white dark:bg-[#141414] border border-black dark:border-white p-5 rounded-xl shadow-lg relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-3">
                                                <span className="material-symbols-outlined text-primary dark:text-white text-lg animate-pulse">event_upcoming</span>
                                            </div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="h-10 w-10 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center font-bold text-lg">N</div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Final Round</span>
                                            </div>
                                            <h4 className="font-bold text-base mb-1">Senior UX Designer</h4>
                                            <p className="text-sm text-gray-500 mb-4">Netflix • Los Gatos, CA</p>
                                            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg mb-4 flex items-center gap-3">
                                                <span className="material-symbols-outlined text-lg">calendar_month</span>
                                                <div className="text-[11px]">
                                                    <p className="font-bold">Tomorrow, 10:00 AM</p>
                                                    <p className="text-gray-500">Video Call Interview</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                                                <button className="text-xs font-bold hover:underline">Prepare</button>
                                                <button className="text-xs font-bold text-gray-400">Update Status</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="kanban-column flex-1 min-w-[300px]">
                                    <div className="flex items-center justify-between mb-6 px-1">
                                        <h3 className="font-bold flex items-center gap-2">
                                            Offer/Closed <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-md text-xs">0</span>
                                        </h3>
                                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                            <span className="material-symbols-outlined text-xl">more_horiz</span>
                                        </button>
                                    </div>
                                    <div className="border-2 border-dashed border-gray-200 dark:border-[#262626] rounded-xl h-48 flex items-center justify-center text-gray-400 flex-col gap-2">
                                        <span className="material-symbols-outlined text-3xl">emoji_events</span>
                                        <p className="text-xs font-medium">No offers yet. Keep going!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside className="lg:col-span-3 space-y-8">
                            <div className="p-6 border border-gray-200 dark:border-[#262626] rounded-2xl bg-white dark:bg-[#141414]">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">AI Match Score</h3>
                                    <span className="material-symbols-outlined text-gray-400">info</span>
                                </div>
                                <div className="flex flex-col items-center py-4">
                                    <div className="relative flex items-center justify-center mb-4">
                                        <svg className="w-32 h-32 transform -rotate-90">
                                            <circle className="text-gray-100 dark:text-gray-800" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                                            <circle className="text-black dark:text-white" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="65.6" strokeWidth="8"></circle>
                                        </svg>
                                        <span className="absolute text-3xl font-black">82%</span>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 mb-6">Your profile is a strong match for your active applications.</p>
                                    <button className="w-full py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Improve Score</button>
                                </div>
                            </div>
                            <div className="p-6 border border-gray-200 dark:border-[#262626] rounded-2xl bg-white dark:bg-[#141414]">
                                <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Upcoming Deadlines</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start group cursor-pointer">
                                        <div className="shrink-0 w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center leading-none">
                                            <span className="text-[10px] font-bold text-gray-400">OCT</span>
                                            <span className="text-sm font-bold">30</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold group-hover:underline">Design Challenge</h4>
                                            <p className="text-xs text-gray-500">Meta • 2 days left</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start group cursor-pointer">
                                        <div className="shrink-0 w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center leading-none">
                                            <span className="text-[10px] font-bold text-gray-400">NOV</span>
                                            <span className="text-sm font-bold">02</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold group-hover:underline">Follow-up Email</h4>
                                            <p className="text-xs text-gray-500">Stripe • 5 days left</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start group cursor-pointer">
                                        <div className="shrink-0 w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center leading-none">
                                            <span className="text-[10px] font-bold text-gray-400">NOV</span>
                                            <span className="text-sm font-bold">05</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold group-hover:underline">Portfolio Submission</h4>
                                            <p className="text-xs text-gray-500">Adobe • 8 days left</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-8 py-2 text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors">View Calendar</button>
                            </div>
                        </aside>
                    </div>
                </main>
                <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-10">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">bolt</span>
                            <span className="text-sm font-bold">Zertainity AI</span>
                        </div>
                        <div className="flex gap-8">
                            <a className="text-xs font-medium text-gray-500 hover:text-black dark:hover:text-white" href="#">Privacy Policy</a>
                            <a className="text-xs font-medium text-gray-500 hover:text-black dark:hover:text-white" href="#">Terms of Service</a>
                            <a className="text-xs font-medium text-gray-500 hover:text-black dark:hover:text-white" href="#">Help Center</a>
                        </div>
                        <p className="text-xs text-gray-400">© 2024 Zertainity AI Platform. Minimal & Sharp.</p>
                    </div>
                </footer>
            </div>
            <style>{`
            .kanban-column {
                min-width: 300px;
            }
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                /* @apply equivalent handled by inline styles or separate css if strictly needed, but inline classes work well in Tailwind */
                background-color: #e5e7eb;
                border-radius: 9999px;
            }
            .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #1f2937;
            }
        `}</style>
        </div>
    );
};

export default ApplicationTracker;

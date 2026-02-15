import { useState } from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
    // Mock user data - normally would come from context/auth
    const user = {
        name: "Jessica Smith", // Example
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT9096fjoyBiNSvpNWHWTRr7cclpW33pn3_qYolaXHI5DzK1It94AP88UIcPdG3cPxHIaZunJmgiFGZvSyN_gQ1XGQ2Q-04K0hZll2JD7Qiyzrp1mz6hnBn8QiAzzwDOTirvE1fa4g6gkOEpht20Yh2oqwADazBvKFr9aJ0Vj_oWmtnx7B0YLduN9tLSO393VDtZG-UR3RceFN8c1uW_ScphaHZheOfDLdd89Skyi6oUcBi0JjUf-RvF8sc-pNMiqQb97IW2IlgQ"
    };

    const [filter, setFilter] = useState("all");

    return (
        <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark text-[#1a1a1a] dark:text-neutral-100 antialiased selection:bg-black selection:text-white">

            {/* Header */}
            <header className="w-full bg-surface-light dark:bg-surface-dark border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-xl font-bold tracking-tight text-[#1a1a1a] dark:text-white">ZERTAINITY</Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-500">
                            <Link to="/" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Dashboard</Link>
                            <Link to="/quiz" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Assessments</Link>
                            <Link to="/careers" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Career Path</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined text-[22px]">search</span>
                        </button>
                        {/* Notification Bell in Header - Optional duplication since sidebar has it, but good for consistency */}
                        {/* 
                        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors relative">
                             <span className="material-symbols-outlined text-[22px]">notifications</span>
                             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button> 
                        */}
                        <Link to="/profile">
                            <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden border border-neutral-300 dark:border-neutral-700">
                                <img alt="Profile" className="w-full h-full object-cover" src={user.avatar} />
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-grow w-full max-w-7xl mx-auto flex flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="w-full md:w-64 p-6 md:border-r border-neutral-200 dark:border-neutral-800 sticky top-16 h-fit">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold tracking-tight mb-1 text-[#1a1a1a] dark:text-white">Notifications</h2>
                        <p className="text-xs text-neutral-500 font-medium">Manage your updates</p>
                    </div>
                    <nav className="space-y-1">
                        <button
                            onClick={() => setFilter('all')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${filter === 'all'
                                ? 'bg-neutral-100 dark:bg-neutral-800 font-semibold text-[#1a1a1a] dark:text-white'
                                : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                            <span className="text-sm">All</span>
                            <span className="ml-auto text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded-full text-neutral-700 dark:text-neutral-300">12</span>
                        </button>

                        <button
                            onClick={() => setFilter('jobs')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${filter === 'jobs'
                                ? 'bg-neutral-100 dark:bg-neutral-800 font-semibold text-[#1a1a1a] dark:text-white'
                                : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">work</span>
                            <span className="text-sm">Job Alerts</span>
                        </button>

                        <button
                            onClick={() => setFilter('mentorship')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${filter === 'mentorship'
                                ? 'bg-neutral-100 dark:bg-neutral-800 font-semibold text-[#1a1a1a] dark:text-white'
                                : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">groups</span>
                            <span className="text-sm">Mentorship</span>
                        </button>

                        <button
                            onClick={() => setFilter('system')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${filter === 'system'
                                ? 'bg-neutral-100 dark:bg-neutral-800 font-semibold text-[#1a1a1a] dark:text-white'
                                : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">settings</span>
                            <span className="text-sm">System</span>
                        </button>
                    </nav>
                    <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                        <button className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest hover:text-[#1a1a1a] dark:hover:text-white transition-colors">
                            <span>Mark all as read</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <section className="flex-grow p-6 md:p-10 bg-white/50 dark:bg-black/20">
                    <div className="max-w-3xl mx-auto space-y-4">

                        {/* Job Alert */}
                        {(filter === 'all' || filter === 'jobs') && (
                            <div className="group relative bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="absolute left-3 top-6 w-2 h-2 bg-[#1a1a1a] dark:bg-white rounded-full"></div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-neutral-600 dark:text-neutral-300">work</span>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-bold text-lg leading-tight text-[#1a1a1a] dark:text-white">New Job Match: Senior UX Designer</h3>
                                            <span className="text-[11px] font-medium text-neutral-400 mt-1 uppercase tracking-tighter">2m ago</span>
                                        </div>
                                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4">Based on your recent Python Fundamentals assessment, we found a match at a leading FinTech firm.</p>
                                        <div className="flex items-center gap-3">
                                            <Link to="/jobs" className="px-4 py-2 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                                                View Job
                                            </Link>
                                            <button className="px-4 py-2 text-neutral-400 hover:text-[#1a1a1a] dark:hover:text-white text-xs font-semibold transition-colors">
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mentorship Message */}
                        {(filter === 'all' || filter === 'mentorship') && (
                            <div className="group relative bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-neutral-600 dark:text-neutral-300">person</span>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-bold text-lg leading-tight text-[#1a1a1a] dark:text-white">Message from Sarah Jenkins</h3>
                                            <span className="text-[11px] font-medium text-neutral-400 mt-1 uppercase tracking-tighter">1h ago</span>
                                        </div>
                                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4">"I've reviewed your portfolio project. Let's schedule a call to discuss the improvements on the data architecture..."</p>
                                        <div className="flex items-center gap-3">
                                            <Link to="/mentorship" className="px-4 py-2 border-2 border-neutral-200 dark:border-neutral-700 text-[#1a1a1a] dark:text-white text-xs font-bold rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                                Reply
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* System/Assessment Notification */}
                        {(filter === 'all' || filter === 'system') && (
                            <div className="group relative bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-neutral-600 dark:text-neutral-300">verified</span>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-bold text-lg leading-tight text-[#1a1a1a] dark:text-white">Assessment Completed</h3>
                                            <span className="text-[11px] font-medium text-neutral-400 mt-1 uppercase tracking-tighter">4h ago</span>
                                        </div>
                                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">Your results for 'Advanced React Patterns' are now available in your career dashboard.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mentor Application */}
                        {(filter === 'all' || filter === 'mentorship') && (
                            <div className="group relative bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="absolute left-3 top-6 w-2 h-2 bg-[#1a1a1a] dark:bg-white rounded-full"></div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-neutral-600 dark:text-neutral-300">chat_bubble</span>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-bold text-lg leading-tight text-[#1a1a1a] dark:text-white">New Mentor Application</h3>
                                            <span className="text-[11px] font-medium text-neutral-400 mt-1 uppercase tracking-tighter">Yesterday</span>
                                        </div>
                                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4">David Chen has accepted your request for a 1:1 mentorship session regarding AI Engineering.</p>
                                        <div className="flex items-center gap-3">
                                            <Link to="/mentorship" className="px-4 py-2 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                                                Schedule Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 py-6">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] whitespace-nowrap">Earlier this week</span>
                            <div className="h-[1px] w-full bg-neutral-100 dark:bg-neutral-800"></div>
                        </div>

                        {/* Security Update */}
                        {(filter === 'all' || filter === 'system') && (
                            <div className="group relative bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm opacity-60">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-neutral-400">update</span>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-bold text-lg leading-tight text-[#1a1a1a] dark:text-white">Security Update</h3>
                                            <span className="text-[11px] font-medium text-neutral-400 mt-1 uppercase tracking-tighter">Oct 12</span>
                                        </div>
                                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">Your password was successfully changed. If this wasn't you, please contact support.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full bg-surface-light dark:bg-surface-dark border-t border-neutral-200 dark:border-neutral-800 py-4 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[11px] text-neutral-400 font-medium uppercase tracking-widest">
                    <div>© 2024 Zertainity AI</div>
                    <div className="flex gap-6">
                        <a className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors" href="#">Privacy</a>
                        <a className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors" href="#">Terms</a>
                        <a className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors" href="#">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Notifications;

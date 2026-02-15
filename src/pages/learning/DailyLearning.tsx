import React, { useState } from 'react';

const DailyLearning = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-primary dark:text-white antialiased min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#e5e5e7] dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 px-8 backdrop-blur-md">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-lg">
                            <span className="material-symbols-outlined text-xl">auto_awesome</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-sm font-bold leading-tight tracking-tight uppercase">Zertainity AI</h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Career Platform</p>
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <a className="text-black dark:text-white border-b-2 border-black dark:border-white h-16 flex items-center" href="#">Learning Feed</a>
                        <a className="hover:text-black dark:hover:text-white transition-colors" href="#">Skill Assessments</a>
                        <a className="hover:text-black dark:hover:text-white transition-colors" href="#">Career Path</a>
                        <a className="hover:text-black dark:hover:text-white transition-colors" href="#">Resources</a>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </button>
                    <button className="relative flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-black dark:bg-white ring-2 ring-white dark:ring-black"></span>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCow3Ecak464dpapA00_li5qVPWg2rz-23xuNhWzP0otRpPh3Vp3xvzcYDVtEW4cT7640i6e9CYfDM15J4lw_4uJsvcagAL1FH7XdULcRgWyf9yH9SoCWSCLU7VdH6-Rt8O8nxbDHYEnkH5iu7vK51hoZ4GnFCnBHTJjX_RwJEFb2JdkvlA0MftgaY3oXZBiNF4z4CjNDbD5dE9CGFsGLC8NvDls_vy4DXfs9vm5URvQ9OzO34lHGwfuLNqY7UsAFvR_U4l5CvGVw")' }}></div>
                </div>
            </header>

            <section className="bg-white dark:bg-surface-dark border-b border-[#e5e5e7] dark:border-gray-800 py-10 transition-colors">
                <div className="mx-auto max-w-7xl px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Daily Learning Streak</h3>
                                <span className="text-2xl font-bold">12 Days</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-1.5 flex-1 bg-black dark:bg-white rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-black dark:bg-white rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-black dark:bg-white rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-black dark:bg-white rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                            </div>
                            <p className="text-xs text-gray-500">You're in the top 5% of learners this week. Keep going!</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Skills Mastery</h3>
                                <span className="text-xs font-bold">84% Progress</span>
                            </div>
                            <div className="relative h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="absolute inset-y-0 left-0 bg-black dark:bg-white rounded-full" style={{ width: '84%' }}></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-400">
                                    <span className="h-2 w-2 rounded-full bg-black dark:bg-white"></span> Python
                                </span>
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-400">
                                    <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></span> AI Ethics
                                </span>
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-gray-400">
                                    <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></span> Data Science
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="mx-auto flex w-full max-w-7xl flex-1 gap-12 px-8 py-12 flex-col lg:flex-row">
                <div className="flex-1 space-y-12">
                    <div className="bg-white dark:bg-surface-dark border border-[#e5e5e7] dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 overflow-hidden p-8 flex flex-col md:flex-row gap-8 items-center rounded-2xl">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-black dark:bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:text-black">
                                <span className="material-symbols-outlined text-[14px]">bolt</span>
                                AI Recommended
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tight">Advanced Prompt Engineering for Developers</h2>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Master the art of high-precision LLM interaction. This course covers Chain-of-Thought, Tree-of-Thoughts, and specialized reasoning frameworks.</p>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">schedule</span> 4.5 Hours</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">signal_cellular_alt</span> Advanced</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-lg">workspace_premium</span> Certificate Included</span>
                            </div>
                            <button className="rounded-full bg-black dark:bg-white px-8 py-3 text-sm font-bold text-white dark:text-black transition-transform active:scale-95">Start Learning</button>
                        </div>
                        <div className="h-64 w-full md:w-64 flex items-center justify-center bg-[#f5f5f7] dark:bg-gray-800 rounded-xl">
                            <span className="material-symbols-outlined text-7xl text-gray-200 dark:text-gray-600">terminal</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-surface-dark border border-[#e5e5e7] dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 p-6 flex flex-col justify-between rounded-xl">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Daily Insight</span>
                                    <span className="material-symbols-outlined text-gray-300">lightbulb</span>
                                </div>
                                <h3 className="text-xl font-bold leading-snug">The Evolution of Transformer Architectures</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">A brief history of how Attention mechanisms revolutionized NLP and what's coming next in sparse compute.</p>
                            </div>
                            <button className="mt-8 self-start text-xs font-bold border-b border-black dark:border-white pb-1 hover:text-gray-600 hover:border-gray-400 transition-colors">Read More</button>
                        </div>
                        <div className="bg-white dark:bg-surface-dark border border-[#e5e5e7] dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 p-6 flex flex-col justify-between rounded-xl">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">5-Minute Quiz</span>
                                    <span className="material-symbols-outlined text-gray-300">timer</span>
                                </div>
                                <h3 className="text-xl font-bold leading-snug">Python Optimization & GIL Fundamentals</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Test your knowledge on multi-threading, concurrency, and performance bottlenecks in Python 3.12.</p>
                            </div>
                            <button className="mt-8 rounded-full bg-black dark:bg-white px-6 py-2 text-xs font-bold text-white dark:text-black transition-opacity hover:opacity-90">Take Quiz</button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-surface-dark border border-[#e5e5e7] dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="flex h-16 w-16 items-center justify-center bg-[#f5f5f7] dark:bg-gray-800 rounded-full shrink-0">
                                <span className="material-symbols-outlined text-3xl text-gray-400">video_library</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">Live Webinar</span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                </div>
                                <h3 className="text-lg font-bold">Scaling AI Infrastructure at Enterprise Level</h3>
                                <p className="text-xs text-gray-400">Featuring Senior Architects from top tech firms • Tomorrow at 10:00 AM</p>
                            </div>
                        </div>
                        <button className="rounded-full border border-black dark:border-white px-6 py-2 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all whitespace-nowrap w-full md:w-auto">Register Now</button>
                    </div>
                </div>

                <aside className="w-full lg:w-80 space-y-8 shrink-0">
                    <div className="bg-white dark:bg-surface-dark border border-[#e5e5e7] dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 p-6 rounded-xl">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Your Learning Path</h4>
                        <div className="relative space-y-8 pl-4">
                            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gray-100 dark:bg-gray-800"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="absolute -left-1 h-2 w-2 rounded-full bg-black dark:bg-white ring-4 ring-white dark:ring-surface-dark"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold">Foundation AI</span>
                                    <span className="text-[10px] text-gray-400">Completed 12/12</span>
                                </div>
                            </div>
                            <div className="relative flex items-center gap-4">
                                <div className="absolute -left-1 h-2 w-2 rounded-full bg-black dark:bg-white ring-4 ring-white dark:ring-surface-dark ring-offset-0"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold">NLP Specialization</span>
                                    <span className="text-[10px] text-gray-400">In Progress • 45%</span>
                                </div>
                            </div>
                            <div className="relative flex items-center gap-4">
                                <div className="absolute -left-1 h-2 w-2 rounded-full bg-gray-200 dark:bg-gray-700 ring-4 ring-white dark:ring-surface-dark"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400">Machine Learning Ops</span>
                                    <span className="text-[10px] text-gray-500 dark:text-gray-600">Up Next</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-surface-dark border border-[#e5e5e7] dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 p-6 rounded-xl">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Top Skills in Demand</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-[#f5f5f7] dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">PY</div>
                                    <span className="text-sm font-medium">PyTorch</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 text-sm">trending_up</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-[#f5f5f7] dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">GO</div>
                                    <span className="text-sm font-medium">GoLang</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 text-sm">trending_up</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-[#f5f5f7] dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">RS</div>
                                    <span className="text-sm font-medium">Rust</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 text-sm">trending_flat</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-[#f5f5f7] dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">KD</div>
                                    <span className="text-sm font-medium">Kubernetes</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 text-sm">trending_up</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black dark:bg-white p-6 rounded-xl text-white dark:text-black">
                        <h4 className="text-lg font-bold mb-2 leading-tight">Prepare for your next interview</h4>
                        <p className="text-xs text-gray-400 dark:text-gray-600 mb-6">AI-powered technical interview simulation tailored to your skill set.</p>
                        <button className="w-full rounded-lg bg-white dark:bg-black py-2.5 text-xs font-bold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">Start Mock Interview</button>
                    </div>
                </aside>
            </main>

            <footer className="border-t border-[#e5e5e7] dark:border-gray-800 py-8 text-center bg-white dark:bg-surface-dark">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 dark:text-gray-600">Zertainity AI Ecosystem © 2024 • Professional Learning Platform</p>
            </footer>
        </div>
    );
};

export default DailyLearning;

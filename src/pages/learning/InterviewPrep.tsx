import React, { useState } from 'react';

const InterviewPrep = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white font-display h-screen overflow-hidden flex">
            {/* Sidebar Navigation */}
            <aside className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-white/10 flex flex-col justify-between bg-white dark:bg-background-dark">
                <div className="p-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="size-8 bg-black dark:bg-white rounded flex items-center justify-center">
                            <span className="material-symbols-outlined text-white dark:text-black text-xl">cognition</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-black dark:text-white text-base font-bold leading-tight">Zertainity AI</h1>
                            <p className="text-gray-500 text-[11px] uppercase tracking-wider font-semibold">Career Guidance</p>
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="flex flex-col gap-1">
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Curriculum</p>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-100 dark:bg-white/5 text-black dark:text-white font-medium transition-colors" href="#">
                            <span className="material-symbols-outlined text-[20px]">quiz</span>
                            <span className="text-sm">Common Questions</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white font-medium transition-colors" href="#">
                            <span className="material-symbols-outlined text-[20px]">terminal</span>
                            <span className="text-sm">Technical Prep</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white font-medium transition-colors" href="#">
                            <span className="material-symbols-outlined text-[20px]">stars</span>
                            <span className="text-sm">Behavioral Methods</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white font-medium transition-colors" href="#">
                            <span className="material-symbols-outlined text-[20px]">forum</span>
                            <span className="text-sm">Mock Simulation</span>
                        </a>
                    </nav>
                </div>
                <div className="p-6 border-t border-gray-200 dark:border-white/10">
                    <button className="w-full flex items-center justify-center gap-2 rounded-lg h-11 bg-black dark:bg-white text-white dark:text-black text-sm font-bold transition-all hover:opacity-90">
                        <span className="material-symbols-outlined text-[18px]">dashboard</span>
                        <span>Back to Dashboard</span>
                    </button>
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-background-dark/50">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-8 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-background-dark shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm font-medium">Curriculum</span>
                        <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
                        <span className="text-black dark:text-white text-sm font-semibold">Common Questions</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative hidden lg:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl">search</span>
                            <input className="w-64 h-9 pl-10 pr-4 bg-gray-100 dark:bg-white/5 border-none rounded-lg text-sm focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20" placeholder="Search topics..." type="text" />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-gray-500 cursor-pointer hover:text-black dark:hover:text-white">notifications</span>
                            <div className="h-8 w-[1px] bg-gray-200 dark:bg-white/10 mx-1"></div>
                            <div className="size-8 rounded-full overflow-hidden border border-gray-200 dark:border-white/10">
                                <img className="w-full h-full object-cover" alt="User profile avatar portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtaxR28L1QOOyz-8IJddvlXRoMqpxUm8lhWlL9S-BXUNh252YpI6baUfxZu4FN6MgFGnSM1VHdBEHCG5IxqQAlougTe3cKzW9nqnnX0GbrGIj6xxrZGsjucsZbH7Eh7JPJOMcNN5-APpX4PGHM0_B-Ns-MBueMBLLx1Fa5tiUhv9oCyjp5g0lsix58TSQxR8AegCLiZF15puyq6A8CZFjGap0RA4PdjA4hZYMlgCMwkmBnU3wqJIixswjcEq9zXvHpjJVkrsZH_w" />
                            </div>
                        </div>
                    </div>
                </header>
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div className="flex-1">
                                <h2 className="text-4xl font-black tracking-tight text-black dark:text-white mb-4">Common Interview Questions</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
                                    Master the most frequent inquiries with high-impact response frameworks. Use our AI analyzer to refine your personal pitch.
                                </p>
                            </div>
                            <button className="flex items-center gap-2 px-6 h-12 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold shadow-sm hover:scale-[1.02] transition-transform">
                                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                                <span>Practice with AI</span>
                            </button>
                        </div>
                        {/* Accordion Section */}
                        <div className="space-y-4">
                            <details className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden" open>
                                <summary className="flex cursor-pointer items-center justify-between p-6 list-none">
                                    <div className="flex items-center gap-4">
                                        <span className="size-8 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold">01</span>
                                        <h3 className="text-lg font-bold text-black dark:text-white">Tell me about yourself</h3>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-500 transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 animate-in fade-in duration-300">
                                    <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5">
                                        <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                                            <span className="material-symbols-outlined text-[16px]">bolt</span>
                                            AI-Suggested Framework
                                        </div>
                                        <p className="text-black dark:text-white/80 leading-relaxed mb-4">
                                            Use the <strong className="text-black dark:text-white">Past-Present-Future</strong> model. Briefly mention your origin story (Past), your current expertise (Present), and why you're excited about this specific opportunity (Future).
                                        </p>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-white dark:bg-background-dark rounded border border-gray-200 dark:border-white/10 italic text-sm text-gray-500">
                                                "I’ve spent the last 5 years honing my skills in UX Design at TechCorp... currently, I'm focusing on AI-driven interfaces... looking to bring this expertise to a forward-thinking team like yours."
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
                                <summary className="flex cursor-pointer items-center justify-between p-6 list-none">
                                    <div className="flex items-center gap-4">
                                        <span className="size-8 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold">02</span>
                                        <h3 className="text-lg font-bold text-black dark:text-white">What is your greatest weakness?</h3>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-500 transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6">
                                    <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 text-sm text-gray-500">
                                        AI is generating framework insights...
                                    </div>
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
                                <summary className="flex cursor-pointer items-center justify-between p-6 list-none">
                                    <div className="flex items-center gap-4">
                                        <span className="size-8 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold">03</span>
                                        <h3 className="text-lg font-bold text-black dark:text-white">Why do you want to work for this company?</h3>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-500 transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6">
                                    <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 text-sm text-gray-500">
                                        AI is generating framework insights...
                                    </div>
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
                                <summary className="flex cursor-pointer items-center justify-between p-6 list-none">
                                    <div className="flex items-center gap-4">
                                        <span className="size-8 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold">04</span>
                                        <h3 className="text-lg font-bold text-black dark:text-white">Where do you see yourself in 5 years?</h3>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-500 transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6">
                                    <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 text-sm text-gray-500">
                                        AI is generating framework insights...
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </main>
            {/* Right Sidebar (Utility) */}
            <aside className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-white/10 bg-white dark:bg-background-dark p-6 flex flex-col gap-8">
                {/* Quick Tips Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-black dark:text-white text-[20px]">lightbulb</span>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Quick Tips</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                            <p className="text-sm font-semibold mb-1">Mirror the Tone</p>
                            <p className="text-xs text-gray-500 leading-relaxed">Observe the interviewer's formality and match it. Build rapport through shared energy.</p>
                        </div>
                        <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                            <p className="text-sm font-semibold mb-1">The 2-Minute Rule</p>
                            <p className="text-xs text-gray-500 leading-relaxed">Keep your primary answers under 2 minutes to ensure you're being concise and engaging.</p>
                        </div>
                    </div>
                </section>
                {/* Checklist Section */}
                <section className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-black dark:text-white text-[20px]">task_alt</span>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Prep Checklist</h4>
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group">
                            <input defaultChecked className="rounded-sm border-gray-300 text-black focus:ring-0" type="checkbox" />
                            <span className="text-sm text-gray-500 group-hover:text-black dark:group-hover:text-white line-through opacity-50 transition-colors">Research company values</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group">
                            <input defaultChecked className="rounded-sm border-gray-300 text-black focus:ring-0" type="checkbox" />
                            <span className="text-sm text-gray-500 group-hover:text-black dark:group-hover:text-white line-through opacity-50 transition-colors">Prepare 3 STAR stories</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group">
                            <input className="rounded-sm border-gray-300 text-black focus:ring-0" type="checkbox" />
                            <span className="text-sm text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">Test camera & microphone</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group">
                            <input className="rounded-sm border-gray-300 text-black focus:ring-0" type="checkbox" />
                            <span className="text-sm text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">Prepare questions for them</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer group">
                            <input className="rounded-sm border-gray-300 text-black focus:ring-0" type="checkbox" />
                            <span className="text-sm text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">Review job description</span>
                        </label>
                    </div>
                </section>
                {/* Status Card */}
                <div className="p-5 bg-black dark:bg-white rounded-xl text-white dark:text-black">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Readiness Score</span>
                        <span className="text-2xl font-black">74%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 dark:bg-black/10 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-white dark:bg-black w-[74%] rounded-full"></div>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-80">
                        You're almost there. Complete a Mock Simulation to reach 100% readiness for your interview.
                    </p>
                </div>
            </aside>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e5e5;
                    border-radius: 10px;
                }
                details > summary::-webkit-details-marker {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default InterviewPrep;

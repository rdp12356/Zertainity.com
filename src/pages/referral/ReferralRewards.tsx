import React, { useState } from 'react';

const ReferralRewards = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white transition-colors duration-200">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between border-b border-solid border-[#e5e5e5] dark:border-white/10 bg-white dark:bg-background-dark px-6 py-4 lg:px-20 sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-black text-white p-1 rounded">
                                <span className="material-symbols-outlined text-xl">bolt</span>
                            </div>
                            <h2 className="text-xl font-extrabold tracking-tighter uppercase">Zertainity</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium hover:opacity-70 transition-opacity" href="#">Dashboard</a>
                            <a className="text-sm font-medium hover:opacity-70 transition-opacity" href="#">Mentors</a>
                            <a className="text-sm font-medium hover:opacity-70 transition-opacity" href="#">Alumni</a>
                            <a className="text-sm font-medium hover:opacity-70 transition-opacity" href="#">Resources</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center bg-[#f0f0f0] dark:bg-white/5 rounded-lg px-3 py-1.5 border border-transparent focus-within:border-black dark:focus-within:border-white transition-all">
                            <span className="material-symbols-outlined text-sm opacity-50">search</span>
                            <input className="bg-transparent border-none focus:ring-0 text-sm w-40 placeholder:text-gray-500" placeholder="Search referrals..." type="text" />
                        </div>
                        <button className="material-symbols-outlined p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">notifications</button>
                        <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold" title="Abstract user profile avatar monochrome circle">
                            JD
                        </div>
                    </div>
                </header>
                <main className="flex-1 px-6 py-8 lg:px-20 max-w-[1440px] mx-auto w-full">
                    <div className="flex flex-col gap-8">
                        {/* Referral Overview Section */}
                        <section>
                            <div className="mb-6">
                                <h1 className="text-3xl font-black tracking-tight mb-1">Referral & Rewards</h1>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Empower your network and track your professional impact.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-black/10 border border-[#e5e5e5] dark:border-white/10 p-6 rounded-xl flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Referrals</span>
                                        <span className="material-symbols-outlined text-black dark:text-white opacity-40">groups</span>
                                    </div>
                                    <div className="text-4xl font-black">42</div>
                                    <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">trending_up</span> +12% from last month
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-black/10 border border-[#e5e5e5] dark:border-white/10 p-6 rounded-xl flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Successful Placements</span>
                                        <span className="material-symbols-outlined text-black dark:text-white opacity-40">verified</span>
                                    </div>
                                    <div className="text-4xl font-black">12</div>
                                    <div className="text-xs text-gray-400 font-medium">28.5% conversion rate</div>
                                </div>
                                <div className="bg-black text-white p-6 rounded-xl flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-wider opacity-60">Rewards Earned</span>
                                        <span className="material-symbols-outlined opacity-60">payments</span>
                                    </div>
                                    <div className="text-4xl font-black">$2,400</div>
                                    <div className="text-xs opacity-60 font-medium">$450 pending clearance</div>
                                </div>
                            </div>
                        </section>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Column: Active Referrals & New Referrals */}
                            <div className="lg:col-span-8 flex flex-col gap-8">
                                {/* Refer a New Student */}
                                <div className="bg-white dark:bg-black/10 border border-[#e5e5e5] dark:border-white/10 p-6 rounded-xl">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined">person_add</span> Refer a New Student
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="block">
                                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Your Unique Link</span>
                                                <div className="mt-1 flex gap-2">
                                                    <input className="flex-1 bg-gray-100 dark:bg-white/5 border-none rounded text-sm focus:ring-0" readOnly type="text" value="zertainity.ai/ref/JD-892" />
                                                    <button className="bg-black text-white px-3 py-2 rounded flex items-center hover:opacity-90 transition-opacity">
                                                        <span className="material-symbols-outlined text-sm">content_copy</span>
                                                    </button>
                                                </div>
                                            </label>
                                            <div className="flex gap-4">
                                                <button className="flex-1 border border-black dark:border-white py-2 rounded text-xs font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Social Share</button>
                                                <button className="flex-1 border border-black dark:border-white py-2 rounded text-xs font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Download Kit</button>
                                            </div>
                                        </div>
                                        <form className="space-y-3">
                                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Invite via Email</span>
                                            <input className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded px-3 py-2 text-sm focus:border-black dark:focus:border-white focus:ring-0" placeholder="student@example.com" type="email" />
                                            <button className="w-full bg-black text-white font-bold py-2 rounded text-xs uppercase tracking-widest hover:opacity-90 transition-opacity" type="submit">Send Invitation</button>
                                        </form>
                                    </div>
                                </div>
                                {/* Active Referrals Pipeline */}
                                <div className="bg-white dark:bg-black/10 border border-[#e5e5e5] dark:border-white/10 rounded-xl overflow-hidden">
                                    <div className="px-6 py-4 border-b border-[#e5e5e5] dark:border-white/10 flex justify-between items-center">
                                        <h2 className="text-lg font-bold">Active Referrals</h2>
                                        <button className="text-xs font-bold uppercase border-b-2 border-black dark:border-white leading-none pb-0.5">View Archive</button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-white/5 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                                                    <th className="px-6 py-3">Candidate</th>
                                                    <th className="px-6 py-3">Current Stage</th>
                                                    <th className="px-6 py-3">Last Activity</th>
                                                    <th className="px-6 py-3 text-right">Progression</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#e5e5e5] dark:divide-white/10">
                                                <tr>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-medium">AR</div>
                                                            <div>
                                                                <p className="text-sm font-bold">Alex Rivera</p>
                                                                <p className="text-[10px] text-gray-400">Software Engineering Track</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-[10px] font-bold uppercase">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Applied
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-gray-500">2 days ago</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <div className="w-24 bg-gray-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                                                <div className="bg-black dark:bg-white h-full" style={{ width: '33%' }}></div>
                                                            </div>
                                                            <span className="text-[10px] font-bold">33%</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-medium">SC</div>
                                                            <div>
                                                                <p className="text-sm font-bold">Sarah Chen</p>
                                                                <p className="text-[10px] text-gray-400">Data Science Intensive</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-[10px] font-bold uppercase">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Interviewing
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-gray-500">5 hours ago</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <div className="w-24 bg-gray-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                                                <div className="bg-black dark:bg-white h-full" style={{ width: '66%' }}></div>
                                                            </div>
                                                            <span className="text-[10px] font-bold">66%</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-medium">JS</div>
                                                            <div>
                                                                <p className="text-sm font-bold">Jordan Smyth</p>
                                                                <p className="text-[10px] text-gray-400">AI Product Management</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-[10px] font-bold uppercase">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Offered
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-gray-500">Yesterday</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <div className="w-24 bg-gray-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                                                <div className="bg-black dark:bg-white h-full" style={{ width: '100%' }}></div>
                                                            </div>
                                                            <span className="text-[10px] font-bold">100%</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* Right Column: Sidebar */}
                            <aside className="lg:col-span-4 flex flex-col gap-8">
                                {/* Top Referrers Leaderboard */}
                                <div className="bg-white dark:bg-black/10 border border-[#e5e5e5] dark:border-white/10 p-6 rounded-xl">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center justify-between">
                                        Leaderboard
                                        <span className="material-symbols-outlined text-sm">emoji_events</span>
                                    </h2>
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-black w-4 text-black dark:text-white">01</span>
                                                <div className="w-8 h-8 rounded bg-black text-white flex items-center justify-center text-[10px] font-bold">ML</div>
                                                <span className="text-sm font-semibold">Marcus Lee</span>
                                            </div>
                                            <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-white/10 rounded">128 pts</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-black w-4 opacity-40">02</span>
                                                <div className="w-8 h-8 rounded border border-black/20 dark:border-white/20 flex items-center justify-center text-[10px] font-bold">EK</div>
                                                <span className="text-sm font-semibold">Elena K.</span>
                                            </div>
                                            <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-white/10 rounded">94 pts</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-black w-4 opacity-40">03</span>
                                                <div className="w-8 h-8 rounded border border-black/20 dark:border-white/20 flex items-center justify-center text-[10px] font-bold">TX</div>
                                                <span className="text-sm font-semibold">Tom Xiao</span>
                                            </div>
                                            <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-white/10 rounded">82 pts</span>
                                        </div>
                                        <div className="flex items-center justify-between opacity-50">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-black w-4">42</span>
                                                <div className="w-8 h-8 rounded bg-gray-200 dark:bg-white/20 flex items-center justify-center text-[10px] font-bold">YOU</div>
                                                <span className="text-sm font-semibold">You</span>
                                            </div>
                                            <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-white/10 rounded">12 pts</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-2 text-[10px] font-black uppercase tracking-widest border border-black dark:border-white/20 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">View Full Ranking</button>
                                </div>
                                {/* Upcoming Rewards */}
                                <div className="bg-white dark:bg-black/10 border border-[#e5e5e5] dark:border-white/10 p-6 rounded-xl">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center justify-between">
                                        Upcoming Rewards
                                        <span className="material-symbols-outlined text-sm">redeem</span>
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="relative pl-4 border-l-2 border-black dark:border-white">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-sm font-bold">Platinum Milestone</p>
                                                <p className="text-xs font-bold">$500 Bonus</p>
                                            </div>
                                            <p className="text-[10px] text-gray-500 mb-2">Achieve 15 successful placements</p>
                                            <div className="w-full bg-gray-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-black dark:bg-white h-full" style={{ width: '80%' }}></div>
                                            </div>
                                            <p className="text-[10px] mt-1 text-right font-medium text-gray-400">12/15 Completed</p>
                                        </div>
                                        <div className="relative pl-4 border-l-2 border-gray-200 dark:border-white/10 opacity-60">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-sm font-bold">Annual Grand Bonus</p>
                                                <p className="text-xs font-bold">$2,000</p>
                                            </div>
                                            <p className="text-[10px] text-gray-500">Top 3 annual referrer</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Referral Tips */}
                                <div className="bg-black text-white p-6 rounded-xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-black mb-2 leading-tight">Increase your <br />success rate.</h3>
                                        <p className="text-[11px] opacity-70 mb-4 font-medium">Verified mentors see a 3x higher placement rate with student pre-vetting.</p>
                                        <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 group">
                                            Read Guide <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                                        </button>
                                    </div>
                                    <span className="material-symbols-outlined absolute bottom-[-10px] right-[-10px] text-8xl opacity-10 rotate-12">school</span>
                                </div>
                            </aside>
                        </div>
                    </div>
                </main>
                {/* Footer */}
                <footer className="border-t border-[#e5e5e5] dark:border-white/10 py-10 px-6 lg:px-20 bg-white dark:bg-background-dark mt-auto">
                    <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4 opacity-50">
                            <span className="text-xs font-bold uppercase tracking-widest">© 2024 Zertainity AI</span>
                            <a className="text-[10px] font-medium hover:underline" href="#">Privacy Policy</a>
                            <a className="text-[10px] font-medium hover:underline" href="#">Terms of Service</a>
                        </div>
                        <div className="flex gap-6 opacity-40">
                            <span className="material-symbols-outlined cursor-pointer hover:opacity-100">share</span>
                            <span className="material-symbols-outlined cursor-pointer hover:opacity-100">mail</span>
                            <span className="material-symbols-outlined cursor-pointer hover:opacity-100">help</span>
                        </div>
                    </div>
                </footer>
            </div>
            <style>{`
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
            `}</style>
        </div>
    );
};

export default ReferralRewards;

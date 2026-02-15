import React, { useState } from 'react';

const CompanyProfile = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white min-h-screen font-display">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="bg-black dark:bg-white text-white dark:text-black p-1 rounded">
                                <span className="material-symbols-outlined text-[20px] block">bolt</span>
                            </div>
                            <span className="text-lg font-bold tracking-tight">Zertainity AI</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <a className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors" href="#">Discover</a>
                            <a className="text-sm font-medium text-black dark:text-white" href="#">Companies</a>
                            <a className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors" href="#">Jobs</a>
                            <a className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors" href="#">Mentors</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
                            <input className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-sm w-64 focus:ring-1 focus:ring-black dark:focus:ring-white" placeholder="Search profiles..." type="text" />
                        </div>
                        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                            Sign In
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1200px] mx-auto px-6 py-8">
                {/* Breadcrumbs & Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4 uppercase tracking-widest">
                        <a className="hover:text-black dark:hover:text-white" href="#">Ecosystem</a>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <a className="hover:text-black dark:hover:text-white" href="#">Career Tech</a>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-black dark:text-white">Zertainity AI</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex gap-6 items-start">
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                                <div className="bg-black dark:bg-white p-3 rounded-lg">
                                    <span className="material-symbols-outlined text-white dark:text-black text-4xl">diversity_3</span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight mb-1">Zertainity AI</h1>
                                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Pioneering the future of career guidance through neural networks.</p>
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <span className="material-symbols-outlined text-sm">location_on</span> San Francisco, CA
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <span className="material-symbols-outlined text-sm">group</span> 12.4k followers
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <span className="material-symbols-outlined text-sm">link</span> zertainity.ai
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex-1 md:flex-none px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold text-sm tracking-wide">Follow</button>
                            <button className="flex items-center justify-center w-10 h-10 border border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                                <span className="material-symbols-outlined">share</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sticky Tab Navigation */}
                <div className="border-b border-gray-200 dark:border-gray-800 mb-10 overflow-x-auto scroll-hide">
                    <nav className="flex gap-10">
                        <a className="pb-4 border-b-2 border-black dark:border-white text-sm font-bold text-black dark:text-white whitespace-nowrap" href="#about">About</a>
                        <a className="pb-4 border-b-2 border-transparent text-sm font-medium text-gray-400 hover:text-black dark:hover:text-white transition-all whitespace-nowrap" href="#culture">Culture & Values</a>
                        <a className="pb-4 border-b-2 border-transparent text-sm font-medium text-gray-400 hover:text-black dark:hover:text-white transition-all whitespace-nowrap flex items-center gap-2" href="#roles">
                            Open Roles <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-[10px]">12</span>
                        </a>
                        <a className="pb-4 border-b-2 border-transparent text-sm font-medium text-gray-400 hover:text-black dark:hover:text-white transition-all whitespace-nowrap" href="#benefits">Employee Benefits</a>
                    </nav>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Column */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* About Section */}
                        <section className="scroll-mt-24" id="about">
                            <h2 className="text-2xl font-bold mb-6">About Zertainity</h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                                <p>Founded in 2021, Zertainity AI is on a mission to democratize premium career guidance. We leverage proprietary Large Language Models specifically tuned for professional trajectory mapping, helping millions find their optimal career path.</p>
                                <p>Our platform doesn't just match jobs; it architects careers. By analyzing millions of professional data points, Zertainity provides users with a clear roadmap of skills, certifications, and networking opportunities required to reach their dream roles.</p>
                            </div>
                        </section>

                        {/* Culture & Values */}
                        <section className="scroll-mt-24" id="culture">
                            <h2 classNa="text-2xl font-bold mb-8">Culture & Values</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                                    <span className="material-symbols-outlined text-black dark:text-white mb-4 block">lightbulb</span>
                                    <h3 className="font-bold text-lg mb-2">First-Principles Thinking</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">We break down complex problems to their core truths rather than following established analogies.</p>
                                </div>
                                <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                                    <span className="material-symbols-outlined text-black dark:text-white mb-4 block">diversity_1</span>
                                    <h3 className="font-bold text-lg mb-2">Radical Transparency</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Information flows freely across the organization to ensure everyone is aligned and empowered.</p>
                                </div>
                                <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                                    <span className="material-symbols-outlined text-black dark:text-white mb-4 block">speed</span>
                                    <h3 className="font-bold text-lg mb-2">Velocity over Speed</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">We move fast, but always in a direction that compounds our long-term vision.</p>
                                </div>
                                <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                                    <span className="material-symbols-outlined text-black dark:text-white mb-4 block">security</span>
                                    <h3 className="font-bold text-lg mb-2">User Ownership</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Every employee is an owner, focused on creating long-term value for our users.</p>
                                </div>
                            </div>
                        </section>

                        {/* Open Roles Section */}
                        <section className="scroll-mt-24" id="roles">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Open Roles</h2>
                                <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">View All Positions</button>
                            </div>
                            <div className="space-y-4">
                                {/* Role 1 */}
                                <div className="group flex items-center justify-between p-5 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-all cursor-pointer">
                                    <div>
                                        <h4 className="font-bold text-lg">Senior Machine Learning Engineer</h4>
                                        <div className="flex gap-3 mt-1 text-sm text-gray-500">
                                            <span>Core Infrastructure</span>
                                            <span>•</span>
                                            <span>San Francisco / Remote</span>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2 bg-gray-100 dark:bg-gray-800 group-hover:bg-black dark:group-hover:bg-white text-black dark:text-white group-hover:text-white dark:group-hover:text-black rounded-lg text-sm font-bold transition-all">Apply</button>
                                </div>
                                {/* Role 2 */}
                                <div className="group flex items-center justify-between p-5 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-all cursor-pointer">
                                    <div>
                                        <h4 className="font-bold text-lg">Lead Product Designer</h4>
                                        <div className="flex gap-3 mt-1 text-sm text-gray-500">
                                            <span>User Experience</span>
                                            <span>•</span>
                                            <span>Remote</span>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2 bg-gray-100 dark:bg-gray-800 group-hover:bg-black dark:group-hover:bg-white text-black dark:text-white group-hover:text-white dark:group-hover:text-black rounded-lg text-sm font-bold transition-all">Apply</button>
                                </div>
                                {/* Role 3 */}
                                <div className="group flex items-center justify-between p-5 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-black dark:hover:border-white transition-all cursor-pointer">
                                    <div>
                                        <h4 className="font-bold text-lg">Backend Developer (Internship)</h4>
                                        <div className="flex gap-3 mt-1 text-sm text-gray-500">
                                            <span>Engineering</span>
                                            <span>•</span>
                                            <span>San Francisco</span>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2 bg-gray-100 dark:bg-gray-800 group-hover:bg-black dark:group-hover:bg-white text-black dark:text-white group-hover:text-white dark:group-hover:text-black rounded-lg text-sm font-bold transition-all">Apply</button>
                                </div>
                            </div>
                        </section>

                        {/* Employee Benefits */}
                        <section className="scroll-mt-24 pb-12" id="benefits">
                            <h2 className="text-2xl font-bold mb-8">Employee Benefits</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6">
                                <div className="flex flex-col gap-3">
                                    <span className="material-symbols-outlined text-gray-400">health_and_safety</span>
                                    <span className="font-semibold">Comprehensive Health</span>
                                    <p className="text-xs text-gray-500 leading-relaxed">Top-tier medical, dental, and vision coverage for you and your family.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="material-symbols-outlined text-gray-400">paid</span>
                                    <span className="font-semibold">Competitive Equity</span>
                                    <p className="text-xs text-gray-500 leading-relaxed">Generous stock options package so you grow as the company grows.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="material-symbols-outlined text-gray-400">flight_takeoff</span>
                                    <span className="font-semibold">Unlimited PTO</span>
                                    <p className="text-xs text-gray-500 leading-relaxed">We focus on outcomes. Take the time you need to recharge and stay creative.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="material-symbols-outlined text-gray-400">school</span>
                                    <span className="font-semibold">Learning Stipend</span>
                                    <p className="text-xs text-gray-500 leading-relaxed">$5,000 annual budget for courses, conferences, and books.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="material-symbols-outlined text-gray-400">laptop_mac</span>
                                    <span className="font-semibold">Home Office Budget</span>
                                    <p className="text-xs text-gray-500 leading-relaxed">A full equipment allowance to build your dream remote setup.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="material-symbols-outlined text-gray-400">family_restroom</span>
                                    <span className="font-semibold">Paid Parental Leave</span>
                                    <p className="text-xs text-gray-500 leading-relaxed">Support for new parents including 16 weeks of fully paid leave.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Quick Facts Card */}
                        <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Company Stats</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Size</span>
                                    <span className="text-sm font-semibold">120 - 250 Employees</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Founded</span>
                                    <span className="text-sm font-semibold">October 2021</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Headquarters</span>
                                    <span className="text-sm font-semibold">San Francisco, CA</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Funding</span>
                                    <span className="text-sm font-semibold">Series B</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Work Mode</span>
                                    <span className="text-sm font-semibold">Hybrid / Remote</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold">Career Growth Rating</span>
                                    <span className="text-xl font-bold">4.8</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-black dark:bg-white w-[96%]"></div>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-tight italic">Top 5% of companies in Career Tech for employee advancement metrics.</p>
                            </div>
                        </div>

                        {/* Locations Card */}
                        <div className="p-8 bg-white dark:bg-background-dark border border-gray-100 dark:border-gray-800 rounded-2xl">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Office Hubs</h3>
                            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4 relative">
                                <img className="w-full h-full object-cover grayscale opacity-50" alt="Monochrome overhead map of San Francisco area" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6UGRsNIFIyAxlqMlksjpn0amzJkqo3OojkpRl51AqVLCh2aQgan3l5JhsyWfBeReDrFusqi0GajXf89FFgpQAwp9ebC2Ijc4iaXqRHqwqAsSHPd5ScqdNnx4SEAe9Vg497bbnK_dDUmragKnck2KTCDG71YHwApbTIvkolV-EfO3Wm9F4A9tpB0Sr8Y3gduFsCBAj0UxyOT4lE7SetYLoGDA-vVvKgdyY1v2aG35C3ss0I3GXwqkgygjFZFl9ZSnvxNCWDrBw1Q" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-black text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase">Main Hub</span>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-[16px]">pin_drop</span> San Francisco, HQ
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-[16px]">pin_drop</span> London, Research Lab
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-[16px]">pin_drop</span> New York, Sales Office
                                </li>
                            </ul>
                        </div>

                        {/* Footer-style Links */}
                        <div className="px-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-gray-400 uppercase tracking-widest font-bold">
                            <a className="hover:text-black hover:dark:text-white transition-colors" href="#">Privacy</a>
                            <a className="hover:text-black hover:dark:text-white transition-colors" href="#">Terms</a>
                            <a className="hover:text-black hover:dark:text-white transition-colors" href="#">Press Kit</a>
                            <a className="hover:text-black hover:dark:text-white transition-colors" href="#">Contact</a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Bottom Navbar (Mobile) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-around">
                <button className="text-black dark:text-white"><span className="material-symbols-outlined">explore</span></button>
                <button className="text-gray-400"><span className="material-symbols-outlined">business_center</span></button>
                <button className="text-gray-400"><span className="material-symbols-outlined">groups</span></button>
                <button className="text-gray-400"><span className="material-symbols-outlined">person</span></button>
            </div>
            <style>{`
                .scroll-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default CompanyProfile;

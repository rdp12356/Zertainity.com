import React, { useState } from 'react';

const CareerEvents = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white transition-colors duration-200 min-h-screen">
            <div className="relative flex min-h-screen w-full flex-col">
                {/* Top Navigation Bar */}
                <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-10 py-3">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-black dark:bg-white text-white dark:text-black p-1.5 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">bolt</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Zertainity AI</h2>
                        </div>
                        <nav className="hidden lg:flex items-center gap-6">
                            <a className="text-sm font-medium hover:text-gray-500 dark:hover:text-gray-400" href="#">Dashboard</a>
                            <a className="text-sm font-bold border-b-2 border-primary dark:border-white pb-0.5" href="#">Events</a>
                            <a className="text-sm font-medium hover:text-gray-500 dark:hover:text-gray-400" href="#">Guidance</a>
                            <a className="text-sm font-medium hover:text-gray-500 dark:hover:text-gray-400" href="#">Network</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-300 dark:border-gray-600">
                            <img className="w-full h-full object-cover" alt="User profile avatar of a professional designer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6-v0MWqc015bqlCDzOJ1VrzZGhkEIl1fW0iXOa44SPF_y2S5f9aRu4dkz07Pd6TuIaPrzSRR1fG7uJu9CzXJiNjfX8eowIrtlZeNhIlJOhuZu2iRWWb_f7-vpLFw7VyGyon2QiKg3zq16S2ERu6ZpEsE6b92p4N7v3Vb08K6JBiPObjAT3G5Eef9avwMhF-YmFmVXPnJDafUxwOhdeJKzcuA61KkSuGvwZMRrg8CKLUMbnduYaUuneQohWaEva0KqSwOBuzRB8w" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-10 py-8">
                    {/* Header Section */}
                    <div className="mb-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-4xl font-black tracking-tight mb-2">Career Events & Webinars</h1>
                                <p className="text-gray-500 dark:text-gray-400 max-w-xl">AI-curated growth opportunities tailored to your professional path and industry interests.</p>
                            </div>
                            <button className="bg-gray-100 dark:bg-gray-800 text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">history</span>
                                View History
                            </button>
                        </div>
                        {/* Search and Filters */}
                        <div className="flex flex-col gap-4">
                            <div className="relative w-full">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                <input className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none text-base" placeholder="Search events, speakers, or topics..." type="text" />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors">
                                    Event Type <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors">
                                    Industry <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors">
                                    Date <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid with Sidebar */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Featured Event Section */}
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Featured Event</h2>
                                <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 flex flex-col md:flex-row gap-8 items-center hover:border-gray-400 transition-all">
                                    <div className="w-full md:w-1/2 h-64 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center relative">
                                        <span className="material-symbols-outlined text-7xl text-gray-200 dark:text-gray-700">rocket_launch</span>
                                        <div className="absolute top-4 left-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1.5 rounded-full">LIVE NOW</div>
                                    </div>
                                    <div className="w-full md:w-1/2 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                                                <span className="material-symbols-outlined text-base">calendar_today</span>
                                                Oct 28, 2023 • 10:00 AM EST
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3 group-hover:underline">Future of Generative AI in Creative Industries</h3>
                                            <p className="text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">Join a panel of industry leaders as they discuss how AI is reshaping the landscape of design, marketing, and content creation.</p>
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="h-10 w-10 rounded-full bg-gray-200">
                                                    <img className="w-full h-full object-cover rounded-full" alt="Profile photo of Dr. Elena Vance" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIGG7Y4tw-FLbzFPFqFz19pgA1CG6rUdteBWqnjPWpng-229191uBWidfPGarKw_W3rdJ-yN5fuMKL1zbitLY_c5fEJAtkqL8afvz4UZMDJVBrApGuwXA8VYLqWFhzMHU9RfD5OJgO6LmQfJqI9ZuDIwlpoXSuxrphVG7hQNp93lzTXxHK23neiU4F6B_c_xYvzQ52El7vetv_-3g2Cq3dRUKHGLG96pCRc9OJm_U1msAqdstv3D1CMT3fzuwEB3mdWMzP0q5OwA" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">Dr. Elena Vance</p>
                                                    <p className="text-xs text-gray-500">Chief AI Officer, Pixel Labs</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all">Register for Free</button>
                                    </div>
                                </div>
                            </section>

                            {/* Events Grid */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold">All Events</h2>
                                    <p className="text-sm text-gray-500">24 upcoming events</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Card 1 */}
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-gray-400 transition-all flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                                                <span className="material-symbols-outlined text-primary dark:text-white">videocam</span>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">Webinar</span>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2 flex-grow">Data Analytics for Product Management</h3>
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="material-symbols-outlined text-sm">schedule</span>
                                                Nov 2, 02:00 PM EST
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="material-symbols-outlined text-sm">person</span>
                                                Host: Marcus Sterling
                                            </div>
                                        </div>
                                        <button className="w-full border border-primary dark:border-white py-2.5 rounded-lg text-sm font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Register Now</button>
                                    </div>
                                    {/* Card 2 */}
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-gray-400 transition-all flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                                                <span className="material-symbols-outlined text-primary dark:text-white">groups</span>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">Workshop</span>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2 flex-grow">Interactive Resume Building with AI</h3>
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="material-symbols-outlined text-sm">schedule</span>
                                                Nov 5, 11:30 AM EST
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="material-symbols-outlined text-sm">person</span>
                                                Host: Zertainity Mentors
                                            </div>
                                        </div>
                                        <button className="w-full border border-primary dark:border-white py-2.5 rounded-lg text-sm font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Register Now</button>
                                    </div>
                                    {/* Card 3 */}
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-gray-400 transition-all flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                                                <span className="material-symbols-outlined text-primary dark:text-white">work</span>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">Career Fair</span>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2 flex-grow">Global Tech Talent Expo 2024</h3>
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="material-symbols-outlined text-sm">schedule</span>
                                                Nov 12, 09:00 AM EST
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                                Virtual Event
                                            </div>
                                        </div>
                                        <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all">Join Waitlist</button>
                                    </div>
                                    {/* Card 4 */}
                                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-gray-400 transition-all flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                                                <span className="material-symbols-outlined text-primary dark:text-white">psychology</span>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">Webinar</span>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2 flex-grow">Mastering Technical Interviews</h3>
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="material-symbols-outlined text-sm">schedule</span>
                                                Nov 15, 04:00 PM EST
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="material-symbols-outlined text-sm">person</span>
                                                Host: Sarah J. Parker
                                            </div>
                                        </div>
                                        <button className="w-full border border-primary dark:border-white py-2.5 rounded-lg text-sm font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Register Now</button>
                                    </div>
                                </div>
                                <div className="mt-10 flex justify-center">
                                    <button className="text-sm font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-2">
                                        Load More Events <span className="material-symbols-outlined">expand_more</span>
                                    </button>
                                </div>
                            </section>
                        </div>

                        {/* Right Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8">
                                {/* AI Match Card */}
                                <div className="bg-black dark:bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-white/10 p-1.5 rounded-lg">
                                            <span className="material-symbols-outlined text-white">auto_awesome</span>
                                        </div>
                                        <h3 className="font-bold text-lg">Upcoming for You</h3>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-6">Based on your career matches in FinTech & Product Design.</p>
                                    <div className="space-y-4">
                                        {/* Match Item 1 */}
                                        <div className="flex gap-4 items-start p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                            <div className="shrink-0 h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold flex-col">
                                                <span>OCT</span>
                                                <span>29</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h4 className="text-sm font-bold group-hover:underline">Navigating AI in FinTech</h4>
                                                <p className="text-[11px] text-gray-400 mt-1">98% Match for you</p>
                                            </div>
                                        </div>
                                        {/* Match Item 2 */}
                                        <div className="flex gap-4 items-start p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                            <div className="shrink-0 h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold flex-col">
                                                <span>NOV</span>
                                                <span>03</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h4 className="text-sm font-bold group-hover:underline">Portfolio Review Workshop</h4>
                                                <p className="text-[11px] text-gray-400 mt-1">Direct Industry Match</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-3 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">See All Matches</button>
                                </div>
                                {/* Industry News/Tip */}
                                <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900">
                                    <h3 className="font-bold mb-4">Pro Tip</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                                        Attendees of live workshops are 3x more likely to secure referral interviews through Zertainity Network.
                                    </p>
                                    <a className="text-sm font-bold text-primary dark:text-white underline underline-offset-4" href="#">Learn more about networking</a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>

                <footer className="border-t border-gray-200 dark:border-gray-800 py-10 px-10 text-center">
                    <p className="text-sm text-gray-400">© 2024 Zertainity AI Platform. All rights reserved.</p>
                </footer>
            </div>
            <style>{`
            .material-symbols-outlined {
                font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            }
        `}</style>
        </div>
    );
};

export default CareerEvents;

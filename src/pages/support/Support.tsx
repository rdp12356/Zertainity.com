import React, { useState } from 'react';

const Support = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white font-display antialiased transition-colors duration-200">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-black dark:bg-white text-white dark:text-black p-1.5 rounded">
                            <span className="material-symbols-outlined text-white dark:text-black">bolt</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Zertainity AI</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded font-semibold text-sm hover:opacity-90 transition-opacity"
                            onClick={() => document.getElementById('feedback-modal')?.classList.remove('hidden')}
                        >
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h2 className="text-4xl font-black tracking-tight mb-2">Support & Feedback Portal</h2>
                    <p className="text-gray-500 dark:text-neutral-400 text-lg">We’re here to help you navigate your career journey with AI.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Contact Support Form */}
                    <section className="lg:col-span-7">
                        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-8 rounded-xl shadow-sm">
                            <h3 className="text-2xl font-bold mb-8">Contact Support</h3>
                            <form action="#" className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-gray-400">Subject</label>
                                    <input className="w-full bg-background-light dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 rounded-lg p-4 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white outline-none transition-all" placeholder="Brief summary of your issue" type="text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-gray-400">Category</label>
                                    <select className="w-full bg-background-light dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 rounded-lg p-4 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white outline-none transition-all">
                                        <option disabled selected value="">Select category</option>
                                        <option value="technical">Technical Support</option>
                                        <option value="career">Career Advice Assistance</option>
                                        <option value="account">Account & Billing</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-gray-400">Message</label>
                                    <textarea className="w-full bg-background-light dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 rounded-lg p-4 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white outline-none transition-all resize-none" placeholder="Describe how we can help you..." rows={6}></textarea>
                                </div>
                                <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2" type="submit">
                                    <span className="material-symbols-outlined text-xl">send</span>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Right Column: Help Center & FAQ */}
                    <section className="lg:col-span-5 space-y-12">
                        {/* FAQ Section */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined">help</span>
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 border-b border-gray-200 dark:border-neutral-800 group cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">How do I reset my career path?</span>
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-black dark:group-hover:text-white">chevron_right</span>
                                    </div>
                                </div>
                                <div className="p-4 border-b border-gray-200 dark:border-neutral-800 group cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Can I export my AI interview results?</span>
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-black dark:group-hover:text-white">chevron_right</span>
                                    </div>
                                </div>
                                <div className="p-4 border-b border-gray-200 dark:border-neutral-800 group cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Is my personal data encrypted?</span>
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-black dark:group-hover:text-white">chevron_right</span>
                                    </div>
                                </div>
                                <div className="p-4 border-b border-gray-200 dark:border-neutral-800 group cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">How often is the AI model updated?</span>
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-black dark:group-hover:text-white">chevron_right</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Helpful Links Section */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined">menu_book</span>
                                Helpful Resources
                            </h3>
                            <ul className="grid grid-cols-1 gap-4">
                                <li>
                                    <a className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg hover:border-black dark:hover:border-white transition-colors" href="#">
                                        <span className="material-symbols-outlined text-gray-400">description</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">Comprehensive User Guide</p>
                                            <p className="text-xs text-gray-500">Master every feature of Zertainity</p>
                                        </div>
                                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg hover:border-black dark:hover:border-white transition-colors" href="#">
                                        <span className="material-symbols-outlined text-gray-400">security</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">Privacy & Security Policy</p>
                                            <p className="text-xs text-gray-500">How we protect your data</p>
                                        </div>
                                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg hover:border-black dark:hover:border-white transition-colors" href="#">
                                        <span className="material-symbols-outlined text-gray-400">group</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">Community Guidelines</p>
                                            <p className="text-xs text-gray-500">Our standard for interaction</p>
                                        </div>
                                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </main>

            {/* Feedback Modal Overlay */}
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm hidden" id="feedback-modal">
                <div className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden">
                    <div className="px-8 pt-8 pb-4 flex justify-between items-center">
                        <h3 className="text-2xl font-black">Submit Feedback</h3>
                        <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors" onClick={() => document.getElementById('feedback-modal')?.classList.add('hidden')}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div className="p-8 space-y-8">
                        <div>
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Rate your experience</p>
                            <div className="flex justify-between gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button key={rating} className={`flex-1 h-12 border border-gray-200 dark:border-neutral-800 rounded font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all ${rating === 4 ? 'bg-black dark:bg-white text-white dark:text-black' : ''}`}>
                                        {rating}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Your Suggestions</label>
                            <textarea className="w-full bg-background-light dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 rounded-lg p-4 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white outline-none transition-all resize-none" placeholder="Tell us how we can improve..." rows={4}></textarea>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 px-6 py-4 rounded-lg font-bold border border-gray-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => document.getElementById('feedback-modal')?.classList.add('hidden')}>Cancel</button>
                            <button className="flex-1 px-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold hover:opacity-90 transition-opacity">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 border-t border-gray-200 dark:border-neutral-800 py-12 bg-white dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-400">
                        <span className="material-symbols-outlined text-sm">copyright</span>
                        <p className="text-sm font-medium">2024 Zertainity AI Support Portal. All rights reserved.</p>
                    </div>
                    <div className="flex gap-8 text-sm font-semibold text-gray-500">
                        <a className="hover:text-black dark:hover:text-white transition-colors" href="#">Status</a>
                        <a className="hover:text-black dark:hover:text-white transition-colors" href="#">Twitter</a>
                        <a className="hover:text-black dark:hover:text-white transition-colors" href="#">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Support;

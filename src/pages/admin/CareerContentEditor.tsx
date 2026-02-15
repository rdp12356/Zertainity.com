import React, { useState } from 'react';

const CareerContentEditor = () => {
    return (
        <div className="bg-white dark:bg-background-dark text-primary dark:text-gray-100 font-display h-screen flex flex-col overflow-hidden">
            <header className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 bg-white dark:bg-background-dark z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="size-8 bg-black text-white dark:bg-white dark:text-black rounded-lg flex items-center justify-center">
                        <span className="font-bold text-lg">Z</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold tracking-tight">Content Editor</h1>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Career Profiles</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Last saved 2 mins ago</span>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 dark:bg-transparent dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors">
                        Save Draft
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors">
                        Publish
                    </button>
                </div>
            </header>
            <main className="flex-1 flex overflow-hidden">
                <aside className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-gray-50/50 dark:bg-[#15171b]">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-2.5 top-2 text-gray-400 text-[20px]">search</span>
                            <input className="w-full pl-9 pr-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all" placeholder="Search profiles..." type="text" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <span>Active Profiles</span>
                            <button className="text-gray-400 hover:text-black dark:hover:text-white"><span className="material-symbols-outlined text-[16px]">add</span></button>
                        </div>
                        <button className="w-full text-left px-3 py-2.5 rounded bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between group">
                            <span className="text-sm font-medium">Data Scientist</span>
                            <span className="size-2 rounded-full bg-green-500"></span>
                        </button>
                        <button className="w-full text-left px-3 py-2.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between text-gray-600 dark:text-gray-400">
                            <span className="text-sm font-medium">UX Designer</span>
                        </button>
                        <button className="w-full text-left px-3 py-2.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between text-gray-600 dark:text-gray-400">
                            <span className="text-sm font-medium">Financial Analyst</span>
                        </button>
                        <button className="w-full text-left px-3 py-2.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between text-gray-600 dark:text-gray-400">
                            <span className="text-sm font-medium">Software Engineer</span>
                        </button>
                        <div className="flex items-center justify-between px-3 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <span>Drafts</span>
                        </div>
                        <button className="w-full text-left px-3 py-2.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between text-gray-600 dark:text-gray-400">
                            <span className="text-sm font-medium">Product Manager</span>
                            <span className="size-2 rounded-full bg-yellow-500"></span>
                        </button>
                    </div>
                </aside>
                <section className="flex-1 flex flex-col min-w-0 bg-white dark:bg-background-dark overflow-y-auto">
                    <div className="max-w-3xl mx-auto w-full px-8 py-10 space-y-8">
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Career Title</label>
                            <input className="w-full text-3xl font-bold border-none p-0 focus:ring-0 bg-transparent placeholder-gray-300 dark:placeholder-gray-700 text-black dark:text-white" placeholder="Enter career title" type="text" defaultValue="Data Scientist" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Brief Summary</label>
                            <textarea className="w-full text-lg text-gray-600 dark:text-gray-300 border-none p-0 focus:ring-0 bg-transparent resize-none leading-relaxed" placeholder="Enter a brief, catching summary..." rows={3} defaultValue="Data Scientists use analytical, statistical, and programming skills to collect, analyze, and interpret large data sets. They then use this information to develop data-driven solutions to difficult business challenges." />
                        </div>
                        <hr className="border-gray-100 dark:border-gray-800" />
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Academic Weight</label>
                                    <span className="text-sm font-mono font-medium">75%</span>
                                </div>
                                <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" max="100" min="0" type="range" defaultValue="75" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Interest Weight</label>
                                    <span className="text-sm font-mono font-medium">60%</span>
                                </div>
                                <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" max="100" min="0" type="range" defaultValue="60" />
                            </div>
                        </div>
                        <hr className="border-gray-100 dark:border-gray-800" />
                        <div className="space-y-4 group">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Detailed Description</label>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 text-gray-400 hover:text-black dark:hover:text-white rounded"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                                    <button className="p-1 text-gray-400 hover:text-black dark:hover:text-white rounded"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                                    <button className="p-1 text-gray-400 hover:text-black dark:hover:text-white rounded"><span className="material-symbols-outlined text-[18px]">link</span></button>
                                    <button className="p-1 text-gray-400 hover:text-black dark:hover:text-white rounded"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                                </div>
                            </div>
                            <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                                <p className="editor-content" contentEditable="true" suppressContentEditableWarning={true}>
                                    The role of a Data Scientist involves mining and analyzing data from various sources to discover insights that can provide a competitive advantage. This often requires building complex machine learning models and creating visualizations to communicate findings to stakeholders. <br /><br />
                                    Key responsibilities include cleaning and validating data, identifying trends, and collaborating with engineering teams to implement models into production.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Required Skills</label>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                                    Python
                                    <button className="ml-1.5 text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                </span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                                    Machine Learning
                                    <button className="ml-1.5 text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                </span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                                    SQL
                                    <button className="ml-1.5 text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                </span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded border border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 cursor-pointer text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                                    <span className="material-symbols-outlined text-[16px] mr-1">add</span> Add Skill
                                </span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Average Salary Range</label>
                            <div className="flex items-center gap-4">
                                <div className="relative w-40">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded focus:ring-1 focus:ring-black dark:focus:ring-white bg-transparent" type="text" defaultValue="95,000" />
                                </div>
                                <span className="text-gray-400">-</span>
                                <div className="relative w-40">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded focus:ring-1 focus:ring-black dark:focus:ring-white bg-transparent" type="text" defaultValue="160,000" />
                                </div>
                                <span className="text-sm text-gray-500 ml-2">/ year</span>
                            </div>
                        </div>
                        <div className="h-20"></div>
                    </div>
                </section>
                <aside className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#15171b] flex flex-col overflow-y-auto">
                    <div className="p-6 space-y-8">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Published</span>
                            </div>
                            <div className="text-xs text-gray-500 space-y-1">
                                <div className="flex justify-between">
                                    <span>Created:</span>
                                    <span className="text-gray-700 dark:text-gray-300">Oct 24, 2023</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Author:</span>
                                    <span className="text-gray-700 dark:text-gray-300">Alex Morgan</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Industries</label>
                                <button className="text-xs text-gray-500 hover:text-black underline">Manage</button>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-start gap-3 p-2 hover:bg-white dark:hover:bg-gray-800 rounded transition-colors cursor-pointer">
                                    <input defaultChecked className="mt-0.5 w-4 h-4 rounded border-gray-300 text-black focus:ring-black dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Technology &amp; IT</span>
                                </label>
                                <label className="flex items-start gap-3 p-2 hover:bg-white dark:hover:bg-gray-800 rounded transition-colors cursor-pointer">
                                    <input defaultChecked className="mt-0.5 w-4 h-4 rounded border-gray-300 text-black focus:ring-black dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Research &amp; Science</span>
                                </label>
                                <label className="flex items-start gap-3 p-2 hover:bg-white dark:hover:bg-gray-800 rounded transition-colors cursor-pointer">
                                    <input className="mt-0.5 w-4 h-4 rounded border-gray-300 text-black focus:ring-black dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Finance &amp; Banking</span>
                                </label>
                                <label className="flex items-start gap-3 p-2 hover:bg-white dark:hover:bg-gray-800 rounded transition-colors cursor-pointer">
                                    <input className="mt-0.5 w-4 h-4 rounded border-gray-300 text-black focus:ring-black dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Healthcare</span>
                                </label>
                            </div>
                        </div>
                        <hr className="border-gray-200 dark:border-gray-700" />
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Growth Potential</label>
                            <div className="grid grid-cols-3 gap-2">
                                <label className="cursor-pointer">
                                    <input className="peer sr-only" name="growth" type="radio" />
                                    <div className="py-2 text-center text-xs font-medium border border-gray-200 dark:border-gray-700 rounded peer-checked:bg-black peer-checked:text-white peer-checked:border-black dark:peer-checked:bg-white dark:peer-checked:text-black hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                                        Low
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input className="peer sr-only" name="growth" type="radio" />
                                    <div className="py-2 text-center text-xs font-medium border border-gray-200 dark:border-gray-700 rounded peer-checked:bg-black peer-checked:text-white peer-checked:border-black dark:peer-checked:bg-white dark:peer-checked:text-black hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                                        Medium
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input defaultChecked className="peer sr-only" name="growth" type="radio" value="high" />
                                    <div className="py-2 text-center text-xs font-medium border border-gray-200 dark:border-gray-700 rounded peer-checked:bg-black peer-checked:text-white peer-checked:border-black dark:peer-checked:bg-white dark:peer-checked:text-black hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                                        High
                                    </div>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Based on market trends for the next 5-10 years.
                            </p>
                        </div>
                        <hr className="border-gray-200 dark:border-gray-700" />
                        <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">SEO Preview</label>
                            <div className="text-sm">
                                <div className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate">Data Scientist Career Path - Zertainity</div>
                                <div className="text-green-700 dark:text-green-500 text-xs truncate">www.zertainity.com/careers/data-scientist</div>
                                <div className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 mt-1">
                                    Explore the Data Scientist career path. Learn about required skills, salary ranges, and academic requirements...
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
            <style>{`
                .editor-content:focus {
                    outline: none;
                }
            `}</style>
        </div>
    );
};

export default CareerContentEditor;

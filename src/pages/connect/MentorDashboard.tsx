import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MentorDashboard = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white transition-colors duration-200 min-h-screen flex font-display">
            <div className="flex w-full h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark flex flex-col shrink-0 transition-all duration-300 transform md:translate-x-0 -translate-x-full md:static absolute inset-y-0 left-0 z-50">
                    <div className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="size-8 bg-black dark:bg-white rounded flex items-center justify-center text-white dark:text-black">
                                <span className="material-symbols-outlined text-xl">token</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight">Zertainity</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">Mentor Portal</p>
                    </div>
                    <nav className="flex-1 px-4 space-y-1">
                        <Link to="/mentorship" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-black text-white dark:bg-white dark:text-black transition-colors">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">calendar_today</span>
                            <span className="text-sm font-medium">Schedule</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">monitoring</span>
                            <span className="text-sm font-medium">Student Progress</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">chat</span>
                            <span className="text-sm font-medium">Messages</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </a>
                    </nav>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3 p-2">
                            <div className="size-9 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                <img className="size-full object-cover" alt="Profile photo of mentor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ-AZFWeZDy-oY-gVOKb9E22nimS_ty05dfS4kZfLhISaW7a3lWk-L089AfL7sLswB57Fi1yQa6u74AfqJHPqaNvRvydMMdRT15ewUw3vq2AYMjKAWKxxXpoN7yxBq8qJe1ZYqpl1auMEbNS4-R9wrr6KBz1uiyUiY8EungHUWtUdOKsRJPpB_2gWIoe5Ouyu1qWObj9ZAZixXy-uOY0OTVMGZqPtzuX1wS4nbhbpn-YOC5dTroRzqc1UvU9j0wF9JnoEOc8WJmg" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-semibold truncate leading-tight">Dr. Aris Thorne</p>
                                <p className="text-xs text-gray-500 truncate leading-tight">Senior AI Ethicist</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden w-full">
                    {/* Header */}
                    <header className="h-16 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark px-8 flex items-center justify-between">
                        <h1 className="text-lg font-semibold">Mentor Management Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <span className="material-symbols-outlined text-gray-500 hover:text-primary dark:hover:text-white cursor-pointer">notifications</span>
                                <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
                            </div>
                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <span className="material-symbols-outlined text-lg">add</span>
                                New Session
                            </button>
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background-light dark:bg-background-dark space-y-8">
                        {/* Metrics Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-500">Active Students</span>
                                    <span className="material-symbols-outlined text-gray-400">groups</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold">12</span>
                                    <span className="text-xs text-green-600 font-medium mb-1">+2 this month</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-500">Total Hours Mentored</span>
                                    <span className="material-symbols-outlined text-gray-400">schedule</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold">148h</span>
                                    <span className="text-xs text-gray-400 mb-1">Target: 200h</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-500">Average Rating</span>
                                    <span className="material-symbols-outlined text-gray-400">star</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold">4.9</span>
                                    <span className="text-sm text-gray-400 mb-1">/ 5.0</span>
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                            {/* Upcoming Sessions */}
                            <section className="xl:col-span-2 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold tracking-tight">Upcoming Sessions</h2>
                                    <a className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white" href="#">View Calendar</a>
                                </div>
                                <div className="bg-white dark:bg-[#1f1f1f] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 text-xs uppercase tracking-wider">
                                                    <th className="px-6 py-4 font-semibold">Student</th>
                                                    <th className="px-6 py-4 font-semibold">Topic</th>
                                                    <th className="px-6 py-4 font-semibold">Time</th>
                                                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                                <img className="size-full object-cover" alt="Student avatar: Alex Johnson" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYQcTHDYG-YrshWTjYednj2Eat9ExAEAIhTNrX0Z1_MsNBlwzaLa2d3zVSw3lfwkN8LZFmCqDr_BNKqLaT9o5IhLmLH_qK1F-NooKUPqlCvyZ3Ne-A48K2M6LDmD7HpfRpXLXwYjal3C_XwQF1mxIs8RHRpkJqBo8qeE5gxw6sSTjmsBGFyWXBeGRdf5lpXHYbex3VNX7ZoOJTzbSlWeywEdem12DjcnT2DabMIcchbU9FmF17jdDgaSfXtdWqqKXXsvLaX0Z_uQ" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">Alex Johnson</p>
                                                                <p className="text-xs text-gray-500">Batch 2024-A</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">AI Ethics Career Path</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-medium">10:00 AM</p>
                                                            <p className="text-xs text-gray-400">Today</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold tracking-tight transition-all">
                                                            Join Call
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                                <img className="size-full object-cover" alt="Student avatar: Sarah Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEXiU2heAhH7m4Jx5cLyObL0viPOs5hgaoxFdbLyvirA3c_yOofF-cPG4DlrnL77CsWGrEaqVcAN6xK5vmo7RClzTmBlppfMiYNj-drkqK8gENIuMzrbsHpB7YjO4bifQJjAHX_rkKvOE8p-AqKHVupTJ1bXC0gW8DazSZ2jbCA-SqI07aSdBF6sHBtcpAdh9dU-uDqS7owQNsuSlxvpgRv4JuBYXh7AUrwQXrHlMW447ZA9ogUABJghw6tgxljfem8qVOJZp_iA" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">Sarah Chen</p>
                                                                <p className="text-xs text-gray-500">Batch 2023-C</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">Portfolio Review</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-medium">01:30 PM</p>
                                                            <p className="text-xs text-gray-400">Today</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-bold tracking-tight transition-all">
                                                            Reschedule
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                                <img className="size-full object-cover" alt="Student avatar: Michael Smith" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWuMnX_SZsGYgaOzt3Ib02HWK9uCEBPXWVipsE-2R6T4S9xUQUQ2sHzT4oJJ6ZtU-x8c-BrkEmC1YbPwebhk5ggT15ognyERJMRioPOJgkrf7WWOxUcpElvvOKYHHag7R4oP9_2cKeCm7eQg8x_8ioKqPiy7Y8csjQ10rS8tZVEYtSIXyt9vtQa0T1pfqWsPMPE9AgjaY11q2VelCWpvVa5eKHz5ZRbOdFognSn01oCch_8ITxaGMZOUFeJIioyPEg8t0W3R-eHA" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">Michael Smith</p>
                                                                <p className="text-xs text-gray-500">Batch 2024-B</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">Interview Prep</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-medium">04:00 PM</p>
                                                            <p className="text-xs text-gray-400">Tomorrow</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-bold tracking-tight transition-all">
                                                            Reschedule
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>

                            {/* My Students Sidebar */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold tracking-tight">My Students</h2>
                                    <span className="material-symbols-outlined text-gray-400">more_horiz</span>
                                </div>
                                <div className="bg-white dark:bg-[#1f1f1f] rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6 shadow-sm">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-gray-100 overflow-hidden">
                                                    <img className="size-full object-cover" alt="Alex Johnson avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0e_mxw03q-S1NUuFwSLLVYeN8Gf4t3zyh13pkaApKb-Ahd3qaJoNRXMTyIBdHGfijRLq3yK0SCHi_qQ4or6V4IS0dfP5zMu9mzcJf8z5p6QuPHUILwrg3BohCBvaAUIWNNg8UGzMqvdyemWfMWAt1IM9LNBZBsafle-gx-rk2B-QNnKidGkvbgtcOCAnm4vhehLy39QnYWBjwijVot6xPSXMgz9TmaCWi3zbf38hVus8_HwOKmBjENH4rIRP6dReX3E4KUfLGjA" />
                                                </div>
                                                <span className="text-sm font-medium">Alex Johnson</span>
                                            </div>
                                            <span className="text-xs font-semibold text-gray-500">85%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-black dark:bg-white h-full" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-gray-100 overflow-hidden">
                                                    <img className="size-full object-cover" alt="Sarah Chen avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxJnvS0NOPt5J8uHEwjJcSeg_WWdhi5KdNqZJrqZaKmHXnLWEARSs5ScIlmoUe82zTuS66XXF3u35B9G2crGF9HDsw8T_aMNTLpH2N963lJ6eYztEvbNA9AzgbTJ3C-UG9JHd9V6FAwy1vLRTaIo4uGfQtwySqdj9Ei3TJkQubtbB2VnYL2EpXZg1xvJ14utf3zUiZvqGZmlRERMsHUekPW1QdRO0ewi81F15O4kUI3ffl9YnBP49cMwCf_0sMWFpgNoeHU594cg" />
                                                </div>
                                                <span className="text-sm font-medium">Sarah Chen</span>
                                            </div>
                                            <span className="text-xs font-semibold text-gray-500">42%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-black dark:bg-white h-full" style={{ width: '42%' }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-gray-100 overflow-hidden">
                                                    <img className="size-full object-cover" alt="Michael Smith avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8R3Yed_uQxWdwoZeTlNas3XxXx68tPARWDjCSOxfasW-xtBNeC7SB-_TgnJKSHgmT0S117KNazb9pscDfZb-R5Pln9s9R9FMtv5KzDa1mxeK0XXYsx33J4HicfmIYvAFEJGBBTdemqEikpYZ8YZLVFGRyIGDS9uZHljXIVZcUkIH_hmt97D2pF8ZdBaq0KxXCSjZ7LjbNhNmuSM1nrKZB9eHP9SYpDCgn3MXwg_DI8CmE5ucZPXdZ8PLnVUV5KdOuezV52JgCDA" />
                                                </div>
                                                <span className="text-sm font-medium">Michael Smith</span>
                                            </div>
                                            <span className="text-xs font-semibold text-gray-500">68%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-black dark:bg-white h-full" style={{ width: '68%' }}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-gray-100 overflow-hidden">
                                                    <img className="size-full object-cover" alt="David Kim avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIDcvE8L04qkCnXCcAMV5h5iz0EdRf85dwWfgChQRuYlLvDoMysY33FZTpj-EjvhzTV6EwEV0rFq_MKkE_kFdE4BP05A6m4eSqPY5sSHpz6wDFu1ECEFB9EeMUx_BhqQELLYxa15kXiQQy9Nu8GL2fzUFOR7oCULdJd7ziN2tczfV98fDIrFO6WDipFk3m1p3vEq4aY_viJAEFkvuVf2kDZJUWwpCLo8ljv9z8d1or6_y8YDQdfJ1eEGdLQudumaI0ye86hXJXfA" />
                                                </div>
                                                <span className="text-sm font-medium">David Kim</span>
                                            </div>
                                            <span className="text-xs font-semibold text-gray-500">92%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-black dark:bg-white h-full" style={{ width: '92%' }}></div>
                                        </div>
                                    </div>
                                    <button className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all">
                                        View All Students
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MentorDashboard;

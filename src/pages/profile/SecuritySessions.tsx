import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SecuritySessions = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-primary dark:text-white font-display min-h-screen flex flex-col transition-colors duration-200">
            <header className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                            <span className="text-xl font-bold tracking-tighter">ZERTAINITY</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link className="text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white" to="/">Dashboard</Link>
                            <Link className="text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white" to="/pathways">Skills</Link>
                            <Link className="text-sm font-medium border-b-2 border-black dark:border-white pb-1 mt-1" to="/security">Security</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/profile')} className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                            <span className="material-symbols-outlined text-sm">person</span>
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Security & Sessions</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">Manage your account security, active sessions, and login history.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <aside className="lg:col-span-3 space-y-2">
                        <a className="block px-4 py-2 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 border-l-2 border-black dark:border-white" href="#password">Password Management</a>
                        <a className="block px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900" href="#2fa">Two-Factor Auth</a>
                        <a className="block px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900" href="#sessions">Active Sessions</a>
                        <a className="block px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900" href="#history">Login History</a>
                    </aside>
                    <div className="lg:col-span-9 space-y-16">
                        <section className="space-y-6" id="password">
                            <div className="border-b border-gray-200 dark:border-neutral-800 pb-4">
                                <h2 className="text-xl font-bold uppercase tracking-widest text-sm">Password Management</h2>
                            </div>
                            <div className="max-w-md space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-neutral-500">Current Password</label>
                                    <input className="w-full border-neutral-200 dark:border-neutral-800 bg-transparent dark:bg-neutral-900 py-3 px-4 focus:ring-0 focus:border-black dark:focus:border-white transition-colors" placeholder="••••••••" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-neutral-500">New Password</label>
                                    <input className="w-full border-neutral-200 dark:border-neutral-800 bg-transparent dark:bg-neutral-900 py-3 px-4 focus:ring-0 focus:border-black dark:focus:border-white transition-colors" placeholder="••••••••" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-neutral-500">Confirm New Password</label>
                                    <input className="w-full border-neutral-200 dark:border-neutral-800 bg-transparent dark:bg-neutral-900 py-3 px-4 focus:ring-0 focus:border-black dark:focus:border-white transition-colors" placeholder="••••••••" type="password" />
                                </div>
                                <button className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                                    Update Password
                                </button>
                            </div>
                        </section>
                        <section className="space-y-6" id="2fa">
                            <div className="border-b border-gray-200 dark:border-neutral-800 pb-4 flex justify-between items-center">
                                <h2 className="text-xl font-bold uppercase tracking-widest text-sm">Two-Factor Authentication</h2>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold uppercase text-neutral-400">Status: Disabled</span>
                                    <button className="w-12 h-6 bg-neutral-200 dark:bg-neutral-800 relative rounded-full transition-colors">
                                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                                    </button>
                                </div>
                            </div>
                            <div className="p-8 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                                <div className="flex items-start gap-6">
                                    <div className="bg-white p-4 border border-gray-200 dark:border-neutral-800">
                                        <div className="w-32 h-32 bg-black flex items-center justify-center text-white text-xs">QR CODE PLACEHOLDER</div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-bold">Setup Instructions</h3>
                                        <ol className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2 list-decimal ml-4">
                                            <li>Download an authenticator app like Google Authenticator or Authy.</li>
                                            <li>Scan the QR code to the left or enter the manual key.</li>
                                            <li>Enter the 6-digit verification code generated by the app.</li>
                                        </ol>
                                        <div className="flex gap-2">
                                            <input className="border-neutral-200 dark:border-neutral-800 bg-transparent dark:bg-neutral-900 py-2 px-4 text-sm w-32 text-center tracking-[0.5em] focus:ring-0 focus:border-black dark:focus:border-white" placeholder="000000" type="text" />
                                            <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 text-xs font-bold uppercase tracking-widest">Verify</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="space-y-6" id="sessions">
                            <div className="border-b border-gray-200 dark:border-neutral-800 pb-4 flex justify-between items-end">
                                <div>
                                    <h2 className="text-xl font-bold uppercase tracking-widest text-sm">Active Sessions</h2>
                                    <p className="text-xs text-neutral-500 mt-1">Devices currently logged into your account.</p>
                                </div>
                                <button className="border border-black dark:border-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                    Log out of all other sessions
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-neutral-800">
                                            <th className="py-4 font-bold uppercase text-[10px] tracking-widest text-neutral-500">Device / Browser</th>
                                            <th className="py-4 font-bold uppercase text-[10px] tracking-widest text-neutral-500">IP Address</th>
                                            <th className="py-4 font-bold uppercase text-[10px] tracking-widest text-neutral-500">Location</th>
                                            <th className="py-4 font-bold uppercase text-[10px] tracking-widest text-neutral-500">Status</th>
                                            <th className="py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                                        <tr>
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-lg">desktop_windows</span>
                                                    <div>
                                                        <p className="font-medium">Chrome on Windows</p>
                                                        <p className="text-xs text-neutral-500">Current Session</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 font-mono text-xs">192.168.1.104</td>
                                            <td className="py-4">New York, USA</td>
                                            <td className="py-4">
                                                <span className="inline-block w-2 h-2 bg-black dark:bg-white rounded-full mr-2"></span>
                                                <span className="text-xs font-bold uppercase">Active</span>
                                            </td>
                                            <td className="py-4 text-right"></td>
                                        </tr>
                                        <tr>
                                            <td className="py-4">
                                                <div className="flex items-center gap-3 text-neutral-500">
                                                    <span className="material-symbols-outlined text-lg">smartphone</span>
                                                    <div>
                                                        <p className="font-medium">Safari on iPhone</p>
                                                        <p className="text-xs">Logged in 2 days ago</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 font-mono text-xs text-neutral-500">172.16.254.1</td>
                                            <td className="py-4 text-neutral-500">London, UK</td>
                                            <td className="py-4 text-neutral-500">
                                                <span className="text-xs font-bold uppercase">Idle</span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button className="text-[10px] font-bold uppercase underline tracking-tighter hover:text-black">Revoke</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section className="space-y-6" id="history">
                            <div className="border-b border-gray-200 dark:border-neutral-800 pb-4">
                                <h2 className="text-xl font-bold uppercase tracking-widest text-sm">Login History</h2>
                            </div>
                            <div className="space-y-0 border border-gray-200 dark:border-neutral-800 divide-y divide-gray-200 dark:divide-neutral-800">
                                <div className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                    <div className="flex gap-4 items-center">
                                        <span className="material-symbols-outlined text-neutral-400">login</span>
                                        <div>
                                            <p className="text-sm font-medium">Successful Login</p>
                                            <p className="text-xs text-neutral-500">Chrome on macOS • San Francisco, CA</p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-mono text-neutral-500">Oct 24, 2023 14:22:10</p>
                                </div>
                                <div className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                    <div className="flex gap-4 items-center">
                                        <span className="material-symbols-outlined text-neutral-400">login</span>
                                        <div>
                                            <p className="text-sm font-medium">Successful Login</p>
                                            <p className="text-xs text-neutral-500">Mobile App on Android • Austin, TX</p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-mono text-neutral-500">Oct 23, 2023 09:15:45</p>
                                </div>
                                <div className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                    <div className="flex gap-4 items-center">
                                        <span className="material-symbols-outlined text-black dark:text-white">error</span>
                                        <div>
                                            <p className="text-sm font-bold">Failed Login Attempt</p>
                                            <p className="text-xs text-neutral-500">Firefox on Windows • Moscow, RU</p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-mono text-neutral-500">Oct 22, 2023 23:04:12</p>
                                </div>
                            </div>
                            <button className="w-full py-4 text-xs font-bold uppercase tracking-[0.2em] border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                Load More Activity
                            </button>
                        </section>
                    </div>
                </div>
            </main>
            <footer className="w-full bg-white dark:bg-black border-t border-gray-200 dark:border-neutral-800 py-12 mt-20">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-400">© 2024 ZERTAINITY. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
                        <a className="hover:underline" href="#">Privacy Policy</a>
                        <a className="hover:underline" href="#">Terms of Service</a>
                        <a className="hover:underline" href="#">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SecuritySessions;

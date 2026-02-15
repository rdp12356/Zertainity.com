import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuditLogs = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/auth");
                return;
            }

            const { data: roles } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .maybeSingle();

            if (roles) setRole(roles.role);
            else setRole('user');
            setLoading(false);
        };
        checkUser();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f6f6f8] flex items-center justify-center text-gray-500">
                Loading...
            </div>
        );
    }

    if (!role || role === 'user') {
        return (
            <div className="min-h-screen bg-[#f6f6f8] flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-[#111317] mb-2">Restricted Access</h2>
                    <p className="text-[#646f87] mb-6">This area is reserved for administrators.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-[#1d56c9] text-white px-6 py-2 rounded font-medium hover:bg-[#1d56c9]/90 transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f6f6f8] text-[#111317] min-h-screen flex flex-col font-['Inter',sans-serif] antialiased">
            <div className="flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header / Nav */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] bg-white px-6 py-3 sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <div className="size-8 text-[#1d56c9] flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">shield_person</span>
                        </div>
                        <h2 className="text-[#111317] text-lg font-bold leading-tight tracking-[-0.015em]">Zertainity Admin</h2>
                    </div>
                    <div className="hidden md:flex flex-1 justify-center px-8">
                        <nav className="flex items-center gap-6">
                            <a className="text-[#646f87] hover:text-[#1d56c9] transition-colors text-sm font-medium cursor-pointer" onClick={() => navigate("/admin")}>Dashboard</a>
                            <a className="text-[#646f87] hover:text-[#1d56c9] transition-colors text-sm font-medium cursor-pointer" onClick={() => navigate("/admin")}>Users</a>
                            <a className="text-[#646f87] hover:text-[#1d56c9] transition-colors text-sm font-medium cursor-pointer">Content</a>
                            <a className="text-[#1d56c9] text-sm font-medium cursor-pointer">Analytics</a>
                            <a className="text-[#646f87] hover:text-[#1d56c9] transition-colors text-sm font-medium cursor-pointer">Settings</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-500 hover:text-[#1d56c9] transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-gray-100" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7RZz0_ojjCNxgxdCrKcrQLRnABf6W_6Dym06SyfyEXG_6onOpr7IngMz-niTzVeDWEUt5_b3ut1leyr7dS0BRSuWIeR2deTPyrihwNnKJH5kZnMMJxcIIcLcUs4kvI0svUil1fJq75mMgX0uWCbFXIAhGxxsiAttOjz23Qn1mqZ6lB3D4XMT8Si2VrfUdC8jsI4iqublVPe51kAV_k3AcODpSMoLW1WHDjRTSDHmIp-QzuoYmMT5JHVPf8h-GT5xuw0aXaxi8wA")' }}></div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 px-4 py-8 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 mb-6 text-sm">
                        <a className="text-[#646f87] hover:text-[#1d56c9] transition-colors cursor-pointer" onClick={() => navigate("/")}>Home</a>
                        <span className="text-[#646f87]">/</span>
                        <a className="text-[#646f87] hover:text-[#1d56c9] transition-colors cursor-pointer" onClick={() => navigate("/admin")}>Admin Panel</a>
                        <span className="text-[#646f87]">/</span>
                        <span className="text-[#111317] font-medium">Audit Logs</span>
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[#111317] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">System Audit Logs</h1>
                            <p className="text-[#646f87] text-base font-normal max-w-2xl">
                                Track and monitor all administrative actions and system changes. This log is immutable and retained for 7 years for compliance.
                            </p>
                        </div>
                        <button className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded bg-white border border-[#dcdfe5] hover:border-[#1d56c9] hover:text-[#1d56c9] transition-colors h-10 px-4 text-[#111317] text-sm font-bold shadow-sm">
                            <span className="material-symbols-outlined text-lg">download</span>
                            <span>Export CSV</span>
                        </button>
                    </div>

                    {/* Filters & Search Toolbar */}
                    <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb] p-4 mb-6">
                        <div className="flex flex-col xl:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 min-w-[280px]">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Search Logs</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">search</span>
                                    <input className="w-full pl-10 pr-4 py-2.5 bg-[#f6f6f8] border border-gray-200 rounded text-sm text-[#111317] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#1d56c9] focus:border-[#1d56c9] transition-all" placeholder="Search by IP, Target ID, or Keyword..." type="text" />
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="flex-1 min-w-[280px]">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Date Range</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">calendar_today</span>
                                    <input className="w-full pl-10 pr-4 py-2.5 bg-[#f6f6f8] border border-gray-200 rounded text-sm text-[#111317] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#1d56c9] focus:border-[#1d56c9] transition-all" placeholder="Oct 01, 2023 - Oct 31, 2023" type="text" />
                                </div>
                            </div>

                            {/* Dropdowns Container */}
                            <div className="flex flex-col sm:flex-row gap-4 flex-[1.5]">
                                {/* Admin Filter */}
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Admin User</label>
                                    <div className="relative">
                                        <select className="w-full pl-3 pr-10 py-2.5 bg-[#f6f6f8] border border-gray-200 rounded text-sm text-[#111317] focus:outline-none focus:ring-1 focus:ring-[#1d56c9] focus:border-[#1d56c9] appearance-none cursor-pointer">
                                            <option>All Admins</option>
                                            <option>Sarah Jenkins</option>
                                            <option>Mike Ross</option>
                                            <option>System Automation</option>
                                        </select>
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none material-symbols-outlined text-[20px]">expand_more</span>
                                    </div>
                                </div>

                                {/* Action Type Filter */}
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Action Type</label>
                                    <div className="relative">
                                        <select className="w-full pl-3 pr-10 py-2.5 bg-[#f6f6f8] border border-gray-200 rounded text-sm text-[#111317] focus:outline-none focus:ring-1 focus:ring-[#1d56c9] focus:border-[#1d56c9] appearance-none cursor-pointer">
                                            <option>All Actions</option>
                                            <option>User Suspended</option>
                                            <option>Role Change</option>
                                            <option>Content Update</option>
                                            <option>Login Failure</option>
                                        </select>
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none material-symbols-outlined text-[20px]">expand_more</span>
                                    </div>
                                </div>

                                {/* Reset */}
                                <div className="flex items-end pb-1">
                                    <button className="text-sm font-medium text-[#1d56c9] hover:text-[#1d56c9]/80 transition-colors whitespace-nowrap px-2 py-2">
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Table Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-[#e5e7eb] overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="py-4 pl-6 pr-4 text-left">
                                            <button className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider group hover:text-[#1d56c9] transition-colors">
                                                Timestamp
                                                <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:text-[#1d56c9]">arrow_downward</span>
                                            </button>
                                        </th>
                                        <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin User</th>
                                        <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                        <th className="py-4 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Target</th>
                                        <th className="py-4 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">IP Address</th>
                                        <th className="py-4 pr-6 pl-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {/* Row 1 */}
                                    <tr className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-4 pl-6 pr-4 text-sm text-[#111317] whitespace-nowrap">
                                            <div className="font-medium">Oct 24, 2023</div>
                                            <div className="text-xs text-gray-500">14:32:01</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-blue-100 text-[#1d56c9] flex items-center justify-center text-xs font-bold">SJ</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-[#111317]">Sarah Jenkins</span>
                                                    <span className="text-xs text-gray-500">sarah.j@zertainity.ai</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                                                <span className="size-1.5 rounded-full bg-red-600"></span>
                                                User Suspended
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm text-[#111317]">
                                                UserID: <a className="text-[#1d56c9] hover:underline cursor-pointer">#88291</a>
                                            </div>
                                            <div className="text-xs text-gray-500">Target: John Doe</div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-mono text-sm text-gray-600">192.168.1.45</span>
                                        </td>
                                        <td className="py-4 pr-6 pl-4 text-right">
                                            <button className="text-gray-400 hover:text-[#1d56c9] transition-colors p-1 rounded hover:bg-gray-100">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-4 pl-6 pr-4 text-sm text-[#111317] whitespace-nowrap">
                                            <div className="font-medium">Oct 24, 2023</div>
                                            <div className="text-xs text-gray-500">12:15:43</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">MR</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-[#111317]">Mike Ross</span>
                                                    <span className="text-xs text-gray-500">mike.r@zertainity.ai</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                <span className="size-1.5 rounded-full bg-blue-600"></span>
                                                Role Changed
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm text-[#111317]">
                                                UserID: <a className="text-[#1d56c9] hover:underline cursor-pointer">#90210</a>
                                            </div>
                                            <div className="text-xs text-gray-500">From: User → To: Editor</div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-mono text-sm text-gray-600">10.0.24.11</span>
                                        </td>
                                        <td className="py-4 pr-6 pl-4 text-right">
                                            <button className="text-gray-400 hover:text-[#1d56c9] transition-colors p-1 rounded hover:bg-gray-100">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-4 pl-6 pr-4 text-sm text-[#111317] whitespace-nowrap">
                                            <div className="font-medium">Oct 23, 2023</div>
                                            <div className="text-xs text-gray-500">09:45:12</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold">
                                                    <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-[#111317]">System Auto</span>
                                                    <span className="text-xs text-gray-500">Automated Process</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                <span className="size-1.5 rounded-full bg-green-600"></span>
                                                Backup Created
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm text-[#111317]">
                                                Database: <span className="text-gray-600">main_db_v2</span>
                                            </div>
                                            <div className="text-xs text-gray-500">Routine Maintenance</div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-mono text-sm text-gray-600">127.0.0.1</span>
                                        </td>
                                        <td className="py-4 pr-6 pl-4 text-right">
                                            <button className="text-gray-400 hover:text-[#1d56c9] transition-colors p-1 rounded hover:bg-gray-100">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-4 pl-6 pr-4 text-sm text-[#111317] whitespace-nowrap">
                                            <div className="font-medium">Oct 23, 2023</div>
                                            <div className="text-xs text-gray-500">08:30:00</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-blue-100 text-[#1d56c9] flex items-center justify-center text-xs font-bold">SJ</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-[#111317]">Sarah Jenkins</span>
                                                    <span className="text-xs text-gray-500">sarah.j@zertainity.ai</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                                <span className="size-1.5 rounded-full bg-amber-600"></span>
                                                Content Edit
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm text-[#111317]">
                                                Page: <a className="text-[#1d56c9] hover:underline cursor-pointer">Career Guide</a>
                                            </div>
                                            <div className="text-xs text-gray-500">Section: Introduction</div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-mono text-sm text-gray-600">192.168.1.45</span>
                                        </td>
                                        <td className="py-4 pr-6 pl-4 text-right">
                                            <button className="text-gray-400 hover:text-[#1d56c9] transition-colors p-1 rounded hover:bg-gray-100">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Row 5 */}
                                    <tr className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-4 pl-6 pr-4 text-sm text-[#111317] whitespace-nowrap">
                                            <div className="font-medium">Oct 22, 2023</div>
                                            <div className="text-xs text-gray-500">16:11:09</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">DK</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-[#111317]">David Kim</span>
                                                    <span className="text-xs text-gray-500">david.k@zertainity.ai</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                                <span className="size-1.5 rounded-full bg-gray-500"></span>
                                                API Key Gen
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm text-[#111317]">
                                                Service: <span className="text-gray-600">Stripe Integ.</span>
                                            </div>
                                            <div className="text-xs text-gray-500">KeyID: sk_live_...</div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="font-mono text-sm text-gray-600">88.21.14.99</span>
                                        </td>
                                        <td className="py-4 pr-6 pl-4 text-right">
                                            <button className="text-gray-400 hover:text-[#1d56c9] transition-colors p-1 rounded hover:bg-gray-100">
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900">5</span> of <span className="font-semibold text-gray-900">128</span> results
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 text-gray-500 disabled:opacity-50 transition-all" disabled>
                                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                </button>
                                <div className="flex items-center gap-1">
                                    <button className="size-8 rounded text-sm font-medium bg-[#1d56c9] text-white shadow-sm flex items-center justify-center">1</button>
                                    <button className="size-8 rounded text-sm font-medium text-gray-600 hover:bg-white hover:shadow-sm transition-all flex items-center justify-center">2</button>
                                    <button className="size-8 rounded text-sm font-medium text-gray-600 hover:bg-white hover:shadow-sm transition-all flex items-center justify-center">3</button>
                                    <span className="text-gray-400 px-1">...</span>
                                    <button className="size-8 rounded text-sm font-medium text-gray-600 hover:bg-white hover:shadow-sm transition-all flex items-center justify-center">24</button>
                                </div>
                                <button className="p-2 rounded bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-[#1d56c9] transition-all">
                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AuditLogs;

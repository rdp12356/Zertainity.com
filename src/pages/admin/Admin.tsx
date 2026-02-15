import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
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
      <div className="min-h-screen bg-[#141414] flex items-center justify-center text-[#a1a1aa]">
        Loading...
      </div>
    );
  }

  if (!role || role === 'user') {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Restricted Access</h2>
          <p className="text-[#a1a1aa] mb-6">This area is reserved for administrators.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-[#141414] px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] text-white antialiased h-screen flex overflow-hidden font-['Inter',sans-serif]">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-[#333333] bg-[#141414] flex-shrink-0">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-[#333333]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-br from-white to-gray-500 rounded-full flex items-center justify-center text-[#141414] font-bold text-xs">
              Z
            </div>
            <span className="font-semibold text-lg tracking-tight">Zertainity</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#262626] text-white group transition-colors" href="#">
            <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>group</span>
            <span className="text-sm font-medium">User Management</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#a1a1aa] hover:bg-[#262626] hover:text-white transition-colors group" href="#">
            <span className="material-symbols-outlined text-[#a1a1aa] group-hover:text-white transition-colors" style={{ fontSize: '20px' }}>description</span>
            <span className="text-sm font-medium">Audit Logs</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#a1a1aa] hover:bg-[#262626] hover:text-white transition-colors group" href="#">
            <span className="material-symbols-outlined text-[#a1a1aa] group-hover:text-white transition-colors" style={{ fontSize: '20px' }}>edit_note</span>
            <span className="text-sm font-medium">Content Editor</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#a1a1aa] hover:bg-[#262626] hover:text-white transition-colors group" href="#">
            <span className="material-symbols-outlined text-[#a1a1aa] group-hover:text-white transition-colors" style={{ fontSize: '20px' }}>settings</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>

        {/* User Profile (Bottom) */}
        <div className="p-4 border-t border-[#333333]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-[#262626]" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIs1CZj-dg7ZUMwX0L3ULeda_IFjarr-tXpCXLb124Icv3NsilohuqySXglY4QGVjwmryzAiEuou4eVLgQMhJXfYzgFx0dowHquAdRHwoyQiw8xttciLaph1WGBmAOAGoyYvNTA9MsPW85gGYx3wBxzfk8rNfAxWB3TSd4WbUP7-EHuXwoLBwrk1TqlJYhuAyoLM_kQbaZqtCCKBpMtaeT-SbFH5vN2sNtWYcWSEeLsem8705Ouh27esM6M_UBW_jwB9Ln4pJoYw')" }}></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Alex Morgan</span>
              <span className="text-xs text-[#a1a1aa]">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#1a1a1a]">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-[#333333] bg-[#141414]">
          <div>
            <h1 className="text-xl font-semibold text-white">User Management</h1>
            <p className="text-xs text-[#a1a1aa] mt-0.5">Manage access and platform permissions</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center h-9 px-4 rounded border border-[#333333] bg-[#262626] text-sm font-medium text-[#a1a1aa] hover:text-white hover:border-[#a1a1aa] transition-colors">
              <span className="material-symbols-outlined mr-2" style={{ fontSize: '18px' }}>download</span>
              Export
            </button>
            <button className="flex items-center justify-center h-9 px-4 rounded bg-white text-[#141414] text-sm font-semibold hover:bg-gray-200 transition-colors">
              <span className="material-symbols-outlined mr-2" style={{ fontSize: '18px' }}>add</span>
              Add New User
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="bg-[#141414] border border-[#333333] rounded p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#a1a1aa] text-sm font-medium">Total Users</span>
                  <span className="material-symbols-outlined text-[#a1a1aa]" style={{ fontSize: '20px' }}>group</span>
                </div>
                <div className="flex items-end gap-2 mt-auto">
                  <span className="text-3xl font-bold text-white tracking-tight">12,450</span>
                  <span className="text-xs font-medium text-emerald-500 mb-1 flex items-center">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_upward</span> 12%
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#141414] border border-[#333333] rounded p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#a1a1aa] text-sm font-medium">Pending Verifications</span>
                  <span className="material-symbols-outlined text-[#a1a1aa]" style={{ fontSize: '20px' }}>verified_user</span>
                </div>
                <div className="flex items-end gap-2 mt-auto">
                  <span className="text-3xl font-bold text-white tracking-tight">45</span>
                  <span className="text-xs font-medium text-amber-500 mb-1 flex items-center">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>warning</span> Action needed
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#141414] border border-[#333333] rounded p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#a1a1aa] text-sm font-medium">Active Mentors</span>
                  <span className="material-symbols-outlined text-[#a1a1aa]" style={{ fontSize: '20px' }}>school</span>
                </div>
                <div className="flex items-end gap-2 mt-auto">
                  <span className="text-3xl font-bold text-white tracking-tight">320</span>
                  <span className="text-xs font-medium text-emerald-500 mb-1 flex items-center">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_upward</span> 2.5%
                  </span>
                </div>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-end sm:items-center">
              <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#a1a1aa]" style={{ fontSize: '20px' }}>search</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2.5 border border-[#333333] rounded bg-[#141414] text-white placeholder-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm"
                  placeholder="Search users by name, email, or role..."
                  type="text"
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-48">
                  <select className="block w-full pl-3 pr-10 py-2.5 text-base border border-[#333333] bg-[#141414] text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm rounded appearance-none">
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Editor</option>
                    <option>User</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#a1a1aa]">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>expand_more</span>
                  </div>
                </div>
                <button className="p-2.5 border border-[#333333] rounded bg-[#141414] text-[#a1a1aa] hover:text-white hover:border-[#a1a1aa] transition-colors" title="Filter Settings">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>filter_list</span>
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#141414] border border-[#333333] rounded overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#333333]">
                  <thead className="bg-[#262626]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider w-12" scope="col">
                        <input className="rounded border-gray-600 bg-transparent text-white focus:ring-0 focus:ring-offset-0 h-4 w-4" type="checkbox" />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider" scope="col">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider" scope="col">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider" scope="col">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider" scope="col">Last Login</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#333333] bg-[#141414]">
                    {/* Row 1 */}
                    <tr className="hover:bg-[#262626]/40 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input className="rounded border-gray-600 bg-transparent text-white focus:ring-0 focus:ring-offset-0 h-4 w-4" type="checkbox" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img alt="" className="h-10 w-10 rounded-full bg-[#262626]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANIiuP0lsTpOpJJH7g67J-9Z3Ftn6X54dXSst2sGBbTlHa7mTQszXaNa4dQn4iH1g0Ty5isdaZtKH6n_yUeI7dFBC1kmQI4beuvg4_ofjlBhA5SVnI6KAHsP_zBLFqgreMYtbdf2KHfTJdUBgYylVteWPc8dRfy7iiNawvHpRg2ypthfYY1iTWs55kA-tmQS11e-mR_NrlwHJ3DRvxHXGsd-hjfOarzUqndIjvSkSD9So6Yms-UHcXBsRaj68DrcvjWqDj6ANKwQ" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">Sarah Jenkins</div>
                            <div className="text-xs text-[#a1a1aa]">sarah.j@zertainity.ai</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-purple-900/30 text-purple-200 border border-purple-800">Owner</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-900/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#a1a1aa]">2 mins ago</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#a1a1aa] hover:text-white transition-colors">
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_horiz</span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-[#262626]/40 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input className="rounded border-gray-600 bg-transparent text-white focus:ring-0 focus:ring-offset-0 h-4 w-4" type="checkbox" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img alt="" className="h-10 w-10 rounded-full bg-[#262626]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1ORqggDgvquGlNPFVepT8zkm32BvV7uuYqDMku4YFVjb1PQft_BElomnwmxm-aQQf1xZGDQiBkySags5nglIoo5UhjBjYBkaN_GDfG0ZEJAumv9fHwH8JDcfnGwqofmm78mGCuNSqAS_EAE42ezD1rmVgIanJuy-48_uKp2sUQxzFafPG_pHeYqEPrAr0WliLXUarC34GaBpfC_jPZJcno5gN2oFUPA7yY16TMHKEeGM0We4cWUSxDWJRArXmjQR-HXhfnmOwGQ" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">Michael Chen</div>
                            <div className="text-xs text-[#a1a1aa]">m.chen@zertainity.ai</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-900/30 text-blue-200 border border-blue-800">Admin</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-900/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#a1a1aa]">1 hour ago</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#a1a1aa] hover:text-white transition-colors">
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_horiz</span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-[#262626]/40 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input className="rounded border-gray-600 bg-transparent text-white focus:ring-0 focus:ring-offset-0 h-4 w-4" type="checkbox" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-[#262626] flex items-center justify-center text-white font-medium text-sm border border-[#333333]">DS</div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">David Smith</div>
                            <div className="text-xs text-[#a1a1aa]">david.s@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#262626] text-[#a1a1aa] border border-[#333333]">User</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/20 text-red-400 border border-red-900/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                          Suspended
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#a1a1aa]">2 days ago</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#a1a1aa] hover:text-white transition-colors">
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_horiz</span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="hover:bg-[#262626]/40 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input className="rounded border-gray-600 bg-transparent text-white focus:ring-0 focus:ring-offset-0 h-4 w-4" type="checkbox" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img alt="" className="h-10 w-10 rounded-full bg-[#262626]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSZ_x9GagSxo1gMzXU1HUAPCPjHZ6wW_zuiBIXH1KVtGYdacA0JStkjBpt-cLtStS3F-2W3M9atv0h2q_GjkxzZwpUkHGexTSGvkhUZQ-rzJEBjTFpemtUedzBo6GGDw3dBGi5CpbNMMPFkrbEIeBtBSAbij9EkirHd6mtM2PNe3BFhWm2EiDof74YD81V2NthSET7jgmtfeoKVYjlX613TnmQls8ylkyJUpKS8u8DfIY-C95WONBUGm_RQtPF82j1EMG0E6wzBg" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">Elena Rodriguez</div>
                            <div className="text-xs text-[#a1a1aa]">elena.r@zertainity.ai</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-indigo-900/30 text-indigo-200 border border-indigo-800">Manager</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-900/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#a1a1aa]">5 mins ago</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#a1a1aa] hover:text-white transition-colors">
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_horiz</span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 5 */}
                    <tr className="hover:bg-[#262626]/40 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input className="rounded border-gray-600 bg-transparent text-white focus:ring-0 focus:ring-offset-0 h-4 w-4" type="checkbox" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img alt="" className="h-10 w-10 rounded-full bg-[#262626]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbYNqR9gCdbm4pe_onk9f-tvhcVg6SyDVaEjIBvCCp2LCQGOfBv3g83HT04llR7ThEfUnDUvduVp4FdMEQzqJzm97JaWHXx4ooYn6sJarOcQTYgG7cojkRM2v01trytNECUE4iXC4EIpQvDbet06mAV79-t8kTgeTpciCreEn0VJXFnztSLhHUM2xMFDlYi6tvoGePk-ZMjxnAQa0OV-NJbGVHvC76DCaKQV17GTCn3mC8Y1UE0pcN5U5sIrPHFNW85vpDfOhWIQ" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">James Wilson</div>
                            <div className="text-xs text-[#a1a1aa]">j.wilson@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-orange-900/30 text-orange-200 border border-orange-800">Editor</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                          Inactive
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#a1a1aa]">1 week ago</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#a1a1aa] hover:text-white transition-colors">
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_horiz</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="bg-[#262626] px-6 py-3 border-t border-[#333333] flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-[#333333] text-sm font-medium rounded-md text-[#a1a1aa] bg-[#141414] hover:text-white">Previous</button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-[#333333] text-sm font-medium rounded-md text-[#a1a1aa] bg-[#141414] hover:text-white">Next</button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-[#a1a1aa]">
                      Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">12,450</span> results
                    </p>
                  </div>
                  <div>
                    <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-[#333333] bg-[#141414] text-sm font-medium text-[#a1a1aa] hover:bg-[#262626] hover:text-white" href="#">
                        <span className="sr-only">Previous</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
                      </a>
                      <a aria-current="page" className="z-10 bg-[#262626] border-[#333333] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">1</a>
                      <a className="bg-[#141414] border-[#333333] text-[#a1a1aa] hover:bg-[#262626] hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">2</a>
                      <a className="bg-[#141414] border-[#333333] text-[#a1a1aa] hover:bg-[#262626] hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">3</a>
                      <span className="relative inline-flex items-center px-4 py-2 border border-[#333333] bg-[#141414] text-sm font-medium text-[#a1a1aa]">...</span>
                      <a className="bg-[#141414] border-[#333333] text-[#a1a1aa] hover:bg-[#262626] hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">8</a>
                      <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-[#333333] bg-[#141414] text-sm font-medium text-[#a1a1aa] hover:bg-[#262626] hover:text-white" href="#">
                        <span className="sr-only">Next</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;

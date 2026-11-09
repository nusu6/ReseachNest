'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  Database,
  Users,
  CreditCard,
  Settings,
  User,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Edit3,
  Activity,
  Server,
  Lock,
  DollarSign,
  Sliders
} from 'lucide-react';

interface UserItem {
  id: string;
  fullName?: string;
  name?: string;
  email: string;
  role: string;
  status?: string;
  createdAt?: string;
  joined?: string;
}

interface TransactionItem {
  id: string;
  user: string;
  amount: string;
  gateway: string;
  status: string;
  date: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'users' | 'payments' | 'config' | 'profile'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'Noshin Nazia',
    email: 'noshin.pstu.cse@gmail.com',
    role: 'SYSTEM_ADMINISTRATOR',
    department: 'Computer Science & Engineering',
    institution: 'Patuakhali Science and Technology University (PSTU)',
  });

  const [selectedTable, setSelectedTable] = useState<'users' | 'projects' | 'payments' | 'logs'>('users');

  const [userList, setUserList] = useState<UserItem[]>([
    { id: 'u1', name: 'Dr. Evelyn Vance', email: 'evelyn@vance.org', role: 'INDEPENDENT', status: 'ACTIVE', joined: '2026-01-12' },
    { id: 'u2', name: 'Dr. Tanvir Hossain', email: 'tanvir@pstu.ac.bd', role: 'SUPERVISOR', status: 'ACTIVE', joined: '2026-02-01' },
    { id: 'u3', name: 'Rahim Ahmed', email: 'rahim.cse@pstu.ac.bd', role: 'STUDENT', status: 'ACTIVE', joined: '2026-03-04' },
  ]);

  const [transactions, setTransactions] = useState<TransactionItem[]>([
    { id: 'tx_1001', user: 'Dr. Evelyn Vance', amount: '$150.00', gateway: 'Stripe', status: 'COMPLETED', date: '2026-03-01' },
    { id: 'tx_1002', user: 'Rahim Ahmed', amount: '$25.00', gateway: 'bKash', status: 'COMPLETED', date: '2026-03-05' },
  ]);

  const [sysConfig, setSysConfig] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
  });

  // Fetch Database Records from NestJS Backend
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        const res = await fetch(`${backendUrl}/api/v1/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setUserList(data.map((u: any) => ({
              id: u.id,
              name: u.fullName || 'User',
              email: u.email,
              role: u.role,
              status: 'ACTIVE',
              joined: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '2026-03-01'
            })));
          }
        }
      } catch (err) {
        console.error('Database connection notice:', err);
      }
    };

    fetchAdminData();
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/login';
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'database', label: 'Database Explorer', icon: Database },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'payments', label: 'Payments & Revenue', icon: CreditCard },
    { id: 'config', label: 'System Config', icon: Settings },
    { id: 'profile', label: 'Admin Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#061d21] flex flex-col md:flex-row font-sans">
      
      {/* MOBILE BAR */}
      <div className="md:hidden bg-white border-b border-[#d5e5e3] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="ResearchNest" width={32} height={32} style={{ width: '32px', height: '32px' }} priority />
          <span className="font-bold text-[#061d21] tracking-tight">Admin Console</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-[#4a6b72] hover:text-[#061d21] rounded-lg bg-[#f4f8f7] border border-[#d5e5e3]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#d5e5e3] flex flex-col justify-between transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          <div className="hidden md:flex items-center gap-3 px-6 py-6 border-b border-[#d5e5e3]">
            <Image src="/logo.png" alt="ResearchNest" width={36} height={36} style={{ width: '36px', height: '36px' }} priority />
            <div>
              <span className="font-bold text-[#061d21] tracking-tight text-lg block leading-none">ResearchNest</span>
              <span className="text-[10px] text-red-400 font-mono tracking-wider uppercase flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3 text-red-400" /> Admin Console
              </span>
            </div>
          </div>

          <nav className="p-4 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30'
                      : 'text-[#4a6b72] hover:bg-[#0a272d] hover:text-[#061d21]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#00e5ff]' : 'text-[#4a6b72]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#d5e5e3] bg-[#f4f8f7]/50">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-red-950/80 border border-red-500 flex items-center justify-center font-bold text-red-400">
              {profile.fullName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-[#061d21] truncate">{profile.fullName}</p>
              <p className="text-[10px] text-[#4a6b72] truncate">{profile.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-900/40 bg-red-950/20 text-red-400 hover:bg-red-900/40 text-xs font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#d5e5e3]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#061d21] tracking-tight capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-xs sm:text-sm text-[#4a6b72] mt-1">
              Global Platform Governance & Real-time Administration
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-xs font-mono flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Server: Online
          </span>
        </header>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Registered Users', value: userList.length, icon: Users, color: 'text-cyan-400' },
                { title: 'Database Status', value: 'Connected', icon: Database, color: 'text-indigo-400' },
                { title: 'Monthly Revenue', value: '$175.00', icon: DollarSign, color: 'text-emerald-400' },
                { title: 'System State', value: sysConfig.maintenanceMode ? 'Maintenance' : 'Active', icon: Activity, color: 'text-amber-400' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white border border-[#d5e5e3] p-5 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#4a6b72] font-mono uppercase">{stat.title}</p>
                      <p className="text-2xl font-bold text-[#061d21] mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-[#f4f8f7] border border-[#d5e5e3] ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DATABASE EXPLORER */}
        {activeTab === 'database' && (
          <div className="bg-white border border-[#d5e5e3] rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#d5e5e3]">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#00e5ff]" />
                <h3 className="text-lg font-semibold text-[#061d21]">PostgreSQL Database Table Viewer</h3>
              </div>
              <div className="flex gap-2">
                {(['users', 'projects', 'payments', 'logs'] as const).map((tbl) => (
                  <button
                    key={tbl}
                    onClick={() => setSelectedTable(tbl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition ${
                      selectedTable === tbl
                        ? 'bg-[#00e5ff] text-[#031114] font-bold'
                        : 'bg-[#f4f8f7] text-[#4a6b72] border border-[#d5e5e3] hover:text-[#061d21]'
                    }`}
                  >
                    {tbl}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f4f8f7] text-[#4a6b72] font-mono uppercase">
                  <tr>
                    <th className="p-3 border-b border-[#d5e5e3]">Primary ID</th>
                    <th className="p-3 border-b border-[#d5e5e3]">Identifier / Email</th>
                    <th className="p-3 border-b border-[#d5e5e3]">Role / Type</th>
                    <th className="p-3 border-b border-[#d5e5e3]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0d343c] font-mono">
                  {selectedTable === 'users' && userList.map((u) => (
                    <tr key={u.id} className="hover:bg-[#f4f8f7]/50">
                      <td className="p-3 text-[#00e5ff]">{u.id}</td>
                      <td className="p-3 text-[#061d21]">{u.email}</td>
                      <td className="p-3 text-amber-400">{u.role}</td>
                      <td className="p-3 text-[#4a6b72]">{u.joined || '2026-03-01'}</td>
                    </tr>
                  ))}
                  {selectedTable === 'payments' && transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-[#f4f8f7]/50">
                      <td className="p-3 text-[#00e5ff]">{t.id}</td>
                      <td className="p-3 text-[#061d21]">{t.user}</td>
                      <td className="p-3 text-emerald-400">{t.amount}</td>
                      <td className="p-3 text-[#4a6b72]">{t.date}</td>
                    </tr>
                  ))}
                  {(selectedTable === 'projects' || selectedTable === 'logs') && (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-[#4a6b72]">
                        No entries recorded for <span className="text-[#00e5ff]">{selectedTable}</span>.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MANAGE USERS */}
        {activeTab === 'users' && (
          <div className="bg-white border border-[#d5e5e3] rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#061d21]">Registered Users</h3>
              <span className="text-xs text-[#4a6b72] font-mono">{userList.length} Total</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f4f8f7] text-[#4a6b72] font-mono uppercase">
                  <tr>
                    <th className="p-3 border-b border-[#d5e5e3]">User</th>
                    <th className="p-3 border-b border-[#d5e5e3]">Role</th>
                    <th className="p-3 border-b border-[#d5e5e3]">Status</th>
                    <th className="p-3 border-b border-[#d5e5e3] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0d343c]">
                  {userList.map((u) => (
                    <tr key={u.id} className="hover:bg-[#f4f8f7]/50">
                      <td className="p-3">
                        <p className="font-semibold text-[#061d21]">{u.name || u.fullName || 'User'}</p>
                        <p className="text-[11px] text-[#4a6b72]">{u.email}</p>
                      </td>
                      <td className="p-3 font-mono text-[#00e5ff]">{u.role}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 text-[10px] rounded-full font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                          {u.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => setUserList(userList.filter(item => item.id !== u.id))}
                          className="px-2.5 py-1 bg-red-950/40 border border-red-800 text-red-400 hover:bg-red-800 hover:text-[#061d21] rounded text-[11px]"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="bg-white border border-[#d5e5e3] rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-semibold text-[#061d21]">Payment Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f4f8f7] text-[#4a6b72] font-mono uppercase">
                  <tr>
                    <th className="p-3 border-b border-[#d5e5e3]">ID</th>
                    <th className="p-3 border-b border-[#d5e5e3]">Payer</th>
                    <th className="p-3 border-b border-[#d5e5e3]">Amount</th>
                    <th className="p-3 border-b border-[#d5e5e3]">Gateway</th>
                    <th className="p-3 border-b border-[#d5e5e3]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0d343c] font-mono">
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="p-3 text-[#00e5ff]">{tx.id}</td>
                      <td className="p-3 text-[#061d21]">{tx.user}</td>
                      <td className="p-3 text-emerald-400 font-bold">{tx.amount}</td>
                      <td className="p-3 text-[#4a6b72]">{tx.gateway}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SYSTEM CONFIG */}
        {activeTab === 'config' && (
          <div className="bg-white border border-[#d5e5e3] rounded-xl p-6 space-y-6 max-w-3xl">
            <h3 className="text-lg font-semibold text-[#061d21] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#00e5ff]" />
              <span>Global System Settings</span>
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 bg-[#f4f8f7] rounded-lg border border-[#d5e5e3]">
                <div>
                  <p className="font-semibold text-[#061d21]">Maintenance Mode</p>
                  <p className="text-[#4a6b72] text-[11px]">Restrict public access for maintenance</p>
                </div>
                <button 
                  onClick={() => setSysConfig({...sysConfig, maintenanceMode: !sysConfig.maintenanceMode})}
                  className={`px-4 py-1.5 rounded font-mono text-xs font-bold transition ${
                    sysConfig.maintenanceMode ? 'bg-red-500 text-[#061d21]' : 'bg-[#0d343c] text-[#4a6b72]'
                  }`}
                >
                  {sysConfig.maintenanceMode ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-[#d5e5e3] rounded-xl p-6 max-w-3xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#d5e5e3]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-500 flex items-center justify-center text-2xl font-bold text-red-400">
                  {profile.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#061d21]">{profile.fullName}</h2>
                  <p className="text-xs text-red-400 font-mono">{profile.role}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10 text-xs font-semibold transition"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={(e) => { e.preventDefault(); setIsEditingProfile(false); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#4a6b72] mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.fullName} 
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})} 
                    className="w-full px-4 py-2.5 rounded bg-[#f4f8f7] border border-[#d5e5e3] text-[#061d21] focus:border-[#00e5ff] outline-none" 
                  />
                </div>
                <button type="submit" className="px-5 py-2.5 bg-[#00e5ff] text-[#031114] font-bold text-xs rounded hover:bg-[#33ebff]">
                  Save Profile
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-mono uppercase text-[#4a6b72] text-[10px]">Email Address</h4>
                  <p className="text-[#061d21] font-mono mt-1">{profile.email}</p>
                </div>
                <div>
                  <h4 className="font-mono uppercase text-[#4a6b72] text-[10px]">Institution</h4>
                  <p className="text-[#061d21] mt-1">{profile.institution}</p>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
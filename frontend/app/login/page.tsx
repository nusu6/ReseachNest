'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = Array.isArray(data.message) 
          ? data.message.join(', ') 
          : data.message || 'Invalid email or password.';
        throw new Error(errorMessage);
      }

      // 1. Extract and Normalize User Role
      const rawRole = data.user?.role || data.role || 'STUDENT';
      const userRole = String(rawRole).toUpperCase();

      // 2. Extract Auth Token
      const authToken = data.token || data.access_token || data.accessToken || data.data?.token;

      if (authToken) {
        localStorage.setItem('auth_token', authToken);
        document.cookie = `auth_token=${authToken}; path=/; max-age=86400; SameSite=Lax`;
      }

      // 3. Set Role in LocalStorage & Cookies
      localStorage.setItem('user_role', userRole);
      localStorage.setItem('user_info', JSON.stringify(data.user || { email: formData.email, role: userRole }));
      document.cookie = `user_role=${userRole}; path=/; max-age=86400; SameSite=Lax`;

      // 4. Map Target Dashboard Route
      const dashboardMap: Record<string, string> = {
        STUDENT: '/dashboard/student',
        FACULTY: '/dashboard/faculty',
        RESEARCHER: '/dashboard/researcher',
        ADMIN: '/dashboard/admin',
      };

      const targetDashboard = dashboardMap[userRole] || '/dashboard/student';

      // 5. Hard Redirect to load updated cookies in Middleware
      window.location.href = targetDashboard;

    } catch (err: any) {
      setError(err.message || 'Failed to authenticate. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#031114] text-[#e2f1f4] bg-grid-pattern flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-6">
          <div className="relative w-auto h-auto rounded overflow-hidden flex items-center justify-center">
            <Image src="/logo.png" alt="ResearchNest" width={40} height={40} className="object-contain" priority />
          </div>
          <span className="text-white font-bold tracking-tight text-xl font-sans">ResearchNest</span>
        </Link>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">Welcome back</h2>
        <p className="mt-2 text-sm text-[#7f9ca4]">Sign in to access your research workspace</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#04181c]/90 border border-[#0d343c] py-8 px-6 sm:px-10 rounded-xl shadow-2xl backdrop-blur-md">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#94aeb5] mb-2">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="name@university.edu" className="w-full px-4 py-3 rounded-lg bg-[#031114] border border-[#0d343c] text-white placeholder-[#395c64] focus:outline-none focus:border-[#00e5ff] transition" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#94aeb5]">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#00e5ff] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••••••••" className="w-full px-4 py-3 rounded-lg bg-[#031114] border border-[#0d343c] text-white placeholder-[#395c64] focus:outline-none focus:border-[#00e5ff] transition pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7f9ca4] hover:text-white">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-[#00e5ff] hover:bg-[#33ebff] text-[#031114] font-semibold text-sm rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.25)] disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</> : <><ArrowRight className="w-4 h-4" /> Sign In</>}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#7f9ca4]">Don't have an account? <Link href="/register" className="text-[#00e5ff] hover:underline font-medium">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
}
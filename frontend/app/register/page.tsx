'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  School, 
  Microscope, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2
} from 'lucide-react';

// Exact Enum values matching NestJS backend requirements
const ROLES = [
  { 
    id: 'STUDENT', 
    title: 'Student Researcher', 
    subtitle: 'Undergraduate, Master’s, or PhD', 
    icon: GraduationCap 
  },
  { 
    id: 'SUPERVISOR', // Updated from 'FACULTY' to match backend enum
    title: 'University Faculty / Supervisor', 
    subtitle: 'Professor, Lecturer, or Supervisor', 
    icon: School 
  },
  { 
    id: 'INDEPENDENT', 
    title: 'Independent / Industry Researcher', 
    subtitle: 'Lab Lead, R&D Specialist, Independent', 
    icon: Microscope 
  },
  
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'STUDENT', // Initialized to default role to prevent empty role submission
  });

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

    if (!formData.role) {
      setError('Please select a primary role before continuing.');
      setLoading(false);
      return;
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Construct payload compatible with standard NestJS DTOs (sending both 'name' and 'fullName')
    const payload = {
      //name: formData.fullName,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Formats NestJS validation error arrays into a readable string
        const errorMessage = Array.isArray(data.message) 
          ? data.message.join(', ') 
          : data.message || 'Registration failed due to invalid input.';
        throw new Error(errorMessage);
      }

      // Extract and Normalize User Role
      const rawRole = data.user?.role || data.role || formData.role;
      const userRole = String(rawRole).toUpperCase();

      // Extract Auth Token
      const authToken = data.token || data.access_token || data.accessToken || data.data?.token;

      if (authToken) {
        localStorage.setItem('auth_token', authToken);
        document.cookie = `auth_token=${authToken}; path=/; max-age=86400; SameSite=Lax`;
      }

      // Store User Context
      localStorage.setItem('user_role', userRole);
      localStorage.setItem('user_info', JSON.stringify(data.user || { name: formData.fullName, email: formData.email, role: userRole }));
      document.cookie = `user_role=${userRole}; path=/; max-age=86400; SameSite=Lax`;

      // Map Target Dashboard Route
      const dashboardMap: Record<string, string> = {
        STUDENT: '/dashboard/student',
        SUPERVISOR: '/dashboard/supervisor',
        INDEPENDENT: '/dashboard/researcher',
        ADMIN: '/dashboard/admin',
      };

      const targetDashboard = dashboardMap[userRole] || '/dashboard/student';
      window.location.href = targetDashboard;

    } catch (err: any) {
      setError(err.message || 'Could not connect to authentication service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#031114] text-[#e2f1f4] bg-grid-pattern flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-6">
          <div className="relative w-auto h-auto rounded overflow-hidden flex items-center justify-center">
            <Image src="/logo.png" alt="ResearchNest" width={40} height={40} className="object-contain" priority />
          </div>
          <span className="text-white font-bold tracking-tight text-xl font-sans">ResearchNest</span>
        </Link>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">Create your account</h2>
        <p className="mt-2 text-sm text-[#7f9ca4]">Join the unified ecosystem for research & publication</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-[#04181c]/90 border border-[#0d343c] py-8 px-6 sm:px-10 rounded-xl shadow-2xl backdrop-blur-md">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#94aeb5] mb-3">1. Select your primary role</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLES.map((role) => {
                  const Icon = role.icon;
                  const isSelected = formData.role === role.id;
                  return (
                    <button
                      type="button"
                      key={role.id}
                      onClick={() => setFormData({ ...formData, role: role.id })}
                      className={`p-4 rounded-lg border text-left transition relative flex flex-col justify-between ${
                        isSelected ? 'border-[#00e5ff] bg-[#00e5ff]/10 text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]' : 'border-[#0d343c] bg-[#031114]/60 text-[#7f9ca4] hover:border-[#00e5ff]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-3">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-[#00e5ff]' : 'text-[#7f9ca4]'}`} />
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00e5ff]" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-[#e2f1f4]'}`}>{role.title}</p>
                        <p className="text-[11px] text-[#698890] mt-1 leading-tight">{role.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#94aeb5]">2. Account details</label>
              <div>
                <label className="block text-xs text-[#7f9ca4] mb-1">Full Name</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Dr. Alex Vance" className="w-full px-4 py-3 rounded-lg bg-[#031114] border border-[#0d343c] text-white placeholder-[#395c64] focus:outline-none focus:border-[#00e5ff] transition" />
              </div>
              <div>
                <label className="block text-xs text-[#7f9ca4] mb-1">Academic / Work Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="alex.vance@university.edu" className="w-full px-4 py-3 rounded-lg bg-[#031114] border border-[#0d343c] text-white placeholder-[#395c64] focus:outline-none focus:border-[#00e5ff] transition" />
              </div>
              <div>
                <label className="block text-xs text-[#7f9ca4] mb-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" required minLength={8} value={formData.password} onChange={handleInputChange} placeholder="••••••••••••" className="w-full px-4 py-3 rounded-lg bg-[#031114] border border-[#0d343c] text-white placeholder-[#395c64] focus:outline-none focus:border-[#00e5ff] transition pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7f9ca4] hover:text-white">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-[#00e5ff] hover:bg-[#33ebff] text-[#031114] font-semibold text-sm rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.25)] disabled:opacity-50 disabled:cursor-not-allowed mt-6">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</> : <><ArrowRight className="w-4 h-4" /> Complete Registration</>}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#7f9ca4]">Already have an account? <Link href="/login" className="text-[#00e5ff] hover:underline font-medium">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
}
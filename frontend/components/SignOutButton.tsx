'use client';

import React, { useState } from 'react';
import { LogOut, Loader2, AlertTriangle, X } from 'lucide-react';

interface SignOutButtonProps {
  collapsed?: boolean;
  className?: string;
}

export default function SignOutButton({ collapsed = false, className = '' }: SignOutButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const token = localStorage.getItem('auth_token');

    if (token) {
      try {
        await fetch(`${backendUrl}/api/v1/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.warn('Backend logout call skipped/failed, proceeding with client cleanup.');
      }
    }

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_info');

    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;';
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;';

    window.location.href = '/';
  };

  return (
    <>
      {/* Sign Out Trigger Button with Hover Glow/Shadow Effect */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all duration-200 group hover:shadow-[0_0_18px_rgba(239,68,68,0.25)] hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.4)] ${className}`}
        title="Sign Out"
      >
        <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
        {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
      </button>

      {/* Full-Screen Centered Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-9999 w-screen h-screen flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div 
            className="w-full max-w-sm bg-white border border-[#d5e5e3] rounded-xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-[#061d21] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => !loading && setIsOpen(false)}
              className="absolute top-4 right-4 text-[#4a6b72] hover:text-[#061d21] transition"
              disabled={loading}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-950/60 border border-red-800/50 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-[#061d21] tracking-tight">
                  Sign out
                </h3>
                <p className="text-xs text-[#4a6b72]">Confirm session termination</p>
              </div>
            </div>

            <p className="text-sm text-[#4a6b72] mb-6 leading-relaxed">
              Are you sure you want to log out of ResearchNest?
            </p>

            {/* Modal Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="flex-1 py-2.5 px-4 rounded-lg border border-[#d5e5e3] bg-[#f4f8f7] text-sm font-medium text-[#4a6b72] hover:text-[#061d21] hover:border-[#164a55] transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="flex-1 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-[#061d21] text-sm font-medium transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.25)] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  'Sign Out'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
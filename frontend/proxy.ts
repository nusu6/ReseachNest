import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Map database roles to actual route folder paths
const ROLE_DASHBOARD_MAP: Record<string, string> = {
  STUDENT: '/dashboard/student',
  SUPERVISOR: '/dashboard/supervisor',
  INDEPENDENT: '/dashboard/researcher',
  ADMIN: '/dashboard/admin',
};

const getDashboardPath = (role: string | null): string => {
  if (!role || !ROLE_DASHBOARD_MAP[role]) {
    return '/dashboard/student';
  }
  return ROLE_DASHBOARD_MAP[role];
};

export function proxy(request: NextRequest) {
  // =========================================================================
  // 🚀 DEV MODE BYPASS
  // Set to 'true' while building Frontend UI. Allows visiting any route directly.
  // Set to 'false' to enable real authentication and role checks.
  // =========================================================================
  const IS_DEV_BYPASS = true;

  if (IS_DEV_BYPASS) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth_token')?.value;
  const rawRole = request.cookies.get('user_role')?.value;
  const role = rawRole ? rawRole.toUpperCase() : null;

  const { pathname } = request.nextUrl;

  // 1. Protect Dashboard Routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-Based Route Protection
    if (pathname.startsWith('/dashboard/supervisor') && role !== 'SUPERVISOR') {
      return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
    }

    if (pathname.startsWith('/dashboard/student') && role !== 'STUDENT') {
      return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
    }

    if (pathname.startsWith('/dashboard/researcher') && role !== 'INDEPENDENT') {
      return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
    }

    if (pathname.startsWith('/dashboard/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
    }
  }

  // 2. Redirect authenticated users away from Login/Register pages
  if ((pathname === '/login' || pathname === '/register') && token && role) {
    return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
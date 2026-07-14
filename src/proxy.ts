import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT';

export type RouteConfig = {
  exac: string[];
  patterns: RegExp[];
};

export const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

export const commonProtectedRoutes: RouteConfig = {
  exac: ['/my-profile', '/settings'],
  patterns: [],
};

export const doctorProtectedRoutes: RouteConfig = {
  exac: [],
  patterns: [/^\/doctor/], // Routes starting with /doctor/*
};

export const adminProtectedRoutes: RouteConfig = {
  exac: [],
  patterns: [/^\/admin/], // Routes starting with /admin/*
};

export const patientProtectedRoutes: RouteConfig = {
  exac: [],
  patterns: [/^\/dashboard/], // Routes starting with "/dashboard/*"
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exac.includes(pathname)) return true;
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string
): 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'COMMON' | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return 'ADMIN';
  if (isRouteMatches(pathname, doctorProtectedRoutes)) return 'DOCTOR';
  if (isRouteMatches(pathname, patientProtectedRoutes)) return 'PATIENT';
  if (isRouteMatches(pathname, commonProtectedRoutes)) return 'COMMON';
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === 'ADMIN') return '/admin/dashboard';
  if (role === 'DOCTOR') return '/doctor/dashboard';
  if (role === 'PATIENT') return '/dashboard';
  return '/';
};

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get('accessToken')?.value || null;

  let userRole: UserRole | null = null;

  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as Secret
    );

    if (typeof verifiedToken === 'string') {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    userRole = verifiedToken.role;
  }

  const routeOwner = getRouteOwner(pathname);
  //path = /doctor/appointments => "DOCTOR"
  //path = /my-profile => "COMMON"
  //path = /login => null

  const isAuth = isAuthRoute(pathname);

  // Rule 1 : User is logged in and trying to access auth route. Redirect to default dashboard
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  // Rule 2 : User is trying to access open public route
  if (routeOwner === null) return NextResponse.next();

  console.log('ROUTE OWNER', routeOwner);
  console.log('USER ROLE', userRole);

  // Rule 1 & 2 for open public routes and auth routes
  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rule 3 : User is trying to access common protected route
  if (routeOwner === 'COMMON') return NextResponse.next();

  // Rule 4 : User is trying to access role based protected route
  if (routeOwner === 'ADMIN' || routeOwner === 'DOCTOR' || routeOwner === 'PATIENT') {
    if (routeOwner !== userRole)
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

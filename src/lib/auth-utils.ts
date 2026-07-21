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

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === 'COMMON') return true;
  if (routeOwner === role) return true;

  return false;
};

import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth-utils';
import { deleteCookie } from './services/auth/tokenHandler';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get('accessToken')?.value || null;

  let userRole: UserRole | null = null;

  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as Secret
    );

    if (typeof verifiedToken === 'string') {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
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

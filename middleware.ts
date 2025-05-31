import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/', '/login', '/email-verification', '/verify-email']

// List of protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/my-courses',
  '/badges',
  '/leaderboard',
  '/shop'
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname === route)

  // If it's a protected route and there's no token, redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // If user is logged in and tries to access login page, redirect to home
  if (isPublicRoute && token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If we have a token in the authorization header, add it to the response headers
  // This ensures the token is available to the client
  const response = NextResponse.next()
  if (token && !request.cookies.get('token')) {
    response.headers.set('x-auth-token', token)
  }

  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 
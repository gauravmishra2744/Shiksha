import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access teacher routes
    if (req.nextUrl.pathname.startsWith('/teacher/dashboard')) {
      // Ensure user has teacher role
      if (req.nextauth.token?.role !== 'TEACHER') {
        return NextResponse.redirect(new URL('/teacher/login', req.url))
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public auth pages
        if (
          req.nextUrl.pathname.startsWith('/teacher/login') ||
          req.nextUrl.pathname.startsWith('/teacher/register') ||
          req.nextUrl.pathname.startsWith('/teacher/forgot-password') ||
          req.nextUrl.pathname.startsWith('/teacher/reset-password')
        ) {
          return true
        }
        
        // Require authentication for protected routes
        if (req.nextUrl.pathname.startsWith('/teacher/dashboard')) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/teacher/:path*']
}
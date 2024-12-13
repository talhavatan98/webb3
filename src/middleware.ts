import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of allowed IP addresses (you would configure this with your IP)
const ALLOWED_IPS = ['127.0.0.1', 'YOUR_IP_HERE']

// Security headers
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}

export function middleware(request: NextRequest) {
  // Only apply to /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get client IP from headers
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIP = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1'
    const isAllowedIP = ALLOWED_IPS.includes(clientIP)

    // If IP is not allowed, redirect to 404
    if (!isAllowedIP) {
      return NextResponse.redirect(new URL('/404', request.url))
    }

    // Apply security headers
    const response = NextResponse.next()
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    // Add additional security measures
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    response.headers.set('Clear-Site-Data', '"cache", "cookies", "storage"')

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}

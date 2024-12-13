import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Rate limiting configuration
const RATE_LIMIT = 100 // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds

// Simple in-memory store for rate limiting
const rateLimitStore = new Map<string, { count: number; timestamp: number }>()

// Clean up old rate limit entries
setInterval(() => {
  const now = Date.now()
  rateLimitStore.forEach((data, ip) => {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitStore.delete(ip)
    }
  })
}, RATE_LIMIT_WINDOW)

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1'
}

// Helper function to validate request origin
async function validateOrigin(request: NextRequest): Promise<boolean> {
  const headersList = await headers()
  const origin = headersList.get('origin')
  return origin ? origin.includes(request.nextUrl.hostname) : false
}

// Helper function to check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const rateData = rateLimitStore.get(ip) || { count: 0, timestamp: now }
  
  if (now - rateData.timestamp > RATE_LIMIT_WINDOW) {
    rateData.count = 1
    rateData.timestamp = now
  } else {
    rateData.count++
    if (rateData.count > RATE_LIMIT) {
      return false
    }
  }
  rateLimitStore.set(ip, rateData)
  return true
}

// Mock data for demonstration purposes
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', status: 'active', joinDate: new Date().toISOString(), lastLogin: new Date().toISOString(), orderCount: 5 },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', status: 'inactive', joinDate: new Date().toISOString(), lastLogin: new Date().toISOString(), orderCount: 2 },
];

const mockBlogPosts = [
    { id: '1', title: 'First Blog Post', content: 'This is the first blog post.', author: 'John Doe', categories: ['technology'], tags: ['tech', 'blog'], status: 'published', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', title: 'Second Blog Post', content: 'This is the second blog post.', author: 'Jane Smith', categories: ['health'], tags: ['health', 'blog'], status: 'draft', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const mockProducts = [
    { id: '1', name: 'Product 1', description: 'This is product 1', price: 10, stock: 100, categories: ['category1'], labels: ['label1'], variations: [], status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', name: 'Product 2', description: 'This is product 2', price: 20, stock: 50, categories: ['category2'], labels: ['label2'], variations: [], status: 'inactive', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const mockOrders = [
    { id: '1', userId: '1', products: [], totalAmount: 100, status: 'pending', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', userId: '2', products: [], totalAmount: 200, status: 'shipped', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];


export async function GET(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    
    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Origin validation
    if (!await validateOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      )
    }

    const url = new URL(request.url)
    const pathname = url.pathname;

    if (pathname === '/api/admin/users') {
        return NextResponse.json(mockUsers);
    } else if (pathname === '/api/admin/blog') {
        return NextResponse.json(mockBlogPosts);
    } else if (pathname === '/api/admin/products') {
        return NextResponse.json(mockProducts);
    } else if (pathname === '/api/admin/orders') {
        return NextResponse.json(mockOrders);
    }

    // Security headers
    const response = NextResponse.json({ status: 'success' })
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Content-Security-Policy', "default-src 'self'")
    
    return response

  } catch (error) {
    console.error('Admin API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    
    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Origin validation
    if (!await validateOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      )
    }

    // Validate content type
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    
    // Validate request body (example validation)
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // Security headers
    const response = NextResponse.json({ status: 'success' })
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Content-Security-Policy', "default-src 'self'")
    
    return response

  } catch (error) {
    console.error('Admin API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 204 })
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400') // 24 hours
  
  return response
}

import crypto from 'crypto'

// Function to validate and sanitize input
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

// Function to validate API requests
export function validateRequest(headers: Headers): boolean {
  const requiredHeaders = ['x-requested-with', 'content-type']
  return requiredHeaders.every(header => headers.has(header))
}

// Function to generate secure random tokens
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

// Function to validate and sanitize file uploads
export function validateFileUpload(file: File): {
  isValid: boolean
  error?: string
} {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Allowed types: JPEG, PNG, GIF, PDF'
    }
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size exceeds 5MB limit'
    }
  }

  return { isValid: true }
}

// Function to detect and prevent common attack patterns
export function detectMaliciousPatterns(input: string): {
  isSafe: boolean
  error?: string
} {
  const maliciousPatterns = [
    {
      pattern: /(<script|javascript:|data:text\/html)/i,
      message: 'Potential XSS attack detected'
    },
    {
      pattern: /(union|select|insert|drop|delete|update)\s+/i,
      message: 'Potential SQL injection detected'
    },
    {
      pattern: /\.\.\//g,
      message: 'Directory traversal attempt detected'
    },
    {
      pattern: /(exec|system|eval)\(/i,
      message: 'Potential command injection detected'
    }
  ]

  for (const { pattern, message } of maliciousPatterns) {
    if (pattern.test(input)) {
      return {
        isSafe: false,
        error: message
      }
    }
  }

  return { isSafe: true }
}

// Rate limiting class with improved memory management
export class RateLimiter {
  private store: Map<string, { count: number; timestamp: number }>
  private limit: number
  private windowMs: number

  constructor(limit: number, windowMs: number) {
    this.store = new Map()
    this.limit = limit
    this.windowMs = windowMs

    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000)
  }

  check(key: string): boolean {
    const now = Date.now()
    const record = this.store.get(key) || { count: 0, timestamp: now }

    if (now - record.timestamp > this.windowMs) {
      record.count = 1
      record.timestamp = now
    } else {
      record.count++
      if (record.count > this.limit) {
        return false
      }
    }

    this.store.set(key, record)
    return true
  }

  private cleanup(): void {
    const now = Date.now()
    this.store.forEach((record, key) => {
      if (now - record.timestamp > this.windowMs) {
        this.store.delete(key)
      }
    })
  }
}

// Function to validate and sanitize URLs
export function validateURL(url: string): {
  isValid: boolean
  error?: string
} {
  try {
    const parsedURL = new URL(url)
    const allowedProtocols = ['http:', 'https:']
    
    if (!allowedProtocols.includes(parsedURL.protocol)) {
      return {
        isValid: false,
        error: 'Invalid protocol. Only HTTP and HTTPS are allowed'
      }
    }

    return { isValid: true }
  } catch {
    return {
      isValid: false,
      error: 'Invalid URL format'
    }
  }
}

// Function to generate secure response headers
export function getSecureHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; script-src 'self'",
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  }
}

// Function to validate and sanitize JSON data
export function validateJSON(data: unknown): {
  isValid: boolean
  error?: string
  sanitizedData?: unknown
} {
  try {
    if (typeof data !== 'object' || data === null) {
      return {
        isValid: false,
        error: 'Invalid JSON data'
      }
    }

    // Deep clone and sanitize object
    const sanitizedData = JSON.parse(JSON.stringify(data, (key, value) => {
      if (typeof value === 'string') {
        return sanitizeInput(value)
      }
      return value
    }))

    return {
      isValid: true,
      sanitizedData
    }
  } catch (error) {
    return {
      isValid: false,
      error: 'Error processing JSON data'
    }
  }
}

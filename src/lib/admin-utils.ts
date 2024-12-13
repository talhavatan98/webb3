import { adminConfig } from '@/config/admin'
import { RateLimiter, validateJSON, detectMaliciousPatterns } from '@/lib/security'

// Initialize rate limiter
const rateLimiter = new RateLimiter(
  adminConfig.security.rateLimiting.maxRequests,
  adminConfig.security.rateLimiting.windowMs
)

// Type definitions
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface MetricsData {
  cpu: number
  memory: number
  disk: number
  uptime: number
  activeConnections: number
  responseTime: number
}

type AdminEndpoint = typeof adminConfig.api.endpoints[keyof typeof adminConfig.api.endpoints]
type AllowedFileType = typeof adminConfig.security.fileUploads.allowedTypes[number]

type RequiredMetaTags = {
  title: string
  'og:title': string
  description: string
  'og:description': string
  viewport: string
  robots: string
}

type OptionalMetaTags = {
  'og:image': string
  'twitter:image': string
  'og:image:width': string
  'og:image:height': string
}

type MetaTags = RequiredMetaTags & Partial<OptionalMetaTags>

// API request wrapper with security checks
export async function secureApiRequest<T>(
  endpoint: AdminEndpoint,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Rate limiting check
    const clientId = 'admin-panel' // You might want to make this more unique
    if (!rateLimiter.check(clientId)) {
      throw new Error('Rate limit exceeded')
    }

    // Add security headers
    const headers = new Headers(options.headers)
    headers.set('X-Requested-With', 'XMLHttpRequest')

    // Make request
    const response = await fetch(`${adminConfig.api.baseUrl}${endpoint}`, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }

  } catch (error) {
    console.error('API Request Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Format bytes to human readable string
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

// Format duration to human readable string
export function formatDuration(seconds: number): string {
  const days = Math.floor(seconds / (24 * 60 * 60))
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((seconds % (60 * 60)) / 60)
  const remainingSeconds = seconds % 60

  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`)

  return parts.join(' ')
}

// Validate and process file upload
export async function processFileUpload(
  file: File
): Promise<{ url: string } | { error: string }> {
  // Check file size
  if (file.size > adminConfig.security.fileUploads.maxSize) {
    return { error: `File size exceeds ${formatBytes(adminConfig.security.fileUploads.maxSize)}` }
  }

  // Check file type
  if (!adminConfig.security.fileUploads.allowedTypes.includes(file.type as AllowedFileType)) {
    return { error: 'File type not allowed' }
  }

  // Process file upload (implement your upload logic here)
  try {
    // This is a placeholder - implement your actual file upload logic
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return { url: data.url }

  } catch (error) {
    return { error: 'File upload failed' }
  }
}

// Get status color based on value and thresholds
export function getStatusColor(
  value: string,
  warningThreshold?: number,
  criticalThreshold?: number
): string {
  switch (value) {
    case 'active':
      return 'text-green-600 bg-green-100'
    case 'inactive':
    case 'cancelled':
    case 'expired':
      return 'text-gray-600 bg-gray-100'
    case 'suspended':
      return 'text-red-600 bg-red-100'
    case 'open':
      return 'text-blue-600 bg-blue-100'
    case 'in_progress':
      return 'text-yellow-600 bg-yellow-100'
    case 'resolved':
      return 'text-green-600 bg-green-100'
    case 'draft':
      return 'text-gray-400 bg-gray-100'
    case 'published':
      return 'text-green-600 bg-green-100'
    case 'scheduled':
      return 'text-blue-600 bg-blue-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

// Validate and sanitize blog post content
export function validateBlogPost(content: string): {
  isValid: boolean
  error?: string
  sanitizedContent?: string
} {
  // Check for malicious patterns
  const securityCheck = detectMaliciousPatterns(content)
  if (!securityCheck.isSafe) {
    return { isValid: false, error: securityCheck.error }
  }

  // Validate allowed HTML tags
  const allowedTagsPattern = new RegExp(
    `<(?!\\/?(?:${adminConfig.blog.posts.allowedTags.join('|')})\\b)[^>]+>`,
    'gi'
  )

  const hasDisallowedTags = allowedTagsPattern.test(content)
  if (hasDisallowedTags) {
    return { isValid: false, error: 'Content contains disallowed HTML tags' }
  }

  // Sanitize content (implement more thorough sanitization if needed)
  const sanitizedContent = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '')

  return {
    isValid: true,
    sanitizedContent
  }
}

// Generate SEO meta tags
export function generateMetaTags(
  title: string,
  description: string,
  image?: string
): MetaTags {
  const metaTags: MetaTags = {
    ...adminConfig.seo.defaultMetaTags,
    title: title ? `${title} | Admin Panel` : 'Admin Panel',
    'og:title': title,
    'description': description,
    'og:description': description
  }

  if (image) {
    metaTags['og:image'] = image
    metaTags['twitter:image'] = image
    metaTags['og:image:width'] = String(adminConfig.seo.socialMedia.image.width)
    metaTags['og:image:height'] = String(adminConfig.seo.socialMedia.image.height)
  }

  return metaTags
}

// Parse and validate JSON safely
export function safeJSONParse<T>(json: string): { data?: T; error?: string } {
  try {
    const parsed = JSON.parse(json)
    const validation = validateJSON(parsed)
    
    if (!validation.isValid) {
      return { error: validation.error }
    }

    return { data: validation.sanitizedData as T }
  } catch (error) {
    return { error: 'Invalid JSON format' }
  }
}

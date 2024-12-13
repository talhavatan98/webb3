export const adminConfig = {
  // API Endpoints
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    endpoints: {
      maintenance: '/admin/maintenance',
      serverStatus: '/admin/server-status',
      logs: '/admin/logs',
      backup: '/admin/backup',
      settings: '/admin/settings',
      campaigns: '/admin/campaigns',
      users: '/admin/users',
      blog: '/admin/blog',
      products: '/admin/products',
      orders: '/admin/orders'
    }
  },

  // Security Settings
  security: {
    rateLimiting: {
      maxRequests: 100,
      windowMs: 60 * 1000 // 1 minute
    },
    fileUploads: {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    },
    cors: {
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }
  },

  // Maintenance Mode Settings
  maintenance: {
    allowedIPs: process.env.MAINTENANCE_ALLOWED_IPS?.split(',') || ['127.0.0.1'],
    defaultMessage: 'Site is under maintenance. Please check back soon.'
  },

  // Backup Settings
  backup: {
    schedule: {
      frequency: 'daily', // 'hourly' | 'daily' | 'weekly' | 'monthly'
      time: '00:00', // 24-hour format
      retentionDays: 30
    },
    storage: {
      provider: 'local', // 'local' | 's3' | 'gcs'
      path: './backups'
    }
  },

  // Monitoring Settings
  monitoring: {
    metrics: {
      collection: {
        interval: 60 * 1000, // 1 minute
        retention: 30 * 24 * 60 * 60 * 1000 // 30 days
      },
      alerts: {
        cpu: {
          warning: 70, // percentage
          critical: 90
        },
        memory: {
          warning: 70,
          critical: 90
        },
        disk: {
          warning: 70,
          critical: 90
        }
      }
    },
    logs: {
      level: process.env.LOG_LEVEL || 'info',
      retention: 7, // days
      maxSize: 10 * 1024 * 1024 // 10MB
    }
  },

  // Campaign Settings
  campaigns: {
    types: ['discount', 'special', 'seasonal'],
    maxActivePerType: 5,
    discountLimits: {
      percentage: {
        min: 1,
        max: 99
      },
      fixed: {
        min: 1,
        max: 1000
      }
    }
  },

  // User Management Settings
  users: {
    roles: ['admin', 'manager', 'editor', 'viewer'],
    permissions: {
      admin: ['all'],
      manager: ['read', 'write', 'delete'],
      editor: ['read', 'write'],
      viewer: ['read']
    },
    session: {
      duration: 24 * 60 * 60 * 1000, // 24 hours
      renewalThreshold: 1 * 60 * 60 * 1000 // 1 hour
    }
  },

  // Blog Management Settings
  blog: {
    posts: {
      perPage: 10,
      excerptLength: 150,
      allowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'img'],
      media: {
        maxImages: 10,
        thumbnailSizes: {
          small: { width: 300, height: 200 },
          medium: { width: 600, height: 400 },
          large: { width: 900, height: 600 }
        }
      }
    },
    categories: {
      maxDepth: 3,
      maxPerLevel: 10
    }
  },

  // SEO Settings
  seo: {
    titleTemplate: '%s | Admin Panel',
    defaultMetaTags: {
      viewport: 'width=device-width, initial-scale=1',
      robots: 'noindex, nofollow'
    },
    socialMedia: {
      image: {
        width: 1200,
        height: 630
      }
    }
  },

  // UI Settings
  ui: {
    theme: {
      colors: {
        primary: '#2563eb',
        secondary: '#4b5563',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        background: '#f3f4f6'
      },
      spacing: {
        sidebar: '280px',
        header: '64px'
      }
    },
    pagination: {
      itemsPerPage: [10, 25, 50, 100],
      defaultItemsPerPage: 25
    },
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    notifications: {
      position: 'top-right',
      duration: 5000
    }
  }
} as const

export type AdminConfig = typeof adminConfig

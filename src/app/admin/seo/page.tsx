'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/contexts/AdminContext'
import { secureApiRequest, generateMetaTags } from '@/lib/admin-utils'
import { adminConfig } from '@/config/admin'

interface SEOSettings {
  siteTitle: string
  siteDescription: string
  defaultKeywords: string
  socialMediaImage: string
  blogPostTitle: string
  blogPostDescription: string
}

export default function SEOSettingsPage() {
  const { showNotification } = useAdmin()
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    siteTitle: '',
    siteDescription: '',
    defaultKeywords: '',
    socialMediaImage: '',
    blogPostTitle: '',
    blogPostDescription: ''
  })

  const fetchSEOSettings = async () => {
    try {
      const response = await secureApiRequest<SEOSettings>(adminConfig.api.endpoints.settings as any)
      if (response.success && response.data) {
        setSeoSettings(response.data)
      } else {
        showNotification('error', 'Failed to fetch SEO settings')
      }
    } catch (error) {
      showNotification('error', 'Failed to fetch SEO settings')
    }
  }

  useEffect(() => {
    fetchSEOSettings()
  }, [])

  const saveSettings = async () => {
    try {
      const response = await secureApiRequest<{ message: string }>(adminConfig.api.endpoints.settings as any, {
        method: 'POST',
        body: JSON.stringify(seoSettings)
      })
      if (response.success) {
        showNotification('success', 'SEO settings saved')
      } else {
        showNotification('error', 'Failed to save SEO settings')
      }
    } catch (error) {
      showNotification('error', 'Failed to save SEO settings')
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">SEO & Meta Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Title
          </label>
          <input
            type="text"
            value={seoSettings.siteTitle}
            onChange={(e) => setSeoSettings({ ...seoSettings, siteTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Description
          </label>
          <textarea
            value={seoSettings.siteDescription}
            onChange={(e) => setSeoSettings({ ...seoSettings, siteDescription: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Keywords
          </label>
          <input
            type="text"
            value={seoSettings.defaultKeywords}
            onChange={(e) => setSeoSettings({ ...seoSettings, defaultKeywords: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Media Image URL
          </label>
          <input
            type="url"
            value={seoSettings.socialMediaImage}
            onChange={(e) => setSeoSettings({ ...seoSettings, socialMediaImage: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Blog Post Defaults</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Post Title Template
          </label>
          <input
            type="text"
            value={seoSettings.blogPostTitle}
            onChange={(e) => setSeoSettings({ ...seoSettings, blogPostTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Post Description Template
          </label>
          <textarea
            value={seoSettings.blogPostDescription}
            onChange={(e) => setSeoSettings({ ...seoSettings, blogPostDescription: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { AdminProvider } from '@/contexts/AdminContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin Panel for managing the website',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold">Admin Panel</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm min-h-screen">
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <a href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/admin/maintenance" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Maintenance Mode
                  </a>
                </li>
                <li>
                  <a href="/admin/server-status" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Server Status
                  </a>
                </li>
                <li>
                  <a href="/admin/logs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Error Logs
                  </a>
                </li>
                <li>
                  <a href="/admin/backup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Backup & Update
                  </a>
                </li>
                <li>
                  <a href="/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Site Settings
                  </a>
                </li>
                <li>
                  <a href="/admin/campaigns" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Campaign Management
                  </a>
                </li>
                <li>
                  <a href="/admin/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    User Management
                  </a>
                </li>
                <li>
                  <a href="/admin/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    Blog Management
                  </a>
                </li>
                <li>
                  <a href="/admin/ecommerce" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    E-Commerce
                  </a>
                </li>
                 <li>
                  <a href="/admin/seo" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                    SEO Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 p-8">
            {children}
          </div>
        </div>
      </div>
    </AdminProvider>
  )
}

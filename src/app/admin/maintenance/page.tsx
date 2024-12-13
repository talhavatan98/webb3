'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/contexts/AdminContext'

export default function MaintenancePage() {
  const { maintenanceMode, toggleMaintenanceMode, showNotification } = useAdmin()
  const [scheduledMaintenance, setScheduledMaintenance] = useState(false)
  const [maintenanceMessage, setMaintenanceMessage] = useState('')
  const [scheduledDate, setScheduledDate] = useState('')
  const [allowedIPs, setAllowedIPs] = useState('')

  useEffect(() => {
    // Load settings from API or local storage
    setMaintenanceMessage('Site is under maintenance. Please check back soon.')
    setAllowedIPs('127.0.0.1')
  }, [])

  const saveSettings = () => {
    // Here we would make an API call to save the maintenance settings
    showNotification('success', 'Maintenance settings saved')
    console.log({
      maintenanceMode,
      scheduledMaintenance,
      maintenanceMessage,
      scheduledDate,
      allowedIPs
    })
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Maintenance Mode Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Maintenance Mode</h2>
            <button
              onClick={toggleMaintenanceMode}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            When enabled, your site will display a maintenance message to visitors
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maintenance Message
          </label>
          <textarea
            value={maintenanceMessage}
            onChange={(e) => setMaintenanceMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Enter the message to display to visitors during maintenance..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Allowed IP Addresses
          </label>
          <input
            type="text"
            value={allowedIPs}
            onChange={(e) => setAllowedIPs(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter IP addresses separated by commas"
          />
          <p className="text-sm text-gray-500 mt-1">
            These IPs will still be able to access the site during maintenance
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={scheduledMaintenance}
              onChange={(e) => setScheduledMaintenance(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Schedule Maintenance
            </label>
          </div>
          {scheduledMaintenance && (
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          )}
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

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Maintenance History</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Scheduled Maintenance</p>
                <p className="text-sm text-gray-500">Duration: 2 hours</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded">
                Completed
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Last maintenance performed on: 2023-12-01 15:00:00
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

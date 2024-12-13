'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/contexts/AdminContext'
import { secureApiRequest, formatBytes, getStatusColor } from '@/lib/admin-utils'
import { adminConfig } from '@/config/admin'

interface Backup {
  id: string
  timestamp: string
  size: string
  type: 'full' | 'incremental'
  status: 'completed' | 'in_progress' | 'failed'
  location: string
}

interface Update {
  id: string
  version: string
  releaseDate: string
  type: 'security' | 'feature' | 'bugfix'
  status: 'available' | 'installed' | 'failed'
  description: string
}

export default function BackupAndUpdatePage() {
  const { showNotification } = useAdmin()
  const [backups, setBackups] = useState<Backup[]>([])
  const [updates, setUpdates] = useState<Update[]>([])
  const [backupInProgress, setBackupInProgress] = useState(false)
  const [updateInProgress, setUpdateInProgress] = useState(false)
  const [backupSchedule, setBackupSchedule] = useState('daily')
  const [retentionPeriod, setRetentionPeriod] = useState('30')

  const fetchBackups = async () => {
    try {
      const response = await secureApiRequest<Backup[]>(adminConfig.api.endpoints.backup)
      if (response.success && response.data) {
        setBackups(response.data)
      } else {
        showNotification('error', 'Failed to fetch backups')
      }
    } catch (error) {
      showNotification('error', 'Failed to fetch backups')
    }
  }

  const fetchUpdates = async () => {
    try {
      const response = await secureApiRequest<Update[]>(adminConfig.api.endpoints.backup)
      if (response.success && response.data) {
        setUpdates(response.data)
      } else {
        showNotification('error', 'Failed to fetch updates')
      }
    } catch (error) {
      showNotification('error', 'Failed to fetch updates')
    }
  }

  useEffect(() => {
    fetchBackups()
    fetchUpdates()
  }, [])

  const startBackup = async () => {
    setBackupInProgress(true)
    try {
      const response = await secureApiRequest<{ message: string }>(adminConfig.api.endpoints.backup, { method: 'POST' })
      if (response.success) {
        showNotification('success', 'Backup started successfully')
        fetchBackups()
      } else {
        showNotification('error', 'Failed to start backup')
      }
    } catch (error) {
      showNotification('error', 'Failed to start backup')
    } finally {
      setBackupInProgress(false)
    }
  }

  const startUpdate = async (updateId: string) => {
    setUpdateInProgress(true)
    try {
      const response = await secureApiRequest<{ message: string }>(`${adminConfig.api.endpoints.backup}/${updateId}` as any, { method: 'POST' })
      if (response.success) {
        showNotification('success', 'Update started successfully')
        fetchUpdates()
      } else {
        showNotification('error', 'Failed to start update')
      }
    } catch (error) {
      showNotification('error', 'Failed to start update')
    } finally {
      setUpdateInProgress(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'installed':
        return 'text-green-600 bg-green-100'
      case 'in_progress':
      case 'available':
        return 'text-blue-600 bg-blue-100'
      case 'failed':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-8">Backup & Update Management</h1>

      {/* Backup Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Backup Management</h2>
          <button
            onClick={startBackup}
            disabled={backupInProgress}
            className={`px-4 py-2 rounded-md text-white ${
              backupInProgress ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {backupInProgress ? 'Backup in Progress...' : 'Start New Backup'}
          </button>
        </div>

        {/* Backup Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backup Schedule
            </label>
            <select
              value={backupSchedule}
              onChange={(e) => setBackupSchedule(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="hourly">Every Hour</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retention Period (days)
            </label>
            <input
              type="number"
              value={retentionPeriod}
              onChange={(e) => setRetentionPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Backup History */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups.map((backup) => (
                <tr key={backup.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(backup.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {backup.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatBytes(parseInt(backup.size))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backup.status)}`}>
                      {backup.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      Download
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-6">System Updates</h2>
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">Version {update.version}</h3>
                  <p className="text-sm text-gray-500">Released: {update.releaseDate}</p>
                  <p className="mt-2">{update.description}</p>
                  <span className={`mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(update.status)}`}>
                    {update.status}
                  </span>
                </div>
                {update.status === 'available' && (
                  <button
                    onClick={() => startUpdate(update.id)}
                    disabled={updateInProgress}
                    className={`px-4 py-2 rounded-md text-white ${
                      updateInProgress ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {updateInProgress ? 'Updating...' : 'Install Update'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

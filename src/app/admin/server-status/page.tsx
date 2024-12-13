'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/contexts/AdminContext'
import { secureApiRequest, formatDuration, MetricsData, getStatusColor } from '@/lib/admin-utils'
import { adminConfig } from '@/config/admin'

export default function ServerStatusPage() {
  const { serverStatus, checkServerStatus } = useAdmin()
  const [metrics, setMetrics] = useState<MetricsData>({
    cpu: 0,
    memory: 0,
    disk: 0,
    uptime: 0,
    activeConnections: 0,
    responseTime: 0
  })

  const [logs, setLogs] = useState<string[]>([])
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h')

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await secureApiRequest<MetricsData>(adminConfig.api.endpoints.serverStatus)
        if (response.success && response.data) {
          setMetrics(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch server metrics', error)
      }
    }

    fetchMetrics()
    checkServerStatus()
  }, [checkServerStatus])

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Server Status</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {/* Refresh metrics */}}
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* CPU Usage */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">CPU Usage</h3>
          <div className="flex items-end space-x-2">
            <span className="text-2xl font-bold">{metrics.cpu}%</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${metrics.cpu}%` }}
              />
            </div>
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Memory Usage</h3>
          <div className="flex items-end space-x-2">
            <span className="text-2xl font-bold">{metrics.memory}%</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 rounded-full h-2"
                style={{ width: `${metrics.memory}%` }}
              />
            </div>
          </div>
        </div>

        {/* Disk Usage */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Disk Usage</h3>
          <div className="flex items-end space-x-2">
            <span className="text-2xl font-bold">{metrics.disk}%</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-600 rounded-full h-2"
                style={{ width: `${metrics.disk}%` }}
              />
            </div>
          </div>
        </div>

        {/* Uptime */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Server Uptime</h3>
          <p className="text-2xl font-bold">{formatDuration(metrics.uptime)}</p>
        </div>

        {/* Active Connections */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Connections</h3>
          <p className="text-2xl font-bold">{metrics.activeConnections}</p>
        </div>

        {/* Response Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Response Time</h3>
          <p className="text-2xl font-bold">{metrics.responseTime}ms</p>
        </div>
      </div>

      {/* Server Logs */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Server Logs</h2>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm h-96 overflow-auto">
          {logs.map((log, index) => (
            <div key={index} className="mb-1">
              {log}
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-500">No logs available</div>
          )}
        </div>
      </div>

      {/* Health Checks */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Service Health</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Database Connection</h3>
              <p className="text-sm text-gray-500">Primary Database</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(100, 80, 95)}`}>
              Healthy
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Cache Server</h3>
              <p className="text-sm text-gray-500">Redis</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(90, 70, 85)}`}>
              Healthy
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">File Storage</h3>
              <p className="text-sm text-gray-500">S3 Compatible Storage</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(75, 60, 80)}`}>
              Healthy
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

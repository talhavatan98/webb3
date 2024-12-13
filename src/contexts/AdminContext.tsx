'use client'

import React, { createContext, useContext, useReducer, useCallback } from 'react'
import { secureApiRequest, ApiResponse } from '@/lib/admin-utils'
import { adminConfig } from '@/config/admin'

// Types
type UserRole = 'admin' | 'manager' | 'editor' | 'viewer'
type Permission = 'all' | 'read' | 'write' | 'delete'

interface AdminState {
  maintenanceMode: boolean
  serverStatus: {
    isOnline: boolean
    lastChecked: string | null
  }
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
  }>
  currentUser: {
    role: UserRole
    permissions: Permission[]
  } | null
}

type AdminAction =
  | { type: 'SET_MAINTENANCE_MODE'; payload: boolean }
  | { type: 'SET_SERVER_STATUS'; payload: { isOnline: boolean } }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<AdminState['notifications'][0], 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_CURRENT_USER'; payload: AdminState['currentUser'] }

interface AdminContextType extends AdminState {
  toggleMaintenanceMode: () => Promise<void>
  checkServerStatus: () => Promise<void>
  showNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void
  dismissNotification: (id: string) => void
  hasPermission: (permission: Permission) => boolean
}

// Initial state
const initialState: AdminState = {
  maintenanceMode: false,
  serverStatus: {
    isOnline: true,
    lastChecked: null
  },
  notifications: [],
  currentUser: null
}

// Reducer
function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_MAINTENANCE_MODE':
      return {
        ...state,
        maintenanceMode: action.payload
      }
    case 'SET_SERVER_STATUS':
      return {
        ...state,
        serverStatus: {
          isOnline: action.payload.isOnline,
          lastChecked: new Date().toISOString()
        }
      }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: crypto.randomUUID(),
            ...action.payload
          }
        ]
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}

// Context
const AdminContext = createContext<AdminContextType | null>(null)

// Provider Component
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState)

  // Toggle maintenance mode
  const toggleMaintenanceMode = useCallback(async () => {
    try {
      const response = await secureApiRequest<{ enabled: boolean }>(
        adminConfig.api.endpoints.maintenance,
        {
          method: 'POST',
          body: JSON.stringify({ enabled: !state.maintenanceMode })
        }
      )

      if (response.success && response.data) {
        dispatch({ type: 'SET_MAINTENANCE_MODE', payload: response.data.enabled })
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'success',
            message: `Maintenance mode ${response.data.enabled ? 'enabled' : 'disabled'}`
          }
        })
      }
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'error',
          message: 'Failed to toggle maintenance mode'
        }
      })
    }
  }, [state.maintenanceMode])

  // Check server status
  const checkServerStatus = useCallback(async () => {
    try {
      const response = await secureApiRequest<{ status: 'online' | 'offline' }>(
        adminConfig.api.endpoints.serverStatus
      )

      if (response.success && response.data) {
        dispatch({
          type: 'SET_SERVER_STATUS',
          payload: { isOnline: response.data.status === 'online' }
        })
      }
    } catch (error) {
      dispatch({
        type: 'SET_SERVER_STATUS',
        payload: { isOnline: false }
      })
    }
  }, [])

  // Show notification
  const showNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    const id = crypto.randomUUID()
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type, message } })

    // Auto-dismiss after duration specified in config
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
    }, adminConfig.ui.notifications.duration)
  }, [])

  // Dismiss notification
  const dismissNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }, [])

  // Check permissions
  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!state.currentUser) return false
    
    const userRole = state.currentUser.role
    const rolePermissions = [...adminConfig.users.permissions[userRole]] as Permission[]
    
    return rolePermissions.includes('all') || rolePermissions.includes(permission)
  }, [state.currentUser])

  const value: AdminContextType = {
    ...state,
    toggleMaintenanceMode,
    checkServerStatus,
    showNotification,
    dismissNotification,
    hasPermission
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
      {/* Notification Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {state.notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg max-w-md ${
              notification.type === 'error'
                ? 'bg-red-100 text-red-800'
                : notification.type === 'warning'
                ? 'bg-yellow-100 text-yellow-800'
                : notification.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            <div className="flex justify-between items-start">
              <p>{notification.message}</p>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminContext.Provider>
  )
}

// Custom hook to use the admin context
export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

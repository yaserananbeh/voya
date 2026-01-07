export const USER = {
  TYPES: {
    ADMIN: 'Admin',
    USER: 'User',
  },

  MOCK_USER_ID: 1,
} as const

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_TYPE: 'userType',
} as const

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/home',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  FORBIDDEN: '/forbidden',
} as const

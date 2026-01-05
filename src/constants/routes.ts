/**
 * Application route paths
 */
export const ROUTES = {
  // Public routes
  HOME: '/home',
  SEARCH: '/search',
  LOGIN: '/login',
  HOTEL: (hotelId: string | number) => `/hotel/${hotelId}`,

  // Protected routes
  CHECKOUT: '/checkout',
  CHECKOUT_CONFIRMATION: '/checkout/confirmation',

  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CITIES: '/admin/cities',
  ADMIN_HOTELS: '/admin/hotels',
  ADMIN_ROOMS: '/admin/rooms',

  // Error routes
  FORBIDDEN: '/forbidden',

  // Root
  ROOT: '/',
} as const

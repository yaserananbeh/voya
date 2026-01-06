export const ROUTES = {
  HOME: '/home',
  SEARCH: '/search',
  LOGIN: '/login',
  HOTEL: (hotelId: string | number) => `/hotel/${hotelId}`,

  CHECKOUT: '/checkout',
  CHECKOUT_CONFIRMATION: '/checkout/confirmation',

  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CITIES: '/admin/cities',
  ADMIN_HOTELS: '/admin/hotels',
  ADMIN_ROOMS: '/admin/rooms',

  FORBIDDEN: '/forbidden',

  ROOT: '/',
} as const

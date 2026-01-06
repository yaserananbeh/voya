export const API_ENDPOINTS = {
  AUTH_AUTHENTICATE: '/auth/authenticate',

  CITIES: '/cities',
  CITY_BY_ID: (id: number) => `/cities/${id}`,

  HOTELS: '/hotels',
  HOTEL_BY_ID: (id: number) => `/hotels/${id}`,
  HOTEL_GALLERY: (id: number) => `/hotels/${id}/gallery`,
  HOTEL_ROOMS: (id: number) => `/hotels/${id}/rooms`,
  HOTEL_REVIEWS: (id: number) => `/hotels/${id}/reviews`,

  ROOMS: '/rooms',
  ROOM_BY_ID: (id: number) => `/rooms/${id}`,

  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: number) => `/bookings/${id}`,

  HOME_SEARCH: '/home/search',
  HOME_FEATURED_DEALS: '/home/featured-deals',
  HOME_RECENT_HOTELS: (userId: number) => `/home/users/${userId}/recent-hotels`,
  HOME_TRENDING_DESTINATIONS: '/home/destinations/trending',

  SEARCH_AMENITIES: '/search-results/amenities',

  ADMIN_DASHBOARD: '/admin/dashboard',
} as const

export const API_TAG_TYPES = [
  'Auth',
  'Home',
  'Hotel',
  'Rooms',
  'Cities',
  'Amenities',
  'Booking',
  'Admin',
] as const

export const AUTH_HEADER_PREFIX = 'Bearer' as const

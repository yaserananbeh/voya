/**
 * API endpoint paths
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH_AUTHENTICATE: '/auth/authenticate',

  // Cities
  CITIES: '/cities',
  CITY_BY_ID: (id: number) => `/cities/${id}`,

  // Hotels
  HOTELS: '/hotels',
  HOTEL_BY_ID: (id: number) => `/hotels/${id}`,
  HOTEL_GALLERY: (id: number) => `/hotels/${id}/gallery`,
  HOTEL_ROOMS: (id: number) => `/hotels/${id}/rooms`,
  HOTEL_REVIEWS: (id: number) => `/hotels/${id}/reviews`,
  HOTEL_AVAILABLE_ROOMS: (id: number) => `/hotels/${id}/available-rooms`,

  // Rooms
  ROOMS: '/rooms',
  ROOM_BY_ID: (id: number) => `/rooms/${id}`,

  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: number) => `/bookings/${id}`,

  // Home
  HOME_SEARCH: '/home/search',
  HOME_FEATURED_DEALS: '/home/featured-deals',
  HOME_RECENT_HOTELS: (userId: number) => `/home/users/${userId}/recent-hotels`,
  HOME_TRENDING_DESTINATIONS: '/home/destinations/trending',

  // Search
  SEARCH_AMENITIES: '/search-results/amenities',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',

  // Upload
  UPLOAD_PHOTO: '/photos',
} as const

/**
 * API tag types for RTK Query cache management
 */
export const API_TAG_TYPES = [
  'Auth',
  'Home',
  'Hotel',
  'Rooms',
  'Cities',
  'Amenities',
  'Booking',
  'Admin',
  'Photos',
] as const

/**
 * Authorization header prefix
 */
export const AUTH_HEADER_PREFIX = 'Bearer' as const

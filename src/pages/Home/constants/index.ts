export const ROUTES = {
  HOME: '/home',
  SEARCH: '/search',
  HOTEL: (hotelId: string | number) => `/hotel/${hotelId}`,
  ROOT: '/',
} as const

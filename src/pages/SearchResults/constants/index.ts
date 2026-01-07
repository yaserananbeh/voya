export const SEARCH_BAR = {
  CITY_FLEX: 2,
  CITY_MIN_WIDTH: 180,
  DATE_FLEX: 1,
  DATE_MIN_WIDTH: 150,
} as const

export const STORAGE_KEYS = {
  SEARCH_STATE: 'voya-search-state',
} as const

export const ROUTES = {
  SEARCH: '/search',
  HOTEL: (hotelId: string | number) => `/hotel/${hotelId}`,
} as const

export const HOTEL = {
  TYPES: {
    HOTEL: 'Hotel',
    RESORT: 'Resort',
    BOUTIQUE: 'Boutique',
    LODGE: 'Lodge',
    INN: 'Inn',
  },

  TYPE_OPTIONS: ['Hotel', 'Resort', 'Boutique', 'Lodge', 'Inn'] as const,

  STAR_RATING: {
    MIN: 1,
    MAX: 5,
  },

  PRICE_RANGE: {
    MIN: 0,
    MAX: 2000,
    DEFAULT: [0, 2000] as [number, number],
  },
} as const

export const MAP = {
  TILE_LAYER: {
    URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTRIBUTION: '© OpenStreetMap contributors',
  },

  DEFAULT_ZOOM: 13,
  DEFAULT_HEIGHT: 300,
  SCROLL_WHEEL_ZOOM: false,
} as const

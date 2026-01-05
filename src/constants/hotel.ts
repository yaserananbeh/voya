/**
 * Hotel-related constants
 */
export const HOTEL = {
  // Hotel types
  TYPES: {
    HOTEL: 'Hotel',
    RESORT: 'Resort',
    BOUTIQUE: 'Boutique',
    LODGE: 'Lodge',
    INN: 'Inn',
  },

  // Hotel type options
  TYPE_OPTIONS: ['Hotel', 'Resort', 'Boutique', 'Lodge', 'Inn'] as const,

  // Star rating
  STAR_RATING: {
    MIN: 1,
    MAX: 5,
  },

  // Price range
  PRICE_RANGE: {
    MIN: 0,
    MAX: 2000,
    DEFAULT: [0, 2000] as [number, number],
  },
} as const

/**
 * Validation constraints and limits
 */
export const VALIDATION = {
  // Booking form
  BOOKING: {
    CUSTOMER_NAME_REQUIRED: true,
    PAYMENT_METHOD_REQUIRED: true,
    SPECIAL_REQUESTS_MAX_LENGTH: 500,
  },

  // Room form
  ROOM: {
    ROOM_NUMBER_REQUIRED: true,
    HOTEL_ID_REQUIRED: true,
    ROOM_TYPE_REQUIRED: true,
    CAPACITY_OF_ADULTS_MIN: 1,
    CAPACITY_OF_CHILDREN_MIN: 0,
    PRICE_MIN: 0,
    PRICE_STEP: 0.01,
  },

  // Hotel form
  HOTEL: {
    NAME_REQUIRED: true,
    CITY_ID_REQUIRED: true,
    STAR_RATING_MIN: 1,
    STAR_RATING_MAX: 5,
  },

  // City form
  CITY: {
    NAME_REQUIRED: true,
  },
} as const

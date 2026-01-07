export const PAYMENT_METHODS = {
  CASH: 'Cash',
  CARD: 'Card',
  PAYPAL: 'PayPal',
} as const

export const PAYMENT_METHOD_OPTIONS = [
  PAYMENT_METHODS.CASH,
  PAYMENT_METHODS.CARD,
  PAYMENT_METHODS.PAYPAL,
] as const

export const VALIDATION = {
  BOOKING: {
    CUSTOMER_NAME_REQUIRED: true,
    PAYMENT_METHOD_REQUIRED: true,
    SPECIAL_REQUESTS_MAX_LENGTH: 500,
  },
} as const

export const FORM = {
  SPECIAL_REQUESTS_ROWS: 4,
  DESCRIPTION_ROWS: 3,
} as const

export const BOOKING_STATUS = {
  CONFIRMED: 'Confirmed',
  PENDING: 'Pending',
  CANCELLED: 'Cancelled',
} as const

export const ROUTES = {
  CHECKOUT: '/checkout',
  CHECKOUT_CONFIRMATION: (bookingId: string | number) => `/checkout/confirmation/${bookingId}`,
} as const

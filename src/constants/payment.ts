/**
 * Payment method constants
 */
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

export { default } from './Checkout'
export { default as Confirmation } from './Confirmation/Confirmation'

// Export types (re-export from root types for convenience)
export type { CheckoutContext } from '@/types'

// Export utils
export { calculateTotalCost, nightsBetween } from './utils/price'
// checkoutStorage utils are now in @/utils

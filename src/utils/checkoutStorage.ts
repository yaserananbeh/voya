import type { CheckoutContext } from '@/types'

const KEY = 'voya.checkout.context'

export const saveCheckoutContext = (ctx: CheckoutContext) => {
  sessionStorage.setItem(KEY, JSON.stringify(ctx))
}

export const loadCheckoutContext = (): CheckoutContext | null => {
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CheckoutContext
  } catch {
    return null
  }
}

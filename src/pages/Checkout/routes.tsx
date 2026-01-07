import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { ProtectedRoute } from '@/pages/Login/components'

const Checkout = lazy(() => import('./Checkout'))
const Confirmation = lazy(() => import('./Confirmation'))

export const checkoutRoutes: RouteObject[] = [
  {
    path: 'checkout',
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: 'checkout/confirmation/:bookingId',
    element: (
      <ProtectedRoute>
        <Confirmation />
      </ProtectedRoute>
    ),
  },
]

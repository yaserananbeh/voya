import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Hotel = lazy(() => import('./Hotel'))

export const hotelRoutes: RouteObject[] = [
  {
    path: 'hotel/:hotelId',
    element: <Hotel />,
  },
]

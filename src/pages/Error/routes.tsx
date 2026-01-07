import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { SuspenseLayout } from '@/routes/components'
import { ROUTES } from '@/pages/Login/constants'
import { RouteError } from './RouteError'

const NotFound = lazy(() => import('@/pages/NotFound/NotFound'))
const Forbidden = lazy(() => import('@/pages/Forbidden/Forbidden'))

export const errorRoutes: RouteObject[] = [
  {
    path: ROUTES.FORBIDDEN,
    element: (
      <SuspenseLayout>
        <Forbidden />
      </SuspenseLayout>
    ),
  },
  {
    path: '*',
    element: (
      <SuspenseLayout>
        <NotFound />
      </SuspenseLayout>
    ),
    errorElement: <RouteError />,
  },
]

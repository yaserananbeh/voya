import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { SuspenseLayout } from './components'
import { ROUTES } from '@/pages/Home/constants'
import { RouteError } from '@/pages/Error/RouteError'
import { homeRoutes } from '@/pages/Home/routes'
import { loginRoutes } from '@/pages/Login/routes'
import { searchRoutes } from '@/pages/SearchResults/routes'
import { hotelRoutes } from '@/pages/Hotel/routes'
import { checkoutRoutes } from '@/pages/Checkout/routes'
import { errorRoutes } from '@/pages/Error/routes'

const MainLayout = lazy(() => import('@/layouts/MainLayout/MainLayout'))

export const mainLayoutRoutes: RouteObject = {
  path: ROUTES.ROOT,
  element: (
    <SuspenseLayout>
      <MainLayout />
    </SuspenseLayout>
  ),
  errorElement: <RouteError />,
  children: [
    { index: true, element: <Navigate to={ROUTES.HOME} replace /> },
    ...loginRoutes,
    ...homeRoutes,
    ...searchRoutes,
    ...hotelRoutes,
    ...checkoutRoutes,
    ...errorRoutes.filter((route) => route.path !== '*'),
  ],
}

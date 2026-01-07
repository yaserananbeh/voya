import { createBrowserRouter } from 'react-router-dom'

import { mainLayoutRoutes } from './mainLayoutRoutes'
import { adminRoutes } from '@/pages/Admin/routes'
import { errorRoutes } from '@/pages/Error/routes'

export const router = createBrowserRouter([
  mainLayoutRoutes,
  adminRoutes,
  ...errorRoutes.filter((route) => route.path === '*'),
])

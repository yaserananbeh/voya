import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

import { RedirectIfAuthenticated } from './components'

const Login = lazy(() => import('./Login'))

export const loginRoutes: RouteObject[] = [
  {
    path: 'login',
    element: (
      <RedirectIfAuthenticated>
        <Login />
      </RedirectIfAuthenticated>
    ),
  },
]

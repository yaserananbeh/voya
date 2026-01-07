import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { ProtectedRoute, AdminRoute } from '@/pages/Login/components'
import { SuspenseLayout } from '@/routes/components'
import { ROUTES } from './constants'
import { RouteError } from '@/pages/Error/RouteError'

const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const Dashboard = lazy(() => import('./Dashboard'))
const Cities = lazy(() => import('./Cities'))
const Hotels = lazy(() => import('./Hotels'))
const Rooms = lazy(() => import('./Rooms'))

export const adminRoutes: RouteObject = {
  path: ROUTES.ADMIN,
  element: (
    <ProtectedRoute>
      <AdminRoute>
        <SuspenseLayout>
          <AdminLayout />
        </SuspenseLayout>
      </AdminRoute>
    </ProtectedRoute>
  ),
  errorElement: <RouteError />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'cities', element: <Cities /> },
    { path: 'hotels', element: <Hotels /> },
    { path: 'rooms', element: <Rooms /> },
  ],
}

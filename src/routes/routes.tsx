import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'

import { ProtectedRoute, AdminRoute, RedirectIfAuthenticated } from '@/components/auth'
import { VoyaLoader } from '@/components'
import { RouteError } from '@/pages/Error/RouteError'
import { ROUTES } from '@/constants'

const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const SearchResults = lazy(() => import('@/pages/SearchResults'))
const Hotel = lazy(() => import('@/pages/Hotel'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Confirmation = lazy(() => import('@/pages/Checkout/Confirmation'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Forbidden = lazy(() => import('@/pages/Forbidden'))

const AdminLayout = lazy(() => import('@/pages/Admin/layouts/AdminLayout'))
const MainLayout = lazy(() => import('@/layouts/MainLayout'))

const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'))
const Cities = lazy(() => import('@/pages/Admin/Cities'))
const Hotels = lazy(() => import('@/pages/Admin/Hotels'))
const Rooms = lazy(() => import('@/pages/Admin/Rooms'))

const SuspenseLayout = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <VoyaLoader size="medium" />
      </Box>
    }
  >
    {children}
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: (
      <SuspenseLayout>
        <MainLayout />
      </SuspenseLayout>
    ),
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to={ROUTES.HOME} replace /> },

      {
        path: 'login',
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },

      { path: 'home', element: <Home /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'hotel/:hotelId', element: <Hotel /> },

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

      {
        path: ROUTES.FORBIDDEN,
        element: <Forbidden />,
      },
    ],
  },

  {
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
])

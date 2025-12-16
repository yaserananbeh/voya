import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

// Wrappers
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminRoute from '@/components/auth/AdminRoute'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import { VoyaLoader } from '@/components'

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const SearchResults = lazy(() => import('@/pages/SearchResults'))
const Hotel = lazy(() => import('@/pages/Hotel'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Confirmation = lazy(() => import('@/pages/Checkout/Confirmation'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Layouts
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'))
const MainLayout = lazy(() => import('@/layouts/MainLayout'))

// Admin pages
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'))
const Cities = lazy(() => import('@/pages/Admin/Cities'))
const Hotels = lazy(() => import('@/pages/Admin/Hotels'))
const Rooms = lazy(() => import('@/pages/Admin/Rooms'))

const SuspenseLayout = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <div>
        <VoyaLoader />
      </div>
    }
  >
    {children}
  </Suspense>
)

export const router = createBrowserRouter([
  // -----------------------------------
  // PUBLIC ROUTES
  // -----------------------------------
  {
    path: '/',
    element: (
      <SuspenseLayout>
        <MainLayout />
      </SuspenseLayout>
    ),
    children: [
      { index: true, element: <Navigate to="/home" replace /> },

      {
        path: 'login',
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },

      // Home is PUBLIC
      { path: 'home', element: <Home /> },

      // Public browsing pages
      { path: 'search', element: <SearchResults /> },
      { path: 'hotel/:hotelId', element: <Hotel /> },

      // Checkout → must be logged in
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },

      // Confirmation → user-only
      {
        path: '/checkout/confirmation/:bookingId',
        element: (
          <ProtectedRoute>
            <Confirmation />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // -----------------------------------
  // ADMIN ROUTES
  // -----------------------------------
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <SuspenseLayout>
            <AdminLayout />
          </SuspenseLayout>
        </AdminRoute>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },

      { path: 'dashboard', element: <Dashboard /> },
      { path: 'cities', element: <Cities /> },
      { path: 'hotels', element: <Hotels /> },
      { path: 'rooms', element: <Rooms /> },
    ],
  },

  // -----------------------------------
  // NOT FOUND
  // -----------------------------------
  {
    path: '*',
    element: (
      <SuspenseLayout>
        <NotFound />
      </SuspenseLayout>
    ),
  },
])

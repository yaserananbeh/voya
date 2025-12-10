import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

// -------------------------------
// Lazy-loaded Pages
// -------------------------------
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const SearchResults = lazy(() => import('@/pages/SearchResults'))
const Hotel = lazy(() => import('@/pages/Hotel'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Confirmation = lazy(() => import('@/pages/Checkout/Confirmation'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Admin
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'))
const MainLayout = lazy(() => import('@/layouts/MainLayout'))

const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'))
const Cities = lazy(() => import('@/pages/Admin/Cities'))
const Hotels = lazy(() => import('@/pages/Admin/Hotels'))
const Rooms = lazy(() => import('@/pages/Admin/Rooms'))

const SuspenseLayout = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
)

// -------------------------------
// Main Router Definition
// -------------------------------
export const router = createBrowserRouter([
  // -----------------------------
  // PUBLIC ROUTES
  // -----------------------------
  {
    path: '/',
    element: (
      <SuspenseLayout>
        <MainLayout />
      </SuspenseLayout>
    ),
    children: [
      { index: true, element: <Navigate to="/home" replace /> },

      { path: 'login', element: <Login /> },
      { path: 'home', element: <Home /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'hotel/:hotelId', element: <Hotel /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'confirmation/:bookingId', element: <Confirmation /> },
    ],
  },

  // -----------------------------
  // ADMIN ROUTES
  // -----------------------------
  {
    path: '/admin',
    element: (
      <SuspenseLayout>
        <AdminLayout />
      </SuspenseLayout>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },

      { path: 'dashboard', element: <Dashboard /> },
      { path: 'cities', element: <Cities /> },
      { path: 'hotels', element: <Hotels /> },
      { path: 'rooms', element: <Rooms /> },
    ],
  },

  // -----------------------------
  // NOT FOUND
  // -----------------------------
  {
    path: '*',
    element: (
      <SuspenseLayout>
        <NotFound />
      </SuspenseLayout>
    ),
  },
])

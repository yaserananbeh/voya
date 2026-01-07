import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const SearchResults = lazy(() => import('./SearchResults'))

export const searchRoutes: RouteObject[] = [
  {
    path: 'search',
    element: <SearchResults />,
  },
]

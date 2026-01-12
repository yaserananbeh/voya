import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import { STORAGE_KEYS, ROUTES } from '@/pages/Login/constants'

interface Props {
  children: ReactElement
}

export default function ProtectedRoute({ children }: Props): ReactElement {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
  const location = useLocation()

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return children
}

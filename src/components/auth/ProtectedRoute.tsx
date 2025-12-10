import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export default function ProtectedRoute({ children }: Props): ReactElement {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

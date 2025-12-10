import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export default function AdminRoute({ children }: Props): ReactElement {
  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType')

  // not logged in at all
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // logged in but not admin
  if (userType !== 'Admin') {
    return <Navigate to="/home" replace />
  }

  return children
}

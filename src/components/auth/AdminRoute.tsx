import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export default function AdminRoute({ children }: Props): ReactElement {
  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (userType !== 'Admin') {
    return <Navigate to="/home" replace />
  }

  return children
}

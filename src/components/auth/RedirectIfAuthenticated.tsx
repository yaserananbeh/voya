import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export default function RedirectIfAuthenticated({ children }: Props): ReactElement {
  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType')

  if (token) {
    if (userType === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Navigate to="/home" replace />
  }

  return children
}

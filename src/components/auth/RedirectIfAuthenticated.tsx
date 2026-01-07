import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { STORAGE_KEYS, ROUTES } from '@/constants'
import { USER } from '@/pages/Login/constants'

interface Props {
  children: ReactElement
}

export default function RedirectIfAuthenticated({ children }: Props): ReactElement {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
  const userType = localStorage.getItem(STORAGE_KEYS.USER_TYPE)

  if (token) {
    if (userType === USER.TYPES.ADMIN) {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />
    }
    return <Navigate to={ROUTES.HOME} replace />
  }

  return children
}

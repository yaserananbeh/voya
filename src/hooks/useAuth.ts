import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from './index'
import { selectToken, selectUserType, logout as logoutAction } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(selectToken)
  const userType = useAppSelector(selectUserType)

  const isAuthenticated = Boolean(token)
  const isAdmin = userType === 'Admin'
  const isUser = userType === 'User'

  const logout = useCallback(() => {
    dispatch(logoutAction())
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    void navigate('/login', { replace: true })
  }, [dispatch, navigate])

  return {
    isAuthenticated,
    isAdmin,
    isUser,
    token,
    userType,
    logout,
  }
}

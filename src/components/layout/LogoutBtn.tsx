import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectIsAuthenticated, logout } from '@/store/authSlice'
import { STORAGE_KEYS, ROUTES } from '@/constants'

export default function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const handleClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER_TYPE)
      dispatch(logout())
      void navigate(ROUTES.HOME, { replace: true })
    } else {
      void navigate(ROUTES.LOGIN)
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color={isAuthenticated ? 'info' : 'primary'}
      startIcon={isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
      sx={{ ml: 2 }}
    >
      {isAuthenticated ? 'Logout' : 'Login'}
    </Button>
  )
}

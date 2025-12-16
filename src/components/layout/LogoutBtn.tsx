import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectIsAuthenticated, logout } from '@/store/authSlice'

export default function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const handleClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
      dispatch(logout())
      void navigate('/home', { replace: true })
    } else {
      void navigate('/login')
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

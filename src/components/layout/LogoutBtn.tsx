import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectIsAuthenticated, logout } from '@/pages/Login/store'
import { STORAGE_KEYS, ROUTES } from '@/pages/Login/constants'

export default function LogoutBtn() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isRTL = i18n.language === 'ar'

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
      color="primary"
      startIcon={
        isAuthenticated ? <LogoutIcon aria-hidden="true" /> : <LoginIcon aria-hidden="true" />
      }
      aria-label={isAuthenticated ? t('common.logout') : t('common.login')}
      sx={{ [isRTL ? 'mr' : 'ml']: 2 }}
    >
      {isAuthenticated ? t('common.logout') : t('common.login')}
    </Button>
  )
}

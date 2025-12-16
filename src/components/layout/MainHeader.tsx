import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectIsAuthenticated, logout } from '@/store/authSlice'
import LogoutBtn from '@/components/layout/LogoutBtn'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function MainHeader() {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
      dispatch(logout())
      void navigate('/home', { replace: true })
    } else {
      void navigate('/login')
    }
    handleMenuClose()
  }

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Box
          component={RouterLink}
          to="/home"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            flexGrow: 1,
          }}
        >
          <FlightTakeoffIcon
            sx={{
              color: 'primary.main',
              fontSize: { xs: 24, sm: 32 },
            }}
          />
          <Box
            component="span"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Voya
          </Box>
        </Box>
        {isMobile ? (
          <>
            <LanguageSwitcher />
            <ThemeToggle />
            <IconButton color="primary" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem component={RouterLink} to="/home" onClick={handleMenuClose}>
                {t('common.home')}
              </MenuItem>
              <MenuItem component={RouterLink} to="/search" onClick={handleMenuClose}>
                {t('common.search')}
              </MenuItem>
              <MenuItem onClick={handleAuthClick}>
                {isAuthenticated ? (
                  <>
                    <LogoutIcon sx={{ mr: 1 }} />
                    {t('common.logout')}
                  </>
                ) : (
                  <>
                    <LoginIcon sx={{ mr: 1 }} />
                    {t('common.login')}
                  </>
                )}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button component={RouterLink} to="/home" color="primary">
              {t('common.home')}
            </Button>
            <Button component={RouterLink} to="/search" color="primary">
              {t('common.search')}
            </Button>
            <LogoutBtn />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

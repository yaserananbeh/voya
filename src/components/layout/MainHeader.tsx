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
import { LogoutBtn } from '@/components/layout'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { STORAGE_KEYS, ROUTES } from '@/constants'

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
      localStorage.removeItem(STORAGE_KEYS.TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER_TYPE)
      dispatch(logout())
      void navigate(ROUTES.HOME, { replace: true })
    } else {
      void navigate(ROUTES.LOGIN)
    }
    handleMenuClose()
  }

  return (
    <AppBar position="sticky" color="default" elevation={1} component="nav" role="navigation">
      <Toolbar>
        <Box
          component={RouterLink}
          to={ROUTES.HOME}
          aria-label={t('common.home') || 'Home'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            flexGrow: 1,
            '&:focus-visible': {
              outline: '3px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
              borderRadius: 1,
            },
          }}
        >
          <FlightTakeoffIcon
            sx={{
              color: 'primary.main',
              fontSize: { xs: 24, sm: 32 },
            }}
            aria-hidden="true"
          />
          <Box
            component="span"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 700,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
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
            <IconButton
              color="primary"
              onClick={handleMenuOpen}
              aria-label={t('common.menu') || 'Open menu'}
              aria-expanded={Boolean(anchorEl)}
              aria-haspopup="true"
            >
              <MenuIcon aria-hidden="true" />
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
              role="menu"
            >
              <MenuItem
                component={RouterLink}
                to={ROUTES.HOME}
                onClick={handleMenuClose}
                role="menuitem"
              >
                {t('common.home')}
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to={ROUTES.SEARCH}
                onClick={handleMenuClose}
                role="menuitem"
              >
                {t('common.search')}
              </MenuItem>
              <MenuItem onClick={handleAuthClick} role="menuitem">
                {isAuthenticated ? (
                  <>
                    <LogoutIcon sx={{ mr: 1 }} aria-hidden="true" />
                    {t('common.logout')}
                  </>
                ) : (
                  <>
                    <LoginIcon sx={{ mr: 1 }} aria-hidden="true" />
                    {t('common.login')}
                  </>
                )}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box
            component="nav"
            role="navigation"
            aria-label={t('common.mainNavigation') || 'Main navigation'}
            sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
          >
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              component={RouterLink}
              to={ROUTES.HOME}
              color="primary"
              aria-label={t('common.home') || 'Home'}
            >
              {t('common.home')}
            </Button>
            <Button
              component={RouterLink}
              to={ROUTES.SEARCH}
              color="primary"
              aria-label={t('common.search') || 'Search'}
            >
              {t('common.search')}
            </Button>
            <LogoutBtn />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

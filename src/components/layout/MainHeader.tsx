import { useState } from 'react'
import { AppBar, Toolbar, Box, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectIsAuthenticated, logout } from '@/pages/Login/store'
import { Logo } from './Logo'
import { NavigationMenu } from './NavigationMenu'
import { NavigationLinks } from './NavigationLinks'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { STORAGE_KEYS, ROUTES } from '@/pages/Login/constants'

export default function MainHeader() {
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
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        {isMobile ? (
          <>
            <LanguageSwitcher />
            <ThemeToggle />
            <NavigationMenu
              anchorEl={anchorEl}
              onOpen={handleMenuOpen}
              onClose={handleMenuClose}
              isAuthenticated={isAuthenticated}
              onAuthClick={handleAuthClick}
            />
          </>
        ) : (
          <>
            <LanguageSwitcher />
            <ThemeToggle />
            <NavigationLinks />
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

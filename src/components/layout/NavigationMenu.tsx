import { IconButton, Menu, MenuItem } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/constants'

type NavigationMenuProps = {
  anchorEl: HTMLElement | null
  onOpen: (event: React.MouseEvent<HTMLElement>) => void
  onClose: () => void
  isAuthenticated: boolean
  onAuthClick: () => void
}

export function NavigationMenu({
  anchorEl,
  onOpen,
  onClose,
  isAuthenticated,
  onAuthClick,
}: NavigationMenuProps) {
  const { t } = useTranslation()

  return (
    <>
      <IconButton
        color="primary"
        onClick={onOpen}
        aria-label={t('common.menu') || 'Open menu'}
        aria-expanded={Boolean(anchorEl)}
        aria-haspopup="true"
      >
        <MenuIcon aria-hidden="true" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
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
        <MenuItem component={RouterLink} to={ROUTES.HOME} onClick={onClose} role="menuitem">
          {t('common.home')}
        </MenuItem>
        <MenuItem component={RouterLink} to={ROUTES.SEARCH} onClick={onClose} role="menuitem">
          {t('common.search')}
        </MenuItem>
        <MenuItem onClick={onAuthClick} role="menuitem">
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
  )
}

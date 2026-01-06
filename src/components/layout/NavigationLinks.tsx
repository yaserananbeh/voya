import { Box, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/constants'
import LogoutBtn from './LogoutBtn'

export function NavigationLinks() {
  const { t } = useTranslation()

  return (
    <Box
      component="nav"
      role="navigation"
      aria-label={t('common.mainNavigation') || 'Main navigation'}
      sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
    >
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
  )
}

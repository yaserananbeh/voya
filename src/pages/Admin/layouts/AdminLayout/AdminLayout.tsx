import { useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import HotelIcon from '@mui/icons-material/Hotel'
import BedIcon from '@mui/icons-material/Bed'
import { LogoutBtn } from '@/components/layout'
import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ROUTES } from '@/constants'
import { ADMIN_LAYOUT } from '../../constants'
import { SEO } from '@/components/common'
import { useTranslation } from 'react-i18next'

export default function AdminLayout() {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: <DashboardIcon /> },
    { path: ROUTES.ADMIN_CITIES, label: 'Cities', icon: <LocationCityIcon /> },
    { path: ROUTES.ADMIN_HOTELS, label: 'Hotels', icon: <HotelIcon /> },
    { path: ROUTES.ADMIN_ROOMS, label: 'Rooms', icon: <BedIcon /> },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavigation = (path: string) => {
    void navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <SEO
        title={t('pages.adminDashboard')}
        description="Admin dashboard for managing hotels, cities, and rooms"
        noindex={true}
        nofollow={true}
      />
      <ScrollToTop />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
              aria-label={t('common.menu') || 'Toggle navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="admin-drawer"
            >
              <MenuIcon aria-hidden="true" />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <LogoutBtn />
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: ADMIN_LAYOUT.DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          id="admin-drawer"
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: ADMIN_LAYOUT.DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${ADMIN_LAYOUT.DRAWER_WIDTH}px)` },
          minWidth: 0,
          overflowX: 'hidden',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

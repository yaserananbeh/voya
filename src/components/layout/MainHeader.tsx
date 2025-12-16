import { AppBar, Toolbar, Box, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import LogoutBtn from '@/components/layout/LogoutBtn'

export default function MainHeader() {
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
          <FlightTakeoffIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          <Box
            component="span"
            sx={{
              fontSize: '1.5rem',
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
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button component={RouterLink} to="/home" color="primary">
            Home
          </Button>
          <Button component={RouterLink} to="/search" color="primary">
            Search
          </Button>
          <LogoutBtn />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

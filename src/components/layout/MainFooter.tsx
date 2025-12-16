import { Box, Container, Stack, Typography, Divider, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'

export function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 5,
        bgcolor: 'grey.900',
        color: 'grey.100',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Main Footer Content */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'grey.700' }} />}
          >
            {/* Brand Section */}
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <FlightTakeoffIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    background: 'linear-gradient(135deg, #42a5f5 0%, #90caf9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Voya
                </Typography>
              </Stack>
              <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
                Discover your perfect stay. Book with confidence and travel with ease.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button component={RouterLink} to="/home" color="inherit" size="small">
                  Home
                </Button>
                <Button component={RouterLink} to="/search" color="inherit" size="small">
                  Search
                </Button>
                <Button component={RouterLink} to="/login" color="inherit" size="small">
                  Login
                </Button>
              </Stack>
            </Box>

            {/* Quick Links */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link component={RouterLink} to="/home" color="inherit" underline="hover">
                  Browse Hotels
                </Link>
                <Link component={RouterLink} to="/search" color="inherit" underline="hover">
                  Search Stays
                </Link>
                <Link component={RouterLink} to="/login" color="inherit" underline="hover">
                  Sign In
                </Link>
              </Stack>
            </Box>

            {/* Contact Info */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Contact Us
              </Typography>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailIcon fontSize="small" />
                  <Typography variant="body2" color="grey.400">
                    support@voya.com
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneIcon fontSize="small" />
                  <Typography variant="body2" color="grey.400">
                    +1 (555) 123-4567
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2" color="grey.400">
                    123 Travel Street, City
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>

          <Divider sx={{ borderColor: 'grey.700' }} />

          {/* Copyright */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="grey.400">
              © {new Date().getFullYear()} Voya. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="#" color="inherit" underline="hover" variant="body2">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover" variant="body2">
                Terms of Service
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

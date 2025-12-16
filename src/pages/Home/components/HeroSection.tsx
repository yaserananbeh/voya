import { Box, Stack, Typography, Button, Chip, alpha, useMediaQuery, useTheme } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

export function HeroSection() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const scrollToFeatured = () => {
    const element = document.getElementById('featured-deals')
    if (element) {
      const headerHeight = 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 16

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        p: { xs: 4, md: 6 },
        mb: 4,
        bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.3), transparent 30%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25), transparent 35%)',
          pointerEvents: 'none',
        }}
      />

      <Stack spacing={3} sx={{ position: 'relative' }}>
        <Chip
          icon={<FlightTakeoffIcon />}
          label="Find your next stay"
          color="primary"
          variant="outlined"
          sx={{ alignSelf: 'flex-start', fontWeight: 600 }}
        />

        <Stack spacing={1}>
          <Typography
            variant="h3"
            fontWeight={700}
            lineHeight={1.1}
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
            }}
          >
            Discover stays that fit how you travel.
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: { xs: '100%', sm: '640px' },
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Search trusted stays, compare deals, and book in minutes—so you can focus on the trip,
            not the planning.
          </Typography>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            component={RouterLink}
            to="/search"
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.2 },
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
            fullWidth={isMobile}
          >
            Start exploring
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={scrollToFeatured}
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
            fullWidth={isMobile}
          >
            View featured deals
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

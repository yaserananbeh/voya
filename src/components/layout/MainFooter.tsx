import { Box, Container, Stack, Typography, Divider, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/constants'

export function MainFooter() {
  const { t } = useTranslation()

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
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'grey.700' }} />}
          >
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <FlightTakeoffIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Voya
                </Typography>
              </Stack>
              <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
                {t('footer.tagline')}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button component={RouterLink} to={ROUTES.HOME} color="inherit" size="small">
                  {t('common.home')}
                </Button>
                <Button component={RouterLink} to={ROUTES.SEARCH} color="inherit" size="small">
                  {t('common.search')}
                </Button>
                <Button component={RouterLink} to={ROUTES.LOGIN} color="inherit" size="small">
                  {t('common.login')}
                </Button>
              </Stack>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                {t('footer.quickLinks')}
              </Typography>
              <Stack spacing={1}>
                <Link component={RouterLink} to={ROUTES.HOME} color="inherit" underline="hover">
                  {t('footer.browseHotels')}
                </Link>
                <Link component={RouterLink} to={ROUTES.SEARCH} color="inherit" underline="hover">
                  {t('footer.searchStays')}
                </Link>
                <Link component={RouterLink} to={ROUTES.LOGIN} color="inherit" underline="hover">
                  {t('footer.signIn')}
                </Link>
              </Stack>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                {t('footer.contactUs')}
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

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="grey.400">
              © {new Date().getFullYear()} Voya. {t('footer.copyright')}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="#" color="inherit" underline="hover" variant="body2">
                {t('footer.privacyPolicy')}
              </Link>
              <Link href="#" color="inherit" underline="hover" variant="body2">
                {t('footer.termsOfService')}
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

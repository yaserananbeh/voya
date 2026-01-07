import { Box, Button, Container, Typography, Stack, Paper, useTheme, alpha } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import ExploreIcon from '@mui/icons-material/Explore'
import { ROUTES } from './constants'
import { usePageTitle } from '@/hooks'
import { SEO } from '@/components/common'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  usePageTitle('pages.notFound')
  const theme = useTheme()

  const goHome = () => {
    void navigate(ROUTES.HOME)
  }

  const goBack = () => {
    void navigate(-1)
  }

  const goSearch = () => {
    void navigate('/search')
  }

  return (
    <>
      <SEO
        title={t('seo.notFound.title')}
        description={t('seo.notFound.description')}
        keywords={t('seo.notFound.keywords')}
        noindex={true}
      />
      <Container maxWidth="md" sx={{ py: { xs: 4, sm: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 6 },
            textAlign: 'center',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: 4,
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Box
              sx={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  fontSize: { xs: '120px', sm: '150px' },
                  fontWeight: 900,
                  lineHeight: 1,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  opacity: 0.8,
                }}
              >
                404
              </Box>
              <ExploreIcon
                sx={{
                  position: 'absolute',
                  fontSize: { xs: 60, sm: 80 },
                  color: theme.palette.primary.main,
                  opacity: 0.3,
                  transform: 'rotate(-20deg)',
                  top: { xs: -10, sm: -15 },
                  right: { xs: -20, sm: -30 },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="h3"
                fontWeight={700}
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.75rem', sm: '2.5rem' },
                }}
              >
                {t('errors.notFound')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 500, mx: 'auto', mt: 2 }}
              >
                {t('errors.notFoundMessage')}
              </Typography>
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ width: '100%', maxWidth: 500 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<HomeIcon aria-hidden="true" />}
                onClick={goHome}
                fullWidth
                aria-label={t('errors.goHome') || 'Go to home page'}
                sx={{
                  py: 1.5,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  },
                }}
              >
                {t('errors.goHome')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<SearchIcon aria-hidden="true" />}
                onClick={goSearch}
                fullWidth
                aria-label={t('common.search') || 'Search hotels'}
                sx={{ py: 1.5 }}
              >
                {t('common.search')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon aria-hidden="true" />}
                onClick={goBack}
                fullWidth
                aria-label={t('common.back') || 'Go back'}
                sx={{ py: 1.5 }}
              >
                {t('common.back')}
              </Button>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {t('errors.helpText')}
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  )
}

import { Box, Button, Container, Typography, Stack, Paper, useTheme, alpha } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LockIcon from '@mui/icons-material/Lock'
import { ROUTES } from '@/constants'

export default function ForbiddenPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useTheme()

  const goHome = () => {
    void navigate(ROUTES.HOME)
  }

  const goBack = () => {
    void navigate(-1)
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, sm: 8 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 6 },
          textAlign: 'center',
          background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.05)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
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
                background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                opacity: 0.8,
              }}
            >
              403
            </Box>
            <LockIcon
              sx={{
                position: 'absolute',
                fontSize: { xs: 60, sm: 80 },
                color: theme.palette.error.main,
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
                background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.75rem', sm: '2.5rem' },
              }}
            >
              {t('errors.forbidden')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500, mx: 'auto', mt: 2 }}
            >
              {t('errors.forbiddenMessage')}
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
              startIcon={<HomeIcon />}
              onClick={goHome}
              fullWidth
              sx={{
                py: 1.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
                },
              }}
            >
              {t('errors.goHome')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={goBack}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {t('common.back')}
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {t('errors.forbiddenHelpText')}
          </Typography>
        </Stack>
      </Paper>
    </Container>
  )
}

import { Box, Button, Container, Stack, Typography, Paper } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import RefreshIcon from '@mui/icons-material/Refresh'
import HomeIcon from '@mui/icons-material/Home'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from './constants'
import { ERROR_PAGE } from './constants'
import { usePageTitle } from '@/hooks'

interface ErrorPageProps {
  error?: Error | null
  resetError?: () => void
  title?: string
  message?: string
  showReload?: boolean
  showHome?: boolean
}

export function ErrorPage({
  error,
  resetError,
  title,
  message,
  showReload = true,
  showHome = true,
}: ErrorPageProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  usePageTitle('pages.error', title)

  const handleReload = () => {
    if (resetError) {
      resetError()
    } else {
      window.location.reload()
    }
  }

  const handleGoHome = () => {
    void navigate(ROUTES.HOME)
    if (resetError) {
      resetError()
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              width: ERROR_PAGE.ICON_CONTAINER_SIZE,
              height: ERROR_PAGE.ICON_CONTAINER_SIZE,
              borderRadius: '50%',
              bgcolor: 'error.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <ErrorOutlineIcon sx={{ fontSize: ERROR_PAGE.ICON_FONT_SIZE, color: 'error.main' }} />
          </Box>

          <Typography variant="h4" fontWeight={700} gutterBottom>
            {title || t('errors.title')}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
            {message || t('errors.message')}
          </Typography>

          {error && import.meta.env.DEV && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                textAlign: 'left',
                width: '100%',
                maxHeight: ERROR_PAGE.ERROR_BOX_MAX_HEIGHT,
                overflow: 'auto',
              }}
            >
              <Typography variant="caption" component="pre" sx={{ fontFamily: 'monospace' }}>
                {error.toString()}
                {error.stack && `\n\n${error.stack}`}
              </Typography>
            </Box>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3, width: '100%' }}>
            {showReload && (
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleReload}
                fullWidth
                sx={{ flex: 1 }}
              >
                {t('errors.reload')}
              </Button>
            )}
            {showHome && (
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={handleGoHome}
                fullWidth
                sx={{ flex: 1 }}
              >
                {t('errors.goHome')}
              </Button>
            )}
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {t('errors.helpText')}
          </Typography>
        </Stack>
      </Paper>
    </Container>
  )
}

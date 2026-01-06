import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useTranslation } from 'react-i18next'

export function CheckoutHeader() {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Box sx={{ mb: { xs: 3, sm: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 1,
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ShoppingCartIcon sx={{ color: 'white', fontSize: 28 }} />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.75rem', sm: '2.25rem' },
          }}
        >
          {t('checkout.title')}
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
        {t('checkout.subtitle') || 'Complete your booking details'}
      </Typography>
    </Box>
  )
}

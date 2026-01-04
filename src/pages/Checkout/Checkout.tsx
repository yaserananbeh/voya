import { Box, Typography, Container, Paper, Grid, alpha, useTheme } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import type { CheckoutContext } from './types'
import { BookingSummary } from './components/BookingSummary'
import { UserInfoForm, type UserInfoValues } from './components/UserInfoForm'
import { CheckoutActions } from './components/CheckoutActions'
import { calculateTotalCost } from './utils/price'
import { loadCheckoutContext, saveCheckoutContext } from './utils/checkoutStorage'
import { useCreateBookingMutation } from '@/api/checkout'
import { useNotification } from '@/hooks'
import { useTranslation } from 'react-i18next'

type LocationState = { checkout?: CheckoutContext }

export default function Checkout() {
  const { t } = useTranslation()
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [uiError, setUiError] = useState<string | null>(null)

  const [createBooking, { isLoading }] = useCreateBookingMutation()
  const { showSuccess, showError } = useNotification()

  const ctx = useMemo<CheckoutContext | null>(() => {
    const state = (location.state as LocationState | null)?.checkout
    if (state) {
      saveCheckoutContext(state)
      return state
    }
    return loadCheckoutContext()
  }, [location.state])

  if (!ctx) {
    return <Typography variant="h6">{t('checkout.missingData')}</Typography>
  }

  const handleSubmit = async (values: UserInfoValues) => {
    setUiError(null)

    try {
      const totalCost = calculateTotalCost(ctx.pricePerNight, ctx.checkInDate, ctx.checkOutDate)

      const bookingDetails = await createBooking({
        customerName: values.customerName,
        hotelName: ctx.hotelName,
        roomNumber: ctx.roomNumber,
        roomType: ctx.roomType,
        bookingDateTime: new Date().toISOString(),
        totalCost,
        paymentMethod: values.paymentMethod,
        specialRequests: values.specialRequests || undefined,
      }).unwrap()

      showSuccess(t('checkout.bookingConfirmed'))
      void navigate('/checkout/confirmation', {
        replace: true,
        state: { booking: bookingDetails },
      })
    } catch (error) {
      console.error('Booking failed:', error)
      showError(t('checkout.bookingFailed'))
    }
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 200px)',
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg">
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

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <BookingSummary ctx={ctx} />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <UserInfoForm
                initialValues={{ customerName: '', paymentMethod: '', specialRequests: '' }}
                onSubmit={handleSubmit}
                submitting={isLoading}
              />
              <CheckoutActions error={uiError} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

import { Box, Typography, Container, Paper, Grid, alpha, useTheme } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import type { CheckoutContext } from '@/types'
import { BookingSummary } from './components/BookingSummary'
import { UserInfoForm, type UserInfoValues } from './components/UserInfoForm'
import { CheckoutActions } from './components/CheckoutActions'
import { calculateTotalCost } from './utils/price'
import { loadCheckoutContext, saveCheckoutContext } from '@/utils'
import { useCreateBookingMutation } from '@/api/checkout'
import { useNotification, usePageTitle } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { SEO } from '@/components/common'
import { CheckoutHeader } from './components'
import { ROUTES } from '@/constants'
import { logger } from '@/utils/logger'

type LocationState = { checkout?: CheckoutContext }

export default function Checkout() {
  const { t } = useTranslation()
  usePageTitle('pages.checkout')
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

      await createBooking({
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
      const randomBookingId = Math.floor(Math.random() * 1000000) + 1000
      void navigate(ROUTES.CHECKOUT_CONFIRMATION(randomBookingId), {
        replace: true,
      })
    } catch (error) {
      logger.error('Booking failed', error)
      showError(t('checkout.bookingFailed'))
    }
  }

  return (
    <>
      <SEO
        title={t('seo.checkout.title')}
        description={t('seo.checkout.description')}
        keywords={t('seo.checkout.keywords')}
        noindex={true}
      />
      <Box
        sx={{
          minHeight: 'calc(100vh - 200px)',
          py: { xs: 3, sm: 4, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <CheckoutHeader />

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
    </>
  )
}

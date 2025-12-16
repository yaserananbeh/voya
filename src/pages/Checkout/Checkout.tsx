import { Box, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'

import type { CheckoutContext } from './types'
import { BookingSummary } from './components/BookingSummary'
import { UserInfoForm, type UserInfoValues } from './components/UserInfoForm'
import { CheckoutActions } from './components/CheckoutActions'
import { calculateTotalCost } from './utils/price'
import { loadCheckoutContext, saveCheckoutContext } from './utils/checkoutStorage'
import { useCreateBookingMutation } from '@/api/checkout'

type LocationState = { checkout?: CheckoutContext }

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [uiError, setUiError] = useState<string | null>(null)

  const [createBooking, { isLoading }] = useCreateBookingMutation()

  const ctx = useMemo<CheckoutContext | null>(() => {
    const state = (location.state as LocationState | null)?.checkout
    if (state) {
      saveCheckoutContext(state)
      return state
    }
    return loadCheckoutContext()
  }, [location.state])

  if (!ctx) {
    return (
      <Typography variant="h6">Missing booking data. Go back and select a room first.</Typography>
    )
  }

  const handleSubmit = async (values: UserInfoValues) => {
    setUiError(null)

    const totalCost = calculateTotalCost(ctx.pricePerNight, ctx.checkInDate, ctx.checkOutDate)

    const bookingId = await createBooking({
      customerName: values.customerName,
      hotelName: ctx.hotelName,
      roomNumber: ctx.roomNumber,
      roomType: ctx.roomType,
      bookingDateTime: new Date().toISOString(),
      totalCost,
      paymentMethod: values.paymentMethod,
    }).unwrap()

    void navigate(`/checkout/confirmation/${bookingId}`, { replace: true })
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        Checkout
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, sm: 3 },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ flex: 1, order: { xs: 2, md: 1 } }}>
          <BookingSummary ctx={ctx} />
        </Box>

        <Box sx={{ flex: { xs: 1, md: 2 }, order: { xs: 1, md: 2 } }}>
          <UserInfoForm
            initialValues={{ customerName: '', paymentMethod: '' }}
            onSubmit={handleSubmit}
            submitting={isLoading}
          />
          <CheckoutActions error={uiError} />
        </Box>
      </Box>
    </Box>
  )
}

import { Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import type { CheckoutContext } from '../types'
import { calculateTotalCost, nightsBetween } from '../utils/price'
import { useTranslation } from 'react-i18next'

export function BookingSummary({ ctx }: { ctx: CheckoutContext }) {
  const { t } = useTranslation()
  const nights = nightsBetween(ctx.checkInDate, ctx.checkOutDate)
  const total = calculateTotalCost(ctx.pricePerNight, ctx.checkInDate, ctx.checkOutDate)

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('checkout.bookingSummary')}
        </Typography>

        <Stack spacing={1}>
          <Typography>
            <b>{t('checkout.hotel')}:</b> {ctx.hotelName}
          </Typography>
          <Typography>
            <b>{t('checkout.room')}:</b> {ctx.roomType} (#{ctx.roomNumber})
          </Typography>
          {ctx.cityName ? (
            <Typography>
              <b>{t('checkout.city')}:</b> {ctx.cityName}
            </Typography>
          ) : null}
          <Typography>
            <b>{t('checkout.dates')}:</b> {ctx.checkInDate} → {ctx.checkOutDate}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={0.5}>
          <Typography>
            <b>{t('checkout.pricePerNight')}:</b> {ctx.pricePerNight.toFixed(2)}
          </Typography>
          <Typography>
            <b>{t('checkout.nights')}:</b> {nights}
          </Typography>
          <Typography variant="h6">
            <b>{t('checkout.total')}:</b> {total.toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

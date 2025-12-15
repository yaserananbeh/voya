import { Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import type { CheckoutContext } from '../types'
import { calculateTotalCost, nightsBetween } from '../utils/price'

export function BookingSummary({ ctx }: { ctx: CheckoutContext }) {
  const nights = nightsBetween(ctx.checkInDate, ctx.checkOutDate)
  const total = calculateTotalCost(ctx.pricePerNight, ctx.checkInDate, ctx.checkOutDate)

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Booking summary
        </Typography>

        <Stack spacing={1}>
          <Typography>
            <b>Hotel:</b> {ctx.hotelName}
          </Typography>
          <Typography>
            <b>Room:</b> {ctx.roomType} (#{ctx.roomNumber})
          </Typography>
          {ctx.cityName ? (
            <Typography>
              <b>City:</b> {ctx.cityName}
            </Typography>
          ) : null}
          <Typography>
            <b>Dates:</b> {ctx.checkInDate} → {ctx.checkOutDate}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={0.5}>
          <Typography>
            <b>Price/night:</b> {ctx.pricePerNight.toFixed(2)}
          </Typography>
          <Typography>
            <b>Nights:</b> {nights}
          </Typography>
          <Typography variant="h6">
            <b>Total:</b> {total.toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetBookingByIdQuery } from '@/api/checkout'

export default function Confirmation() {
  const { bookingId } = useParams()
  const id = Number(bookingId)

  const { data, isLoading, isError } = useGetBookingByIdQuery(id, {
    skip: !Number.isFinite(id),
  })

  if (!Number.isFinite(id)) {
    return <Typography variant="h6">Invalid booking id.</Typography>
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError || !data) {
    return <Typography variant="h6">Failed to load booking details.</Typography>
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Booking confirmed
        </Typography>

        <Stack spacing={1}>
          <Typography>
            <b>Confirmation #:</b> {data.confirmationNumber ?? '—'}
          </Typography>
          <Typography>
            <b>Status:</b> {data.bookingStatus ?? '—'}
          </Typography>
          <Typography>
            <b>Name:</b> {data.customerName ?? '—'}
          </Typography>
          <Typography>
            <b>Hotel:</b> {data.hotelName ?? '—'}
          </Typography>
          <Typography>
            <b>Room:</b> {data.roomType ?? '—'} (#{data.roomNumber ?? '—'})
          </Typography>
          <Typography>
            <b>Total:</b> {Number(data.totalCost).toFixed(2)}
          </Typography>
          <Typography>
            <b>Payment:</b> {data.paymentMethod ?? '—'}
          </Typography>
          <Typography>
            <b>Booked at:</b> {data.bookingDateTime}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

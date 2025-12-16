import { Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetBookingByIdQuery } from '@/api/checkout'
import { useTranslation } from 'react-i18next'

export default function Confirmation() {
  const { t } = useTranslation()
  const { bookingId } = useParams()
  const id = Number(bookingId)

  const { data, isLoading, isError } = useGetBookingByIdQuery(id, {
    skip: !Number.isFinite(id),
  })

  if (!Number.isFinite(id)) {
    return <Typography variant="h6">{t('confirmation.invalidBookingId')}</Typography>
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError || !data) {
    return <Typography variant="h6">{t('confirmation.failedToLoadBooking')}</Typography>
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {t('confirmation.bookingConfirmed')}
        </Typography>

        <Stack spacing={1}>
          <Typography>
            <b>{t('confirmation.confirmationNumber')}:</b> {data.confirmationNumber ?? '—'}
          </Typography>
          <Typography>
            <b>{t('confirmation.status')}:</b> {data.bookingStatus ?? '—'}
          </Typography>
          <Typography>
            <b>{t('confirmation.name')}:</b> {data.customerName ?? '—'}
          </Typography>
          <Typography>
            <b>{t('confirmation.hotel')}:</b> {data.hotelName ?? '—'}
          </Typography>
          <Typography>
            <b>{t('confirmation.room')}:</b> {data.roomType ?? '—'} (#{data.roomNumber ?? '—'})
          </Typography>
          <Typography>
            <b>{t('confirmation.total')}:</b> {Number(data.totalCost).toFixed(2)}
          </Typography>
          <Typography>
            <b>{t('confirmation.payment')}:</b> {data.paymentMethod ?? '—'}
          </Typography>
          <Typography>
            <b>{t('confirmation.bookedAt')}:</b> {data.bookingDateTime}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

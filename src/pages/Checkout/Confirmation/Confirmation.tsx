import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Container,
  Grid,
} from '@mui/material'
import { useParams, useLocation } from 'react-router-dom'
import { useGetBookingByIdQuery, type BookingDetailsDto } from '@/api/checkout'
import { useTranslation } from 'react-i18next'
import { VoyaLoader } from '@/components/common/VoyaLoader'
import PrintIcon from '@mui/icons-material/Print'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HotelIcon from '@mui/icons-material/Hotel'
import PersonIcon from '@mui/icons-material/Person'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import RoomIcon from '@mui/icons-material/Bed'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { useRef } from 'react'
import { alpha, useTheme } from '@mui/material/styles'
import styles from './confirmation.module.css'

type LocationState = { booking?: BookingDetailsDto }

export default function Confirmation() {
  const { t } = useTranslation()
  const theme = useTheme()
  const location = useLocation()
  const { bookingId } = useParams()
  const printRef = useRef<HTMLDivElement>(null)

  const bookingFromState = (location.state as LocationState | null)?.booking
  const id = bookingId ? Number(bookingId) : null

  const {
    data: bookingFromApi,
    isLoading,
    isError,
  } = useGetBookingByIdQuery(id!, {
    skip: !id || !Number.isFinite(id),
  })

  const data = bookingFromState || bookingFromApi

  const handlePrint = () => {
    window.print()
  }

  if (isLoading && !bookingFromState) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <VoyaLoader size="medium" />
      </Box>
    )
  }

  if ((isError || !data) && !bookingFromState) {
    return <Typography variant="h6">{t('confirmation.failedToLoadBooking')}</Typography>
  }

  if (!data) {
    return <Typography variant="h6">{t('confirmation.failedToLoadBooking')}</Typography>
  }

  const getStatusColor = (status: string | null) => {
    if (!status) return 'default'
    const statusLower = status.toLowerCase()
    if (statusLower.includes('confirm')) return 'success'
    if (statusLower.includes('pending')) return 'warning'
    if (statusLower.includes('cancel')) return 'error'
    return 'default'
  }

  return (
    <Container maxWidth="md" className="print-container" sx={{ py: { xs: 3, sm: 4 } }}>
      <Box ref={printRef}>
        <Paper
          elevation={0}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            p: { xs: 3, sm: 4 },
            mb: 3,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {t('confirmation.bookingConfirmed')}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {t('confirmation.thankYouMessage') || 'Thank you for your booking!'}
          </Typography>
        </Paper>

        <Card
          elevation={2}
          sx={{
            mb: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <ConfirmationNumberIcon color="primary" sx={{ fontSize: 32 }} />
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {t('confirmation.confirmationNumber')}
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {data.confirmationNumber ?? t('confirmation.pendingConfirmation')}
                </Typography>
              </Box>
              <Chip
                label={data.bookingStatus ?? '-'}
                color={getStatusColor(data.bookingStatus)}
                sx={{ fontWeight: 600 }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6" fontWeight="600">
                    {t('confirmation.customerInfo') || 'Customer Information'}
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {t('confirmation.name')}
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {data.customerName ?? '-'}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <CalendarTodayIcon color="primary" />
                  <Typography variant="h6" fontWeight="600">
                    {t('confirmation.bookingDetails') || 'Booking Details'}
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {t('confirmation.bookedAt')}
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {new Date(data.bookingDateTime).toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <HotelIcon color="primary" />
                  <Typography variant="h6" fontWeight="600">
                    {t('confirmation.accommodation') || 'Accommodation'}
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {t('confirmation.hotel')}
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {data.hotelName ?? '-'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {t('confirmation.room')}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <RoomIcon fontSize="small" color="action" />
                      <Typography variant="body1" fontWeight="500">
                        {data.roomType ?? '-'} (#{data.roomNumber ?? '-'})
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <CreditCardIcon color="primary" />
                  <Typography variant="h6" fontWeight="600">
                    {t('confirmation.paymentInfo') || 'Payment Information'}
                  </Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {t('confirmation.payment')}
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {data.paymentMethod ?? '-'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {t('confirmation.total')}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AttachMoneyIcon fontSize="small" color="success" />
                      <Typography variant="h5" fontWeight="bold" color="success.main">
                        ${Number(data.totalCost).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          className={styles.noPrint}
          sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Button
            variant="outlined"
            size="large"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            sx={{ minWidth: 160 }}
          >
            {t('confirmation.print')}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

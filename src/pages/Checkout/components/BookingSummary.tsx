import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Box,
  Chip,
  alpha,
  useTheme,
} from '@mui/material'
import HotelIcon from '@mui/icons-material/Hotel'
import BedIcon from '@mui/icons-material/Bed'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import type { CheckoutContext } from '../types'
import { calculateTotalCost, nightsBetween } from '../utils/price'
import { useTranslation } from 'react-i18next'

export function BookingSummary({ ctx }: { ctx: CheckoutContext }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const nights = nightsBetween(ctx.checkInDate, ctx.checkOutDate)
  const total = calculateTotalCost(ctx.pricePerNight, ctx.checkInDate, ctx.checkOutDate)

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        position: 'sticky',
        top: 20,
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 3,
            pb: 2,
            borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 1.5,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HotelIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight={700}>
            {t('checkout.bookingSummary')}
          </Typography>
        </Box>

        <Stack spacing={2.5}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <HotelIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.5 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {t('checkout.hotel')}
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {ctx.hotelName}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <BedIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.5 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {t('checkout.room')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body1" fontWeight={600}>
                  {ctx.roomType}
                </Typography>
                <Chip
                  label={`#${ctx.roomNumber}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>

          {ctx.cityName && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <LocationOnIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.5 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {t('checkout.city')}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {ctx.cityName}
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.5 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {t('checkout.dates')}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label={ctx.checkInDate}
                  size="small"
                  color="primary"
                  icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                />
                <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                  →
                </Typography>
                <Chip
                  label={ctx.checkOutDate}
                  size="small"
                  color="primary"
                  icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                />
              </Stack>
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ my: 3, borderColor: alpha(theme.palette.primary.main, 0.2) }} />

        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AttachMoneyIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
              <Typography variant="body2" color="text.secondary">
                {t('checkout.pricePerNight')}
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight={600}>
              ${ctx.pricePerNight.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NightsStayIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
              <Typography variant="body2" color="text.secondary">
                {t('checkout.nights')}
              </Typography>
            </Box>
            <Chip label={`${nights} ${nights === 1 ? 'night' : 'nights'}`} size="small" />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 2,
              borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              {t('checkout.total')}
            </Typography>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

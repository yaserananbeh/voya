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
import type { CheckoutContext } from '@/types'
import { calculateTotalCost, nightsBetween } from '../utils/price'
import { useTranslation } from 'react-i18next'
import { SummarySection, PriceBreakdown, TotalPrice } from './'

export function BookingSummary({ ctx }: { ctx: CheckoutContext }) {
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const isRTL = i18n.language === 'ar'
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
          <Typography variant="h6" component="h2" fontWeight={700}>
            {t('checkout.bookingSummary')}
          </Typography>
        </Box>

        <Stack spacing={2.5}>
          <SummarySection
            icon={<HotelIcon sx={{ fontSize: 20 }} />}
            label={t('checkout.hotel')}
            value={ctx.hotelName}
          />

          <SummarySection
            icon={<BedIcon sx={{ fontSize: 20 }} />}
            label={t('checkout.room')}
            value={
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body1" fontWeight={600} component="span">
                  {ctx.roomType}
                </Typography>
                <Chip
                  label={`#${ctx.roomNumber}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            }
          />

          {ctx.cityName && (
            <SummarySection
              icon={<LocationOnIcon sx={{ fontSize: 20 }} />}
              label={t('checkout.city')}
              value={ctx.cityName}
            />
          )}

          <SummarySection
            icon={<CalendarTodayIcon sx={{ fontSize: 20 }} />}
            label={t('checkout.dates')}
            value={
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label={ctx.checkInDate}
                  size="small"
                  color="primary"
                  icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                />
                <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                  {isRTL ? '←' : '→'}
                </Typography>
                <Chip
                  label={ctx.checkOutDate}
                  size="small"
                  color="primary"
                  icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                />
              </Stack>
            }
          />
        </Stack>

        <Divider sx={{ my: 3, borderColor: alpha(theme.palette.primary.main, 0.2) }} />

        <Stack spacing={2}>
          <PriceBreakdown pricePerNight={ctx.pricePerNight} nights={nights} />

          <TotalPrice total={total} label={t('checkout.total')} />
        </Stack>
      </CardContent>
    </Card>
  )
}

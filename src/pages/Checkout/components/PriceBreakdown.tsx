import { Box, Typography, Chip } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import { useTranslation } from 'react-i18next'

type PriceBreakdownProps = {
  pricePerNight: number
  nights: number
  currency?: string
}

export function PriceBreakdown({ pricePerNight, nights, currency = '$' }: PriceBreakdownProps) {
  const { t } = useTranslation()

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AttachMoneyIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
          <Typography variant="body2" color="text.secondary">
            {t('checkout.pricePerNight')}
          </Typography>
        </Box>
        <Typography variant="body1" fontWeight={600}>
          {currency}
          {pricePerNight.toFixed(2)}
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
    </>
  )
}

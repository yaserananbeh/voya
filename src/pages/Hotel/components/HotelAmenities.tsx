import { Stack, Chip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { HotelAmenityDto } from '@/api/hotels'

type Props = {
  amenities: HotelAmenityDto[]
}

export function HotelAmenities({ amenities }: Props) {
  const { t } = useTranslation()

  return (
    <div>
      <Typography variant="h6" component="h2">
        {t('search.amenities')}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
        {amenities.map((a) => (
          <Chip key={a.id} label={a.name} />
        ))}
      </Stack>
    </div>
  )
}

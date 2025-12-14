import { Stack, Chip, Typography } from '@mui/material'
import type { HotelAmenityDto } from '@/api/hotels'

type Props = {
  amenities: HotelAmenityDto[]
}

export function HotelAmenities({ amenities }: Props) {
  return (
    <div>
      <Typography variant="h6">Amenities</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {amenities.map((a) => (
          <Chip key={a.id} label={a.name} />
        ))}
      </Stack>
    </div>
  )
}

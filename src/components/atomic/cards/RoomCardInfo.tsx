import { Typography, Stack, Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { HotelRoomDto } from '@/api/hotels'

type RoomCardInfoProps = {
  room: HotelRoomDto
  isAvailable?: boolean
}

export function RoomCardInfo({ room, isAvailable = true }: RoomCardInfoProps) {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant="h6" component="h3">
        {room.roomType}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {room.capacityOfAdults} {t('hotel.adults')}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {room.capacityOfChildren} {t('hotel.children')}
      </Typography>

      {room.amenities && room.amenities.length > 0 && (
        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" useFlexGap>
          {room.amenities.slice(0, 3).map((a) => (
            <Chip
              key={a.id}
              label={a.name}
              size="small"
              sx={{
                backgroundColor: `${isAvailable ? 'primary.main' : 'grey.800'} !important`,
                color: `${isAvailable ? 'primary.contrastText' : '#ffffff'} !important`,
                fontWeight: 500,
                '& .MuiChip-label': {
                  color: `${isAvailable ? 'primary.contrastText' : '#ffffff'} !important`,
                },
              }}
            />
          ))}
          {room.amenities.length > 3 && (
            <Chip
              key={`overflow-${room.roomId}`}
              label={`+${room.amenities.length - 3}`}
              size="small"
              sx={{
                backgroundColor: `${isAvailable ? 'primary.main' : 'grey.800'} !important`,
                color: `${isAvailable ? 'primary.contrastText' : '#ffffff'} !important`,
                fontWeight: 500,
                '& .MuiChip-label': {
                  color: `${isAvailable ? 'primary.contrastText' : '#ffffff'} !important`,
                },
              }}
            />
          )}
        </Stack>
      )}

      <Typography mt={2} fontWeight="bold">
        ${room.price} {t('hotel.perNight')}
      </Typography>
    </>
  )
}

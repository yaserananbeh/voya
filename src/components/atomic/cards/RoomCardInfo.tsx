import { Typography, Stack, Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { HotelRoomDto } from '@/api/hotels'

type RoomCardInfoProps = {
  room: HotelRoomDto
}

export function RoomCardInfo({ room }: RoomCardInfoProps) {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant="h6">{room.roomType}</Typography>

      <Typography color="text.secondary" variant="body2">
        {room.capacityOfAdults} {t('hotel.adults')}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {room.capacityOfChildren} {t('hotel.children')}
      </Typography>

      {room.amenities && room.amenities.length > 0 && (
        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
          {room.amenities.slice(0, 3).map((a) => (
            <Chip key={a.id} label={a.name} size="small" />
          ))}
          {room.amenities.length > 3 && (
            <Chip label={`+${room.amenities.length - 3}`} size="small" />
          )}
        </Stack>
      )}

      <Typography mt={2} fontWeight="bold">
        ${room.price} {t('hotel.perNight')}
      </Typography>
    </>
  )
}

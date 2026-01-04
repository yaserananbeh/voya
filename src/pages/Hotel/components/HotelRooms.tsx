import { Box, Card, CardContent, CardActions, Typography, Button, Stack, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { HotelRoomDto } from '@/api/hotels'
import { selectSearchParams } from '@/store/searchSlice'
import type { CheckoutContext } from '@/pages/Checkout/types'
import { saveCheckoutContext } from '@/pages/Checkout/utils/checkoutStorage'
import { useAppSelector } from '@/hooks'
import { SafeImage } from '@/components/common/SafeImage'
import { useNotification } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { STORAGE_KEYS, ROUTES, USER } from '@/constants'

type Props = {
  hotelId: number
  hotelName: string
  cityName?: string | null
  rooms: HotelRoomDto[]
}

export function HotelRooms({ hotelId, hotelName, cityName, rooms }: Props) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const searchParams = useAppSelector(selectSearchParams)
  const { showWarning } = useNotification()
  const isRTL = i18n.language === 'ar'

  const handleBook = (room: HotelRoomDto) => {
    if (!searchParams.checkInDate || !searchParams.checkOutDate) {
      showWarning(t('hotel.pleaseSelectDates'))
      return
    }

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    if (!token) {
      const ctx: CheckoutContext = {
        hotelId,
        hotelName,
        roomId: room.roomId,
        roomNumber: String(room.roomNumber),
        roomType: room.roomType,
        cityName: cityName ?? undefined,
        pricePerNight: room.price,
        checkInDate: searchParams.checkInDate,
        checkOutDate: searchParams.checkOutDate,
        userId: USER.MOCK_USER_ID,
      }
      saveCheckoutContext(ctx)

      void navigate(ROUTES.LOGIN, { state: { from: { pathname: ROUTES.CHECKOUT } } })
      return
    }

    const ctx: CheckoutContext = {
      hotelId,
      hotelName,
      roomId: room.roomId,
      roomNumber: String(room.roomNumber),
      roomType: room.roomType,
      cityName: cityName ?? undefined,
      pricePerNight: room.price,
      checkInDate: searchParams.checkInDate,
      checkOutDate: searchParams.checkOutDate,
      userId: USER.MOCK_USER_ID,
    }

    saveCheckoutContext(ctx)
    void navigate(ROUTES.CHECKOUT, { state: { checkout: ctx } })
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('hotel.availableRooms')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: { xs: 2, sm: 3 },
        }}
      >
        {rooms.map((room) => (
          <Card
            key={room.roomId}
            sx={{
              opacity: room.availability ? 1 : 0.6,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SafeImage src={room.roomPhotoUrl} alt={room.roomType} height={180} />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{room.roomType}</Typography>

              <Typography color="text.secondary" variant="body2">
                {room.capacityOfAdults} {t('hotel.adults')}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {room.capacityOfChildren} {t('hotel.children')}
              </Typography>

              <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                {(room.amenities || []).slice(0, 3).map((a) => (
                  <Chip key={a.id} label={a.name} size="small" />
                ))}
                {(room.amenities?.length || 0) > 3 && (
                  <Chip label={`+${(room.amenities?.length || 0) - 3}`} size="small" />
                )}
              </Stack>

              <Typography mt={2} fontWeight="bold">
                ${room.price} {t('hotel.perNight')}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                fullWidth
                variant="contained"
                disabled={!room.availability}
                onClick={() => handleBook(room)}
                sx={{
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}
              >
                {room.availability ? t('hotel.bookNow') : t('hotel.notAvailable')}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

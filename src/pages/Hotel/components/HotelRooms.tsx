import { Box, Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { HotelRoomDto } from '@/api/hotels'
import { selectSearchParams } from '@/store/searchSlice'
import type { CheckoutContext } from '@/pages/Checkout/types'
import { saveCheckoutContext } from '@/pages/Checkout/utils/checkoutStorage'
import { useAppSelector } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { STORAGE_KEYS, ROUTES, USER } from '@/constants'
import { DateSelectionDialog } from './DateSelectionDialog'
import { RoomCardImage, RoomCardInfo, RoomCardActions } from '@/components/atomic'

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
  const isRTL = i18n.language === 'ar'
  const [dateDialogOpen, setDateDialogOpen] = useState(false)
  const [pendingRoom, setPendingRoom] = useState<HotelRoomDto | null>(null)

  const proceedWithBooking = (room: HotelRoomDto, checkInDate: string, checkOutDate: string) => {
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
        checkInDate,
        checkOutDate,
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
      checkInDate,
      checkOutDate,
      userId: USER.MOCK_USER_ID,
    }

    saveCheckoutContext(ctx)
    void navigate(ROUTES.CHECKOUT, { state: { checkout: ctx } })
  }

  const handleBook = (room: HotelRoomDto) => {
    if (!searchParams.checkInDate || !searchParams.checkOutDate) {
      setPendingRoom(room)
      setDateDialogOpen(true)
      return
    }

    proceedWithBooking(room, searchParams.checkInDate, searchParams.checkOutDate)
  }

  const handleDateConfirm = (checkInDate: string, checkOutDate: string) => {
    if (pendingRoom) {
      proceedWithBooking(pendingRoom, checkInDate, checkOutDate)
      setPendingRoom(null)
    }
  }

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
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
            <RoomCardImage imageUrl={room.roomPhotoUrl} alt={room.roomType} />

            <CardContent sx={{ flexGrow: 1 }}>
              <RoomCardInfo room={room} isAvailable={room.availability ?? false} />
            </CardContent>

            <RoomCardActions
              available={room.availability ?? false}
              onBook={() => handleBook(room)}
              isRTL={isRTL}
            />
          </Card>
        ))}
      </Box>

      <DateSelectionDialog
        open={dateDialogOpen}
        onClose={() => {
          setDateDialogOpen(false)
          setPendingRoom(null)
        }}
        onConfirm={handleDateConfirm}
      />
    </Box>
  )
}

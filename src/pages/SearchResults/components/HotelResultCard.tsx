import { Card, CardContent, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { HotelDto } from '@/api/hotels'
import { useTranslation } from 'react-i18next'
import { HotelCardImage, HotelCardInfo, HotelCardPrice } from '@/components/atomic'

function getMinRoomPrice(hotel: HotelDto): number | null {
  const prices = (hotel.rooms ?? []).map((r) => r.price).filter((p) => typeof p === 'number')
  if (prices.length === 0) return null
  return Math.min(...prices)
}

export function HotelResultCard({ hotel }: { hotel: HotelDto }) {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const price = getMinRoomPrice(hotel)
  const isRTL = i18n.language === 'ar'

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        p: { xs: 1.5, sm: 1 },
      }}
    >
      <HotelCardImage imageUrl={hotel.imageUrl} alt={hotel.name} />

      <CardContent sx={{ flex: 1, minWidth: 0, p: { xs: 1, sm: 2 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
          spacing={2}
        >
          <Stack sx={{ minWidth: 0, flex: 1 }}>
            <HotelCardInfo
              name={hotel.name}
              location={hotel.location}
              hotelType={hotel.hotelType}
              starRating={hotel.starRating}
              description={hotel.description}
              showDescription
            />
          </Stack>

          <HotelCardPrice
            price={price}
            onViewHotel={() => void navigate(`/hotel/${hotel.id}`)}
            isRTL={isRTL}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

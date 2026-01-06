import { Box } from '@mui/material'
import { useRecentHotelsQuery } from '@/api/home'
import { LoadingState, ErrorState, EmptyState } from '@/components/common'
import { HotelCard } from '@/components/hotel'
import { formatDistanceToNow } from '@/utils/date'
import { useTranslation } from 'react-i18next'
import { USER } from '@/constants'

export function RecentHotelsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useRecentHotelsQuery({
    userId: USER.MOCK_USER_ID,
  })

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return <ErrorState message={t('home.recentHotelsError')} />
  }

  if (!data || data.length === 0) {
    return <EmptyState message={t('home.noRecentHotels')} />
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(auto-fill, minmax(260px, 1fr))',
        },
        gap: 3,
      }}
    >
      {data.map((hotel) => (
        <HotelCard
          key={hotel.hotelId}
          hotel={{
            hotelId: hotel.hotelId,
            hotelName: hotel.hotelName ?? '',
            cityName: hotel.cityName ?? undefined,
            starRating: hotel.starRating,
            imageUrl: hotel.thumbnailUrl ?? undefined,
            visitedDate: formatDistanceToNow(new Date(hotel.visitDate), {
              addSuffix: true,
            }),
          }}
        />
      ))}
    </Box>
  )
}

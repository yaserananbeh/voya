import { Box } from '@mui/material'
import { useRecentHotelsQuery, type RecentHotelResultDto } from '../api'
import { LoadingState, ErrorState } from '@/components/common'
import { EmptyState } from './EmptyState'
import { HotelCard } from './HotelCard'
import { formatDistanceToNow } from '@/utils/date'
import { useTranslation } from 'react-i18next'
import { USER } from '../../Login/constants'

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
      {data.map((hotel: RecentHotelResultDto) => (
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

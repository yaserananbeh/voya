import { Box } from '@mui/material'
import { useFeaturedDealsQuery } from '@/api/home'
import { LoadingState, ErrorState } from '@/components/common'
import { EmptyState } from './EmptyState'
import { HotelCard } from './HotelCard'
import { useTranslation } from 'react-i18next'

export function FeaturedDealsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useFeaturedDealsQuery()

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return <ErrorState message={t('home.featuredDealsError')} />
  }

  if (!data || data.length === 0) {
    return <EmptyState message={t('home.noFeaturedDeals')} />
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
      {data.map((deal) => (
        <HotelCard
          key={deal.hotelId}
          hotel={{
            hotelId: deal.hotelId,
            hotelName: deal.hotelName ?? '',
            cityName: deal.cityName ?? undefined,
            starRating: deal.hotelStarRating,
            imageUrl: deal.roomPhotoUrl ?? undefined,
            price: deal.finalPrice,
            originalPrice: deal.originalRoomPrice,
            discount: deal.discount,
            showDiscount: true,
          }}
        />
      ))}
    </Box>
  )
}

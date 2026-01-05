import { Stack, Typography, Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectSearchFilters, selectSearchQuery } from '@/store/searchSlice'
import { useEffect, useMemo, useState } from 'react'
import { useGetHotelsQuery, type HotelDto } from '@/api/hotels'
import { HotelResultCard } from './HotelResultCard'
import { VoyaLoader } from '@/components'
import { PAGINATION } from '@/constants'

function hotelMatchesFilters(hotel: HotelDto, filters: ReturnType<typeof selectSearchFilters>) {
  if (filters.stars != null && hotel.starRating !== filters.stars) return false
  if (filters.hotelTypes?.length && !filters.hotelTypes.includes(hotel.hotelType)) return false

  const hotelAmenityNames = (hotel.amenities ?? []).map((a) => a.name)
  if (filters.amenities?.length && !filters.amenities.every((a) => hotelAmenityNames.includes(a))) {
    return false
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange
    const roomPrices = (hotel.rooms ?? []).map((r) => r.price)
    if (!roomPrices.some((p) => typeof p === 'number' && p >= min && p <= max)) return false
  }

  return true
}

export function ResultsList() {
  const searchQuery = useSelector(selectSearchQuery)
  const filters = useSelector(selectSearchFilters)

  const [page, setPage] = useState(1)
  const [allHotels, setAllHotels] = useState<HotelDto[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { data, isLoading, isError, isFetching } = useGetHotelsQuery({
    searchQuery,
    pageNumber: page,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  })

  useEffect(() => {
    setPage(1)
    setAllHotels([])
    setHasMore(true)
  }, [searchQuery])

  useEffect(() => {
    if (data) {
      setAllHotels((prev) => [...prev, ...data])

      if (data.length < PAGINATION.DEFAULT_PAGE_SIZE) {
        setHasMore(false)
      }
    }
  }, [data])

  const filteredHotels = useMemo(
    () => allHotels.filter((h) => hotelMatchesFilters(h, filters)),
    [allHotels, filters],
  )

  if (isLoading && allHotels.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <VoyaLoader size="small" />
      </Box>
    )
  }

  if (isError) {
    return <Typography color="error">Failed to load hotels</Typography>
  }

  return (
    <Stack spacing={2}>
      {filteredHotels.length === 0 ? (
        <Typography>
          {hasMore ? "No matches in loaded results — try 'Load more'." : 'No results found'}
        </Typography>
      ) : (
        filteredHotels.map((hotel) => <HotelResultCard key={hotel.id} hotel={hotel} />)
      )}

      {hasMore && (
        <Stack direction="row" justifyContent="center" sx={{ py: 2 }}>
          <Button variant="outlined" disabled={isFetching} onClick={() => setPage((p) => p + 1)}>
            {isFetching ? 'Loading…' : 'Load more'}
          </Button>
        </Stack>
      )}

      {!hasMore && allHotels.length > 0 && (
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
          You reached the end
        </Typography>
      )}
    </Stack>
  )
}

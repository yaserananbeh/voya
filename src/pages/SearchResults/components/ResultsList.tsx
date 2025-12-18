import { Stack, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectSearchFilters, selectSearchQuery } from '@/store/searchSlice'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGetHotelsQuery, type HotelDto } from '@/api/hotels'
import { HotelResultCard } from './HotelResultCard'
import { VoyaLoader } from '@/components'

const PAGE_SIZE = 10

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
    const anyInRange = roomPrices.some((p) => typeof p === 'number' && p >= min && p <= max)
    if (!anyInRange) return false
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
    pageSize: PAGE_SIZE,
  })

  useEffect(() => {
    setPage(1)
    setAllHotels([])
    setHasMore(true)
  }, [searchQuery])

  useEffect(() => {
    if (!data) return
    setAllHotels((prev) => {
      const merged = [...prev, ...data]
      const map = new Map<number, HotelDto>()
      for (const h of merged) map.set(h.id, h)
      return Array.from(map.values())
    })
    if (data.length < PAGE_SIZE) setHasMore(false)
  }, [data])

  const filteredHotels = useMemo(() => {
    return allHotels.filter((h) => hotelMatchesFilters(h, filters))
  }, [allHotels, filters])

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first?.isIntersecting) return
        if (isFetching || isLoading) return
        if (!hasMore) return
        setPage((p) => p + 1)
      },
      { rootMargin: '250px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, isFetching, isLoading])

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
  if (isError) return <Typography color="error">Failed to load hotels</Typography>

  return (
    <Stack spacing={2}>
      {filteredHotels.length === 0 ? (
        <Typography>No results found</Typography>
      ) : (
        filteredHotels.map((hotel) => <HotelResultCard key={hotel.id} hotel={hotel} />)
      )}

      <Box ref={sentinelRef} sx={{ height: 1 }} />

      {isFetching ? (
        <Stack direction="row" justifyContent="center" sx={{ py: 2 }}>
          <VoyaLoader size="small" />
        </Stack>
      ) : null}

      {!hasMore && allHotels.length > 0 ? (
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
          You reached the end
        </Typography>
      ) : null}
    </Stack>
  )
}

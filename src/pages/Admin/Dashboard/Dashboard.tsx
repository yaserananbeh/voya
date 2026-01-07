import { useMemo } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { VoyaLoader } from '@/components'
import { StatCard, StatisticCard, QuickOverviewCard } from './components'
import {
  LocationCity as CityIcon,
  Hotel as HotelIcon,
  Bed as BedIcon,
  Star as StarIcon,
  CheckCircle as AvailableIcon,
} from '@mui/icons-material'
import { useGetCitiesQuery } from '../Cities/api'
import { useGetAdminHotelsQuery } from '../Hotels/api'
import { useGetRoomsAdminQuery } from '../Rooms/api'
import { usePageTitle } from '@/hooks'

export default function Dashboard() {
  usePageTitle('pages.adminDashboard')
  const theme = useTheme()
  const { data: cities = [], isLoading: citiesLoading } = useGetCitiesQuery()
  const { data: hotels = [], isLoading: hotelsLoading } = useGetAdminHotelsQuery()
  const { data: rooms = [], isLoading: roomsLoading } = useGetRoomsAdminQuery()

  const isLoading = citiesLoading || hotelsLoading || roomsLoading

  const stats = useMemo(() => {
    const totalCities = cities.length
    const totalHotels = hotels.length
    const totalRooms = rooms.length

    const totalStarRating = hotels.reduce((sum, hotel) => sum + (hotel.starRating || 0), 0)
    const averageStarRating = totalHotels > 0 ? totalStarRating / totalHotels : 0

    const totalAvailableRooms = rooms.filter((room) => room.availability !== false).length

    const totalRoomsInHotels = hotels.reduce((sum, hotel) => {
      const rooms = (hotel as { rooms?: unknown[] }).rooms
      const roomCount = Array.isArray(rooms) ? rooms.length : 0
      return sum + roomCount
    }, 0)
    const averageRoomsPerHotel = totalHotels > 0 ? totalRoomsInHotels / totalHotels : 0

    return {
      totalCities,
      totalHotels,
      totalRooms,
      averageStarRating: averageStarRating.toFixed(1),
      totalAvailableRooms,
      averageRoomsPerHotel: averageRoomsPerHotel.toFixed(1),
      unavailableRooms: totalRooms - totalAvailableRooms,
      citiesWithHotels: new Set(hotels.map((h) => h.cityId)).size,
      occupancyRate: totalRooms > 0 ? ((totalAvailableRooms / totalRooms) * 100).toFixed(1) : 0,
      totalHotelTypes: new Set(hotels.map((h) => h.name).filter(Boolean)).size,
      roomsPerCityAvg: totalCities > 0 ? (totalRooms / totalCities).toFixed(1) : 0,
    }
  }, [cities, hotels, rooms])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <VoyaLoader size="medium" />
      </Box>
    )
  }

  const statCards = [
    {
      title: 'Total Cities',
      value: stats.totalCities,
      icon: <CityIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Total Hotels',
      value: stats.totalHotels,
      icon: <HotelIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
    },
    {
      title: 'Total Rooms',
      value: stats.totalRooms,
      icon: <BedIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Available Rooms',
      value: stats.totalAvailableRooms,
      icon: <AvailableIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.light,
    },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          mb: 3,
        }}
      >
        {statCards.map((card) => (
          <Box
            key={card.title}
            sx={{
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
              minWidth: 0,
            }}
          >
            <StatCard title={card.title} value={card.value} icon={card.icon} color={card.color} />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          mb: 3,
        }}
      >
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' }, minWidth: 0 }}>
          <StatisticCard
            title="Hotel Statistics"
            items={[
              {
                label: 'Average Star Rating',
                value: stats.averageStarRating,
                icon: <StarIcon sx={{ color: 'warning.main' }} />,
              },
              {
                label: 'Average Rooms per Hotel',
                value: stats.averageRoomsPerHotel,
              },
            ]}
          />
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' }, minWidth: 0 }}>
          <StatisticCard
            title="Room Statistics"
            items={[
              {
                label: 'Available Rooms',
                value: stats.totalAvailableRooms,
                color: 'success',
              },
              {
                label: 'Unavailable Rooms',
                value: stats.unavailableRooms,
                color: 'error',
              },
            ]}
          />
        </Box>
      </Box>

      <Box>
        <QuickOverviewCard
          items={[
            { label: 'Cities with Hotels', value: stats.citiesWithHotels },
            { label: 'Occupancy Rate', value: `${stats.occupancyRate}%` },
            { label: 'Total Hotel Types', value: stats.totalHotelTypes },
            { label: 'Rooms per City (Avg)', value: stats.roomsPerCityAvg },
          ]}
        />
      </Box>
    </Box>
  )
}

import { useMemo } from 'react'
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material'
import {
  LocationCity as CityIcon,
  Hotel as HotelIcon,
  Bed as BedIcon,
  Star as StarIcon,
  CheckCircle as AvailableIcon,
} from '@mui/icons-material'
import { useGetCitiesQuery, useGetAdminHotelsQuery, useGetRoomsAdminQuery } from '@/api/admin'

export default function Dashboard() {
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
    }
  }, [cities, hotels, rooms])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  const statCards = [
    {
      title: 'Total Cities',
      value: stats.totalCities,
      icon: <CityIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Total Hotels',
      value: stats.totalHotels,
      icon: <HotelIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Total Rooms',
      value: stats.totalRooms,
      icon: <BedIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
    {
      title: 'Available Rooms',
      value: stats.totalAvailableRooms,
      icon: <AvailableIcon sx={{ fontSize: 40 }} />,
      color: '#0288d1',
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
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    color: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {card.icon}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {card.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
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
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hotel Statistics
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography color="text.secondary">Average Star Rating</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon sx={{ color: '#ffc107' }} />
                    <Typography variant="h6" fontWeight="bold">
                      {stats.averageStarRating}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Average Rooms per Hotel</Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {stats.averageRoomsPerHotel}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' }, minWidth: 0 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Room Statistics
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography color="text.secondary">Available Rooms</Typography>
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    {stats.totalAvailableRooms}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Unavailable Rooms</Typography>
                  <Typography variant="h6" fontWeight="bold" color="error.main">
                    {stats.totalRooms - stats.totalAvailableRooms}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Overview
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                mt: 1,
              }}
            >
              <Box
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' },
                  minWidth: 0,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Cities with Hotels
                </Typography>
                <Typography variant="h6">{new Set(hotels.map((h) => h.cityId)).size}</Typography>
              </Box>
              <Box
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' },
                  minWidth: 0,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Occupancy Rate
                </Typography>
                <Typography variant="h6">
                  {stats.totalRooms > 0
                    ? ((stats.totalAvailableRooms / stats.totalRooms) * 100).toFixed(1)
                    : 0}
                  %
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' },
                  minWidth: 0,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Total Hotel Types
                </Typography>
                <Typography variant="h6">
                  {new Set(hotels.map((h) => h.hotelType || h.hotelName).filter(Boolean)).size}
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' },
                  minWidth: 0,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Rooms per City (Avg)
                </Typography>
                <Typography variant="h6">
                  {stats.totalCities > 0 ? (stats.totalRooms / stats.totalCities).toFixed(1) : 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

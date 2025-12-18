import { http, HttpResponse } from 'msw'
const API = '*/api'
let BOOKING_ID = 1000
type MockBookingDetails = {
  customerName: string
  hotelName: string
  roomNumber: string
  roomType: string
  bookingDateTime: string
  totalCost: number
  paymentMethod: string
  bookingStatus: string
  confirmationNumber: string
}
export const handlers = [
  http.post('/api/auth/authenticate', async ({ request }) => {
    const body = (await request.json()) as { userName: string; password: string }
    if (body.userName === 'admin' && body.password === 'admin') {
      return HttpResponse.json({
        authentication: 'mock-admin-token',
        userType: 'Admin',
      })
    }
    if (body.userName === 'user' && body.password === 'user') {
      return HttpResponse.json({
        authentication: 'mock-user-token',
        userType: 'User',
      })
    }
    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { userName: string; password: string }
    if (body.userName === 'admin' && body.password === 'admin') {
      return HttpResponse.json({
        authentication: 'mock-admin-token',
        userType: 'Admin',
      })
    }
    return HttpResponse.json({
      authentication: 'mock-token',
      userType: 'User',
    })
  }),

  http.get('/api/home/search', ({ request }) => {
    const url = new URL(request.url)
    const city = url.searchParams.get('city') || ''
    return HttpResponse.json([
      {
        hotelId: 1,
        hotelName: `Hotel in ${city || 'Dubai'}`,
        starRating: 4,
        latitude: 25.2048,
        longitude: 55.2708,
        roomPrice: 150,
        roomType: 'Standard',
        cityName: city || 'Dubai',
        roomPhotoUrl: 'https://example.com/room1.jpg',
        discount: 0.1,
        amenities: [{ id: 1, name: 'Free Wi-Fi', description: 'High-speed internet' }],
      },
    ])
  }),

  http.get('/api/home/featured-deals', () => {
    return HttpResponse.json([
      {
        hotelId: 1,
        originalRoomPrice: 200,
        discount: 0.25,
        finalPrice: 150,
        cityName: 'Dubai',
        hotelName: 'Luxury Resort',
        hotelStarRating: 5,
        title: 'Summer Special',
        description: 'Amazing beachfront location',
        roomPhotoUrl: 'https://example.com/featured1.jpg',
      },
      {
        hotelId: 2,
        originalRoomPrice: 180,
        discount: 0.2,
        finalPrice: 144,
        cityName: 'Amman',
        hotelName: 'City Center Hotel',
        hotelStarRating: 4,
        title: 'Weekend Getaway',
        description: 'Perfect for business travelers',
        roomPhotoUrl: 'https://example.com/featured2.jpg',
      },
    ])
  }),

  http.get('/api/home/users/:userId/recent-hotels', () => {
    return HttpResponse.json([
      {
        hotelId: 1,
        hotelName: 'Recent Hotel 1',
        starRating: 4,
        visitDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        cityName: 'Dubai',
        thumbnailUrl: 'https://example.com/recent1.jpg',
        priceLowerBound: 100,
        priceUpperBound: 200,
      },
      {
        hotelId: 2,
        hotelName: 'Recent Hotel 2',
        starRating: 5,
        visitDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        cityName: 'Amman',
        thumbnailUrl: 'https://example.com/recent2.jpg',
        priceLowerBound: 150,
        priceUpperBound: 250,
      },
    ])
  }),

  http.get('/api/home/destinations/trending', () => {
    return HttpResponse.json([
      {
        cityId: 1,
        cityName: 'Dubai',
        countryName: 'UAE',
        description: 'Modern city with luxury shopping',
        thumbnailUrl: 'https://example.com/dubai.jpg',
      },
      {
        cityId: 2,
        cityName: 'Bali',
        countryName: 'Indonesia',
        description: 'Tropical paradise with beautiful beaches',
        thumbnailUrl: 'https://example.com/bali.jpg',
      },
    ])
  }),

  http.get('/api/cities', ({ request }) => {
    const url = new URL(request.url)
    const searchQuery = url.searchParams.get('searchQuery') ?? ''

    const allCities = [
      {
        id: 3,
        name: 'Tokyo',
        description:
          'The bustling capital of Japan, known for its advanced technology, shopping, and unique blend of old and new.',
      },
      {
        id: 4,
        name: 'London',
        description:
          'The capital of England, famous for its historical landmarks, museums, and theaters.',
      },
      {
        id: 5,
        name: 'Rome',
        description:
          'The capital of Italy, known for its ancient history, stunning architecture, and delicious food.',
      },
      { id: 6, name: 'Paris', description: 'good place' },
    ]

    let filtered = allCities
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = allCities.filter(
        (city) =>
          city.name.toLowerCase().includes(query) ||
          city.description?.toLowerCase().includes(query),
      )
    }

    return HttpResponse.json(filtered)
  }),

  http.get('/api/admin/dashboard', () => {
    return HttpResponse.json({
      totalBookings: 22,
      totalHotels: 14,
      totalUsers: 140,
    })
  }),

  http.post('/api/upload/photo', () => {
    return HttpResponse.json({
      url: 'https://mockcdn.com/photo123.jpg',
    })
  }),
  http.get('/api/search-results/amenities', () =>
    HttpResponse.json([
      { id: 1, name: 'Free Wi-Fi' },
      { id: 2, name: 'Swimming Pool' },
      { id: 3, name: 'Spa' },
    ]),
  ),

  http.get('/api/hotels', ({ request }) => {
    const url = new URL(request.url)
    const searchQuery = url.searchParams.get('searchQuery') ?? ''
    const pageNumber = Number(url.searchParams.get('pageNumber') ?? '1')
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10')

    const all = Array.from({ length: 25 }).map((_, i) => {
      const id = i + 1
      return {
        id,
        name: `Hotel ${id} ${searchQuery}`.trim(),
        location: id % 2 === 0 ? 'Amman' : 'Bali',
        description: 'Mock hotel description',
        hotelType: id % 5 === 0 ? 'Boutique' : 'Hotel',
        starRating: (id % 5) + 1,
        rooms: [
          {
            id: id * 10 + 1,
            name: 'Room A',
            type: 'Standard',
            price: 100 + id,
            available: true,
            maxOccupancy: 2,
          },
          {
            id: id * 10 + 2,
            name: 'Room B',
            type: 'Suite',
            price: 250 + id,
            available: true,
            maxOccupancy: 4,
          },
        ],
        amenities: [{ id: 1, name: 'Free Wi-Fi' }],
        imageUrl: undefined,
      }
    })

    const start = (pageNumber - 1) * pageSize
    const pageItems = all.slice(start, start + pageSize)

    return HttpResponse.json(pageItems)
  }),
  http.get(`${API}/hotels/:id`, ({ params }) => {
    const id = Number(params.id)
    return HttpResponse.json({
      id,
      hotelName: `Hotel ${id}`,
      location: 'Bali, Indonesia',
      description: 'Mock hotel description for details page',
      hotelType: 'Resort',
      starRating: 5,
      latitude: -8.3405,
      longitude: 115.0915,
      imageUrl: 'https://example.com/hotel.jpg',
      availableRooms: 10,
      cityId: 101,
      amenities: [
        { id: 1, name: 'Free Wi-Fi' },
        { id: 2, name: 'Swimming Pool' },
      ],
      rooms: [
        {
          id: 101,
          name: 'Ocean View Suite',
          type: 'Suite',
          price: 500,
          available: true,
          maxOccupancy: 4,
        },
      ],
    })
  }),

  http.get(`${API}/hotels/:id/gallery`, ({ params }) => {
    const id = Number(params.id)
    return HttpResponse.json([
      { id: id * 10 + 1, url: 'https://example.com/photo1.jpg' },
      { id: id * 10 + 2, url: 'https://example.com/photo2.jpg' },
    ])
  }),

  http.get(`${API}/hotels/:id/rooms`, () => {
    return HttpResponse.json([
      {
        id: 101,
        name: 'Ocean View Suite',
        type: 'Suite',
        price: 500,
        available: true,
        maxOccupancy: 4,
      },
      {
        id: 102,
        name: 'Garden View Room',
        type: 'Standard',
        price: 200,
        available: true,
        maxOccupancy: 2,
      },
    ])
  }),

  http.get(`${API}/hotels/:id/reviews`, () => {
    return HttpResponse.json([{ id: 1, userName: 'John', rating: 5, comment: 'Amazing stay!' }])
  }),
  http.post('/api/bookings', () => {
    BOOKING_ID += 1
    return HttpResponse.json({ bookingId: BOOKING_ID }, { status: 201 })
  }),

  http.get('/api/bookings/:bookingId', ({ params }) => {
    const bookingId = Number(params.bookingId)

    const response: MockBookingDetails = {
      customerName: 'Test User',
      hotelName: 'Test Hotel',
      roomNumber: '101',
      roomType: 'Deluxe',
      bookingDateTime: new Date().toISOString(),
      totalCost: 250,
      paymentMethod: 'Card',
      bookingStatus: 'Confirmed',
      confirmationNumber: `CNF-${bookingId}`,
    }

    return HttpResponse.json(response)
  }),
]

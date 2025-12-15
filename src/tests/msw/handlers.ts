// src/tests/msw/handlers.ts
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
  // ===========================
  // AUTH API
  // ===========================
  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      authentication: 'mock-token',
      userType: 'admin',
    })
  }),

  // ===========================
  // HOME API (search, featured, etc.)
  // ===========================
  http.get('/api/home/search', () => {
    return HttpResponse.json({
      results: [
        { id: 1, name: 'Mock Hotel 1', city: 'Dubai' },
        { id: 2, name: 'Mock Hotel 2', city: 'Amman' },
      ],
    })
  }),

  http.get('/api/home/featured', () => {
    return HttpResponse.json([{ id: 1, name: 'Featured Hotel', rating: 4.8 }])
  }),

  // ===========================
  // CITIES API
  // ===========================
  http.get('/api/cities', () => {
    return HttpResponse.json([
      { id: 1, name: 'Dubai' },
      { id: 2, name: 'Paris' },
    ])
  }),

  // ===========================
  // ADMIN API
  // ===========================
  http.get('/api/admin/dashboard', () => {
    return HttpResponse.json({
      totalBookings: 22,
      totalHotels: 14,
      totalUsers: 140,
    })
  }),

  // ===========================
  // UPLOAD API
  // ===========================
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

    // Minimal deterministic list
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

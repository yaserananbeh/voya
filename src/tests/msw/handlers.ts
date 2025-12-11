// src/tests/msw/handlers.ts
import { http, HttpResponse } from 'msw'

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
  // HOTEL DETAILS
  // ===========================
  http.get('/api/hotel/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Mock Hotel',
      starRating: 5,
      roomsAvailable: 12,
    })
  }),

  // ===========================
  // ROOMS API
  // ===========================
  http.get('/api/rooms/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      hotelId: 1,
      price: 120,
      amenities: ['wifi', 'parking'],
    })
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
  // CHECKOUT API
  // ===========================
  http.post('/api/checkout', () => {
    return HttpResponse.json({
      confirmationId: 'CONFIRM-12345',
      status: 'success',
    })
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
]

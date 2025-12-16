import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { baseApi } from '@/api/baseApi'
import { server } from '@/tests/msw/server'
import { http, HttpResponse } from 'msw'
import Hotel from '../Hotel'

vi.mock('../components/HotelGallery', () => ({ HotelGallery: () => <div data-testid="gallery" /> }))
vi.mock('../components/HotelAmenities', () => ({
  HotelAmenities: () => <div data-testid="amenities" />,
}))
vi.mock('../components/HotelMap', () => ({ HotelMap: () => <div data-testid="map" /> }))
vi.mock('../components/HotelRooms', () => ({ HotelRooms: () => <div data-testid="rooms" /> }))
vi.mock('../components/HotelReviews', () => ({ HotelReviews: () => <div data-testid="reviews" /> }))

function makeStore() {
  return configureStore({
    reducer: { [baseApi.reducerPath]: baseApi.reducer },
    middleware: (gdm) => gdm().concat(baseApi.middleware),
  })
}

function renderHotel(route = '/hotel/7') {
  const store = makeStore()
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/hotel/:hotelId" element={<Hotel />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )
}

describe('Hotel page data fetching', () => {
  it('shows loading state', () => {
    renderHotel('/hotel/7')
    expect(screen.getByText('Voya')).toBeInTheDocument()
  })

  it('renders hotel data on success', async () => {
    renderHotel('/hotel/7')

    expect(await screen.findByRole('heading', { level: 4 })).toHaveTextContent('Hotel 7')
    expect(screen.getByText('Bali, Indonesia')).toBeInTheDocument()
    expect(screen.getByText('Mock hotel description for details page')).toBeInTheDocument()

    expect(screen.getByTestId('gallery')).toBeInTheDocument()
    expect(screen.getByTestId('amenities')).toBeInTheDocument()
    expect(screen.getByTestId('rooms')).toBeInTheDocument()
    expect(screen.getByTestId('reviews')).toBeInTheDocument()
  })

  it('renders error state when hotel endpoint fails', async () => {
    server.use(
      http.get('*/api/hotels/:id', () => HttpResponse.json({ message: 'boom' }, { status: 500 })),
    )

    renderHotel('/hotel/7')

    expect(await screen.findByText('Failed to load hotel')).toBeInTheDocument()
  })
})

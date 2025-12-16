import { describe, it, expect, beforeEach } from 'vitest'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { store } from '@/store'
import Checkout from '../Checkout'
import i18n from '@/i18n/config'

const checkoutContext = {
  hotelId: 1,
  hotelName: 'Test Hotel',
  roomId: 10,
  roomNumber: '101',
  roomType: 'Deluxe',
  pricePerNight: 100,
  checkInDate: '2025-12-20',
  checkOutDate: '2025-12-22',
  userId: 99,
}

describe('Checkout', () => {
  beforeEach(() => {
    // Ensure i18n is set to English for tests
    void i18n.changeLanguage('en')
    sessionStorage.setItem('voya.checkout.context', JSON.stringify(checkoutContext))
  })

  it('validates and submits booking', async () => {
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/checkout']}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    )

    // Use the actual English translation text
    const submitBtn = await screen.findByRole('button', {
      name: /confirm booking/i,
    })

    await user.click(submitBtn)

    expect(await screen.findByText(/customer name is required/i)).toBeInTheDocument()

    expect(await screen.findByText(/payment method is required/i)).toBeInTheDocument()
  })
})

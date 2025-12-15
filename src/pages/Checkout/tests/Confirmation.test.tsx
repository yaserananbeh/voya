import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { store } from '@/store'
import Confirmation from '../Confirmation/Confirmation'

describe('Confirmation', () => {
  it('renders booking details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/checkout/confirmation/1234']}>
          <Routes>
            <Route path="/checkout/confirmation/:bookingId" element={<Confirmation />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    )

    // wait for RTK Query + MSW
    expect(await screen.findByText(/booking confirmed/i, { exact: false })).toBeInTheDocument()

    expect(await screen.findByText(/ABC123XYZ/i)).toBeInTheDocument()
  })
})

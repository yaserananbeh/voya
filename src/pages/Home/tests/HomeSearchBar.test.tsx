import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from '@/store/searchSlice'
import { HomeSearchBar } from '../components/HomeSearchBar'

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      search: searchReducer,
    },
  })

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  )
}

describe('HomeSearchBar', () => {
  it('renders with default values', () => {
    renderWithStore(<HomeSearchBar />)

    expect(screen.getByLabelText(/where are you going\?/i)).toBeInTheDocument()

    const guestButton = screen.getByRole('button', { name: /adult/i })
    expect(guestButton).toBeInTheDocument()
  })

  it('allows user to type city and submit', () => {
    renderWithStore(<HomeSearchBar />)

    const cityInput = screen.getByLabelText(/where are you going\?/i)
    fireEvent.change(cityInput, { target: { value: 'Amman' } })

    const searchButton = screen.getByRole('button', { name: /search/i })
    fireEvent.click(searchButton)

    expect(cityInput).toHaveValue('Amman')
  })

  it('opens guest/room selector popover', () => {
    renderWithStore(<HomeSearchBar />)

    const guestButton = screen.getByRole('button', { name: /adult/i })
    fireEvent.click(guestButton)

    expect(screen.getByRole('heading', { name: /adults/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /rooms/i })).toBeVisible()
  })
})

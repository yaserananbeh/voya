import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from '@/store/searchSlice'
import { HomeSearchBar } from '../components/HomeSearchBar'
import i18n from '@/i18n/config'

// Ensure i18n is initialized and set to English for tests
beforeEach(() => {
  void i18n.changeLanguage('en')
})

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      search: searchReducer,
    },
  })

  return {
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>,
    ),
  }
}

describe('HomeSearchBar', () => {
  it('renders with default values', () => {
    renderWithStore(<HomeSearchBar />)

    // Use the actual English translation text
    expect(screen.getByLabelText(/where are you going\?/i)).toBeInTheDocument()
    // Update to match the translated guest room selector text
    expect(screen.getByRole('button', { name: /adult/i })).toBeInTheDocument()
  })

  it('allows user to type city and submit', async () => {
    const { user } = renderWithStore(<HomeSearchBar />)

    // Use the actual English translation text
    const cityInput = screen.getByLabelText(/where are you going\?/i)

    await user.type(cityInput, 'Amman')

    // Use the translated search button text
    const searchButton = screen.getByRole('button', { name: /search/i })

    await user.click(searchButton)

    expect(cityInput).toHaveValue('Amman')
  })

  it('opens guest/room selector popover', async () => {
    const { user } = renderWithStore(<HomeSearchBar />)

    // Find button that contains "adult" in the summary text
    const guestButton = screen.getByRole('button', { name: /adult/i })

    await user.click(guestButton)

    // Use the translated labels
    expect(await screen.findByText(/adults/i)).toBeVisible()
    expect(screen.getByText(/rooms/i)).toBeVisible()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from '@/pages/SearchResults/store'
import { HomeSearchBar } from '../components/HomeSearchBar'

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

    expect(
      screen.getByRole('textbox', { name: /search hotels or destinations/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /adult/i })).toBeInTheDocument()
  })

  it('allows user to type city and submit', async () => {
    const { user } = renderWithStore(<HomeSearchBar />)

    const cityInput = screen.getByRole('textbox', { name: /search hotels or destinations/i })

    await user.type(cityInput, 'Amman')

    const searchButton = screen.getByRole('button', { name: /search/i })

    await user.click(searchButton)

    expect(cityInput).toHaveValue('Amman')
  })

  it('opens guest/room selector popover', async () => {
    const { user } = renderWithStore(<HomeSearchBar />)

    const guestButton = screen.getByRole('button', { name: /adult/i })

    await user.click(guestButton)

    const popover = await screen.findByRole('dialog')
    expect(popover).toBeVisible()

    const popoverContent = within(popover)
    expect(popoverContent.getByText(/select guests/i)).toBeInTheDocument()
    expect(popoverContent.getAllByText(/adults/i).length).toBeGreaterThan(0)
    expect(popoverContent.getAllByText(/rooms/i).length).toBeGreaterThan(0)
  })
})

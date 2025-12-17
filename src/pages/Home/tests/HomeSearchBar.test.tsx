import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from '@/store/searchSlice'
import { HomeSearchBar } from '../components/HomeSearchBar'
import i18n from '@/i18n/config'

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

    expect(screen.getByLabelText(/where are you going\?/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /adult/i })).toBeInTheDocument()
  })

  it('allows user to type city and submit', async () => {
    const { user } = renderWithStore(<HomeSearchBar />)

    const cityInput = screen.getByLabelText(/where are you going\?/i)

    await user.type(cityInput, 'Amman')

    const searchButton = screen.getByRole('button', { name: /search/i })

    await user.click(searchButton)

    expect(cityInput).toHaveValue('Amman')
  })

  it('opens guest/room selector popover', async () => {
    const { user } = renderWithStore(<HomeSearchBar />)

    const guestButton = screen.getByRole('button', { name: /adult/i })

    await user.click(guestButton)

    expect(await screen.findByText(/adults/i)).toBeVisible()
    expect(screen.getByText(/rooms/i)).toBeVisible()
  })
})

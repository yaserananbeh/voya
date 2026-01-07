import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Login from '../Login'
import { baseApi } from '@/api/baseApi'
import { authReducer } from '../store'
import { searchReducer } from '@/pages/SearchResults/store'
import { http, HttpResponse } from 'msw'
import { server } from '@/tests/msw/server'
import { NotificationProvider } from '@/providers/NotificationProvider'

const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  })
}

const renderLogin = () => {
  const store = createTestStore()
  return render(
    <Provider store={store}>
      <NotificationProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </NotificationProvider>
    </Provider>,
  )
}

describe('Login Form', () => {
  beforeEach(() => {
    server.resetHandlers()
  })

  it('renders login form with username and password fields', async () => {
    renderLogin()
    await waitFor(() => {
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    renderLogin()

    const submitButton = screen.getByRole('button', { name: /^login$/i })
    await user.click(submitButton)

    await waitFor(() => {
      const usernameErrors = screen.getAllByText(/username is required/i)
      const passwordErrors = screen.getAllByText(/password is required/i)
      expect(usernameErrors.length).toBeGreaterThan(0)
      expect(passwordErrors.length).toBeGreaterThan(0)
    })
  })

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup()
    let capturedBody: { userName: string; password: string } | null = null

    server.use(
      http.post('*/api/auth/authenticate', async ({ request }) => {
        capturedBody = (await request.json()) as { userName: string; password: string }
        return HttpResponse.json({
          authentication: 'test-token',
          userType: 'User',
        })
      }),
    )

    renderLogin()

    await waitFor(() => {
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    })
    const usernameField = screen.getByLabelText(/username/i)
    const passwordField = screen.getByLabelText(/password/i)
    await user.clear(usernameField)
    await user.type(usernameField, 'testuser')
    await user.clear(passwordField)
    await user.type(passwordField, 'testpass')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(
      () => {
        expect(capturedBody).not.toBeNull()
        expect(capturedBody).toEqual({ userName: 'testuser', password: 'testpass' })
      },
      { timeout: 3000 },
    )
  })

  it('handles login error and shows error message', async () => {
    const user = userEvent.setup()

    server.use(
      http.post('*/api/auth/authenticate', () => {
        return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }),
    )

    renderLogin()

    await waitFor(() => {
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    })
    const usernameField = screen.getByLabelText(/username/i)
    const passwordField = screen.getByLabelText(/password/i)
    await user.clear(usernameField)
    await user.type(usernameField, 'wronguser')
    await user.clear(passwordField)
    await user.type(passwordField, 'wrongpass')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(
      () => {
        expect(screen.getByText(/login failed/i)).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})

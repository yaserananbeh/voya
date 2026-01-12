import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserInfoForm } from '@/pages/Checkout/components/UserInfoForm'
import { NotificationProvider } from '@/providers/NotificationProvider'

const renderUserInfoForm = (props: Parameters<typeof UserInfoForm>[0]) => {
  return render(
    <NotificationProvider>
      <UserInfoForm {...props} />
    </NotificationProvider>,
  )
}

describe('UserInfoForm Validation', () => {
  it('renders all form fields', async () => {
    renderUserInfoForm({
      initialValues: { customerName: '', paymentMethod: '', specialRequests: '' },
      onSubmit: vi.fn(),
      submitting: false,
    })

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/payment method/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for empty customer name', async () => {
    const user = userEvent.setup()
    renderUserInfoForm({
      initialValues: { customerName: '', paymentMethod: '', specialRequests: '' },
      onSubmit: vi.fn(),
      submitting: false,
    })

    const submitButton = screen.getByRole('button', { name: /confirm/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/customer name is required/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for empty payment method', async () => {
    const user = userEvent.setup()
    renderUserInfoForm({
      initialValues: { customerName: 'John Doe', paymentMethod: '', specialRequests: '' },
      onSubmit: vi.fn(),
      submitting: false,
    })

    const submitButton = screen.getByRole('button', { name: /confirm/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/payment method is required/i)).toBeInTheDocument()
    })
  })

  it('validates special requests max length', async () => {
    const longText = 'a'.repeat(501)

    renderUserInfoForm({
      initialValues: { customerName: 'John Doe', paymentMethod: 'Cash', specialRequests: '' },
      onSubmit: vi.fn(),
      submitting: false,
    })

    const specialRequestsField = await screen.findByLabelText(/special requests/i)
    fireEvent.change(specialRequestsField, { target: { value: longText } })

    const submitButton = screen.getByRole('button', { name: /confirm/i })
    await userEvent.click(submitButton)

    await waitFor(
      () => {
        expect(
          screen.getByText(/special requests must be less than 500 characters/i),
        ).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn().mockResolvedValue(undefined)

    renderUserInfoForm({
      initialValues: { customerName: '', paymentMethod: '', specialRequests: '' },
      onSubmit,
      submitting: false,
    })

    const fullNameField = await screen.findByLabelText(/full name/i)
    await user.clear(fullNameField)
    await user.type(fullNameField, 'John Doe')
    const paymentMethodField = await screen.findByLabelText(/payment method/i)
    await user.click(paymentMethodField)
    await user.click(screen.getByText('Cash'))
    await user.click(screen.getByRole('button', { name: /confirm/i }))

    await waitFor(
      () => {
        expect(onSubmit).toHaveBeenCalledWith({
          customerName: 'John Doe',
          paymentMethod: 'Cash',
          specialRequests: '',
        })
      },
      { timeout: 3000 },
    )
  })
})

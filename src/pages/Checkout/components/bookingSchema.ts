import * as Yup from 'yup'
import { VALIDATION } from '@/constants'

export const bookingSchema = Yup.object({
  customerName: Yup.string().trim().required('Customer name is required'),
  paymentMethod: Yup.string().trim().required('Payment method is required'),
  specialRequests: Yup.string()
    .trim()
    .max(
      VALIDATION.BOOKING.SPECIAL_REQUESTS_MAX_LENGTH,
      `Special requests must be less than ${VALIDATION.BOOKING.SPECIAL_REQUESTS_MAX_LENGTH} characters`,
    ),
})

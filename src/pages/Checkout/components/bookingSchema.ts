import * as Yup from 'yup'

export const bookingSchema = Yup.object({
  customerName: Yup.string().trim().required('Customer name is required'),
  paymentMethod: Yup.string().trim().required('Payment method is required'),
  specialRequests: Yup.string()
    .trim()
    .max(500, 'Special requests must be less than 500 characters'),
})

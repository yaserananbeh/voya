import * as Yup from 'yup'
import { VALIDATION } from '@/constants'
import type { TFunction } from 'i18next'

export const createBookingSchema = (t: TFunction) =>
  Yup.object({
    customerName: Yup.string().trim().required(t('validation.customerNameRequired')),
    paymentMethod: Yup.string().trim().required(t('validation.paymentMethodRequired')),
    specialRequests: Yup.string()
      .trim()
      .max(
        VALIDATION.BOOKING.SPECIAL_REQUESTS_MAX_LENGTH,
        t('validation.specialRequestsMaxLength', {
          max: VALIDATION.BOOKING.SPECIAL_REQUESTS_MAX_LENGTH,
        }),
      ),
  })

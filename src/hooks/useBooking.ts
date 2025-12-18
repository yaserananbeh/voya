import { useMemo, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetBookingByIdQuery } from '@/api/checkout'
import { useNotification } from './useNotification'
import { useTranslation } from 'react-i18next'

export function useBooking() {
  const { bookingId } = useParams<{ bookingId: string }>()
  const navigate = useNavigate()
  const { showError } = useNotification()
  const { t } = useTranslation()

  const id = useMemo(() => {
    const parsed = Number(bookingId)
    return Number.isFinite(parsed) ? parsed : null
  }, [bookingId])

  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useGetBookingByIdQuery(id!, {
    skip: !id,
  })

  useEffect(() => {
    if (isError && id) {
      showError(t('confirmation.failedToLoadBooking'))
    }
  }, [isError, id, showError, t])

  const goToCheckout = useCallback(() => {
    void navigate('/checkout')
  }, [navigate])

  return {
    booking,
    isLoading,
    isError,
    error,
    bookingId: id,
    goToCheckout,
  }
}

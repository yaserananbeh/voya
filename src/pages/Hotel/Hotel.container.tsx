import { useParams } from 'react-router-dom'
import {
  useGetHotelQuery,
  useGetHotelGalleryQuery,
  useGetHotelRoomsQuery,
  useGetHotelReviewsQuery,
} from '@/api/hotels'
import { HotelPresentational } from './Hotel.presentational'
import { useTranslation } from 'react-i18next'

export function HotelContainer() {
  const { t } = useTranslation()
  const { hotelId } = useParams()
  const id = Number(hotelId)

  const { data: hotel, isLoading, isError } = useGetHotelQuery(id, { skip: Number.isNaN(id) })
  const { data: gallery } = useGetHotelGalleryQuery(id, { skip: Number.isNaN(id) })
  const { data: rooms } = useGetHotelRoomsQuery(id, { skip: Number.isNaN(id) })
  const { data: reviews } = useGetHotelReviewsQuery(id, { skip: Number.isNaN(id) })

  if (Number.isNaN(id)) {
    return <HotelPresentational error={t('hotel.invalidHotelId')} />
  }

  return (
    <HotelPresentational
      hotel={hotel}
      gallery={gallery}
      rooms={rooms}
      reviews={reviews}
      isLoading={isLoading}
      isError={isError}
    />
  )
}

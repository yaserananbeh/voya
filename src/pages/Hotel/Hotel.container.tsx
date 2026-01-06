import { useParams } from 'react-router-dom'
import {
  useGetHotelQuery,
  useGetHotelGalleryQuery,
  useGetHotelRoomsQuery,
  useGetHotelReviewsQuery,
} from '@/api/hotels'
import { HotelPresentational } from './Hotel.presentational'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks'

export function HotelContainer() {
  const { t } = useTranslation()
  const { hotelId } = useParams()
  const id = Number(hotelId)

  const { data: hotel, isLoading, isError } = useGetHotelQuery(id, { skip: Number.isNaN(id) })

  // Set dynamic page title based on hotel name
  usePageTitle('pages.hotel', hotel?.hotelName || hotel?.name)
  const { data: gallery, isLoading: galleryLoading } = useGetHotelGalleryQuery(id, {
    skip: Number.isNaN(id),
  })
  const { data: rooms, isLoading: roomsLoading } = useGetHotelRoomsQuery(id, {
    skip: Number.isNaN(id),
  })
  const { data: reviews, isLoading: reviewsLoading } = useGetHotelReviewsQuery(id, {
    skip: Number.isNaN(id),
  })

  if (Number.isNaN(id)) {
    return <HotelPresentational error={t('hotel.invalidHotelId')} />
  }

  const isLoadingData = isLoading || galleryLoading || roomsLoading || reviewsLoading

  return (
    <HotelPresentational
      hotel={hotel}
      gallery={gallery}
      rooms={rooms}
      reviews={reviews}
      isLoading={isLoadingData}
      isError={isError}
    />
  )
}

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
import { SEO } from '@/components/common'
import { useLocation } from 'react-router-dom'

export function HotelContainer() {
  const { t } = useTranslation()
  const { hotelId } = useParams()
  const location = useLocation()
  const id = Number(hotelId)

  const { data: hotel, isLoading, isError } = useGetHotelQuery(id, { skip: Number.isNaN(id) })

  usePageTitle('pages.hotel', hotel?.hotelName || hotel?.name)

  const { data: gallery, isLoading: galleryLoading } = useGetHotelGalleryQuery(id, {
    skip: Number.isNaN(id),
  })

  const hotelName = hotel?.hotelName || hotel?.name || ''
  const hotelDescription = hotel?.description || ''
  const hotelImage = hotel?.imageUrl || gallery?.[0]?.url || ''

  const seoTitle = hotelName ? `${hotelName} - ${t('seo.hotel.title')}` : t('seo.hotel.title')
  const seoDescription = hotelDescription || t('seo.hotel.description')
  const seoKeywords = hotelName
    ? `${t('seo.hotel.keywords')}, ${hotelName}`
    : t('seo.hotel.keywords')
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
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        image={hotelImage}
        canonical={`${window.location.origin}${location.pathname}`}
      />
      <HotelPresentational
        hotel={hotel}
        gallery={gallery}
        rooms={rooms}
        reviews={reviews}
        isLoading={isLoadingData}
        isError={isError}
      />
    </>
  )
}

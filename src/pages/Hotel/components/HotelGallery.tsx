import { useState } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import type { HotelGalleryPhotoDto } from '@/pages/Hotel/api'

type Props = {
  images: HotelGalleryPhotoDto[] | string[]
  hotelName?: string
}

export function HotelGallery({ images, hotelName }: Props) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const items = images
    .map((img) => {
      const url = typeof img === 'string' ? img : img.url
      return url
    })
    .filter((url) => url && !failedImages.has(url))
    .map((url, index) => ({
      original: url,
      thumbnail: url,
      description: hotelName ? `${hotelName} - Image ${index + 1}` : `Hotel image ${index + 1}`,
      onError: () => {
        setFailedImages((prev) => new Set(prev).add(url))
      },
    }))

  if (items.length === 0) {
    return null
  }

  return (
    <ImageGallery
      items={items}
      showPlayButton={false}
      renderItem={(item) => {
        const altText =
          item.description || (hotelName ? `${hotelName} - Gallery image` : 'Hotel gallery image')
        return <img src={item.original} alt={altText} className="image-gallery-image" />
      }}
      renderThumbInner={(item) => {
        const altText =
          item.description ||
          (hotelName ? `${hotelName} - Gallery thumbnail` : 'Hotel gallery thumbnail')
        return <img src={item.thumbnail} alt={altText} className="image-gallery-thumbnail-image" />
      }}
    />
  )
}

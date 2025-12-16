import { useState } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import type { HotelGalleryPhotoDto } from '@/api/hotels'

type Props = {
  images: HotelGalleryPhotoDto[] | string[]
}

export function HotelGallery({ images }: Props) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const items = images
    .map((img) => {
      const url = typeof img === 'string' ? img : img.url
      return url
    })
    .filter((url) => url && !failedImages.has(url))
    .map((url) => ({
      original: url,
      thumbnail: url,
      onError: () => {
        setFailedImages((prev) => new Set(prev).add(url))
      },
    }))

  if (items.length === 0) {
    return null // Or return a placeholder message
  }

  return <ImageGallery items={items} showPlayButton={false} />
}

import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import type { HotelGalleryPhotoDto } from '@/api/hotels'

type Props = {
  images: HotelGalleryPhotoDto[] | string[]
}

export function HotelGallery({ images }: Props) {
  const items = images.map((img) => {
    const url = typeof img === 'string' ? img : img.url
    return { original: url, thumbnail: url }
  })

  return <ImageGallery items={items} showPlayButton={false} />
}

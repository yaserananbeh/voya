import { SafeImage } from '@/components/common/SafeImage'

type RoomCardImageProps = {
  imageUrl?: string | null
  alt: string
  height?: number
}

export function RoomCardImage({ imageUrl, alt, height = 180 }: RoomCardImageProps) {
  return <SafeImage src={imageUrl} alt={alt} height={height} />
}

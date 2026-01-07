import { CardMedia, Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'

type ResponsiveValue =
  | number
  | string
  | {
      xs?: number | string
      sm?: number | string
      md?: number | string
      lg?: number | string
      xl?: number | string
    }

type HotelCardImageProps = {
  imageUrl?: string | null
  alt: string
  width?: ResponsiveValue
  height?: ResponsiveValue
}

export function HotelCardImage({
  imageUrl,
  alt,
  width = { xs: '100%', sm: 160 },
  height = { xs: 200, sm: 120 },
}: HotelCardImageProps) {
  const sxProps: SxProps<Theme> = {
    width,
    height,
    borderRadius: 1,
    ...(imageUrl ? { objectFit: 'cover' } : { bgcolor: 'action.hover' }),
  }

  if (imageUrl) {
    return <CardMedia component="img" image={imageUrl} alt={alt} sx={sxProps} />
  }

  return <Box sx={sxProps} aria-label={`${alt} - no image available`} />
}

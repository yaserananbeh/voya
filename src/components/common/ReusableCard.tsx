import { Card, CardContent, CardActions, CardMedia } from '@mui/material'
import type { CardProps } from '@mui/material'
import type { ReactNode } from 'react'

type ReusableCardProps = CardProps & {
  image?: string
  imageAlt?: string
  imageHeight?: number
  actions?: ReactNode
  children: ReactNode
}

export function ReusableCard({
  image,
  imageAlt,
  imageHeight = 140,
  actions,
  children,
  ...cardProps
}: ReusableCardProps) {
  return (
    <Card {...cardProps}>
      {image && <CardMedia component="img" height={imageHeight} image={image} alt={imageAlt} />}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  )
}

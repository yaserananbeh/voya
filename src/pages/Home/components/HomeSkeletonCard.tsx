// src/pages/Home/components/HomeSkeletonCard.tsx
import { Card, CardContent, Skeleton } from '@mui/material'

export function HomeSkeletonCard() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={140} />
      <CardContent>
        <Skeleton width="60%" />
        <Skeleton width="40%" />
        <Skeleton width="80%" />
      </CardContent>
    </Card>
  )
}

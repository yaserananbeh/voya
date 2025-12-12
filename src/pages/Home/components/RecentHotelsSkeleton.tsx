import { Stack, Skeleton } from '@mui/material'

export default function RecentHotelsSkeleton() {
  return (
    <Stack direction="row" spacing={2}>
      <Skeleton variant="rectangular" width={180} height={120} />
      <Skeleton variant="rectangular" width={180} height={120} />
      <Skeleton variant="rectangular" width={180} height={120} />
    </Stack>
  )
}

import { Alert, Stack } from '@mui/material'

export function CheckoutActions({ error }: { error?: string | null }) {
  return <Stack sx={{ mt: 2 }}>{error ? <Alert severity="error">{error}</Alert> : null}</Stack>
}

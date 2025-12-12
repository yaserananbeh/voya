import { Paper, Typography, Stack, Divider } from '@mui/material'

export function FiltersSidebar() {
  return (
    <Paper elevation={1} sx={{ p: 2, position: 'sticky', top: 16 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Filters</Typography>
        <Divider />
        <Typography variant="body2" color="text.secondary">
          Filters UI will go here…
        </Typography>
      </Stack>
    </Paper>
  )
}

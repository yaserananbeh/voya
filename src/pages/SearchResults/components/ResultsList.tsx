import { Paper, Typography, Stack } from '@mui/material'

export function ResultsList() {
  return (
    <Stack spacing={2}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography variant="h6">Search Results</Typography>
        <Typography variant="body2" color="text.secondary">
          Hotel cards will go here…
        </Typography>
      </Paper>

      {/* mock items just to prove layout works */}
      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography>Mock Hotel 1</Typography>
      </Paper>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography>Mock Hotel 2</Typography>
      </Paper>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography>Mock Hotel 3</Typography>
      </Paper>
    </Stack>
  )
}

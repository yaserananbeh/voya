import { Box, Typography } from '@mui/material'
import { CounterButton } from '../buttons'

type GuestRoomRowProps = {
  label: string
  subtitle?: string
  value: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
}

export function GuestRoomRow({
  label,
  subtitle,
  value,
  onIncrement,
  onDecrement,
  min = 0,
}: GuestRoomRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: subtitle ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        mb: 1.5,
      }}
    >
      <Box>
        <Typography variant="subtitle1">{label}</Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CounterButton
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          value={value}
          min={min}
          aria-label={label}
        />
      </Box>
    </Box>
  )
}

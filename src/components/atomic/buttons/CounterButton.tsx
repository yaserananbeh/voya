import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

type CounterButtonProps = {
  onIncrement: () => void
  onDecrement: () => void
  value: number
  min?: number
  max?: number
  disabled?: boolean
  'aria-label'?: string
}

export function CounterButton({
  onIncrement,
  onDecrement,
  value,
  min = 0,
  max,
  disabled = false,
  'aria-label': ariaLabel,
}: CounterButtonProps) {
  const canDecrement = !disabled && value > min
  const canIncrement = !disabled && (max === undefined || value < max)

  return (
    <>
      <IconButton
        size="small"
        onClick={onDecrement}
        disabled={!canDecrement}
        aria-label={`${ariaLabel || 'Decrease'}: ${value - 1}`}
      >
        <RemoveIcon fontSize="small" aria-hidden="true" />
      </IconButton>
      <Typography minWidth={24} textAlign="center" aria-label={`${ariaLabel || 'Value'}: ${value}`}>
        {value}
      </Typography>
      <IconButton
        size="small"
        onClick={onIncrement}
        disabled={!canIncrement}
        aria-label={`${ariaLabel || 'Increase'}: ${value + 1}`}
      >
        <AddIcon fontSize="small" aria-hidden="true" />
      </IconButton>
    </>
  )
}

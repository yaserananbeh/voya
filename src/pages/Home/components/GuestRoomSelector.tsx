import { useState } from 'react'
import { Box, Button, IconButton, Popover, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

type GuestRoomSelectorProps = {
  adults: number
  children: number
  rooms: number
  onChange: (next: { adults: number; children: number; rooms: number }) => void
}

export function GuestRoomSelector({ adults, children, rooms, onChange }: GuestRoomSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const open = Boolean(anchorEl)
  const id = open ? 'guest-room-popover' : undefined

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleIncrement = (field: 'adults' | 'children' | 'rooms') => {
    const next = { adults, children, rooms }
    next[field] = next[field] + 1
    if (field === 'adults' && next.adults < 1) next.adults = 1
    if (field === 'rooms' && next.rooms < 1) next.rooms = 1
    onChange(next)
  }

  const handleDecrement = (field: 'adults' | 'children' | 'rooms') => {
    const next = { adults, children, rooms }
    next[field] = next[field] - 1
    if (field === 'adults' && next.adults < 1) next.adults = 1
    if (field === 'children' && next.children < 0) next.children = 0
    if (field === 'rooms' && next.rooms < 1) next.rooms = 1
    onChange(next)
  }

  const summary = `${adults} adult${adults !== 1 ? 's' : ''}${
    children > 0 ? `, ${children} child${children !== 1 ? 'ren' : ''}` : ''
  } • ${rooms} room${rooms !== 1 ? 's' : ''}`

  return (
    <>
      <Button
        aria-describedby={id}
        variant="outlined"
        size="small"
        startIcon={<PeopleIcon />}
        onClick={handleOpen}
        sx={{ minWidth: 220, justifyContent: 'flex-start' }}
      >
        {summary}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, minWidth: 260 }}>
          <Row
            label="Adults"
            subtitle="Ages 18+"
            value={adults}
            onDec={() => handleDecrement('adults')}
            onInc={() => handleIncrement('adults')}
          />
          <Row
            label="Children"
            subtitle="Ages 0–17"
            value={children}
            onDec={() => handleDecrement('children')}
            onInc={() => handleIncrement('children')}
          />
          <Row
            label="Rooms"
            value={rooms}
            onDec={() => handleDecrement('rooms')}
            onInc={() => handleIncrement('rooms')}
          />
        </Box>
      </Popover>
    </>
  )
}

type RowProps = {
  label: string
  subtitle?: string
  value: number
  onDec: () => void
  onInc: () => void
}

function Row({ label, subtitle, value, onDec, onInc }: RowProps) {
  const disabled =
    (label === 'Adults' && value <= 1) ||
    (label === 'Rooms' && value <= 1) ||
    (label === 'Children' && value <= 0)

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
        <IconButton size="small" onClick={onDec} disabled={disabled}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography minWidth={24} textAlign="center">
          {value}
        </Typography>
        <IconButton size="small" onClick={onInc}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}

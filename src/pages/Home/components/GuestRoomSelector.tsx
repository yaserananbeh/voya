import { useState } from 'react'
import { Box, Button, IconButton, Popover, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useTranslation } from 'react-i18next'

type GuestRoomSelectorProps = {
  adults: number
  children: number
  rooms: number
  onChange: (next: { adults: number; children: number; rooms: number }) => void
}

export function GuestRoomSelector({ adults, children, rooms, onChange }: GuestRoomSelectorProps) {
  const { t } = useTranslation()
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

  const summary = `${adults} ${adults !== 1 ? t('guestRoom.adultsPlural') : t('guestRoom.adult')}${
    children > 0
      ? `, ${children} ${children !== 1 ? t('guestRoom.childrenPlural') : t('guestRoom.child')}`
      : ''
  } • ${rooms} ${rooms !== 1 ? t('guestRoom.roomsPlural') : t('guestRoom.room')}`

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
            label={t('guestRoom.adults')}
            subtitle={t('guestRoom.adultsAges')}
            value={adults}
            onDec={() => handleDecrement('adults')}
            onInc={() => handleIncrement('adults')}
          />
          <Row
            label={t('guestRoom.children')}
            subtitle={t('guestRoom.childrenAges')}
            value={children}
            onDec={() => handleDecrement('children')}
            onInc={() => handleIncrement('children')}
          />
          <Row
            label={t('guestRoom.rooms')}
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
    ((label.includes('Adults') || label.includes('بالغين')) && value <= 1) ||
    ((label.includes('Rooms') || label.includes('غرف')) && value <= 1) ||
    ((label.includes('Children') || label.includes('أطفال')) && value <= 0)

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

import { useState } from 'react'
import { Box, Button, Popover, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import { useTranslation } from 'react-i18next'
import { GuestRoomRow } from '@/components/atomic'

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
        aria-expanded={open}
        aria-haspopup="true"
        variant="outlined"
        size="small"
        startIcon={<PeopleIcon aria-hidden="true" />}
        onClick={handleOpen}
        sx={{
          minWidth: { xs: '100%', md: 220 },
          width: { xs: '100%', md: 'auto' },
          justifyContent: 'flex-start',
        }}
      >
        {summary}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        role="dialog"
        aria-labelledby="guest-room-title"
      >
        <Box sx={{ p: 2, minWidth: 260 }}>
          <Typography id="guest-room-title" variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
            {t('guestRoom.selectGuests') || 'Select Guests & Rooms'}
          </Typography>
          <GuestRoomRow
            label={t('guestRoom.adults')}
            subtitle={t('guestRoom.adultsAges')}
            value={adults}
            onIncrement={() => handleIncrement('adults')}
            onDecrement={() => handleDecrement('adults')}
            min={1}
          />
          <GuestRoomRow
            label={t('guestRoom.children')}
            subtitle={t('guestRoom.childrenAges')}
            value={children}
            onIncrement={() => handleIncrement('children')}
            onDecrement={() => handleDecrement('children')}
            min={0}
          />
          <GuestRoomRow
            label={t('guestRoom.rooms')}
            value={rooms}
            onIncrement={() => handleIncrement('rooms')}
            onDecrement={() => handleDecrement('rooms')}
            min={1}
          />
        </Box>
      </Popover>
    </>
  )
}

import { TextField, InputAdornment, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import type { SxProps, Theme } from '@mui/material'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  sx?: SxProps<Theme>
}

export function SearchBar({ value, onChange, label = 'Search', placeholder, sx }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 2, ...sx }}
      InputProps={{
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => onChange('')}
              edge="end"
              aria-label="clear search"
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
    />
  )
}

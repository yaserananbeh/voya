import { TextField, MenuItem, InputAdornment } from '@mui/material'
import type { ReactNode, FocusEvent } from 'react'

type Option = {
  value: string
  label: string
}

type FormSelectFieldProps = {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string | false
  options: Option[]
  fullWidth?: boolean
  autoComplete?: string
  startAdornment?: ReactNode
  'aria-label'?: string
  'aria-required'?: boolean
  'aria-invalid'?: boolean
}

export function FormSelectField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error = false,
  helperText,
  options,
  fullWidth = true,
  autoComplete,
  startAdornment,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
}: FormSelectFieldProps) {
  return (
    <TextField
      select
      name={name}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      required={ariaRequired}
      InputProps={
        startAdornment
          ? {
              startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
            }
          : undefined
      }
      inputProps={{
        'aria-label': ariaLabel,
        'aria-invalid': ariaInvalid,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

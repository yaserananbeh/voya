import { Button, alpha, useTheme } from '@mui/material'
import type { ButtonProps } from '@mui/material'

type SubmitButtonProps = Omit<ButtonProps, 'type'> & {
  loading?: boolean
  loadingText?: string
}

export function SubmitButton({
  children,
  loading = false,
  loadingText,
  disabled,
  sx,
  ...props
}: SubmitButtonProps) {
  const theme = useTheme()

  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled || loading}
      size="large"
      fullWidth
      sx={{
        py: 1.5,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.main} 90%)`,
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'none',
        '&:hover': {
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.light} 90%)`,
        },
        '&:disabled': {
          background: alpha(theme.palette.primary.main, 0.5),
        },
        ...sx,
      }}
      {...props}
    >
      {loading ? loadingText || children : children}
    </Button>
  )
}

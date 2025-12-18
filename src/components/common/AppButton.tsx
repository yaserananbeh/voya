import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'
import { forwardRef } from 'react'

type AppButtonProps = ButtonProps & {
  loading?: boolean
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ loading, disabled, children, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={disabled || loading} {...props}>
        {loading ? 'Loading...' : children}
      </Button>
    )
  },
)

AppButton.displayName = 'AppButton'

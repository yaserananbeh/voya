import type { ComponentType } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

type LoadingState = {
  isLoading?: boolean
  isFetching?: boolean
  error?: unknown
}

type WithLoadingOptions = {
  LoadingComponent?: ComponentType
  ErrorComponent?: ComponentType<{ error: unknown }>
  showError?: boolean
}

export function withLoading<P extends object>(
  Component: ComponentType<P>,
  options: WithLoadingOptions = {},
) {
  const { LoadingComponent, ErrorComponent, showError = true } = options

  return function WithLoadingComponent(props: P & LoadingState) {
    const { isLoading, isFetching, error, ...componentProps } = props

    if (error && showError) {
      if (ErrorComponent) {
        return <ErrorComponent error={error} />
      }
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Typography color="error">
            {error instanceof Error ? error.message : 'An error occurred'}
          </Typography>
        </Box>
      )
    }

    if (isLoading) {
      if (LoadingComponent) {
        return <LoadingComponent />
      }
      return (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}
        >
          <CircularProgress />
        </Box>
      )
    }

    return (
      <>
        <Component {...(componentProps as P)} />
        {isFetching && !isLoading && (
          <Box
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 9999,
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )}
      </>
    )
  }
}

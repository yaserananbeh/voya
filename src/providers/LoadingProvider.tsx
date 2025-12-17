import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { CircularProgress, Box } from '@mui/material'

type LoadingContextValue = {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}

type LoadingProviderProps = {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const withLoading = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
    setIsLoading(true)
    try {
      return await fn()
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, withLoading }}>
      {children}
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={64} />
        </Box>
      )}
    </LoadingContext.Provider>
  )
}

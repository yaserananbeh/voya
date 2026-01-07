import { Suspense, type ReactNode } from 'react'
import { Box } from '@mui/material'

import { VoyaLoader } from '@/components'

export const SuspenseLayout = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <VoyaLoader size="medium" />
      </Box>
    }
  >
    {children}
  </Suspense>
)

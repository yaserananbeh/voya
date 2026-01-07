import type { ReactNode } from 'react'
import { Box, Paper, Typography, Stack, Divider, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useMediaQuery, useTheme } from '@mui/material'
import { FilterProvider } from '@/pages/SearchResults/providers'

type FilterContainerProps = {
  children: ReactNode
  title?: string
  onClose?: () => void
}

export function FilterContainer({ children, title = 'Filters', onClose }: FilterContainerProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <FilterProvider onClose={onClose}>
      <Paper elevation={1} sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            {isMobile && onClose && (
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          {children}
        </Stack>
      </Paper>
    </FilterProvider>
  )
}

type FilterSectionProps = {
  children: ReactNode
  showDivider?: boolean
}

export function FilterSection({ children, showDivider = true }: FilterSectionProps) {
  return (
    <>
      <Box>{children}</Box>
      {showDivider && <Divider />}
    </>
  )
}

FilterContainer.Section = FilterSection

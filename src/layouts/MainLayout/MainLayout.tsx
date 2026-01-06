import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { MainHeader, MainFooter } from '@/components/layout'
import { ScrollToTop } from '@/components/ScrollToTop'
import { SkipLink } from '@/components/common'

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <SkipLink />
      <MainHeader />
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{
          minHeight: 'calc(100vh - 64px)',
          pt: 2,
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Outlet />
      </Box>
      <MainFooter />
    </>
  )
}

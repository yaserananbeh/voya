import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { MainHeader, MainFooter } from '@/components/layout'
import { ScrollToTop } from '@/components/ScrollToTop'

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <MainHeader />
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 64px)',
          pt: 2,
        }}
      >
        <Outlet />
      </Box>
      <MainFooter />
    </>
  )
}

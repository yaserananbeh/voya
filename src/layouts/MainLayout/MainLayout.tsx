import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import MainHeader from '@/components/layout/MainHeader'
import { MainFooter } from '@/components/layout/MainFooter'

export default function MainLayout() {
  return (
    <>
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

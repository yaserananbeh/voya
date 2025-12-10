import LogoutBtn from '@/components/layout/LogoutBtn'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      {/* Header / Navbar */}
      <main>
        <LogoutBtn />
        <Outlet />
      </main>
    </>
  )
}

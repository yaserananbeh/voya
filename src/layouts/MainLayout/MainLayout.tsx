import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      {/* Header / Navbar */}
      <main>
        <Outlet />
      </main>
    </>
  )
}

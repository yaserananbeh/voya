import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">/* side nav here */</aside>

      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  )
}

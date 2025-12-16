# 🌐 Application Routes (Voya)

This document describes all public and admin routes managed by React Router. The router uses **lazy loading**, **layout routes**, and **Suspense boundaries** for optimal performance.

---

## 📁 Public Routes (MainLayout)

All public pages render inside the main layout:

```
MainLayout → <Outlet/>
```

| Page           | Path                       | Notes                               |
| -------------- | -------------------------- | ----------------------------------- |
| Home           | `/home`                    | Default landing (redirect from `/`) |
| Login          | `/login`                   | User login page                     |
| Search Results | `/search`                  | Supports query parameters           |
| Hotel Details  | `/hotel/:hotelId`          | Dynamic route                       |
| Checkout       | `/checkout`                | Booking step                        |
| Confirmation   | `/confirmation/:bookingId` | Dynamic route                       |
| 404 Not Found  | `*`                        | Catch-all route                     |

### 🔁 Redirect Rules

| From | To      |
| ---- | ------- |
| `/`  | `/home` |

---

## 🛠 Admin Routes (AdminLayout)

All admin pages render inside the admin layout:

```
AdminLayout → <Outlet/>
```

### 📌 Admin Landing Behavior

| From     | To                 |
| -------- | ------------------ |
| `/admin` | `/admin/dashboard` |

### Admin Route List

| Page              | Path               | Notes          |
| ----------------- | ------------------ | -------------- |
| Dashboard         | `/admin/dashboard` | Admin overview |
| Cities Management | `/admin/cities`    | CRUD grid      |
| Hotels Management | `/admin/hotels`    | CRUD grid      |
| Rooms Management  | `/admin/rooms`     | CRUD grid      |

---

## 📌 Dynamic Route Parameters

| Param        | Used In                    | Description                |
| ------------ | -------------------------- | -------------------------- |
| `:hotelId`   | `/hotel/:hotelId`          | Loads hotel details        |
| `:bookingId` | `/confirmation/:bookingId` | Loads booking confirmation |

---

## 📜 Route Tree Overview

```
/
 ├── (redirect) → /home
 ├── login
 ├── home
 ├── search
 ├── hotel/:hotelId
 ├── checkout
 ├── confirmation/:bookingId
 └── *

/admin
 ├── (redirect) → /admin/dashboard
 ├── dashboard
 ├── cities
 ├── hotels
 └── rooms
```

---

## ⚙️ Suspense & Lazy Loading

All routes are lazy-loaded using:

```ts
const Home = lazy(() => import('@/pages/Home'))
```

Layouts are wrapped in Suspense:

```tsx
<Suspense
  fallback={
    <div>
      <VoyaLoader />
    </div>
  }
>
  <MainLayout />
</Suspense>
```

This ensures:

- Faster initial load (code-splitting)
- Smooth transitions
- Clean layout management via `<Outlet />`

---

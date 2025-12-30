# Feature 6: Admin Dashboard

> **TRUE Incremental Development**: Build the Admin Dashboard one component at a time, adding translations, types, and API as you go.

**Navigation**: [← Back to Index](00-README.md) | [← Previous: Feature 5](07-Feature-05-Checkout.md) | [Next: Polish & Quality →](09-Polish-Quality.md)

---

## 17. Feature 6: Admin Dashboard

> **TRUE Incremental Development**: Build the Admin Dashboard one component at a time, adding translations, types, and API as you go. **NOT all at once!**

### 🎯 The Incremental Development Pattern

**How Real Developers Build Admin Dashboard**:

1. **Create minimal AdminLayout** (sidebar navigation)
2. **Add admin routes** → Test it works
3. **Build Dashboard page**:
   - Create page (minimal)
   - Add translations
   - Add API endpoints (getCities, getAdminHotels, getRoomsAdmin)
   - Add types
   - Enhance page to display stats
   - Test
4. **Build Cities page**:
   - Create page (minimal - just list)
   - Add translations
   - Add API endpoints (getCities, createCity)
   - Add types
   - Enhance to display DataGrid
   - Add DeleteConfirmDialog component (when delete is needed)
   - Add CityForm component (when create/edit is needed)
   - Add API endpoints (updateCity, deleteCity)
   - Add remaining translations
   - Test
5. **Build Hotels page** (same pattern as Cities)
6. **Build Rooms page** (same pattern as Cities)
7. **Build common components** (DeleteConfirmDialog, PhotoUploader) as pages need them

**Key Principle**: Each component is built, tested, and has its dependencies (translations, types, API) added **only when that component needs them**.

### What We'll Build (Incrementally)

- ✅ AdminLayout component (minimal → full)
- ✅ Dashboard page (build → add API → add translations → test)
- ✅ Cities page (build → add API → add form → add translations → test)
- ✅ Hotels page (build → add API → add form → add translations → test)
- ✅ Rooms page (build → add API → add form → add translations → test)
- ✅ Common components (DeleteConfirmDialog, PhotoUploader) as needed
- ✅ Admin API endpoints (added incrementally as pages need them)

Let's start building incrementally!

### 17.1 Step 1: Create Minimal AdminLayout

Start with the absolute minimum - just a basic layout with sidebar:

**src/layouts/AdminLayout/AdminLayout.tsx**:

```typescript
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import HotelIcon from '@mui/icons-material/Hotel'
import BedIcon from '@mui/icons-material/Bed'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const DRAWER_WIDTH = 240

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/admin/cities', label: 'Cities', icon: <LocationCityIcon /> },
    { path: '/admin/hotels', label: 'Hotels', icon: <HotelIcon /> },
    { path: '/admin/rooms', label: 'Rooms', icon: <BedIcon /> },
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ width: DRAWER_WIDTH }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
```

**src/layouts/AdminLayout/index.ts**:

```typescript
export { default } from './AdminLayout'
```

### 17.2 Step 2: Add Admin Routes

Update `src/routes/routes.tsx`:

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import SearchResults from '@/pages/SearchResults'
import Hotel from '@/pages/Hotel'
import Checkout from '@/pages/Checkout'
import Dashboard from '@/pages/Admin/Dashboard'
import Cities from '@/pages/Admin/Cities'
import Hotels from '@/pages/Admin/Hotels'
import Rooms from '@/pages/Admin/Rooms'
import { ProtectedRoute, AdminRoute, RedirectIfAuthenticated } from '@/components/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'hotel/:id', element: <Hotel /> },
      { path: 'checkout', element: <Checkout /> },
      {
        path: 'login',
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'cities', element: <Cities /> },
      { path: 'hotels', element: <Hotels /> },
      { path: 'rooms', element: <Rooms /> },
    ],
  },
])
```

**Note**: AdminRoute was already created in Feature 2 (Login & Authentication), so we don't need to create it again.

**Test**: `pnpm dev` → Login as Admin → Navigate to `/admin` → Should see admin layout with sidebar.

### 17.3 Step 3: Build Dashboard Page

Now let's build the Dashboard page. We'll start minimal, then add API and translations.

**Create minimal Dashboard page**:

**src/pages/Admin/Dashboard/Dashboard.tsx**:

```typescript
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('admin.dashboard.title', 'Admin Dashboard')}
      </Typography>
      <Typography variant="body1">
        {t('admin.dashboard.loading', 'Loading dashboard...')}
      </Typography>
    </Box>
  )
}
```

**src/pages/Admin/Dashboard/index.ts**:

```typescript
export { default } from './Dashboard'
```

**Add ONLY dashboard translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "admin": {
    "dashboard": {
      "title": "Admin Dashboard", // ← NEW: Add only this
      "loading": "Loading dashboard..." // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "admin": {
    "dashboard": {
      "title": "لوحة تحكم المسؤول", // ← NEW: Add only this
      "loading": "جاري تحميل لوحة التحكم..." // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys for the Dashboard page. Don't add all admin translations at once!

**Test**: Navigate to `/admin/dashboard` → Should see "Admin Dashboard" heading.

**Now add Dashboard API endpoints** (when Dashboard needs to display stats):

**Update Admin API** (add getCities, getAdminHotels, getRoomsAdmin endpoints):

**src/api/admin/index.ts**:

```typescript
import { baseApi } from '../baseApi'

export interface PaginationQuery {
  searchQuery?: string
  name?: string
  pageNumber?: number
  pageSize?: number
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<any[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/cities'
        return { url: '/cities', params }
      },
      providesTags: ['Cities'],
    }),

    getAdminHotels: build.query<any[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/hotels'
        return { url: '/hotels', params }
      },
      providesTags: ['Hotel'],
    }),

    getRoomsAdmin: build.query<any[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/rooms'
        return { url: '/rooms', params }
      },
      providesTags: ['Rooms'],
    }),
  }),
})

export const { useGetCitiesQuery, useGetAdminHotelsQuery, useGetRoomsAdminQuery } = adminApi
```

**Update baseApi tagTypes**:

**Update `src/api/baseApi.ts`**:

```typescript
tagTypes: ['Auth', 'Home', 'Hotel', 'Amenities', 'Cities', 'Rooms'], // Added Cities and Rooms tags
```

**Enhance Dashboard to use API and display stats**:

**src/pages/Admin/Dashboard/Dashboard.tsx**:

```typescript
import { useMemo } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { VoyaLoader } from '@/components'
import {
  LocationCity as CityIcon,
  Hotel as HotelIcon,
  Bed as BedIcon,
  CheckCircle as AvailableIcon,
} from '@mui/icons-material'
import { useGetCitiesQuery, useGetAdminHotelsQuery, useGetRoomsAdminQuery } from '@/api/admin'
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
  const { t } = useTranslation()
  const { data: cities = [], isLoading: citiesLoading } = useGetCitiesQuery()
  const { data: hotels = [], isLoading: hotelsLoading } = useGetAdminHotelsQuery()
  const { data: rooms = [], isLoading: roomsLoading } = useGetRoomsAdminQuery()

  const isLoading = citiesLoading || hotelsLoading || roomsLoading

  const stats = useMemo(() => {
    const totalCities = cities.length
    const totalHotels = hotels.length
    const totalRooms = rooms.length
    const totalAvailableRooms = rooms.filter((room: any) => room.availability !== false).length

    return {
      totalCities,
      totalHotels,
      totalRooms,
      totalAvailableRooms,
    }
  }, [cities, hotels, rooms])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <VoyaLoader size="medium" />
      </Box>
    )
  }

  const statCards = [
    {
      title: t('admin.dashboard.totalCities', 'Total Cities'),
      value: stats.totalCities,
      icon: <CityIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: t('admin.dashboard.totalHotels', 'Total Hotels'),
      value: stats.totalHotels,
      icon: <HotelIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: t('admin.dashboard.totalRooms', 'Total Rooms'),
      value: stats.totalRooms,
      icon: <BedIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: t('admin.dashboard.availableRooms', 'Available Rooms'),
      value: stats.totalAvailableRooms,
      icon: <AvailableIcon sx={{ fontSize: 40 }} />,
    },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {t('admin.dashboard.title')}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {statCards.map((card, index) => (
          <Card key={index} sx={{ minWidth: 200, flex: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {card.icon}
                <Box>
                  <Typography variant="h4">{card.value}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.title}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
```

**Add ONLY dashboard stats translations** (incremental - only add these 4 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 4 keys):

```json
{
  "admin": {
    "dashboard": {
      "title": "Admin Dashboard",
      "loading": "Loading dashboard...",
      "totalCities": "Total Cities", // ← NEW: Add only this
      "totalHotels": "Total Hotels", // ← NEW: Add only this
      "totalRooms": "Total Rooms", // ← NEW: Add only this
      "availableRooms": "Available Rooms" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 4 keys):

```json
{
  "admin": {
    "dashboard": {
      "title": "لوحة تحكم المسؤول",
      "loading": "جاري تحميل لوحة التحكم...",
      "totalCities": "إجمالي المدن", // ← NEW: Add only this
      "totalHotels": "إجمالي الفنادق", // ← NEW: Add only this
      "totalRooms": "إجمالي الغرف", // ← NEW: Add only this
      "availableRooms": "الغرف المتاحة" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 4 more translation keys for the Dashboard stats. Don't add all admin translations at once!

**Test**: Navigate to `/admin/dashboard` → Should see dashboard with stats cards loading → Then display stats.

**✅ Step 3 Complete**: Dashboard is working with API and translations!

### 17.4 Step 4: Build Cities Page

Same pattern - build page, add translations, add API, enhance, test:

**Create minimal Cities page** (just list):

**src/pages/Admin/Cities/Cities.tsx**:

```typescript
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function Cities() {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('admin.cities.title', 'Cities')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('admin.cities.loading', 'Loading cities...')}
      </Typography>
    </Box>
  )
}
```

**src/pages/Admin/Cities/index.ts**:

```typescript
export { default } from './Cities'
```

**Add ONLY cities page translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "admin": {
    // ... existing dashboard keys ...
    "cities": {
      "title": "Cities", // ← NEW: Add only this
      "loading": "Loading cities..." // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "admin": {
    // ... existing dashboard keys ...
    "cities": {
      "title": "المدن", // ← NEW: Add only this
      "loading": "جاري تحميل المدن..." // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys for the Cities page. Don't add all admin translations at once!

**Test**: Navigate to `/admin/cities` → Should see "Cities" heading.

**Now add Cities API endpoints** (when Cities page needs to display data):

**Update Admin API** (add getCities query - already added in Step 3, but add CityDto type):

**src/api/admin/index.ts** (add CityDto type):

```typescript
// ... existing code ...

export type CityDto = {
  id: number
  name: string
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ... existing endpoints ...
    getCities: build.query<CityDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/cities'
        return { url: '/cities', params }
      },
      providesTags: ['Cities'],
    }),
  }),
})
```

**Add CityDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface CityDto {
  id: number
  name: string
}
```

**Enhance Cities page to display DataGrid**:

**src/pages/Admin/Cities/Cities.tsx**:

```typescript
import { useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useGetCitiesQuery } from '@/api/admin'
import { useTranslation } from 'react-i18next'
import type { CityDto } from '@/api/admin'

export default function Cities() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const { data: cities = [], isLoading } = useGetCitiesQuery({
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  })

  const columns: GridColDef<CityDto>[] = [
    { field: 'name', headerName: t('admin.cities.name', 'Name'), width: 200, flex: 1 },
  ]

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('admin.cities.title')}
      </Typography>
      <TextField
        fullWidth
        label={t('admin.cities.search', 'Search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DataGrid<CityDto>
        rows={cities}
        columns={columns}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        getRowId={(row) => row.id}
        autoHeight
      />
    </Box>
  )
}
```

**Add ONLY cities list translations** (incremental - only add this 1 key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key):

```json
{
  "admin": {
    "cities": {
      "title": "Cities",
      "loading": "Loading cities...",
      "name": "Name", // ← NEW: Add only this
      "search": "Search" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key):

```json
{
  "admin": {
    "cities": {
      "title": "المدن",
      "loading": "جاري تحميل المدن...",
      "name": "الاسم", // ← NEW: Add only this
      "search": "بحث" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 2 more translation keys for the Cities list. Don't add all admin translations at once!

**Test**: Navigate to `/admin/cities` → Should see cities loading → Then display cities in DataGrid.

**Now add DeleteConfirmDialog component** (when Cities page needs delete functionality):

**Create DeleteConfirmDialog component**:

**src/pages/Admin/Cities/components/DeleteConfirmDialog.tsx**:

```typescript
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type DeleteConfirmDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  itemName?: string
}

export function DeleteConfirmDialog({ open, onClose, onConfirm, itemName }: DeleteConfirmDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('admin.deleteConfirm.title', 'Confirm Delete')}</DialogTitle>
      <DialogContent>
        <Typography>
          {t('admin.deleteConfirm.message', 'Are you sure you want to delete this item?')}
          {itemName && ` ${itemName}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('admin.deleteConfirm.cancel', 'Cancel')}</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {t('admin.deleteConfirm.delete', 'Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
```

**Add ONLY delete confirm translations** (incremental - only add these 4 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 4 keys):

```json
{
  "admin": {
    // ... existing keys ...
    "deleteConfirm": {
      "title": "Confirm Delete", // ← NEW: Add only this
      "message": "Are you sure you want to delete this item?", // ← NEW: Add only this
      "cancel": "Cancel", // ← NEW: Add only this
      "delete": "Delete" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 4 keys):

```json
{
  "admin": {
    // ... existing keys ...
    "deleteConfirm": {
      "title": "تأكيد الحذف", // ← NEW: Add only this
      "message": "هل أنت متأكد من حذف هذا العنصر؟", // ← NEW: Add only this
      "cancel": "إلغاء", // ← NEW: Add only this
      "delete": "حذف" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 4 new translation keys for the DeleteConfirmDialog component. Don't add all admin translations at once!

**Now add delete API endpoint** (when Cities page needs delete functionality):

**Update Admin API** (add deleteCity mutation):

**src/api/admin/index.ts** (add to existing file):

```typescript
// ... existing code ...

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ... existing endpoints ...
    deleteCity: build.mutation<void, number>({
      query: (id) => ({
        url: `/cities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cities'],
    }),
  }),
})

export const { useGetCitiesQuery, useDeleteCityMutation } = adminApi
```

**Enhance Cities page to add delete functionality**:

**src/pages/Admin/Cities/Cities.tsx** (add delete):

```typescript
import { useState } from 'react'
import { Box, Typography, TextField, IconButton } from '@mui/material'
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { useGetCitiesQuery, useDeleteCityMutation } from '@/api/admin'
import { useTranslation } from 'react-i18next'
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog'
import type { CityDto } from '@/api/admin'

export default function Cities() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: cities = [], isLoading } = useGetCitiesQuery({
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  })

  const [deleteCity] = useDeleteCityMutation()

  const handleDelete = async (id: number) => {
    await deleteCity(id).unwrap()
    setDeleteId(null)
  }

  const columns: GridColDef<CityDto>[] = [
    { field: 'name', headerName: t('admin.cities.name'), width: 200, flex: 1 },
    {
      field: 'actions',
      headerName: t('admin.cities.actions', 'Actions'),
      width: 100,
      renderCell: (params: GridRenderCellParams<CityDto>) => (
        <IconButton onClick={() => setDeleteId(params.row.id)} color="error" size="small">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('admin.cities.title')}
      </Typography>
      <TextField
        fullWidth
        label={t('admin.cities.search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DataGrid<CityDto>
        rows={cities}
        columns={columns}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        getRowId={(row) => row.id}
        autoHeight
      />
      <DeleteConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        itemName={deleteId ? cities.find((c) => c.id === deleteId)?.name : undefined}
      />
    </Box>
  )
}
```

**Add ONLY actions translation** (incremental - only add this 1 key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key):

```json
{
  "admin": {
    "cities": {
      // ... existing keys ...
      "actions": "Actions" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key):

```json
{
  "admin": {
    "cities": {
      // ... existing keys ...
      "actions": "الإجراءات" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 1 more translation key for the actions column. Don't add all admin translations at once!

**Test**: Navigate to `/admin/cities` → Click delete icon → Should show delete confirmation dialog → Confirm → Should delete city.

**Now add CityForm component** (when Cities page needs create/edit functionality):

**Create CityForm component** (minimal first):

**src/pages/Admin/Cities/components/CityForm.tsx**:

```typescript
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type CityFormProps = {
  open: boolean
  onClose: () => void
  onSubmit: (name: string) => Promise<void>
  cityId?: number
  initialName?: string
}

export function CityForm({ open, onClose, onSubmit, cityId, initialName = '' }: CityFormProps) {
  const { t } = useTranslation()
  const [name, setName] = useState(initialName)

  useEffect(() => {
    if (open) {
      setName(initialName)
    }
  }, [open, initialName])

  const handleSubmit = async () => {
    await onSubmit(name)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{cityId ? t('admin.cities.editCity', 'Edit City') : t('admin.cities.addCity', 'Add City')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t('admin.cities.name')}
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('admin.cities.cancel', 'Cancel')}</Button>
        <Button onClick={handleSubmit} variant="contained">
          {t('admin.cities.save', 'Save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
```

**Add ONLY city form translations** (incremental - only add these 3 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 3 keys):

```json
{
  "admin": {
    "cities": {
      // ... existing keys ...
      "addCity": "Add City", // ← NEW: Add only this
      "editCity": "Edit City", // ← NEW: Add only this
      "cancel": "Cancel", // ← NEW: Add only this
      "save": "Save" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 3 keys):

```json
{
  "admin": {
    "cities": {
      // ... existing keys ...
      "addCity": "إضافة مدينة", // ← NEW: Add only this
      "editCity": "تعديل مدينة", // ← NEW: Add only this
      "cancel": "إلغاء", // ← NEW: Add only this
      "save": "حفظ" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 4 more translation keys for the CityForm component. Don't add all admin translations at once!

**Now add create and update API endpoints** (when Cities page needs create/edit functionality):

**Update Admin API** (add createCity and updateCity mutations):

**src/api/admin/index.ts** (add to existing file):

```typescript
// ... existing code ...

export type CityForCreationDto = {
  name: string
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ... existing endpoints ...
    createCity: build.mutation<CityDto, CityForCreationDto>({
      query: (body) => ({
        url: '/cities',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cities'],
    }),

    updateCity: build.mutation<CityDto, { id: number; data: CityForCreationDto }>({
      query: ({ id, data }) => ({
        url: `/cities/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cities'],
    }),
  }),
})

export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = adminApi
```

**Add CityForCreationDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface CityForCreationDto {
  name: string
}
```

**Enhance Cities page to add create/edit functionality**:

**src/pages/Admin/Cities/Cities.tsx** (add create/edit):

```typescript
import { useState } from 'react'
import { Box, Typography, TextField, IconButton, Button, Dialog } from '@mui/material'
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useGetCitiesQuery, useCreateCityMutation, useUpdateCityMutation, useDeleteCityMutation } from '@/api/admin'
import { useTranslation } from 'react-i18next'
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog'
import { CityForm } from './components/CityForm'
import type { CityDto } from '@/api/admin'

export default function Cities() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [openForm, setOpenForm] = useState(false)
  const [editingCity, setEditingCity] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: cities = [], isLoading } = useGetCitiesQuery({
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  })

  const [createCity] = useCreateCityMutation()
  const [updateCity] = useUpdateCityMutation()
  const [deleteCity] = useDeleteCityMutation()

  const handleCreate = () => {
    setEditingCity(null)
    setOpenForm(true)
  }

  const handleEdit = (id: number) => {
    setEditingCity(id)
    setOpenForm(true)
  }

  const handleSubmit = async (name: string) => {
    if (editingCity) {
      await updateCity({ id: editingCity, data: { name } }).unwrap()
    } else {
      await createCity({ name }).unwrap()
    }
    setOpenForm(false)
    setEditingCity(null)
  }

  const handleDelete = async (id: number) => {
    await deleteCity(id).unwrap()
    setDeleteId(null)
  }

  const columns: GridColDef<CityDto>[] = [
    { field: 'name', headerName: t('admin.cities.name'), width: 200, flex: 1 },
    {
      field: 'actions',
      headerName: t('admin.cities.actions'),
      width: 150,
      renderCell: (params: GridRenderCellParams<CityDto>) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setDeleteId(params.row.id)} color="error" size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          {t('admin.cities.title')}
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          {t('admin.cities.addCity')}
        </Button>
      </Box>
      <TextField
        fullWidth
        label={t('admin.cities.search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DataGrid<CityDto>
        rows={cities}
        columns={columns}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        getRowId={(row) => row.id}
        autoHeight
      />
      <CityForm
        open={openForm}
        onClose={() => {
          setOpenForm(false)
          setEditingCity(null)
        }}
        onSubmit={handleSubmit}
        cityId={editingCity || undefined}
        initialName={editingCity ? cities.find((c) => c.id === editingCity)?.name || '' : ''}
      />
      <DeleteConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        itemName={deleteId ? cities.find((c) => c.id === deleteId)?.name : undefined}
      />
    </Box>
  )
}
```

**Test**: Navigate to `/admin/cities` → Click "Add City" → Should show form → Submit → Should create city. Click edit → Should show form with existing data → Submit → Should update city.

**✅ Step 4 Complete**: Cities page is fully functional with CRUD operations!

### 17.5 Step 5: Build Hotels Page

Same pattern as Cities page - build incrementally, adding translations, types, and API as you go. Since DeleteConfirmDialog is already created for Cities, we'll reuse it.

**Create minimal Hotels page** (just placeholder):

**src/pages/Admin/Hotels/Hotels.tsx**:

```typescript
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function Hotels() {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('admin.hotels.title', 'Hotels')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('admin.hotels.loading', 'Loading hotels...')}
      </Typography>
    </Box>
  )
}
```

**src/pages/Admin/Hotels/index.ts**:

```typescript
export { default } from './Hotels'
```

**Add ONLY hotels page translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "admin": {
    // ... existing dashboard and cities keys ...
    "hotels": {
      "title": "Hotels", // ← NEW: Add only this
      "loading": "Loading hotels..." // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "admin": {
    // ... existing dashboard and cities keys ...
    "hotels": {
      "title": "الفنادق", // ← NEW: Add only this
      "loading": "جاري تحميل الفنادق..." // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys for the Hotels page. Don't add all admin translations at once!

**Test**: Navigate to `/admin/hotels` → Should see "Hotels" heading.

**Now add Hotels API endpoint** (getAdminHotels already added in Step 3, but add HotelWithoutRoomsDto type):

**Update Admin API** (add HotelWithoutRoomsDto type):

**src/api/admin/index.ts** (add to existing file):

```typescript
// ... existing code ...

export type HotelWithoutRoomsDto = {
  id: number
  name: string
  location: string
  description: string
  hotelType: string
  starRating: number
  latitude?: number
  longitude?: number
  imageUrl?: string
  cityId?: number
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ... existing endpoints ...
    getAdminHotels: build.query<HotelWithoutRoomsDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/hotels'
        return { url: '/hotels', params }
      },
      providesTags: ['Hotel'],
    }),
  }),
})
```

**Add HotelWithoutRoomsDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface HotelWithoutRoomsDto {
  id: number
  name: string
  location: string
  description: string
  hotelType: string
  starRating: number
  latitude?: number
  longitude?: number
  imageUrl?: string
  cityId?: number
}
```

**Enhance Hotels page to display DataGrid**:

**src/pages/Admin/Hotels/Hotels.tsx**:

```typescript
import { useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useGetAdminHotelsQuery } from '@/api/admin'
import { useTranslation } from 'react-i18next'
import type { HotelWithoutRoomsDto } from '@/api/admin'

export default function Hotels() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const { data: hotels = [], isLoading } = useGetAdminHotelsQuery({
    searchQuery: searchQuery || undefined,
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  })

  const columns: GridColDef<HotelWithoutRoomsDto>[] = [
    { field: 'name', headerName: t('admin.hotels.name', 'Name'), width: 200, flex: 1 },
    { field: 'location', headerName: t('admin.hotels.location', 'Location'), width: 200, flex: 1 },
    { field: 'starRating', headerName: t('admin.hotels.starRating', 'Stars'), width: 100 },
  ]

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('admin.hotels.title')}
      </Typography>
      <TextField
        fullWidth
        label={t('admin.hotels.search', 'Search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DataGrid<HotelWithoutRoomsDto>
        rows={hotels}
        columns={columns}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        getRowId={(row) => row.id}
        autoHeight
      />
    </Box>
  )
}
```

**Add ONLY hotels list translations** (incremental - only add these 4 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 4 keys):

```json
{
  "admin": {
    "hotels": {
      "title": "Hotels",
      "loading": "Loading hotels...",
      "name": "Name", // ← NEW: Add only this
      "location": "Location", // ← NEW: Add only this
      "starRating": "Stars", // ← NEW: Add only this
      "search": "Search" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 4 keys):

```json
{
  "admin": {
    "hotels": {
      "title": "الفنادق",
      "loading": "جاري تحميل الفنادق...",
      "name": "الاسم", // ← NEW: Add only this
      "location": "الموقع", // ← NEW: Add only this
      "starRating": "النجوم", // ← NEW: Add only this
      "search": "بحث" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 4 more translation keys for the Hotels list. Don't add all admin translations at once!

**Test**: Navigate to `/admin/hotels` → Should see hotels loading → Then display hotels in DataGrid.

**Now add delete functionality** (reuse DeleteConfirmDialog from Cities):

**Update Admin API** (add deleteHotel mutation):

**src/api/admin/index.ts** (add to existing file):

```typescript
// ... existing code ...

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ... existing endpoints ...
    deleteHotel: build.mutation<void, number>({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hotel'],
    }),
  }),
})

export const { useGetAdminHotelsQuery, useDeleteHotelMutation } = adminApi
```

**Enhance Hotels page to add delete functionality**:

**src/pages/Admin/Hotels/Hotels.tsx** (add delete):

```typescript
import { useState } from 'react'
import { Box, Typography, TextField, IconButton } from '@mui/material'
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { useGetAdminHotelsQuery, useDeleteHotelMutation } from '@/api/admin'
import { useTranslation } from 'react-i18next'
import { DeleteConfirmDialog } from '../Cities/components/DeleteConfirmDialog'
import type { HotelWithoutRoomsDto } from '@/api/admin'

export default function Hotels() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: hotels = [], isLoading } = useGetAdminHotelsQuery({
    searchQuery: searchQuery || undefined,
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  })

  const [deleteHotel] = useDeleteHotelMutation()

  const handleDelete = async (id: number) => {
    await deleteHotel(id).unwrap()
    setDeleteId(null)
  }

  const columns: GridColDef<HotelWithoutRoomsDto>[] = [
    { field: 'name', headerName: t('admin.hotels.name'), width: 200, flex: 1 },
    { field: 'location', headerName: t('admin.hotels.location'), width: 200, flex: 1 },
    { field: 'starRating', headerName: t('admin.hotels.starRating'), width: 100 },
    {
      field: 'actions',
      headerName: t('admin.hotels.actions', 'Actions'),
      width: 100,
      renderCell: (params: GridRenderCellParams<HotelWithoutRoomsDto>) => (
        <IconButton onClick={() => setDeleteId(params.row.id)} color="error" size="small">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('admin.hotels.title')}
      </Typography>
      <TextField
        fullWidth
        label={t('admin.hotels.search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DataGrid<HotelWithoutRoomsDto>
        rows={hotels}
        columns={columns}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        getRowId={(row) => row.id}
        autoHeight
      />
      <DeleteConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        itemName={deleteId ? hotels.find((h) => h.id === deleteId)?.name : undefined}
      />
    </Box>
  )
}
```

**Add ONLY actions translation** (incremental - only add this 1 key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key):

```json
{
  "admin": {
    "hotels": {
      // ... existing keys ...
      "actions": "Actions" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key):

```json
{
  "admin": {
    "hotels": {
      // ... existing keys ...
      "actions": "الإجراءات" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 1 more translation key for the actions column. Don't add all admin translations at once!

**Test**: Navigate to `/admin/hotels` → Click delete icon → Should show delete confirmation dialog → Confirm → Should delete hotel.

**Now add HotelForm component and create/update API** (when Hotels page needs create/edit functionality):

> **📋 Note**: For HotelForm component, it's quite complex with photo upload, amenities selection, etc. You can reference the full implementation in `src/pages/Admin/Hotels/components/HotelForm.tsx` in the codebase. For now, create a minimal version and enhance it incrementally.

**Create minimal HotelForm component**:

**src/pages/Admin/Hotels/components/HotelForm.tsx**:

```typescript
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type HotelFormProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: { name: string; location: string; description: string; hotelType: string; starRating: number }) => Promise<void>
  hotelId?: number
  initialData?: {
    name: string
    location: string
    description: string
    hotelType: string
    starRating: number
  }
}

export function HotelForm({ open, onClose, onSubmit, hotelId, initialData }: HotelFormProps) {
  const { t } = useTranslation()
  const [name, setName] = useState(initialData?.name || '')
  const [location, setLocation] = useState(initialData?.location || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [hotelType, setHotelType] = useState(initialData?.hotelType || 'Hotel')
  const [starRating, setStarRating] = useState(initialData?.starRating || 3)

  useEffect(() => {
    if (open && initialData) {
      setName(initialData.name)
      setLocation(initialData.location)
      setDescription(initialData.description)
      setHotelType(initialData.hotelType)
      setStarRating(initialData.starRating)
    }
  }, [open, initialData])

  const handleSubmit = async () => {
    await onSubmit({ name, location, description, hotelType, starRating })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{hotelId ? t('admin.hotels.editHotel', 'Edit Hotel') : t('admin.hotels.addHotel', 'Add Hotel')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t('admin.hotels.name')}
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label={t('admin.hotels.location')}
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label={t('admin.hotels.description', 'Description')}
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          margin="dense"
          label={t('admin.hotels.hotelType', 'Hotel Type')}
          fullWidth
          value={hotelType}
          onChange={(e) => setHotelType(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="Hotel">Hotel</MenuItem>
          <MenuItem value="Resort">Resort</MenuItem>
          <MenuItem value="Boutique">Boutique</MenuItem>
        </TextField>
        <TextField
          type="number"
          margin="dense"
          label={t('admin.hotels.starRating')}
          fullWidth
          value={starRating}
          onChange={(e) => setStarRating(Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('admin.hotels.cancel', 'Cancel')}</Button>
        <Button onClick={handleSubmit} variant="contained">
          {t('admin.hotels.save', 'Save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
```

**Add ONLY hotel form translations** (incremental - only add these 6 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 6 keys):

```json
{
  "admin": {
    "hotels": {
      // ... existing keys ...
      "addHotel": "Add Hotel", // ← NEW: Add only this
      "editHotel": "Edit Hotel", // ← NEW: Add only this
      "description": "Description", // ← NEW: Add only this
      "hotelType": "Hotel Type", // ← NEW: Add only this
      "cancel": "Cancel", // ← NEW: Add only this
      "save": "Save" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 6 keys):

```json
{
  "admin": {
    "hotels": {
      // ... existing keys ...
      "addHotel": "إضافة فندق", // ← NEW: Add only this
      "editHotel": "تعديل فندق", // ← NEW: Add only this
      "description": "الوصف", // ← NEW: Add only this
      "hotelType": "نوع الفندق", // ← NEW: Add only this
      "cancel": "إلغاء", // ← NEW: Add only this
      "save": "حفظ" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 6 more translation keys for the HotelForm component. Don't add all admin translations at once!

**Now add create and update API endpoints**:

**Update Admin API** (add createHotel and updateHotel mutations):

**src/api/admin/index.ts** (add to existing file):

```typescript
// ... existing code ...

export type HotelForCreationDto = {
  name: string
  location: string
  description: string
  hotelType: string
  starRating: number
  latitude?: number
  longitude?: number
  cityId?: number
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ... existing endpoints ...
    createHotel: build.mutation<HotelWithoutRoomsDto, HotelForCreationDto>({
      query: (body) => ({
        url: '/hotels',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Hotel'],
    }),

    updateHotel: build.mutation<HotelWithoutRoomsDto, { id: number; data: HotelForCreationDto }>({
      query: ({ id, data }) => ({
        url: `/hotels/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Hotel'],
    }),
  }),
})

export const {
  useGetAdminHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = adminApi
```

**Add HotelForCreationDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface HotelForCreationDto {
  name: string
  location: string
  description: string
  hotelType: string
  starRating: number
  latitude?: number
  longitude?: number
  cityId?: number
}
```

**Enhance Hotels page to add create/edit functionality**:

**src/pages/Admin/Hotels/Hotels.tsx** (add create/edit - full code similar to Cities page, but with HotelForm):

> **📋 Note**: The full implementation follows the same pattern as Cities page. Add EditIcon import, handleCreate, handleEdit, handleSubmit functions, and integrate HotelForm component. Reference the Cities page implementation for the exact pattern.

**Test**: Navigate to `/admin/hotels` → Click "Add Hotel" → Should show form → Submit → Should create hotel. Click edit → Should show form with existing data → Submit → Should update hotel.

**✅ Step 5 Complete**: Hotels page is fully functional with CRUD operations!

### 17.6 Step 6: Build Rooms Page

Same pattern as Cities and Hotels pages - build incrementally, adding translations, types, and API as you go:

**Create minimal Rooms page** (just placeholder):

**src/pages/Admin/Rooms/Rooms.tsx**:

```typescript
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function Rooms() {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('admin.rooms.title', 'Rooms')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('admin.rooms.loading', 'Loading rooms...')}
      </Typography>
    </Box>
  )
}
```

**src/pages/Admin/Rooms/index.ts**:

```typescript
export { default } from './Rooms'
```

**Add ONLY rooms page translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "admin": {
    // ... existing keys ...
    "rooms": {
      "title": "Rooms", // ← NEW: Add only this
      "loading": "Loading rooms..." // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "admin": {
    // ... existing keys ...
    "rooms": {
      "title": "الغرف", // ← NEW: Add only this
      "loading": "جاري تحميل الغرف..." // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys for the Rooms page. Don't add all admin translations at once!

**Test**: Navigate to `/admin/rooms` → Should see "Rooms" heading.

**Now add Rooms API endpoint** (getRoomsAdmin already added in Step 3, but add RoomDto type):

**Update Admin API** (add RoomDto type):

**src/api/admin/index.ts** (add to existing file):

```typescript
// ... existing code ...

export type RoomDto = {
  roomId: number
  id?: number
  roomNumber: number
  roomType: string
  price: number
  availability: boolean
  hotelId: number
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ... existing endpoints ...
    getRoomsAdmin: build.query<RoomDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/rooms'
        return { url: '/rooms', params }
      },
      providesTags: ['Rooms'],
    }),
  }),
})
```

**Add RoomDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface RoomDto {
  roomId: number
  id?: number
  roomNumber: number
  roomType: string
  price: number
  availability: boolean
  hotelId: number
}
```

**Enhance Rooms page to display DataGrid**:

**src/pages/Admin/Rooms/Rooms.tsx**:

```typescript
import { useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useGetRoomsAdminQuery } from '@/api/admin'
import { useTranslation } from 'react-i18next'
import type { RoomDto } from '@/api/admin'

export default function Rooms() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const { data: rooms = [], isLoading } = useGetRoomsAdminQuery()

  const filteredRooms = rooms.filter(
    (room) =>
      !searchQuery ||
      String(room.roomNumber).toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.roomType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const columns: GridColDef<RoomDto>[] = [
    { field: 'roomNumber', headerName: t('admin.rooms.roomNumber', 'Room Number'), width: 150 },
    { field: 'roomType', headerName: t('admin.rooms.roomType', 'Room Type'), width: 200, flex: 1 },
    { field: 'price', headerName: t('admin.rooms.price', 'Price'), width: 100 },
    { field: 'availability', headerName: t('admin.rooms.availability', 'Available'), width: 120 },
  ]

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {t('admin.rooms.title')}
      </Typography>
      <TextField
        fullWidth
        label={t('admin.rooms.search', 'Search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DataGrid<RoomDto>
        rows={filteredRooms}
        columns={columns}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        getRowId={(row) => row.roomId || row.id || 0}
        autoHeight
      />
    </Box>
  )
}
```

**Add ONLY rooms list translations** (incremental - only add these 5 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 5 keys):

```json
{
  "admin": {
    "rooms": {
      "title": "Rooms",
      "loading": "Loading rooms...",
      "roomNumber": "Room Number", // ← NEW: Add only this
      "roomType": "Room Type", // ← NEW: Add only this
      "price": "Price", // ← NEW: Add only this
      "availability": "Available", // ← NEW: Add only this
      "search": "Search" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 5 keys):

```json
{
  "admin": {
    "rooms": {
      "title": "الغرف",
      "loading": "جاري تحميل الغرف...",
      "roomNumber": "رقم الغرفة", // ← NEW: Add only this
      "roomType": "نوع الغرفة", // ← NEW: Add only this
      "price": "السعر", // ← NEW: Add only this
      "availability": "متاح", // ← NEW: Add only this
      "search": "بحث" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 5 more translation keys for the Rooms list. Don't add all admin translations at once!

**Test**: Navigate to `/admin/rooms` → Should see rooms loading → Then display rooms in DataGrid.

**Now add delete functionality** (reuse DeleteConfirmDialog from Cities):

**Update Admin API** (add deleteRoom mutation):

**src/api/admin/index.ts** (add to existing file):

```typescript
// ... existing code ...

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ... existing endpoints ...
    deleteRoom: build.mutation<void, number>({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rooms'],
    }),
  }),
})

export const { useGetRoomsAdminQuery, useDeleteRoomMutation } = adminApi
```

**Enhance Rooms page to add delete functionality**:

**src/pages/Admin/Rooms/Rooms.tsx** (add delete - follow same pattern as Cities/Hotels, adding DeleteConfirmDialog and actions column).

**Add ONLY actions translation** (incremental - only add this 1 key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key):

```json
{
  "admin": {
    "rooms": {
      // ... existing keys ...
      "actions": "Actions" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key):

```json
{
  "admin": {
    "rooms": {
      // ... existing keys ...
      "actions": "الإجراءات" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 1 more translation key for the actions column. Don't add all admin translations at once!

**Test**: Navigate to `/admin/rooms` → Click delete icon → Should show delete confirmation dialog → Confirm → Should delete room.

**Now add RoomForm component and create/update API** (when Rooms page needs create/edit functionality):

**Create RoomForm component** (minimal - you can reference the full implementation in the codebase):

**src/pages/Admin/Rooms/components/RoomForm.tsx**:

```typescript
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type RoomFormProps = {
  open: boolean
  onClose: () => void
  onSubmit: (data: { roomNumber: number; roomType: string; price: number; availability: boolean; hotelId: number }) => Promise<void>
  roomId?: number
  initialData?: {
    roomNumber: number
    roomType: string
    price: number
    availability: boolean
    hotelId: number
  }
}

export function RoomForm({ open, onClose, onSubmit, roomId, initialData }: RoomFormProps) {
  const { t } = useTranslation()
  const [roomNumber, setRoomNumber] = useState(initialData?.roomNumber || 0)
  const [roomType, setRoomType] = useState(initialData?.roomType || '')
  const [price, setPrice] = useState(initialData?.price || 0)
  const [availability, setAvailability] = useState(initialData?.availability ?? true)
  const [hotelId, setHotelId] = useState(initialData?.hotelId || 0)

  useEffect(() => {
    if (open && initialData) {
      setRoomNumber(initialData.roomNumber)
      setRoomType(initialData.roomType)
      setPrice(initialData.price)
      setAvailability(initialData.availability)
      setHotelId(initialData.hotelId)
    }
  }, [open, initialData])

  const handleSubmit = async () => {
    await onSubmit({ roomNumber, roomType, price, availability, hotelId })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{roomId ? t('admin.rooms.editRoom', 'Edit Room') : t('admin.rooms.addRoom', 'Add Room')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t('admin.rooms.roomNumber')}
          type="number"
          fullWidth
          value={roomNumber}
          onChange={(e) => setRoomNumber(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label={t('admin.rooms.roomType')}
          fullWidth
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label={t('admin.rooms.price')}
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          margin="dense"
          label={t('admin.rooms.availability')}
          fullWidth
          value={availability ? 'true' : 'false'}
          onChange={(e) => setAvailability(e.target.value === 'true')}
          sx={{ mb: 2 }}
        >
          <MenuItem value="true">{t('admin.rooms.available', 'Available')}</MenuItem>
          <MenuItem value="false">{t('admin.rooms.unavailable', 'Unavailable')}</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label={t('admin.rooms.hotelId', 'Hotel ID')}
          type="number"
          fullWidth
          value={hotelId}
          onChange={(e) => setHotelId(Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('admin.rooms.cancel', 'Cancel')}</Button>
        <Button onClick={handleSubmit} variant="contained">
          {t('admin.rooms.save', 'Save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
```

**Add ONLY room form translations** (incremental - only add these 7 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 7 keys):

```json
{
  "admin": {
    "rooms": {
      // ... existing keys ...
      "addRoom": "Add Room", // ← NEW: Add only this
      "editRoom": "Edit Room", // ← NEW: Add only this
      "available": "Available", // ← NEW: Add only this
      "unavailable": "Unavailable", // ← NEW: Add only this
      "hotelId": "Hotel ID", // ← NEW: Add only this
      "cancel": "Cancel", // ← NEW: Add only this
      "save": "Save" // ← NEW: Add only this
    }
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 7 keys):

```json
{
  "admin": {
    "rooms": {
      // ... existing keys ...
      "addRoom": "إضافة غرفة", // ← NEW: Add only this
      "editRoom": "تعديل غرفة", // ← NEW: Add only this
      "available": "متاح", // ← NEW: Add only this
      "unavailable": "غير متاح", // ← NEW: Add only this
      "hotelId": "معرف الفندق", // ← NEW: Add only this
      "cancel": "إلغاء", // ← NEW: Add only this
      "save": "حفظ" // ← NEW: Add only this
    }
  }
}
```

> **📝 Note**: You're adding ONLY 7 more translation keys for the RoomForm component. Don't add all admin translations at once!

**Now add create and update API endpoints**:

**Update Admin API** (add createRoom and updateRoom mutations):

**src/api/admin/index.ts** (add to existing file):

```typescript
// ... existing code ...

export type RoomForCreationDto = {
  roomNumber: number
  roomType: string
  price: number
  availability: boolean
  hotelId: number
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ... existing endpoints ...
    createRoom: build.mutation<RoomDto, RoomForCreationDto>({
      query: (body) => ({
        url: '/rooms',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Rooms'],
    }),

    updateRoom: build.mutation<RoomDto, { id: number; data: RoomForCreationDto }>({
      query: ({ id, data }) => ({
        url: `/rooms/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Rooms'],
    }),
  }),
})

export const {
  useGetRoomsAdminQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = adminApi
```

**Add RoomForCreationDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface RoomForCreationDto {
  roomNumber: number
  roomType: string
  price: number
  availability: boolean
  hotelId: number
}
```

**Enhance Rooms page to add create/edit functionality**:

**src/pages/Admin/Rooms/Rooms.tsx** (add create/edit - follow same pattern as Cities/Hotels, adding EditIcon, handleCreate, handleEdit, handleSubmit, and integrating RoomForm component).

**Test**: Navigate to `/admin/rooms` → Click "Add Room" → Should show form → Submit → Should create room. Click edit → Should show form with existing data → Submit → Should update room.

**✅ Step 6 Complete**: Rooms page is fully functional with CRUD operations!

### 17.7 Step 7: Test the Complete Admin Dashboard

**Verification Checklist**:

1. ✅ **Navigate to `/admin/dashboard`**: Should see dashboard with stats
2. ✅ **Navigate to `/admin/cities`**: Should see cities list with CRUD operations
3. ✅ **Navigate to `/admin/hotels`**: Should see hotels list with CRUD operations
4. ✅ **Navigate to `/admin/rooms`**: Should see rooms list with CRUD operations
5. ✅ **Test create**: Add new city/hotel/room → Should create successfully
6. ✅ **Test edit**: Edit existing city/hotel/room → Should update successfully
7. ✅ **Test delete**: Delete city/hotel/room → Should show confirmation → Should delete successfully
8. ✅ **Test search**: Search in cities/hotels/rooms → Should filter results
9. ✅ **Test pagination**: Change page size → Should paginate correctly
10. ✅ **Test admin protection**: Logout → Try to access `/admin` → Should redirect to login

**Common Issues**:

- **AdminRoute not working**: Check userType is 'Admin' in localStorage
- **API errors**: Check backend is running and endpoints are correct
- **DataGrid not displaying**: Check MUI X DataGrid is installed
- **TypeScript errors**: Check all types are added to `types/models.ts`

---

## ✅ Feature 6 Complete: Admin Dashboard

You've built the Admin Dashboard **incrementally**:

- ✅ Created minimal AdminLayout
- ✅ Added admin routes
- ✅ Built Dashboard page → Added API → Added translations → Tested
- ✅ Built Cities page → Added API → Added form → Added translations → Tested
- ✅ Built Hotels page → Added API → Added form → Added translations → Tested
- ✅ Built Rooms page → Added API → Added form → Added translations → Tested
- ✅ Built common components (DeleteConfirmDialog) as pages needed them

**Key Learning**: Each page was built, tested, and had its translations/types/API added **only when needed**. Components were reused (DeleteConfirmDialog) rather than duplicated. This is realistic development!

**Next**: Review the complete guide and ensure all features follow the TRUE incremental pattern.

---

```typescript
import { baseApi } from '@/api/baseApi'

export type HotelAmenityDto = {
  id: number
  name: string
  description?: string
}

export type RoomAmenityDto = {
  id: number
  name: string
  description: string
}

export type HotelRoomDto = {
  roomId: number
  roomNumber: number
  roomPhotoUrl: string
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  amenities: RoomAmenityDto[]
  price: number
  availability: boolean
}

export type HotelDto = {
  id: number
  name: string
  hotelName?: string
  location: string
  description: string
  hotelType: 'Boutique' | 'Resort' | 'Hotel' | 'Lodge' | 'Inn' | (string & {})
  starRating: number
  latitude?: number
  longitude?: number
  rooms: HotelRoomDto[]
  imageUrl?: string
  availableRooms?: number
  cityId?: number
  amenities: HotelAmenityDto[]
}

export type GetHotelsQuery = {
  searchQuery?: string
  pageNumber: number
  pageSize: number
}

export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query<HotelDto[], GetHotelsQuery>({
      query: ({ searchQuery, pageNumber, pageSize }) => ({
        url: 'hotels',
        params: {
          ...(searchQuery ? { searchQuery } : {}),
          pageNumber,
          pageSize,
        },
      }),
      providesTags: ['Hotel'],
    }),
  }),
})

export const { useGetHotelsQuery } = hotelsApi
```

**Update baseApi tagTypes**:

Update `src/api/baseApi.ts`:

```typescript
tagTypes: ['Auth', 'Home', 'Hotel'], // Added Hotel tag
```

### 14.4 OLD APPROACH: Create SearchResults API Endpoints (Reference Only - DO NOT FOLLOW)

> **⚠️ This is the OLD "all at once" approach. In the new incremental approach (steps 14.1-14.14), API endpoints are added one at a time as each component needs them.**

The Search Results page needs amenities for the filters:

**src/api/searchResults/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'
import type { AmenityDto } from '@/types'

export type FilterAmenityDto = {
  id: number
  name: string
  description?: string
}

export const searchResultsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAmenities: builder.query<FilterAmenityDto[], void>({
      query: () => 'search-results/amenities',
      providesTags: ['Amenities'],
    }),
  }),
})

export const { useGetAmenitiesQuery } = searchResultsApi
```

**Update baseApi tagTypes**:

Update `src/api/baseApi.ts`:

```typescript
tagTypes: ['Auth', 'Home', 'Hotel', 'Amenities'], // Added Amenities tag
```

### 14.5 OLD APPROACH: Expand SearchSlice (Reference Only - DO NOT FOLLOW)

> **⚠️ This is the OLD "all at once" approach. In the new incremental approach, SearchSlice is already set up in Feature 1, and we use it as components need it.**

The Search Results page needs to read and update search filters. The SearchSlice was created in Feature 1, but we need to ensure it has the right structure for filters.

> **📋 Check Actual Implementation**: The SearchSlice structure in the codebase separates `params` (search query, dates, guests) from `filters` (price, stars, amenities, types). Check `src/store/searchSlice.ts` in the codebase for the exact structure. The structure below is a simplified version that works, but you may want to match the codebase structure exactly.

**Update `src/store/searchSlice.ts`** (if needed to match codebase structure):

The actual codebase uses this structure:

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SearchParams = {
  searchQuery?: string
  city?: string
  checkInDate?: string
  checkOutDate?: string
  adults?: number
  children?: number
  rooms?: number
}

export type SearchFilters = {
  priceRange?: [number, number]
  stars?: number | null
  amenities?: string[]
  hotelTypes?: string[]
}

export type SearchState = {
  params: SearchParams
  filters: SearchFilters
}

const initialState: SearchState = {
  params: {},
  filters: {},
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<Partial<SearchParams>>) {
      state.params = { ...state.params, ...action.payload }
    },
    setSearchFilters(state, action: PayloadAction<Partial<SearchFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearSearchFilters(state) {
      state.filters = {}
    },
    hydrateSearchState(_state, action: PayloadAction<SearchState>) {
      return action.payload
    },
  },
})

export const { setSearchParams, setSearchFilters, clearSearchFilters, hydrateSearchState } =
  searchSlice.actions

export const searchReducer = searchSlice.reducer

export const selectSearchParams = (state: { search: SearchState }) => state.search.params
export const selectSearchFilters = (state: { search: SearchState }) => state.search.filters
export const selectSearchQuery = (state: { search: SearchState }) =>
  state.search.params.searchQuery ?? state.search.params.city ?? ''

export { initialState as searchInitialState }
```

**Note**:

- If you created a simpler SearchSlice in Feature 1, you can update it to match this structure
- Alternatively, copy the complete `src/store/searchSlice.ts` from the codebase
- The structure separates search parameters (from Home page) from filters (applied on Search Results page)

### 14.6 OLD APPROACH: Add Search Translations (Reference Only - DO NOT FOLLOW)

> **⚠️ This is the OLD "all at once" approach. In the new incremental approach (steps 14.1-14.14), translations are added one component at a time.**

Add Search Results page translations (OLD - adds all translations at once):

**Add to `src/i18n/locales/en.json`**:

```json
{
  "search": {
    "filters": "Filters",
    "noResults": "No hotels found",
    "viewHotel": "View Hotel",
    "perNight": "/night",
    "priceRange": "Price Range",
    "starRating": "Star Rating",
    "amenities": "Amenities",
    "hotelType": "Hotel Type",
    "loadingAmenities": "Loading amenities…",
    "failedToLoadAmenities": "Failed to load amenities",
    "clearFilters": "Clear Filters",
    "appliedFilters": "Applied Filters"
  }
}
```

**Add to `src/i18n/locales/ar.json`**:

```json
{
  "search": {
    "filters": "المرشحات",
    "noResults": "لم يتم العثور على فنادق",
    "viewHotel": "عرض الفندق",
    "perNight": "/ليلة",
    "priceRange": "نطاق السعر",
    "starRating": "التصنيف",
    "amenities": "المرافق",
    "hotelType": "نوع الفندق",
    "loadingAmenities": "جاري تحميل المرافق…",
    "failedToLoadAmenities": "فشل تحميل المرافق",
    "clearFilters": "مسح المرشحات",
    "appliedFilters": "المرشحات المطبقة"
  }
}
```

### 14.7 OLD APPROACH: Create Filter Components (Reference Only - DO NOT FOLLOW)

> **⚠️ This is the OLD "all at once" approach. In the new incremental approach (steps 14.1-14.14), filter components are built one at a time.**

The Search Results page needs filter components. Let's create them (OLD - creates all at once):

#### 7.1 Filter Container Components

**src/components/filters/FilterContainer.tsx**:

```typescript
import { Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { ReactNode } from 'react'

interface FilterContainerProps {
  title: string
  children: ReactNode
  onClose?: () => void
}

export function FilterContainer({ title, children, onClose }: FilterContainerProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        {onClose && (
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      {children}
    </Box>
  )
}
```

**src/components/filters/FilterSection.tsx**:

```typescript
import { Box } from '@mui/material'
import type { ReactNode } from 'react'

interface FilterSectionProps {
  children: ReactNode
  showDivider?: boolean
}

export function FilterSection({ children, showDivider = true }: FilterSectionProps) {
  return (
    <Box
      sx={{
        pb: 2,
        mb: 2,
        ...(showDivider && {
          borderBottom: 1,
          borderColor: 'divider',
        }),
      }}
    >
      {children}
    </Box>
  )
}
```

**src/components/filters/index.ts**:

```typescript
export * from './FilterContainer'
export * from './FilterSection'
```

#### 7.2 PriceFilter Component

**src/pages/SearchResults/components/PriceFilter.tsx**:

```typescript
import { Box, Typography, Slider } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, setFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'

const MIN_PRICE = 0
const MAX_PRICE = 1000

export function PriceFilter() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)
  const priceRange = filters.priceRange || [MIN_PRICE, MAX_PRICE]

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const range = newValue as [number, number]
    dispatch(setSearchFilters({ priceRange: range }))
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('search.priceRange')}
      </Typography>
      <Slider
        value={priceRange}
        onChange={handleChange}
        min={MIN_PRICE}
        max={MAX_PRICE}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="caption">${priceRange[0]}</Typography>
        <Typography variant="caption">${priceRange[1]}</Typography>
      </Box>
    </Box>
  )
}
```

#### 7.3 StarRatingFilter Component

**src/pages/SearchResults/components/StarRatingFilter.tsx**:

```typescript
import { Box, FormControlLabel, Checkbox, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, setFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'

const STAR_RATINGS = [5, 4, 3, 2, 1]

export function StarRatingFilter() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)
  const selectedStar = filters.stars

  const handleChange = (star: number) => {
    const newStar = selectedStar === star ? null : star
    dispatch(setSearchFilters({ stars: newStar }))
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('search.starRating')}
      </Typography>
      {STAR_RATINGS.map((star) => (
        <FormControlLabel
          key={star}
          control={
            <Checkbox
              checked={selectedStar === star}
              onChange={() => handleChange(star)}
            />
          }
          label={`${star} ${t('hotel.starHotel', 'star hotel')}`}
        />
      ))}
    </Box>
  )
}
```

#### 7.4 AmenitiesFilter Component

**src/pages/SearchResults/components/AmenitiesFilter.tsx**:

```typescript
import { Box, FormControlLabel, Checkbox, Typography, Alert } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, setFilters } from '@/store/searchSlice'
import { useGetAmenitiesQuery } from '@/api/searchResults'
import { useTranslation } from 'react-i18next'
import { VoyaLoader } from '@/components'

export function AmenitiesFilter() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)
  const { data: amenities, isLoading, isError } = useGetAmenitiesQuery()
  const selectedAmenities = filters.amenities || []

  const handleChange = (amenityName: string) => {
    const newAmenities = selectedAmenities.includes(amenityName)
      ? selectedAmenities.filter((name) => name !== amenityName)
      : [...selectedAmenities, amenityName]
    dispatch(setSearchFilters({ amenities: newAmenities.length > 0 ? newAmenities : undefined }))
  }

  if (isLoading) {
    return (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          {t('search.amenities')}
        </Typography>
        <VoyaLoader size="small" />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          {t('search.amenities')}
        </Typography>
        <Alert severity="error">{t('search.failedToLoadAmenities')}</Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('search.amenities')}
      </Typography>
      {amenities?.map((amenity) => (
        <FormControlLabel
          key={amenity.id}
          control={
            <Checkbox
              checked={selectedAmenities.includes(amenity.name)}
              onChange={() => handleChange(amenity.name)}
            />
          }
          label={amenity.name}
        />
      ))}
    </Box>
  )
}
```

#### 7.5 HotelTypeFilter Component

**src/pages/SearchResults/components/HotelTypeFilter.tsx**:

```typescript
import { Box, FormControlLabel, Checkbox, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, setFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'

const HOTEL_TYPES = ['Hotel', 'Resort', 'Boutique', 'Lodge', 'Inn']

export function HotelTypeFilter() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)
  const selectedTypes = filters.hotelTypes || []

  const handleChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    dispatch(setSearchFilters({ hotelTypes: newTypes.length > 0 ? newTypes : undefined }))
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('search.hotelType')}
      </Typography>
      {HOTEL_TYPES.map((type) => (
        <FormControlLabel
          key={type}
          control={
            <Checkbox
              checked={selectedTypes.includes(type)}
              onChange={() => handleChange(type)}
            />
          }
          label={type}
        />
      ))}
    </Box>
  )
}
```

### 14.8 Step 8: Create FiltersSidebar Component

**src/pages/SearchResults/components/FiltersSidebar.tsx**:

```typescript
import { Box } from '@mui/material'
import { PriceFilter } from './PriceFilter'
import { StarRatingFilter } from './StarRatingFilter'
import { AmenitiesFilter } from './AmenitiesFilter'
import { HotelTypeFilter } from './HotelTypeFilter'
import { useTranslation } from 'react-i18next'
import { FilterContainer, FilterSection } from '@/components/filters'

type FiltersSidebarProps = {
  onClose?: () => void
}

export function FiltersSidebar({ onClose }: FiltersSidebarProps) {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        position: { xs: 'static', md: 'sticky' },
        top: { md: 80 },
        maxHeight: { xs: 'none', md: 'calc(100vh - 100px)' },
        overflowY: { xs: 'visible', md: 'auto' },
      }}
    >
      <FilterContainer title={t('search.filters')} onClose={onClose}>
        <FilterSection>
          <PriceFilter />
        </FilterSection>

        <FilterSection>
          <StarRatingFilter />
        </FilterSection>

        <FilterSection>
          <AmenitiesFilter />
        </FilterSection>

        <FilterSection showDivider={false}>
          <HotelTypeFilter />
        </FilterSection>
      </FilterContainer>
    </Box>
  )
}
```

### 14.9 Step 9: Create Results Display Components

#### 9.1 SelectedFiltersBar Component

**src/pages/SearchResults/components/SelectedFiltersBar.tsx**:

```typescript
import { Box, Chip, Button } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, clearFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'

export function SelectedFiltersBar() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)

  const hasFilters =
    filters.priceRange ||
    filters.stars ||
    filters.amenities?.length ||
    filters.hotelTypes?.length

  if (!hasFilters) return null

  return (
    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
      <Typography variant="body2" sx={{ mr: 1 }}>
        {t('search.appliedFilters')}:
      </Typography>
      {filters.stars && (
        <Chip label={`${filters.stars} ${t('hotel.starHotel', 'star')}`} size="small" />
      )}
      {filters.hotelTypes?.map((type) => (
        <Chip key={type} label={type} size="small" />
      ))}
      {filters.priceRange && (
        <Chip
          label={`$${filters.priceRange[0]} - $${filters.priceRange[1]}`}
          size="small"
        />
      )}
      <Button size="small" onClick={() => dispatch(clearSearchFilters())}>
        {t('search.clearFilters')}
      </Button>
    </Box>
  )
}
```

**Note**: Add the missing Typography import:

```typescript
import { Box, Chip, Button, Typography } from '@mui/material'
```

#### 9.2 HotelResultCard Component

**src/pages/SearchResults/components/HotelResultCard.tsx**:

```typescript
import { Card, CardContent, CardActions, Typography, Box, Button, Rating } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { SafeImage } from '@/components/common/SafeImage'
import type { HotelDto } from '@/api/hotels'
import { useTranslation } from 'react-i18next'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface HotelResultCardProps {
  hotel: HotelDto
}

export function HotelResultCard({ hotel }: HotelResultCardProps) {
  const { t } = useTranslation()
  const minPrice = Math.min(...(hotel.rooms?.map((r) => r.price) || [0]))

  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <SafeImage
          src={hotel.imageUrl}
          alt={hotel.name}
          height={{ xs: 200, md: 180 }}
          width={{ xs: '100%', md: 300 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {hotel.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {hotel.location}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={hotel.starRating} readOnly size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {hotel.starRating} {t('hotel.starHotel', 'star hotel')}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {hotel.description}
          </Typography>
          <Typography variant="h6" color="primary">
            ${minPrice} {t('search.perNight')}
          </Typography>
        </CardContent>
        <CardActions sx={{ flexDirection: 'column', justifyContent: 'center', p: 2 }}>
          <Button
            component={RouterLink}
            to={`/hotel/${hotel.id}`}
            variant="contained"
            fullWidth
            startIcon={<VisibilityIcon />}
          >
            {t('search.viewHotel')}
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}
```

#### 9.3 ResultsList Component

**src/pages/SearchResults/components/ResultsList.tsx**:

```typescript
import { Stack, Typography, Box } from '@mui/material'
import { useAppSelector } from '@/hooks'
import { selectSearchQuery, selectSearchFilters } from '@/store/searchSlice'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGetHotelsQuery, type HotelDto } from '@/api/hotels'
import { HotelResultCard } from './HotelResultCard'
import { VoyaLoader } from '@/components'
import { useTranslation } from 'react-i18next'

const PAGE_SIZE = 10

function hotelMatchesFilters(hotel: HotelDto, filters: ReturnType<typeof selectSearchFilters>) {
  if (filters.stars != null && hotel.starRating !== filters.stars) return false

  if (filters.hotelTypes?.length && !filters.hotelTypes.includes(hotel.hotelType)) return false

  const hotelAmenityNames = (hotel.amenities ?? []).map((a) => a.name)
  if (filters.amenities?.length && !filters.amenities.every((name) => hotelAmenityNames.includes(name))) {
    return false
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange
    const roomPrices = (hotel.rooms ?? []).map((r) => r.price)
    const anyInRange = roomPrices.some((p) => typeof p === 'number' && p >= min && p <= max)
    if (!anyInRange) return false
  }

  return true
}

export function ResultsList() {
  const { t } = useTranslation()
  const searchQuery = useAppSelector(selectSearchQuery)
  const filters = useAppSelector(selectSearchFilters)
  const searchParams = useAppSelector(selectSearchParams)

  const [page, setPage] = useState(1)
  const [allHotels, setAllHotels] = useState<HotelDto[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { data, isLoading, isError, isFetching } = useGetHotelsQuery({
    searchQuery: searchQuery || searchParams.city,
    pageNumber: page,
    pageSize: PAGE_SIZE,
  })

  useEffect(() => {
    setPage(1)
    setAllHotels([])
    setHasMore(true)
  }, [searchQuery])

  useEffect(() => {
    if (!data) return
    setAllHotels((prev) => {
      const merged = [...prev, ...data]
      const map = new Map<number, HotelDto>()
      for (const h of merged) map.set(h.id, h)
      return Array.from(map.values())
    })
    if (data.length < PAGE_SIZE) setHasMore(false)
  }, [data])

  const filteredHotels = useMemo(() => {
    return allHotels.filter((h) => hotelMatchesFilters(h, filters))
  }, [allHotels, filters])

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first?.isIntersecting) return
        if (isFetching || isLoading) return
        if (!hasMore) return
        setPage((p) => p + 1)
      },
      { rootMargin: '250px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, isFetching, isLoading])

  if (isLoading && allHotels.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <VoyaLoader size="small" />
      </Box>
    )
  }

  if (isError) {
    return <Typography color="error">{t('search.noResults')}</Typography>
  }

  if (filteredHotels.length === 0) {
    return <Typography>{t('search.noResults')}</Typography>
  }

  return (
    <Stack spacing={2}>
      {filteredHotels.map((hotel) => (
        <HotelResultCard key={hotel.id} hotel={hotel} />
      ))}
      {hasMore && (
        <Box ref={sentinelRef} sx={{ height: 20 }}>
          {isFetching && <VoyaLoader size="small" />}
        </Box>
      )}
    </Stack>
  )
}
```

### 14.10 Step 10: Update SearchResults Page to Use All Components

**src/pages/SearchResults/SearchResults.tsx**:

```typescript
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import { useMediaQuery, useTheme, Drawer, IconButton, Box } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { FiltersSidebar } from './components/FiltersSidebar'
import { ResultsList } from './components/ResultsList'
import { SelectedFiltersBar } from './components/SelectedFiltersBar'

export default function SearchResults() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleFiltersToggle = () => {
    setMobileFiltersOpen(!mobileFiltersOpen)
  }

  return (
    <>
      {isMobile && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', px: 2, pt: 2 }}>
          <IconButton
            onClick={handleFiltersToggle}
            color="primary"
            sx={{ border: 1, borderColor: 'divider' }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
      )}

      <Drawer
        anchor="left"
        open={isMobile ? mobileFiltersOpen : false}
        onClose={handleFiltersToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            pt: 2,
          },
        }}
      >
        <FiltersSidebar onClose={isMobile ? handleFiltersToggle : undefined} />
      </Drawer>

      <Grid container spacing={2} sx={{ px: { xs: 2, md: 0 } }}>
        <Grid size={{ xs: 0, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <FiltersSidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <SelectedFiltersBar />
          <ResultsList />
        </Grid>
      </Grid>
    </>
  )
}
```

**Note**: If you're using MUI v5 Grid, use `item` and `xs/md` props instead of `size`. For MUI v6, use the `size` prop as shown.

### 14.11 Step 11: Test the Search Results Page

**Verification Checklist**:

1. ✅ **Navigate to `/search`**: Should see Search Results page
2. ✅ **Check filters sidebar**: Should display all filter options (desktop) or drawer (mobile)
3. ✅ **Test price filter**: Adjust slider - results should filter
4. ✅ **Test star rating filter**: Select stars - results should filter
5. ✅ **Test amenities filter**: Select amenities - results should filter
6. ✅ **Test hotel type filter**: Select types - results should filter
7. ✅ **Check selected filters bar**: Should show applied filters
8. ✅ **Test clear filters**: Should clear all filters
9. ✅ **Check infinite scroll**: Should load more results as you scroll
10. ✅ **Test hotel cards**: Click "View Hotel" - should navigate to hotel page
11. ✅ **Test mobile filters**: Open drawer on mobile - filters should work

**Common Issues**:

- **No results**: Check search query is set in SearchSlice (from Home page search)
- **Filters not working**: Check SearchSlice selectors and filter logic
- **API errors**: Check backend is running and endpoints are correct
- **Infinite scroll not working**: Check IntersectionObserver setup

---

## ✅ Feature 3 Complete: Search Results Page

Congratulations! You've built the complete Search Results page feature with:

- ✅ SearchResults page component
- ✅ Hotels API endpoints
- ✅ SearchResults API endpoints (amenities)
- ✅ Expanded SearchSlice with filter selectors
- ✅ Search translations
- ✅ Filter components (PriceFilter, StarRatingFilter, AmenitiesFilter, HotelTypeFilter)
- ✅ Filter container components (FilterContainer, FilterSection)
- ✅ Results display components (ResultsList, HotelResultCard, SelectedFiltersBar)
- ✅ Search route
- ✅ Responsive design (mobile drawer, desktop sidebar)

**Next**: Move to [Feature 4: Hotel Details Page](#15-feature-4-hotel-details-page)

---

> **⚠️ OLD APPROACH - DO NOT FOLLOW**: The sections below (14.4-14.11 old) show the OLD approach where everything is created at once. They are kept for reference only. **DO NOT follow them** - they violate the incremental development principle.
>
> **✅ NEW INCREMENTAL APPROACH**: Follow steps 14.1-14.14 above, which show the TRUE incremental development pattern:
>
> - Build component → Add translations → Test
> - Add API → Add types → Enhance component → Test
> - Move to next component

---

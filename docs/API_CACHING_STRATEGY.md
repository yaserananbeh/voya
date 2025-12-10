# API Caching Strategy

This project uses **RTK Query** caching.

## 1. Query lifetime

- Queries stay cached while at least one component subscribes.
- When all subscribers unmount, the cache entry will be garbage-collected after RTK Query's default timeout.
- Remounting the same query parameters reuses cache and may refetch in the background.

## 2. Tags & invalidation

We use these tags:

- `Auth`
- `Home`
- `Hotel`
- `Rooms`
- `Cities`
- `Amenities`
- `Booking`
- `Admin`
- `Photos`

Rules:

- `Auth` → invalidated after login/logout if needed.
- `Home` → search, featured deals, trending, recent hotels.
- `Hotel` / `Rooms` → invalidated on booking, room updates, uploads.
- `Cities` / `Admin` → invalidated on admin CRUD operations.
- `Photos` → invalidated on file upload.

## 3. Shared cache across components

Example:

```ts
useSearchQuery({ city: 'Dubai', adults: 2 })
```

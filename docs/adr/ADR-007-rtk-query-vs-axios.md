---

### 📌 `docs/adr/ADR-007-rtk-query-vs-axios.md`

```md
# ADR-007 — Choosing RTK Query as the Primary Data Layer

## Status

Accepted

## Context

The Travel & Accommodation Booking frontend:

- Is CRUD-heavy (cities, hotels, rooms, bookings)
- Interacts with many REST endpoints
- Needs caching, pagination, and query invalidation
- Must demonstrate Redux Toolkit & RTK Query skills

We also have an existing axios instance for generic HTTP needs.

## Decision

Use **RTK Query** as the main data-fetching layer on top of Redux Toolkit:

- All feature modules (`auth`, `home`, `hotel`, `checkout`, `admin`, `upload`) are implemented as RTK Query slices using a shared `baseApi`.
- Redux store includes `baseApi.reducer` and `baseApi.middleware`.

## Rationale

- Built-in caching and deduplication at the query level.
- Automatic re-fetch on remount / arg changes.
- Strong TypeScript integration.
- Significantly less boilerplate compared to raw axios + manual reducers.
- Single, consistent place for API configuration (base URL, auth header).
- Perfect integration with Redux store which is already required for the project.

## Tradeoffs

- Slightly opinionated patterns (queries/mutations) vs. fully free-style axios.
- RTK Query is tied to Redux; if we ever move away from Redux, React Query might be a better fit.
- For very custom streaming or websockets, RTK Query needs more manual setup.

## Where Axios is Still Used

- For low-level utilities or special cases not covered by RTK Query (if needed).
- However, **file uploads in this project are handled via RTK Query + FormData** for simplicity and consistency.

## Alternatives Considered

### React Query

- Excellent caching and DevTools.
- But would introduce **two overlapping data layers** (Redux + React Query).
- We prefer to keep a single store / cache system.

### Raw Axios

- Full control over requests.
- But:
  - No caching
  - No deduplication
  - Lots of repeated boilerplate (loading/error state, retries, etc.)
```

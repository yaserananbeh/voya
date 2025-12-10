# RTK Query vs React Query vs Axios

| Feature                 | RTK Query                        | React Query                      | Axios (raw)                |
| ----------------------- | -------------------------------- | -------------------------------- | -------------------------- |
| Caching                 | ✅ built-in                      | ✅ best-in-class                 | ❌ none                    |
| Request deduplication   | ✅                               | ✅                               | ❌ manual                  |
| Auto refetch on remount | ✅                               | ✅                               | ❌ manual                  |
| Integration with Redux  | ✅ first-class                   | ⚠️ via separate store / context  | ❌ manual                  |
| Boilerplate for CRUD    | low                              | medium                           | high                       |
| TypeScript integration  | strong (RTK + TS)                | strong                           | depends on your wrappers   |
| DevTools                | basic (Redux DevTools)           | excellent (React Query Devtools) | none                       |
| File uploads            | works (FormData + baseQuery)     | works (custom fetch)             | ✅ best (full control)     |
| Learning curve          | low if you know Redux Toolkit    | medium                           | low for basics             |
| Best suited for         | CRUD-heavy apps with Redux store | Data-heavy apps without Redux    | Simple / ad-hoc HTTP calls |

**Decision:**  
Use **RTK Query** as the primary data-fetching layer for this project because:

- We already use Redux Toolkit
- We need caching, invalidation, and deduplication
- It reduces axios boilerplate significantly

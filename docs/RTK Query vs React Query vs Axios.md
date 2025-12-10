# RTK Query vs React Query vs Axios

| Feature                  | RTK Query   | React Query              | Axios             |
| ------------------------ | ----------- | ------------------------ | ----------------- |
| Caching                  | ✅ built-in | ✅ best-in-class         | ❌ none           |
| Auto refetch             | ✅          | ✅                       | ❌                |
| DevTools                 | good        | excellent                | none              |
| Boilerplate              | low         | medium                   | high              |
| Mutations                | easy        | easy                     | custom            |
| Global store integration | perfect     | weak                     | none              |
| File Uploads             | mid         | mid                      | excellent         |
| Learning curve           | low         | medium                   | low               |
| Suited for               | CRUD apps   | external heavy data apps | simple HTTP calls |

**Decision:** RTK Query is chosen because the project is CRUD-heavy, store-driven, and requires caching and data synchronization.

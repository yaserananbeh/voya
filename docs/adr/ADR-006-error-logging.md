# ADR-006: Error Logging Infrastructure

## Status

Accepted

## Context

The application requires a mechanism to catch, log, and handle runtime errors (UI crashes and API failures) to aid development and prevent blank screens for users. We need a solution that is lightweight and requires no external dependencies.

## Decision

We will implement a custom, zero-dependency logging infrastructure:

1.  **Utils/Logger:** A centralized wrapper around `console` methods to standardize log output.
2.  **React Error Boundary:** A native Class Component to catch errors in the component tree and display a fallback UI.
3.  **Global Handlers:** Window-level listeners to catch unhandled promise rejections and non-React runtime errors.
4.  **Axios Interceptor:** A response interceptor to automatically log all failed API requests.

## Consequences

- **Pros:** Zero external libraries, minimal bundle size, full control over error formatting, meets all project requirements.
- **Cons:** No persistent storage (logs live in the user's console), which is acceptable for a training project scope.

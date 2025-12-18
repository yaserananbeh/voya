import { ComponentErrorBoundary } from './ErrorBoundary'
import type { ComponentType } from 'react'

export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode,
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ComponentErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ComponentErrorBoundary>
    )
  }
}

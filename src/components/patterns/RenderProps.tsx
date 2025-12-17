import type { ReactNode } from 'react'

type RenderPropsDataFetcherProps<T> = {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  error?: unknown
  children: (props: { data: T; isLoading: boolean; isError: boolean; error?: unknown }) => ReactNode
  fallback?: ReactNode
  errorFallback?: (error: unknown) => ReactNode
}

export function RenderPropsDataFetcher<T>({
  data,
  isLoading,
  isError,
  error,
  children,
  fallback,
  errorFallback,
}: RenderPropsDataFetcherProps<T>) {
  if (isLoading) {
    return <>{fallback}</> || null
  }

  if (isError || !data) {
    if (errorFallback) {
      return <>{errorFallback(error)}</>
    }
    return null
  }

  return <>{children({ data, isLoading, isError, error })}</>
}

type RenderPropsListProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  emptyMessage?: string
  emptyComponent?: ReactNode
}

export function RenderPropsList<T>({
  items,
  renderItem,
  emptyMessage = 'No items found',
  emptyComponent,
}: RenderPropsListProps<T>) {
  if (items.length === 0) {
    if (emptyComponent) {
      return <>{emptyComponent}</>
    }
    return <div>{emptyMessage}</div>
  }

  return <>{items.map((item, index) => renderItem(item, index))}</>
}

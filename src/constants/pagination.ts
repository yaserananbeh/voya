/**
 * Pagination settings
 */
export const PAGINATION = {
  // Default page size
  DEFAULT_PAGE_SIZE: 10,

  // Page size options for DataGrid
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50] as const,

  // Initial pagination model
  INITIAL_PAGE: 0 as number,
  INITIAL_PAGE_SIZE: 10 as number,
} as const

/**
 * Get initial pagination model
 */
export const getInitialPaginationModel = () => ({
  page: PAGINATION.INITIAL_PAGE,
  pageSize: PAGINATION.INITIAL_PAGE_SIZE,
})

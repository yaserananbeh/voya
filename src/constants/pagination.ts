export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,

  PAGE_SIZE_OPTIONS: [5, 10, 25, 50] as const,

  INITIAL_PAGE: 0 as number,
  INITIAL_PAGE_SIZE: 10 as number,
} as const

export const getInitialPaginationModel = () => ({
  page: PAGINATION.INITIAL_PAGE,
  pageSize: PAGINATION.INITIAL_PAGE_SIZE,
})

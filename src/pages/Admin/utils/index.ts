import { PAGINATION } from '../constants'

export const getInitialPaginationModel = () => ({
  page: PAGINATION.INITIAL_PAGE,
  pageSize: PAGINATION.INITIAL_PAGE_SIZE,
})

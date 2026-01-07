export type UserType = 'Admin' | 'User'

export interface PaginationQuery {
  searchQuery?: string
  name?: string
  pageNumber?: number
  pageSize?: number
}

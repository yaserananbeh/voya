export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,

  PAGE_SIZE_OPTIONS: [5, 10, 25, 50] as const,

  INITIAL_PAGE: 0 as number,
  INITIAL_PAGE_SIZE: 10 as number,
} as const

export const ADMIN_LAYOUT = {
  DRAWER_WIDTH: 240,
} as const

export const BUTTON_LABELS = {
  CREATE: 'Create',
  UPDATE: 'Update',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  EDIT: 'Edit',
  SUBMIT: 'Submit',
} as const

export const ROUTES = {
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CITIES: '/admin/cities',
  ADMIN_HOTELS: '/admin/hotels',
  ADMIN_ROOMS: '/admin/rooms',
} as const

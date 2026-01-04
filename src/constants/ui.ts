/**
 * UI-related constants
 */
export const UI = {
  // Notification settings
  NOTIFICATION: {
    MAX_SNACKS: 3,
    AUTO_HIDE_DURATION: {
      DEFAULT: 4000,
      SUCCESS: 3000,
      ERROR: 5000,
      WARNING: 4000,
      INFO: 4000,
    },
    ANCHOR_ORIGIN: {
      vertical: 'bottom' as const,
      horizontal: 'right' as const,
    },
  },

  // Admin layout
  ADMIN_LAYOUT: {
    DRAWER_WIDTH: 240,
  },

  // Map settings
  MAP: {
    DEFAULT_ZOOM: 13,
    DEFAULT_HEIGHT: 300,
    SCROLL_WHEEL_ZOOM: false,
  },

  // Image settings
  IMAGE: {
    ROOM_HEIGHT: 180,
    DESTINATION_HEIGHT: 140,
    HOTEL_THUMBNAIL_HEIGHT: 140,
    SKELETON_WIDTH: 180,
    SKELETON_HEIGHT: 120,
  },

  // Test timeouts
  TEST: {
    DEFAULT_TIMEOUT: 3000,
  },

  // Grid column widths
  GRID: {
    COLUMN_MIN_WIDTH: 100,
    COLUMN_DEFAULT_WIDTH: 120,
    ACTIONS_COLUMN_WIDTH: 120,
    NAME_COLUMN_WIDTH: 200,
    DESCRIPTION_COLUMN_WIDTH: 400,
    HOTELS_MIN_WIDTH: 600,
  },

  // Form settings
  FORM: {
    SPECIAL_REQUESTS_ROWS: 4,
    DESCRIPTION_ROWS: 3,
  },

  // Search bar
  SEARCH_BAR: {
    CITY_FLEX: 2,
    CITY_MIN_WIDTH: 180,
    DATE_FLEX: 1,
    DATE_MIN_WIDTH: 150,
  },

  // Filter container
  FILTER: {
    WIDTH: 280,
  },

  // Image loading timeout
  IMAGE_LOAD_TIMEOUT: 8000,

  // Error page dimensions
  ERROR_PAGE: {
    ICON_CONTAINER_SIZE: 80,
    ICON_FONT_SIZE: 48,
    ERROR_BOX_MAX_HEIGHT: 200,
  },
} as const

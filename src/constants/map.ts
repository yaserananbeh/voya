/**
 * Map configuration constants
 */
export const MAP = {
  // OpenStreetMap tile layer
  TILE_LAYER: {
    URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTRIBUTION: '© OpenStreetMap contributors',
  },

  // Default map settings
  DEFAULT_ZOOM: 13,
  DEFAULT_HEIGHT: 300,
  SCROLL_WHEEL_ZOOM: false,
} as const

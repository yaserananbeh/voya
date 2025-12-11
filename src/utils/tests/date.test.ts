import { describe, expect, it } from 'vitest'
import { formatDate } from '../date'

describe('date utils', () => {
  describe('formatDate', () => {
    it('formats a valid Date object to YYYY-MM-DD', () => {
      const date = new Date('2023-10-05T12:00:00Z')
      expect(formatDate(date)).toBe('2023-10-05')
    })

    it('formats a valid date string to YYYY-MM-DD', () => {
      expect(formatDate('2023-01-01')).toBe('2023-01-01')
    })

    it('handles date strings with time components', () => {
      expect(formatDate('2023-12-25T15:30:00.000Z')).toBe('2023-12-25')
    })

    it('returns an empty string for invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('')
    })

    it('returns an empty string for invalid Date objects', () => {
      expect(formatDate(new Date('invalid'))).toBe('')
    })
  })
})

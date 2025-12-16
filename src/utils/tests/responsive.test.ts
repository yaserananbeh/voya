import { describe, expect, it } from 'vitest'
import { pxToRem } from '../responsive'

describe('responsive utils', () => {
  describe('pxToRem', () => {
    it('converts 16px to 1rem', () => {
      expect(pxToRem(16)).toBe('1rem')
    })

    it('converts 0px to 0rem', () => {
      expect(pxToRem(0)).toBe('0rem')
    })

    it('calculates fractional rem values correctly', () => {
      expect(pxToRem(14)).toBe('0.875rem')
      expect(pxToRem(24)).toBe('1.5rem')
    })
  })
})

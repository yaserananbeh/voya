import { describe, expect, it } from 'vitest'
import { capitalize } from '../string'

describe('string utils', () => {
  describe('capitalize', () => {
    it('capitalizes the first letter of a lowercase word', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('returns the same string if already capitalized', () => {
      expect(capitalize('World')).toBe('World')
    })

    it('handles single character strings', () => {
      expect(capitalize('a')).toBe('A')
    })

    it('returns an empty string if input is empty', () => {
      expect(capitalize('')).toBe('')
    })

    it('does not change the rest of the string casing', () => {
      expect(capitalize('hELLO')).toBe('HELLO')
    })
  })
})

import { describe, expect, it } from 'vite-plus/test'

import { ratio } from '../src/index.ts'

describe('ratio', () => {
  describe('basic calculations', () => {
    it('calculates the corresponding value', () => {
      expect(ratio(400, '4:3')).toBe(300)
    })

    it('uses 1:1 as the default ratio', () => {
      expect(ratio(400)).toBe(400)
    })

    it('supports reverse direction', () => {
      expect(ratio(300, '4:3', -1)).toBe(400)
    })

    it('supports explicit forward direction', () => {
      expect(ratio(400, '4:3', 1)).toBe(300)
    })

    it('supports decimal ratio components', () => {
      expect(ratio(100, '2.5:1')).toBe(40)
    })

    it('supports negative input values', () => {
      expect(ratio(-400, '4:3')).toBe(-300)
    })
  })

  describe('precision', () => {
    it('rounds to two decimal places by default', () => {
      expect(ratio(100, '3:2')).toBe(66.67)
    })

    it('supports custom precision', () => {
      expect(ratio(100, '3:2', 1, { precision: 4 })).toBe(66.6667)
    })

    it('supports zero decimal places', () => {
      expect(ratio(100, '3:2', 1, { precision: 0 })).toBe(67)
    })

    it('supports zero as a precision value', () => {
      expect(ratio(100, '3:2', 1, { precision: 0 })).toBe(67)
    })
  })

  describe('input validation', () => {
    it.each([NaN, Infinity, -Infinity])('rejects non-finite values: %s', (value) => {
      expect(() => ratio(value)).toThrow(TypeError)
    })

    it.each(['', '4', '4/3', '4:3:2', 'a:b', ' 4:3'])(
      'rejects invalid ratio definitions: %s',
      (definition) => {
        expect(() => ratio(400, definition)).toThrow(TypeError)
      },
    )

    it.each(['0:3', '4:0', '-4:3', '4:-3'])(
      'rejects non-positive ratio components: %s',
      (definition) => {
        expect(() => ratio(400, definition)).toThrow()
      },
    )

    it('rejects ratio components that exceed the finite number range', () => {
      expect(() => ratio(400, `${'9'.repeat(400)}:3`)).toThrow(RangeError)
    })

    it('rejects an invalid direction', () => {
      expect(() => ratio(400, '4:3', 0 as 1)).toThrow(TypeError)
    })

    it.each([-1, 1.5, 101, NaN, Infinity])('rejects invalid precision: %s', (precision) => {
      expect(() => ratio(400, '4:3', 1, { precision })).toThrow(RangeError)
    })
  })

  describe('result validation', () => {
    it('rejects a result outside the finite number range', () => {
      expect(() => ratio(Number.MAX_VALUE, '1:2')).toThrow(RangeError)
    })
  })
})

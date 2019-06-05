import {
  getObjectKeys,
  getObjectKeysCount,
  greaterOrEquals
} from '@Utilities'

describe('String Utils', () => {
  describe('Object helpers', () => {
    let user = {
      name: 'James',
      status: 'active',
      clearance: 'gold'
    }

    test('should return the correct object keys', () => {
      expect(getObjectKeys(user)).toEqual(['name', 'status', 'clearance'])
    })

    test('should return the current count of keys in a map', () => {
      expect(getObjectKeysCount(user)).toBe(3)
    })
  })

  describe('Comparison helpers', () => {
    test('should ensure 20 is greater than 10', () => {
      expect(greaterOrEquals(10, 20)).toBeTruthy();
    })
  })
})

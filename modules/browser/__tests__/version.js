import { diffVersions, versionToArray, compareVersion } from '../index'

describe('Browser version module', () => {
  describe('diffVersions() method', () => {
    it('should return -1 if first version is lower than second version', () => {
      expect(diffVersions([1, 0, 0], [1, 5, 0])).toBe(-5)
    })

    it('should return 0 if versions are equal', () => {
      expect(diffVersions([1, 0, 0], [1, 0, 0])).toBe(0)
    })

    it('should return 1 if first version is greater than second version', () => {
      expect(diffVersions([3, 5, 1], [1, 1, 0])).toBe(2)
    })

    it('should return 0 if it cannot make a comparison', () => {
      expect(diffVersions(['NaN'], ['Foo'])).toBe(0)
    })
  })

  describe('versionToArray() method', () => {
    it('should return an array for semver', () => {
      expect(versionToArray('1.0.1')).toEqual([1, 0, 1])
    })

    it('should return an array if metadata is provided', () => {
      expect(versionToArray('1.0.1-alpha')).toEqual([1, 0, 1])
    })

    it('should return same argument if not an string', () => {
      expect(versionToArray([1, 0, 0])).toEqual([1, 0, 0])
    })
  })

  describe('compareVersion() method', () => {
    it('should compare (semver) versions', () => {
      expect(compareVersion('1.0.1', '<', '5.1.0')).toBe(true)
      expect(compareVersion('4.4.1', '<', '0.1.0')).toBe(false)

      expect(compareVersion('9.0.1', '>', '5.1.0')).toBe(true)
      expect(compareVersion('4.4.1', '>', '6.1.0')).toBe(false)

      expect(compareVersion('6.0.1', '>=', '5.1.1')).toBe(true)
      expect(compareVersion('5.1.1', '>=', '5.1.1')).toBe(true)
      expect(compareVersion('4.4.1', '>=', '6.1.0')).toBe(false)

      expect(compareVersion([4, 0, 1], '<=', [5, 1, 1])).toBe(true)
      expect(compareVersion('4.1.1', '<=', '5.1.1')).toBe(true)
      expect(compareVersion('8.4.1', '<=', '6.1.0')).toBe(false)

      expect(compareVersion('2.4.1', '=', '2.4.1')).toBe(true)
      expect(compareVersion('4.4.1', '=', '0.1.0')).toBe(false)

      expect(compareVersion('2.4.1', '==', '2.4.1')).toBe(true)
      expect(compareVersion('0.4.1', '==', '6.4.1')).toBe(false)

      expect(compareVersion('2.4.1', 'Whut?', '2.4.1')).toBe(false)
    })
  })
})

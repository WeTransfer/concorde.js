/**
 * Version module. Handy functions operate with semver version numbers.
 * @module Version
 * @since 1.0.0
 */

/**
 * Compares to versions (array format) and determines the difference between them.
 * @since 1.0.0
 * @param {Array} versionA One of the versions to compare.
 * @param {Array} versionB The other version to compare.
 * @returns {number} Returns the difference or 0 if it cannot make a comparison.
 * @example
 *
 * import { diffVersions } from '@wetransfer/concorde-browser';
 *
 * diffVersions([1, 0, 0], [1, 5, 0])
 * // => -5
 *
 * diffVersions([1, 0, 0], [1, 0, 0])
 * // => 0
 *
 * diffVersions([3, 5, 1], [1, 1, 0])
 * // => 2
 */
export function diffVersions(versionA, versionB) {
  if (versionA.some(isNaN) || versionB.some(isNaN)) {
    return 0;
  }

  let result = -1;

  const length = versionB.length;

  for (let index = 0; index < length; index++) {
    result = versionA[index] - versionB[index];
    if (result !== 0) {
      return result;
    }
  }

  return result;
}

/**
 * Converts a string version into an array
 * @since 1.0.0
 * @param {String} version The version to convert, in semantic versioning format.
 * @returns {Array} Returns the version in array format.
 * @example
 *
 * import { versionToArray } from '@wetransfer/concorde-browser';
 *
 * versionToArray('1.0.1')
 * // => [1, 0, 1]
 *
 * versionToArray('1.0.1-alpha')
 * // => [1, 0, 1]
 *
 * versionToArray([3, 5, 1], [1, 1, 0])
 * // => 2
 */
export function versionToArray(version) {
  if (typeof version === 'string') {
    return version.split('.').map((num) => parseFloat(num));
  }

  return version;
}

const operations = {
  ['>='](result) {
    return result >= 0;
  },
  ['>'](result) {
    return result > 0;
  },
  ['<'](result) {
    return result < 0;
  },
  ['<='](result) {
    return result <= 0;
  },
  ['='](result) {
    return result === 0;
  },
  ['=='](result) {
    return result === 0;
  }
};

/**
 * Compares to semantic versions, given an operator.
 * @since 1.0.0
 * @param {Array} versionA One of the versions to compare.
 * @param {String} operator Compare versions using this operator. We support `>`, `>=`, `<`, `<=`, `=` and `==`.
 * @param {Array} versionB The other version to compare.
 * @returns {boolean} True if condition can be satisfied, false otherwise.
 * @example
 *
 * import { compareVersion } from '@wetransfer/concorde-browser';
 *
 * compareVersion('1.0.1', '<', '5.1.0')
 * // => true
 *
 * compareVersion('4.4.1', '=', '0.1.0')
 * // => false
 *
 * compareVersion('4.4.1', '>=', '6.1.0')
 * // => false
 */
export function compareVersion(versionA, operator, versionB) {
  const operation = operations[operator];

  if (!operation) {
    return false;
  }

  // Match all version parts (major, minor, patch..)
  const result = diffVersions(
    versionToArray(versionA),
    versionToArray(versionB)
  );

  return operation(result);
}

function compare(a, b) {
  let result = -1;
  for (const index in b) {
    result = a[index] - b[index];
    if (result !== 0) {
      return result;
    }
  }

  return result;
}

// Convert 1.2.3 to [1,2,3]
function convertVersion(version) {
  if (typeof version === 'string') {
    return version.split('.').map((num) => parseFloat(num));
  }

  return version;
}

export default function versionCompare(versionA, operator, versionB) {
  versionA = convertVersion(versionA);
  versionB = convertVersion(versionB);

  // Match all version parts (major, minor, patch..)
  const result = compare(versionA, versionB);

  // Compare the results
  switch (operator) {
    case '>=':
      return result >= 0;

    case '>':
      return result > 0;

    case '<':
      return result < 0;

    case '<=':
      return result <= 0;

    case '=':
    case '==':
      return result === 0;

    default:
      return false;
  }
}
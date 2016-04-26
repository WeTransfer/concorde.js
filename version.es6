
function compare(a, b) {
  let result = -1;
  for (let index in b) {
    result = a[index] - b[index];
    if (result !== 0) {
      return result;
    }
  }

  return result;
}

export default function versionCompare(versionA, operator, versionB) {
  // Convert 1.2.3 to [1,2,3]
  if (typeof versionB === 'string') {
    versionB = versionB.split('.').map(num => parseFloat(num));
  }

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
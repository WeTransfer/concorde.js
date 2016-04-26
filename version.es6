function compare(a, operator, b) {
  // match the operator
  b = parseFloat(b);
  switch (operator) {
    case '>=':
      return a >= b;
    case '>':
      return a > b;
    case '<':
      return a < b;
    case '<=':
      return a <= b;
    case '=':
    case '==':
      return a == b;
    default:
      return false;
  }
};

export default function versionCompare(versionA, operator, versionB) {
  // Convert 1.2.3 to [1,2,3]
  if (typeof versionB == 'string') {
    versionB = versionB.split('.').map(num => parseFloat(num));
  }

  // Match all version parts (major, minor, patch..)
  for (let index in versionB) {
    if (!compare(versionA[index], operator, versionB[index])) return false;
  }

  return true;
};
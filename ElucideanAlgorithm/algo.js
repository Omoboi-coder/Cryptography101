

/**
 * @param {number} a 
 * @param {number} b 
 * @returns {number} 
 */
function gcdModulo(a, b) {

  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    let remainder = a % b;
    a = b;
    b = remainder;
  }

  return a;
}

/**
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */

function gcdSubtraction(a, b) {
 
  a = Math.abs(a);
  b = Math.abs(b);

  // We Continue until a and b are equal
  while (a !== b) {
    if (a > b) {
      a = a - b;
    } else {
      b = b - a;
    }
  }

  return a;
}

/**
 * @param {number} a 
 * @param {number} b 
 * @returns {number} 
 */
function gcdRecursive(a, b) {

  a = Math.abs(a);
  b = Math.abs(b);

  // Base case: if b is 0, return a
  if (b === 0) {
    return a;
  }

  return gcdRecursive(b, a % b);
}

// Test cases
console.log("=== Euclidean Algorithm - GCD Calculation ===\n");

const testCases = [
  { a: 48, b: 18 },
  { a: 100, b: 50 },
  { a: 17, b: 19 },
  { a: 1071, b: 462 },
];

testCases.forEach(({ a, b }) => {
  console.log(`GCD(${a}, ${b}):`);
  console.log(`  Modulo Method:     ${gcdModulo(a, b)}`);
  console.log(`  Subtraction Method: ${gcdSubtraction(a, b)}`);
  console.log(`  Recursive Method:   ${gcdRecursive(a, b)}\n`);
});

module.exports = { gcdModulo, gcdSubtraction, gcdRecursive };

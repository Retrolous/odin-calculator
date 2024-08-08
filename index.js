function add(...addArgs) {
  return addArgs.reduce((a, b) => a + b, 0);
}

function subtract(...subtractArgs) {
  return subtractArgs.reduce((a, b) => a - b);
}

function multiply(...multiplyArgs) {
  return multiplyArgs.reduce((a, b) => a * b, 1);
}

function divide(...divideArgs) {
  return divideArgs.reduce((a, b) => a / b);
}

console.log(add(1, 2, 3));
console.log(subtract(1, 10, 3));
console.log(multiply(1, 10, 3));
console.log(divide(1, 10, 3));
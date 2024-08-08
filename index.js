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

let firstNumber;
let operator;
let secondNumber;

function operate(firstNumber, operator, secondNumber){
    switch(operator){
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
        default:
            alert("Invalid operation!")
            break;
    }
}

console.log(operate(1, "/", 3))
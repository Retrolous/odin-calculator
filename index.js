function prepareButtons() {
  //#region Operations
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

  function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
      case "+":
        return add(firstNumber, secondNumber);
      case "-":
        return subtract(firstNumber, secondNumber);
      case "*":
        return multiply(firstNumber, secondNumber);
      case "/":
        return divide(firstNumber, secondNumber);
      default:
        alert("Invalid operation!");
        break;
    }
  }
  //#endregion
  //#region Variables
  let firstNumber = "";
  let operator = "";
  let secondNumber = "";

  const textDisplay = document.querySelector("#calc-text-display");
  const buttons = document.querySelector("#button-body");
  const mainCalcBody = document.querySelector("#main-calc-body");
  const screen = document.querySelector("#calc-screen");
  const numbers = "1234567890";
  //#endregion
  //#region Display functions
  function updateDisplay(text) {
    textDisplay.textContent = text;
  }

  function resetForNewOp(result = "") {
    result != "" ? (firstNumber = formatNumber(result)) : (firstNumber = "");
    operator = "";
    secondNumber = "";
    updateDisplay(firstNumber);
  }

  function handleEquals() {
    // If there is no second number, do nothing. "." ensures that the user has not just inserted a decimal without any numbers
    if (!secondNumber || secondNumber == ".") {
      return;
    } else if (operator === "/" && secondNumber === "0") {
      updateDisplay("I'm afraid I can't do that, Dave.");
      resetForNewOp();
    } else {
      let result = operate(+firstNumber, operator, +secondNumber);
      resetForNewOp(result);
    }
  }

  function addDecimal() {
    // Ensures that the decimal is being added onto the correct value - don't add a decimal onto an empty string
    if (!secondNumber && !firstNumber.includes(".")) {
      firstNumber += ".";
    } else if (!secondNumber.includes(".")) {
      secondNumber += ".";
    }
  }

  function formatNumber(num) {
    // Convoluted, but converts the string to a number, then runs "toFixed" which returns a string.
    // However, "toFixed" disregards whether the decimals are needed - it pads with 0s, so this is
    // converted back to a number to let JS automatically remove the unnecessary decimals, and finally
    // this is converted back to a string.
    formattedNum = (+(+num).toFixed(5)).toString();
    !secondNumber
      ? (firstNumber = formattedNum)
      : (secondNumber = formattedNum);
    return formattedNum;
  }

  function handlePreviousOperator() {
    if (operator != "") handleEquals();
  }
  //#endregion
  buttons.addEventListener(
    "click",
    (e) => {
      // Necessary, as without this check the ENTIRE div's textContent would be added to whatever number was currently
      // being operated on - all the buttons
      if (e.target.nodeName === "BUTTON") {
        switch (e.target.textContent) {
          case "+":
          case "-":
          case "*":
          case "/":
            handlePreviousOperator();
            operator = e.target.textContent;
            break;
          case "=":
            handleEquals();
            break;
          case "C":
            resetForNewOp(firstNumber);
            break;
          case "AC":
            resetForNewOp();
            break;
          case "<-":
            if (!secondNumber) {
              firstNumber = firstNumber.slice(0, -1);
              updateDisplay(formatNumber(firstNumber));
            } else {
              secondNumber = secondNumber.slice(0, -1);
              updateDisplay(formatNumber(secondNumber));
            }
            break;
          case ".":
            addDecimal();
            break;
          case "sqrt":
            resetForNewOp(Math.sqrt(+firstNumber).toString());
            break;
          case "%":
            resetForNewOp((+firstNumber / 100).toString());
            break;
          case "+/-":
            if (!secondNumber) {
              firstNumber =
                firstNumber.at(0) === "-"
                  ? firstNumber.slice(1)
                  : `-${firstNumber}`;
              updateDisplay(firstNumber);
            } else {
              secondNumber =
                secondNumber.at(0) === "-"
                  ? secondNumber.slice(1)
                  : `-${secondNumber}`;
              updateDisplay(secondNumber);
            }
            break;
          default:
            if (
              !operator &&
              firstNumber.length < 15 &&
              firstNumber.at(-6) != "."
            ) {
              firstNumber += e.target.textContent;
              updateDisplay(formatNumber(firstNumber));
            } else if (
              operator &&
              secondNumber.length < 15 &&
              secondNumber.at(-6) != "."
            ) {
              secondNumber += e.target.textContent;
              updateDisplay(formatNumber(secondNumber));
            }
            break;
        }
      }
    },
    false
  );

  const windowButtons = document.querySelector("#window-buttons");
  windowButtons.addEventListener(
    "click",
    (e) => {
      switch (e.target.textContent) {
        case "↑":
          e.target.textContent = "↓";
          buttons.classList.add("minimised");
          screen.classList.add("minimised");
          break;
        case "↓":
          e.target.textContent = "↑";
          buttons.classList.remove("minimised");
          screen.classList.remove("minimised");
          break;
        case "□":
          mainCalcBody.classList.toggle("maximised");
          break;
        case "X":
        case "-":
          mainCalcBody.remove();
          break;
      }
    },
    false
  );

  document.addEventListener("keypress", (e) => {
    console.log(e.code);
    switch (e.key) {
      case "+":
        document.querySelector("#plus").click();
        break;
      case "-":
        document.querySelector("#minus").click();
        break;
      case "*":
        document.querySelector("#times").click();
        break;
      case "/":
        document.querySelector("#slash").click();
        break;
      case "=":
      case "Enter":
        handleEquals();
        break;
      case "c":
        document.querySelector("#C").click();
        break;
      case "a":
        document.querySelector("#AC").click();
        break;
      case "Backspace":
      case "Delete":
        document.querySelector("#backspace").click();
        break;
      case ".":
        addDecimal();
        break;
      case "%":
        document.querySelector("#percent").click();
        break;
      default:
        if (
          !operator &&
          firstNumber.length < 15 &&
          firstNumber.at(-6) != "." &&
          numbers.includes(e.key)
        ) {
          firstNumber += e.key;
          updateDisplay(formatNumber(firstNumber));
        } else if (
          operator &&
          secondNumber.length < 15 &&
          secondNumber.at(-6) != "." &&
          numbers.includes(e.key)
        ) {
          secondNumber += e.key;
          updateDisplay(formatNumber(secondNumber));
        }
        break;
    }
  });
}

prepareButtons();

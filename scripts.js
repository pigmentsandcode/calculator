function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

const firstNum = [];
const secondNum = [];
let operator = null;
let result = null;

function operate(num1, num2, op) {
  if (op === "+") {
    result = add(num1, num2);
  } else if (op === "-") {
    result = subtract(num1, num2);
  } else if (op === "X") {
    result = multiply(num1, num2);
  } else if (op === "/") {
    result = divide(num1, num2);
  } else {
    result = "ERROR";
  }
}

function updateDisplay() {
  const displayEl = document.querySelector(".display");
  if (result === null) {
    let firstNumStr = firstNum.join("");
    let secondNumStr = secondNum.join("");
    if (operator === null) {
      displayEl.innerText = firstNumStr;
    } else {
      displayEl.textContent = `${firstNumStr} ${operator} ${secondNumStr}`;
    }
  } else {
    displayEl.textContent = result;
  }
}

function handleDigitClick(e) {
  if (operator === null) {
    firstNum.push(e.target.id);
  } else {
    secondNum.push(e.target.id);
  }
  updateDisplay();
}

function handleOperatorClick(e) {
  if (secondNum.length === 0) {
    operator = e.target.textContent;
  }
  updateDisplay();
}

function handleEqClick() {
  if (firstNum.length !== 0 && secondNum.length !== 0 && operator !== null) {
    const num1 = +firstNum.join("");
    const num2 = +secondNum.join("");
    operate(num1, num2, operator);
    updateDisplay();
  }
}

const numberBtnEls = document.querySelectorAll(".num-btn");
numberBtnEls.forEach((btnEl) => {
  btnEl.addEventListener("click", handleDigitClick);
});

const opBtnsEl = document.querySelectorAll(".op-btn");
opBtnsEl.forEach((btnEl) => {
  btnEl.addEventListener("click", handleOperatorClick);
});

const eqBtnEl = document.querySelector("#eq");
eqBtnEl.addEventListener("click", handleEqClick);

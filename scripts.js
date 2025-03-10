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

function truncateResult(num) {
  return Number.parseFloat(num.toFixed(5));
}

const firstNum = [];
const secondNum = [];
let operator = null;
let result = null;

function operate(num1, num2, op) {
  if (op === "+") {
    result = truncateResult(add(num1, num2));
  } else if (op === "-") {
    result = truncateResult(subtract(num1, num2));
  } else if (op === "X") {
    result = truncateResult(multiply(num1, num2));
  } else if (op === "/") {
    if (num2 === 0) {
      result = null;
      secondNum.length = 0;
      alert("Cannot divide by zero! Enter second number again");
    } else {
      result = truncateResult(divide(num1, num2));
    }
  } else {
    result = "ERROR";
  }
}

function updateDisplay() {
  const displayEl = document.querySelector(".display");
  if (result === null) {
    if (firstNum.length === 0) {
      const delBtn = document.querySelector("#del");
      delBtn.disabled = true;
      displayEl.textContent = "";
    } else {
      let firstNumStr = firstNum.join("");
      let secondNumStr = secondNum.join("");
      if (operator === null) {
        displayEl.innerText = firstNumStr;
      } else {
        displayEl.textContent = `${firstNumStr} ${operator} ${secondNumStr}`;
      }
      const delBtn = document.querySelector("#del");
      delBtn.disabled = false;
    }
  } else {
    displayEl.textContent = result;
  }
}
function clearDisplay() {
  const displayEl = document.querySelector(".display");
  displayEl.textContent = "";
}

function clearValues() {
  firstNum.length = 0;
  secondNum.length = 0;
  result = null;
  operator = null;
}

function handleDigitClick(e) {
  if (result !== null) {
    clearValues();
  }

  if (operator === null) {
    firstNum.push(e.target.id);
  } else {
    secondNum.push(e.target.id);
  }
  updateDisplay();
}

function handleOperatorClick(e) {
  if (firstNum.length === 0) {
    return;
  }

  if (secondNum.length === 0) {
    operator = e.target.textContent;
  } else {
    if (firstNum.length !== 0 && operator !== null) {
      const num1 = +firstNum.join("");
      const num2 = +secondNum.join("");
      operate(num1, num2, operator);
      let resultVals = result.toString().split("");
      clearValues();
      resultVals.forEach((val) => {
        firstNum.push(val);
      });
      console.log("Double op click: " + firstNum);
      operator = e.target.textContent;
    }
  }
  updateDisplay();
}

function handleEqClick() {
  if (firstNum.length !== 0 && secondNum.length !== 0 && operator !== null) {
    const num1 = +firstNum.join("");
    const num2 = +secondNum.join("");
    operate(num1, num2, operator);
    updateDisplay();
    let resultVals = result.toString().split("");
    clearValues();
    resultVals.forEach((val) => {
      firstNum.push(val);
    });
  }
}

function handleClearClick() {
  clearValues();
  clearDisplay();
}

function handleDelClick() {
  if (operator === null) {
    if (firstNum.length !== 0) {
      firstNum.pop();
    }
  } else if (secondNum.length === 0) {
    operator = null;
  } else if (result === null) {
    secondNum.pop();
  }
  updateDisplay();
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

const clrBtnEl = document.querySelector("#clear");
clrBtnEl.addEventListener("click", handleClearClick);

const delBtnEl = document.querySelector("#del");
delBtnEl.addEventListener("click", handleDelClick);
delBtnEl.disabled = true;

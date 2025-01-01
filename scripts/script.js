const calculatorElement = document.querySelector("#calc");
const screenElement = document.querySelector("#screenRow");

let numberOneMemory = [];
let numberTwoMemory = [];
let signMemory = null;
let workingNumber = null;

let buildSecondNumber = false;
let canDotBePressed = true;

function addNumbers(n1, n2) {
  return n1 + n2;
}

function subtractNumbers(n1, n2) {
  return n1 - n2;
}

function multiplyNumbers(n1, n2) {
  return n1 * n2;
}

function divideNumbers(n1, n2) {
  if (n1 === 0 || n2 === 0) {
    updateScreen("err_");
    return 0;
  }
  return n1 / n2;
}

function updateScreen(content = workingNumber.join("") + "_") {
  screenElement.textContent = content;

  console.log("workingNumber");
  console.log(workingNumber.join(""));
  console.log("numberOneMemory");
  console.log(numberOneMemory.join(""));
  console.log("numberTwoMemory");
  console.log(numberTwoMemory.join(""));
}

function checkWorkingNumber() {
  if (buildSecondNumber) workingNumber = numberTwoMemory;
  else workingNumber = numberOneMemory;
}

function buildNumber(number) {
  checkWorkingNumber();
  if (number === "dot" && canDotBePressed === false) return;
  if (number === "dot") {
    workingNumber.push(".");
    canDotBePressed = false;
    updateScreen();
    return;
  }
  workingNumber.push(Number(number));
  updateScreen();
}

function calculateMath() {
  let n1 = Number(numberOneMemory.join(""));
  let n2 = Number(numberTwoMemory.join(""));
  switch (signMemory) {
    case "add":
      return addNumbers(n1, n2);

    case "neg":
      return subtractNumbers(n1, n2);

    case "multi":
      return multiplyNumbers(n1, n2);

    case "divide":
      return divideNumbers(n1, n2);

    case "percent":
      return addNumbers(n1, n2);
  }
}

function equalsCalled() {
  let calculatedNumber = calculateMath();
  console.log(calculatedNumber);
}

function symbolPressed(symbol) {
  buildSecondNumber = true;
  if (!signMemory) {
    signMemory = symbol;

    return;
  }

  //equals
}

function backspace() {
  let item = workingNumber[workingNumber.length - 1];
  if (item === ".") {
    workingNumber.pop();
    canDotBePressed = true;
  } else workingNumber.pop();
  updateScreen();
  return;
}

function clear() {
  numberOneMemory = [];
  numberTwoMemory = [];
  signMemory = null;
  workingNumber = [];
  buildSecondNumber = false;
  canDotBePressed = true;
  updateScreen("_");
}

function buttonPressed(target) {
  let targetClassList = target.classList;
  if (targetClassList.contains("number")) {
    buildNumber(target.getAttribute("id"));
  } else if (targetClassList.contains("math-btn")) {
    symbolPressed(target.getAttribute("id"));
  } else if (target.getAttribute("id") === "clr") {
    clear();
  } else if (target.getAttribute("id") === "del") {
    backspace();
  } else equalsCalled();
}

document.addEventListener("DOMContentLoaded", () => {
  calculatorElement.addEventListener("click", (e) => {
    buttonPressed(e.target);
  });
});

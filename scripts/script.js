const calculatorElement = document.querySelector("#calc");
const screenElement = document.querySelector("#screenRowContent");

let numberOneMemory = [];
let numberTwoMemory = [];
let signMemory = null;
let workingNumber = null;

let buildSecondNumber = false;
let canDotBePressed = true;

function addNumbers(n1, n2) {
  return Math.round((n1 + n2 + Number.EPSILON) * 100) / 100;
}

function subtractNumbers(n1, n2) {
  return Math.round((n1 - n2 + Number.EPSILON) * 100) / 100;
}

function multiplyNumbers(n1, n2) {
  return Math.round((n1 * n2 + Number.EPSILON) * 100) / 100;
}

function divideNumbers(n1, n2) {
  if (n1 === 0 || n2 === 0) {
    return "err";
  }
  return Math.round((n1 / n2 + Number.EPSILON) * 100) / 100;
}

function percentNumbers() {
  let n1 = workingNumber.join("");

  return Math.round((n1 * (1 / 100) + Number.EPSILON) * 100) / 100;
}

function updateScreen(content = workingNumber.join("") + "_") {
  screenElement.textContent = content.substring(0, 6);
  // if the array or number has a decimal in it do the following
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
      return percentNumbers(n1, n2);
  }
}

function equalsCalled() {
  let calculatedNumber = calculateMath();
  clear();
  numberOneMemory.push(calculatedNumber);
  updateScreen(calculatedNumber.toString());
  workingNumber = numberOneMemory;
}

function symbolPressed(symbol) {
  let symbolIcon = document.querySelector(`#${symbol}`).textContent;
  if (!buildSecondNumber) {
    canDotBePressed = true;
    buildSecondNumber = true;
    signMemory = symbol;
  } else {
    equalsCalled();
    signMemory = symbol;
    buildSecondNumber = true;
  }
  updateScreen(workingNumber.join("") + symbolIcon);
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

function keyPressed(key) {
  if (Number.isInteger(Number(key))) {
    buildNumber(key);
  } else if (key == "Backspace") {
    backspace();
  } else if (key == "Delete") {
    clear();
  } else if (key == "=" || key == "Enter") {
    equalsCalled();
  } else if (key == ".") {
    buildNumber("dot");
  } else if (key == "+") {
    symbolPressed("add");
  } else if (key == "-") {
    symbolPressed("neg");
  } else if (key == "*") {
    symbolPressed("multi");
  } else if (key == "/") {
    symbolPressed("divide");
  } else if (key == "%") {
    symbolPressed("percent");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  calculatorElement.addEventListener("click", (e) => {
    buttonPressed(e.target);
  });
});

window.addEventListener("keydown", function (e) {
  const key = e.key;
  keyPressed(key);
});

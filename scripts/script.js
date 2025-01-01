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
  return n1 / n2;
}

function updateScreen() {
  screenElement.textContent = workingNumber.join("") + "_";

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
  if (number === "dot") {
    workingNumber.push(".");
    updateScreen();
    return;
  }
  workingNumber.push(Number(number));
  updateScreen();
}

function buttonPressed(target) {
  let targetClassList = target.classList;
  if (targetClassList.contains("number")) {
    buildNumber(target.getAttribute("id"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  calculatorElement.addEventListener("click", (e) => {
    buttonPressed(e.target);
  });
});

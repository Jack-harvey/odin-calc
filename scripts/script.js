const calculatorElement = document.querySelector("#calc");

let numberOneMemory = [];
let numberTwoMemory = [];
let SignMemory = null;

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

function invertPositivity(number) {
  if (number === 0) return;
  return number < 0 ? 0 + number : 0 - number;
}

function clear() {
  numberOneMemory = [];
  numberTwoMemory = [];
  SignMemory = null;
}

function updateScreen() {
  if (SignMemory == null) {
    const screenElement = document.querySelector("#screenRow");
    screenElement.textContent = numberOneMemory.join("");
  }
}

function dotPressed(state) {
  canDotBePressed = state === "disableDot" ? false : true;
}

function numberPressed(number) {
  if (!canDotBePressed) return;

  if (SignMemory == null) {
    numberOneMemory.push(number);
    updateScreen();
  } else {
    numberTwoMemory.push(number);
    updateScreen();
  }

  if (number === "dot") dotPressed("disableDot");
}

function buttonPressed(button) {
  if (!isNaN(button) || button === "dot") {
    numberPressed(button);
  } else {
    console.log("it's not a number");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  calculatorElement.addEventListener("click", (e) => {
    buttonPressed(e.target.getAttribute("id"));
  });
});

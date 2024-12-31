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
  updateScreen();
}

function updateScreen() {
  if (SignMemory == null) {
    const screenElement = document.querySelector("#screenRow");
    screenElement.textContent = numberOneMemory.join("") + "_";
  } else {
    const screenElement = document.querySelector("#screenRow");
    screenElement.textContent = numberTwoMemory.join("") + "_";
  }
}

function dotPressed(state) {
  canDotBePressed = state === "disableDot" ? false : true;
}

function numberPressed(number) {
  if (!canDotBePressed && number === "dot") return;
  if (number === "dot") {
    number = ".";
    dotPressed("disableDot");
  }

  if (SignMemory == null) {
    numberOneMemory.push(number);
    updateScreen();
  } else {
    numberTwoMemory.push(number);
    updateScreen();
  }
}

function highlightButton(type) {
  const button = document.querySelector(`#${type}`);
  button.classList.toggle("highlight");
}

function mathButtonPressed(type) {
  SignMemory = type;
  highlightButton(type);
}

function signPressed(type) {
  if (type === "clr") clear();
  if (
    type === "divide" ||
    type === "multi" ||
    type === "neg" ||
    type === "add"
  ) {
    mathButtonPressed(type);
  }
  // if (type === "")
  // if (type === "")
  // if (type === "")
  // if (type === "")
}

function buttonPressed(button) {
  if (!isNaN(button) || button === "dot") {
    numberPressed(button);
  } else {
    signPressed(button);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  calculatorElement.addEventListener("click", (e) => {
    buttonPressed(e.target.getAttribute("id"));
  });
});

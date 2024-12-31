const calculatorElement = document.querySelector("#calc");
const screenElement = document.querySelector("#screenRow");

let numberOneMemory = [];
let numberTwoMemory = [];
let SignMemory = null;

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

function buttonPressed(button) {
  if (!isNaN(button) || button === "dot") {
    console.log(button);
  } else {
    console.log("it's not a number");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  calculatorElement.addEventListener("click", (e) => {
    buttonPressed(e.target.getAttribute("id"));
  });
});

//
//three main variables, n1, sign, n2
//every button clicked should evaluate what process to take
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// Operation variables
let num1 = 0;
let num2;
let operator = "+";

const display = document.querySelector("#display");
let displayValue = display.textContent;

// Button click event
const btnContainer = document.querySelector("#btnContainer");
btnContainer.addEventListener('click', activateButton);

// Operator functions
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
    return num1/num2;
}

// operate function
function operate(num1, operator, num2) {
    switch (operator) { 
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return subtract(num1,num2);
            break;
        case "x":
            return multiply(num1,num2);
            break;
        case "÷":
            return divide(num1,num2);
            break;
    }
}

function populateDisplay(digitStr, displayValue = '') {
    if (displayValue === "0") return;
    display.textContent = displayValue + digitStr;
    // this may be unnecessary?
    return display.textContent;
}                 

function activateButton (event) {
    const target = event.target;
    //displayValue = display.textContent;
    if (target.className === "btn number") {
        displayValue = populateDisplay(target.textContent, displayValue);
    }
    if (target.className === "btn operator") {
        num2 = Number(display.textContent);
        num1 = operate(num1, operator, num2);
        operator = target.textContent;
        display.textContent = num1;
        displayValue = "";
    }
}





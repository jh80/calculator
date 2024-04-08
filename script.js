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

// Operation variables
let num1;
let num2;
let operator;

// operate function
function operate(num1, operator, num2) {
    switch (operator) { 
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return subtract(num1,num2);
            break;
        case "*":
            return multiply(num1,num2);
            break;
        case "/":
            return divide(num1,num2);
            break;
    }
}

// Populate display function
const display = document.querySelector("#display");
let displayValue = display.textContent;

function populateDisplay(digitStr, displayValue = '') {
    display.textContent = displayValue + digitStr;
    // this may be unnecessary?
    return display.textContent;
}                 

function activateButton (event) {
    const target = event.target;
    displayValue = display.textContent;
    if (target.className === "btn number") {
        populateDisplay(target.textContent, displayValue);
    }
    
}

// Button click event
const btnContainer = document.querySelector("#btnContainer");
btnContainer.addEventListener('click', activateButton);

// Operator functions
// USES GLOBAL VARIABLES and DOES MORE THAN ONE THING
function evaluateOperatorProcedure(event) {
    num2 = display.textContent;
    // Apply appropriate operation
    switch(operator) {
        case '+':
            num1 = add(num1, num2);
            break;
        case '-':
            num1 = subtract(num1, num2);
            break;
        case 'x':
            num1 = multiply(num1, num2);
            break;
        case '÷':
            num1 = divide(num1, num2);
            break;
    }
    operator = event.target.textContent;

}



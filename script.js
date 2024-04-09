// Operation variables
let num1;
let num2;
let operator;

const display = document.querySelector("#display");
let displayValue = display.textContent;

const tooBigMsg = "# TOO BIG";
const displayFit = 13;
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
    if (displayValue === "0") {
        displayValue = "";
    };
    if (digitStr.length > 13) {
        display.textContent = tooBigMsg
        return tooBigMsg;
    }
    display.textContent = displayValue + digitStr;
    return display.textContent;
}                 

function activateButton (event) {
    const target = event.target;
    //displayValue = display.textContent;
    if (target.className === "btn number") {
        displayValue = populateDisplay(target.textContent, displayValue);
    } else if (target.className === "btn operator") {
        if (num1 === undefined) {
            num1 = Number(display.textContent);
            operator = target.textContent;
            displayValue = "";
        } else {
            num2 = Number(display.textContent);
            num1 = operate(num1, operator, num2);
            operator = target.textContent;
            populateDisplay(String(num1));
            displayValue = "";
        }
    } else if (target.id === "equals") {
        if (num1 === undefined) {
            return;
        }
        num2 = Number(display.textContent);
        num1 = operate(num1, operator, num2);
        operator = "";
        populateDisplay(String(num1));
        num1 = undefined;
        displayValue = "";        
    } else if (target.id === "clear") {
        num1 = undefined;
        num2 = undefined;
        displayValue = "";
        operator = "";
        populateDisplay("0");
    }
}

// They say not to do multiple things in, I did here. it runs the right equation and displays it
function runEquationThroughCalc(target) {
    num2 = Number(display.textContent);
    num1 = operate(num1, operator, num2);
    operator = target.textContent;
    display.textContent = num1;
    displayValue = "";
}

function roundToDigits(num, digits = 0, notice = NaN) {
    // For my needs digits should be 13
    const stringNum = String(num);
    if (stringNum.includes(".")) { 
        const parts = stringNum.split(".")
        const decimalPlaces = digits - parts[0].length;
        return (num.toFixed(decimalPlaces));
    } else if (stringNum.length > 13) {
        return notice;
    } else {
        return num;
    }
}
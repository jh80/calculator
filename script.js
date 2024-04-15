// Operation variables
let num1;
let num2;
let operator;

const display = document.querySelector("#display");
let displayValue = display.textContent;
let backspace = true;

const tooBigMsg = "# TOO BIG";
const displayFit = 13;
// Button click event
const btnContainer = document.querySelector("#btnContainer");
btnContainer.addEventListener('click',  (event) => activateButton(event.target));
document.body.addEventListener('keydown', (event) => activateButton(event.key));

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
    if (num2 === 0) {
       return "Attempted divide by 0";
    }
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
        case "*":
            return multiply(num1,num2);
            break;
        case "÷":
        case "/":
            return divide(num1,num2);
            break;
    }

}

function populateDisplay(digitStr, displayValue = "") {
    let newDisplayValue;
    if (displayValue === "0") {
        displayValue = "";
    };
    if ((digitStr === ".") && (displayValue == "")) digitStr = "0.";

    newDisplayValue = displayValue + digitStr;
    if (newDisplayValue.length > 13) {
        display.textContent = tooBigMsg
        return tooBigMsg;
    }
    display.textContent = newDisplayValue;
    return display.textContent;
}                 

// Rounds number to a specified amount of digits (on both sides of decimal point
function roundToDigits(num, digits = 0, notice = "tooManyDigits") {
    // For my needs digits should be 13
    const stringNum = String(num);
    if (stringNum.includes(".") && stringNum.length > digits) { 
        let roundedStrNum;
        const parts = stringNum.split(".")
        const decimalPlaces = (digits-1) - parts[0].length;
        roundedStrNum = String(num.toFixed(decimalPlaces));
        return Number(roundedStrNum);
    } else if (stringNum.length > digits) {
        return notice;
    } else {
        return num;
    }
}

function refresh () {
    num1 = undefined;
    num2 = undefined;
    displayValue = "";
    operator = "";  
}

// Takes the number, calculates, and outputs
function equalOut() {
    num2 = Number(display.textContent);
    num1 = operate(num1, operator, num2);
    if (num1 === "Attempted divide by 0") {
        populateDisplay("Stop that!");
        refresh();
        return;
    }
    populateDisplay(String(roundToDigits(num1, 13, tooBigMsg)));
}

// Activate button function for both
// ACTIVATEBUTTON FUNCTION
function activateButton (target) {
    const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const OPERATORS = ["+", "-", "*", "/"]
    // Force user to clear if an alphabetical string has been displayed
    if (isNaN(display.textContent)) {
        if (target.id !== "clear" || target !== "c") {// CHANGE TO CLASSNAME
            return;
        } 
    }
    // Check for buttonpressed
    if (target.className === "btn number" || DIGITS.includes(target)) { // For numbers
        displayValue = populateDisplay(DIGITS.includes(target) ? target : target.textContent, displayValue);
        backspace = true;
    } else if (target.id === "decimalPoint" || target === ".") { // For decimal points
        if (displayValue.includes(".")) {
            return;
        }
        displayValue = populateDisplay(".", displayValue);
    } else if (target.className === "btn operator" || OPERATORS.includes(target)) { // For operators
        if (num1 === undefined) {
            if (display.textContent) {
            num1 = Number(display.textContent);
            operator = OPERATORS.includes(target) ? target : target.textContent;
            displayValue = "";
            }
        } else {
            equalOut();
            displayValue = "";
            backspace = false;
            operator = OPERATORS.includes(target) ? target : target.textContent;
        }
    } else if (target.id === "equals" || target === "Enter" || target === "=") { // For equals
        if (num1 === undefined) {
            displayValue = "";
            return;
        }
        equalOut();
        num1 = undefined;
        displayValue = "";  
        backspace = false;
        operator = "";    
    } else if (target.id === "clear" || target === "c") { // For clear
        refresh();
        populateDisplay("0");
    } else if (target.id === "backspace" || target === "Backspace") { // For backspace
        if(backspace) {
            displayValue = populateDisplay(display.textContent.slice(0,-1));
        }
    } else if (target.id === "negative") { // For negative sign
        if (display.textContent.includes("-")) {
            display.textContent = display.textContent.slice(1);
            displayValue = display.textContent;
        } else {
            if (display.textContent === "0") {
                display.textContent = "-0";
                displayValue = "-"
            } else {
                display.textContent = "-" + display.textContent;
                displayValue = display.textContent;
            }
        }
    }
}
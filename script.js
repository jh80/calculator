// Operation variables
let num1;
let num2;
let operator;

const display = document.querySelector("#display");
let displayValue = display.textContent;
let backspace = true;

const tooBigMsg = " #  TOO  BIG ";
const displayFit = 13;
// Button click event
const btnContainer = document.querySelector("#btnContainer");
btnContainer.addEventListener('click', activateButton);
document.body.addEventListener('keydown', activateOnKeyDown);

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
    if (newDisplayValue.length > 13 && !digitStr.includes(".")) {
        display.textContent = tooBigMsg
        return tooBigMsg;
    }
    display.textContent = newDisplayValue;
    return display.textContent;
}                 

function activateButton (event) {
    const target = event.target;
    if (isNaN(display.textContent)) {
        if (target.id !== "clear") {
            return;
        } 
    }
    //displayValue = display.textContent;
    if (target.className === "btn number") {
        displayValue = populateDisplay(target.textContent, displayValue);
        backspace = true;
    } else if (target.id === "decimalPoint") {
        if (displayValue.includes(".")) {
            return;
        }
        displayValue = populateDisplay(".", displayValue);
    } else if (target.className === "btn operator") {
        if (num1 === undefined) {
            if (display.textContent)
            num1 = Number(display.textContent);
            operator = target.textContent;
            displayValue = "";
        } else {
            num2 = Number(display.textContent);
            num1 = operate(num1, operator, num2);
            operator = target.textContent;
            if (num1 === "Attempted divide by 0") {
                populateDisplay("Stop that!");
                num1 = undefined;
                num2 = undefined;
                displayValue = "";
                operator = "";
                return;
            }
            populateDisplay(String(roundToDigits(num1, 13, tooBigMsg)));
            displayValue = "";
            backspace = false;
        }
    } else if (target.id === "equals") {
        if (num1 === undefined) {
            return;
        }
        num2 = Number(display.textContent);
        num1 = operate(num1, operator, num2);
        operator = "";
        if (num1 === "Attempted divide by 0") {
            populateDisplay("Stop that!");
            num1 = undefined;
            num2 = undefined;
            displayValue = "";
            operator = "";
            return;
        }
        populateDisplay(String(roundToDigits(num1, 13, tooBigMsg)));
        num1 = undefined;
        displayValue = "";  
        backspace = false;    
    } else if (target.id === "clear") {
        num1 = undefined;
        num2 = undefined;
        displayValue = "";
        operator = "";
        populateDisplay("0");
    } else if (target.id === "backspace") {
        if(backspace)
        displayValue = populateDisplay(display.textContent.slice(0,-1));
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

// Rounds number to a specified amount of digits (on both sides of decimal point
function roundToDigits(num, digits = 0, notice = "tooManyDigits") {
    // For my needs digits should be 13
    const stringNum = String(num);
    if (stringNum.includes(".") && stringNum.length > 14) { 
        let roundedStrNum;
        const parts = stringNum.split(".")
        const decimalPlaces = digits - parts[0].length;
        roundedStrNum = String(num.toFixed(decimalPlaces));
        return Number(roundedStrNum);
    } else if (stringNum.length > digits) {
        return notice;
    } else {
        return num;
    }
}
// function for keydown
function activateOnKeyDown (event) {
    const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const OPERATORS = ["+", "-", "*", "/"]
    const target = event.key;
    if (isNaN(display.textContent)) {
        if (target !== "c") {
            return;
        } 
    }
    //displayValue = display.textContent;
    if (DIGITS.includes(target)) {
        displayValue = populateDisplay(target, displayValue);
        backspace = true;
    } else if (target === ".") {
        if (displayValue.includes(".")) {
            return;
        }
        displayValue = populateDisplay(".", displayValue);
    } else if (OPERATORS.includes(target)) {
        if (num1 === undefined) {
            if (display.textContent)
            num1 = Number(display.textContent);
            operator = target;
            displayValue = "";
        } else {
            num2 = Number(display.textContent);
            num1 = operate(num1, operator, num2);
            operator = target;
            if (num1 === "Attempted divide by 0") {
                populateDisplay("Stop that!");
                num1 = undefined;
                num2 = undefined;
                displayValue = "";
                operator = "";
                return;
            }
            populateDisplay(String(roundToDigits(num1, 13, tooBigMsg)));
            displayValue = "";
            backspace = false;
        }
    } else if (target === "Enter" || target === "=") {
        if (num1 === undefined) {
            return;
        }
        num2 = Number(display.textContent);
        num1 = operate(num1, operator, num2);
        operator = "";
        if (num1 === "Attempted divide by 0") {
            populateDisplay("Stop that!");
            num1 = undefined;
            num2 = undefined;
            displayValue = "";
            operator = "";
            return;
        }
        populateDisplay(String(roundToDigits(num1, 13, tooBigMsg)));
        num1 = undefined;
        displayValue = "";  
        backspace = false;    
    } else if (target === "c") {
        num1 = undefined;
        num2 = undefined;
        displayValue = "";
        operator = "";
        populateDisplay("0");
    } else if (target === "Backspace") {
        if(backspace)
        displayValue = populateDisplay(display.textContent.slice(0,-1));
    }
}
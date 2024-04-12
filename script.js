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
    if (newDisplayValue.length > 13) {
        display.textContent = tooBigMsg
        return tooBigMsg;
    }
    display.textContent = newDisplayValue;
    return display.textContent;
}                 

// ACTIVATEBUTTON FUNCTION
function activateButton (event) {
    // Force user to clear if an alphabetical string has been displayed
    const target = event.target;
    if (isNaN(display.textContent)) {
        if (target.id !== "clear") {
            return;
        } 
    }
    // Check for target of event
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
            if (display.textContent) {
            num1 = Number(display.textContent);
            operator = target.textContent;
            displayValue = "";
            }
        } else {
            equalOut();
            displayValue = "";
            backspace = false;
            operator = target.textContent;
        }
    } else if (target.id === "equals") {
        if (num1 === undefined) {
            displayValue = "";
            return;
        }
        equalOut();
        num1 = undefined;
        displayValue = "";  
        backspace = false;
        operator = "";    
    } else if (target.id === "clear") {
        refresh();
        populateDisplay("0");
    } else if (target.id === "backspace") {
        if(backspace) {
            displayValue = populateDisplay(display.textContent.slice(0,-1));
        }
    } else if (target.id === "negative") {
        if (display.textContent.slice(0,1) === "-") {
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
            if (display.textContent) {
                num1 = Number(display.textContent);
                operator = target;
                displayValue = ""
            }
        } else {    
            num2 = Number(display.textContent);
            num1 = operate(num1, operator, num2);
            operator = target;
            if (num1 === "Attempted divide by 0") {
                populateDisplay("Stop that!");
                refresh();
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
            refresh();
            return;
        }
        populateDisplay(String(roundToDigits(num1, 13, tooBigMsg)));
        num1 = undefined;
        displayValue = "";  
        backspace = false;    
    } else if (target === "c") {
        refresh();
        populateDisplay("0");
    } else if (target === "Backspace") {
        if(backspace) {
            displayValue = populateDisplay(display.textContent.slice(0,-1));
        }
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

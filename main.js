const display = document.getElementById("display");


display.disabled = true;
display.value = "";

// updates display of the calculator
function updateDisplay(value) {
    if (display.value.length <= 15) {
        display.value += value;
    }
}

// AC function
function clearDisplay() {
    display.value = "";
    turnOnCalculator();
}

// del function
function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

//calculates result
function calculate() {
    if (display.value.includes('**') || display.value.includes('//')) {
        display.value = "Math Error";
    } else if (display.value.match(/\/0/g)) {
        display.value = "Math Error";
    } else {
        try {
            const result = eval(display.value);
            display.value = result;
        } catch (error) {
            display.value = "Math Error";
        }
    }
}


//hello function
function sayHello() {
    const languages = [
    "Hello",
    "Hola",
    "Kumusta",
    "Bonjour",
    "Hallo",
    "Ciao",
    "こんにちは",
    "안녕",
    "你好",
    "สวัสดี",
    ];
    const randomIndex = Math.floor(Math.random() * languages.length);
    display.value = languages[randomIndex];
    setTimeout(() => {
    clearDisplay();
    turnOnCalculator();
    }, 2000);
}

//so that numbers dont show up with the text when the bye button is active 
let byeTimerActive = false;

function sayGoodbye() {
    display.value = "Goodbye";
    byeTimerActive = true;
    setTimeout(() => {
    turnOffCalculator();
    byeTimerActive = false;
    }, 2000);
}

function disableButtons() {
    document.querySelectorAll(".btns button").forEach((button) => {
        button.disabled = true;
    });
}

function enableButtons() {
    document.querySelectorAll(".btns button").forEach((button) => {
        button.disabled = false;
    });
}

function turnOnCalculator() {
    display.disabled = false;
}

function turnOffCalculator() {
    display.disabled = true;
    display.value = "";
}

document.querySelectorAll(".btns button").forEach((button) => {
    button.addEventListener("click", () => {
        if (byeTimerActive) return;

        const value = button.getAttribute("data-value");
        switch (value) {
        case "AC":
            clearDisplay();
            break;
        case "DEL":
            deleteLastChar();
            break;
        case "=":
            calculate();
            break;
        case "HI":
            sayHello();
            break;
        case "BYE":
            sayGoodbye();
            break;
        default:
            if (!display.disabled) {
            updateDisplay(value);
            }
        }
    });
});

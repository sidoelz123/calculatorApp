let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';

const numbers = document.querySelectorAll(".number");
const calculatorScreen = document.querySelector('.calculator-screen');
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector('.equal');
const persentSign = document.querySelector('.persent')
const negativeSign = document.querySelector('.negative')
const allClear = document.querySelector('.all-clear');
const deleteBtn = document.querySelector(".clear");
const decimal = document.querySelector('.decimal');
const prevScreen = document.querySelector('.prev-screen')


const updateScreen = (number) => {
    calculatorScreen.value = number;
}
const updatePrevScreen = (number) => {
    prevScreen.value = number;
}
updateScreen(currentNumber);
updatePrevScreen(currentNumber);

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currentNumber = '0';
}

const deleteNumber = ()=>{
    if (currentNumber === '0'){
        return
    }else if (currentNumber.length >= 2){
        currentNumber = currentNumber.substring(0,currentNumber.length-1);
    }else{
        currentNumber = 0
    }
}

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
}

const inputDecimal = (dot) => {
    if (currentNumber.includes('.')) {
        return;
    }
    currentNumber += dot;
}

const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber;
    }
    calculationOperator = operator;
    currentNumber = '0';
}

const inverseNumber = ()=>{
    if (currentNumber === '0'){
        return
    }
    currentNumber = currentNumber * -1;
}

const calculate = () => {
    let result = '';
    switch(calculationOperator) {
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            break;
        case "-":
            result = parseFloat(prevNumber) - parseFloat(currentNumber);
            break;
        case "×":
            result = parseFloat(prevNumber) * parseFloat(currentNumber);
            break;
        case "/":
            result = parseFloat(prevNumber) / parseFloat(currentNumber);
            break;
        default:
            return;
    }
    currentNumber = result;
    calculationOperator = '';
    
}

deleteBtn.addEventListener('click', () => {
    deleteNumber()
    updateScreen(currentNumber)
    console.log(currentNumber);
});

allClear.addEventListener('click', () => {
    clearAll();
    updateScreen(currentNumber);
    updatePrevScreen(currentNumber);
});


decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
});


operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value);
        updatePrevScreen(`${prevNumber} ${event.target.value}`);
        updateScreen(0)
    });
});

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {        
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    });
});


equalSign.addEventListener('click', () => {
    updatePrevScreen(`${prevNumber} ${calculationOperator} ${currentNumber}`);
    calculate();
    updateScreen(currentNumber);
    currentNumber = currentNumber;
});
persentSign.addEventListener('click',()=>{
    currentNumber = currentNumber / 100
    updateScreen(currentNumber)
    console.log(currentNumber);
})
negativeSign.addEventListener('click',()=>{
   inverseNumber()
   updateScreen(currentNumber)
   console.log(currentNumber);
})
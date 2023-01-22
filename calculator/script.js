import {evaluateInfix, toPostfix} from "./calculate.js"

const clearBtn = document.getElementById('clear')
const bracketsBtn = document.getElementById('brackets')
const percentBtn = document.getElementById('percent')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const divideBtn = document.getElementById('divide')
const multiplyBtn = document.getElementById('multiply')
const equalsBtn = document.getElementById('equals')
const zeroBtn = document.getElementById('zero')
const oneBtn = document.getElementById('one')
const twoBtn = document.getElementById('two')
const threeBtn = document.getElementById('three')
const fourBtn = document.getElementById('four')
const fiveBtn = document.getElementById('five')
const sixBtn = document.getElementById('six')
const sevenBtn = document.getElementById('seven')
const eightBtn = document.getElementById('eight')
const nineBtn = document.getElementById('nine')
const changeSignBtn = document.getElementById('changesign')
const decimalBtn = document.getElementById('decimal')
const buttonGrid = document.querySelector('.button-grid')

const numbers = buttonGrid.querySelectorAll('.number')
const signs = buttonGrid.querySelectorAll('.sign')

var mainexp = document.getElementById('screen-main')
var evaluation = document.getElementById('screen-preview')
var curOperand = ""

numbers.forEach((n) => {
    n.addEventListener('click', () => {
        mainexp.textContent += n.dataset.val
        curOperand += n.dataset.val
        evaluation.textContent = evaluateInfix(mainexp.textContent)
    })
})

signs.forEach((s) => {
    s.addEventListener('click', () => {
        mainexp.textContent += s.dataset.val
        curOperand = ""
        evaluation.textContent = evaluateInfix(mainexp.textContent)
    })
})

percentBtn.addEventListener('click', () => {
    if (mainexp.textContent.endsWith('%')) return
    mainexp.textContent += percentBtn.dataset.val
    curOperand = ""
    evaluation.textContent = evaluateInfix(mainexp.textContent)
})

function brackets(str) {
    const hasOpen = /\([^\)]*$/.test(str)
    if (hasOpen) str += ')'
    else str += '('
    return str
}

bracketsBtn.addEventListener('click', () => {
    mainexp.textContent = brackets(mainexp.textContent)
})

function changesign(operand) {
    if (operand.startsWith('-')) {
        operand = operand.replace('-', '');
    } else operand = '(-' + operand + ')';
    return operand;
}

changeSignBtn.addEventListener('click', () => {
    if (curOperand == '') return
    mainexp.textContent = mainexp.textContent.replace(curOperand, changesign(curOperand))
    curOperand = changesign(curOperand)
})

function clear() {
    mainexp.textContent = ''
    curOperand = ''
    evaluation.textContent = ""
}

clearBtn.addEventListener('click', () => {
    clear()
})

equalsBtn.addEventListener('click', () => {
    mainexp.textContent = evaluation.textContent
    evaluation.textContent = ""
})

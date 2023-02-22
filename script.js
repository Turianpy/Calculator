import {evaluateInfix, toPostfix, PRECEDENCE} from "./calculate.js"

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

const writeDigit = (digit) => {
    if (digit === '.' && curOperand.includes('.')) return
    mainexp.textContent += digit
    curOperand += digit
    evaluation.textContent = evaluateInfix(mainexp.textContent)
}

const writeOperator = (operator) => {
    if (mainexp.textContent.endsWith(operator)) return
    mainexp.textContent += operator
    curOperand = ""
    evaluation.textContent = evaluateInfix(mainexp.textContent)
}

numbers.forEach((n) => n.addEventListener('click', () => writeDigit(n.dataset.val)))

signs.forEach((s) => s.addEventListener('click', () => writeOperator(s.dataset.val)))

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

bracketsBtn.addEventListener('click', () =>  mainexp.textContent = brackets(mainexp.textContent))

function changesign(operand) {
    if (operand.startsWith('(-')) {
        operand = operand.replace('(-', '').replace(')', '');
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

// keyboard stuff


document.addEventListener('keydown', (e) => {
    e.preventDefault()
    let len = mainexp.textContent.length
    if (/^\d+$/.test(e.key) || e.key == '.') writeDigit(e.key)
    if (e.key in PRECEDENCE) writeOperator(e.key)
    if (e.key === '(' || e.key === ')') mainexp.textContent = brackets(mainexp.textContent)
    if (e.key === '=') {
        mainexp.textContent = evaluation.textContent
        evaluation.textContent = ""
    }
    if (e.key === 'Backspace') {
        if (e.shiftKey) clear()
        mainexp.textContent = mainexp.textContent.substring(0, len-1)

        try {
            evaluation.textContent = evaluateInfix(mainexp.textContent)
        } catch (error) {
            evaluation.textContent = '0'
        }
    }
})
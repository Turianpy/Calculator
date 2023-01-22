import Stack from "./stack.js"

const PRECEDENCE = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3
}


function isOperator(o) {
    return o in PRECEDENCE;
}

function isBracket(o) {
    return '()'.includes(o)
}

function isOperand(o) {
    return !isOperator(o) && !isBracket(o)
}


export function toPostfix(infix) {
    let stack = new Stack()
    let postfix = ''
    let operand = ''
    const SPACE = " "

    for (let i = 0; i < infix.length; i++) {
        let l = infix[i]
        if (isOperator(l) || isBracket(l)) {
            if (operand != '') {
                postfix += operand + SPACE
                operand = ''
            }
            if (stack.isEmpty() || l == '(' || stack.peek() == '(') {
                stack.push(l)
            }
            else if (l == ')') { 
                while (stack.peek() != '(') {
                    postfix += stack.pop() + SPACE
                }
                stack.pop()
            }
            else if (PRECEDENCE[l] <= PRECEDENCE[stack.peek()]) {
                while (PRECEDENCE[l] <= PRECEDENCE[stack.peek()]) {
                    postfix += stack.pop() + SPACE
                }
                stack.push(l)
            }
            else stack.push(l)
        }
        else {
            if (l == SPACE) {
                postfix += operand + SPACE
                operand = ''
            }
            else operand += l
        }
    }
    postfix += operand + SPACE
    while (!stack.isEmpty()) {
        postfix += stack.pop() + SPACE
    }
    return postfix.replace('  ', ' ')
}

function operate(operator, n1, n2) {
    if (operator == '+') return n1 + n2
    else if (operator == '-') return n1 - n2
    else if (operator == '*') return n1 * n2
    else if (operator == '/') return n1 / n2
    else return NaN
}

function convertPercent(operand) {
    if (!(typeof operand === 'string')) return parseFloat(operand)
    if (!operand.endsWith('%')) {
        return parseFloat(operand)
    } else {
        operand.replace('%', '')
        operand = parseFloat(operand)
        operand *= 0.01
        return operand
    }
}

export function evaluateInfix(infix) {
    let postfix = toPostfix(infix)
    let operand1 = new Number()
    let operand2 = new Number()
    let stack = new Stack()

    let postfix_arr = Array.from(postfix.split(' '))
    for (const item of postfix_arr) {
        if (isOperand(item)) {
            stack.push(item)
        }
        else if (isOperator(item)) {
            operand2 = convertPercent(stack.pop())
            operand1 = convertPercent(stack.pop())
            stack.push(operate(item, operand1, operand2))
        }
    }
    return stack.pop()
}
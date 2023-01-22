export default class Stack {

    constructor() {
        this.items = [];
    }

    push(elem) {
        this.items.push(elem)
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    pop() {
        if (this.items.length == 0) throw Error("Underflow")
        let popped = this.items.pop()
        if (typeof popped == 'string' && popped.endsWith('%')) {
            popped = parseInt(popped.replace('%', ''))
            popped = popped * 0.01
        }
        return popped
    }

    isEmpty() {
        return this.items.length == 0;
    }

    display() {
        let display = ""
        for (let i = 0; i < this.items.length; i++) {
            display += this.items[i] + " ";
        }
        return display
    }
}
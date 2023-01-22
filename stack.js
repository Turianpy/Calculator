class StackNode {
    constructor(val, next=null) {
        this.val = val;
        this.next = next;
    }
    
    get val() {
        return this.val
    }

    set val(newVal) {
        this.val = newVal
    }

    get next() {
        return this.next.val
    }

    set next(newNext) {
        this.next = newNext
    }
}


class Stack {
    constructor(head) {
        this.head = Node('head');
        this.size = 0;
    };

    display() {
        let cur = this.head.next
        let result = ''
        while (cur) {
            result += toString(cur.val) + " -> "
            cur = cur.next
        return result.slice(0, -3)
        }
    }

    get size() {
        return self.size;
    };

    isEmpty() {
        return (this.size === 0);
    };

    peek() {
        if (this.isEmpty()) {
            return null
        } return this.head.next.val
    }

    push(val) {
        let node = Node(val)
        node.next = this.head.next
        this.head.next = node
        this.size++
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Cannot pop from empty stack");
        }
        let toPop = this.head.next;
        this.head.next = toPop.next
        this.size--
        return toPop.val
    }
}

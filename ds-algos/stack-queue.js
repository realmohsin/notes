class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(node) {
    if (this.size === 0) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first = node;
    }
    this.size++;
    return this;
  }

  pop() {
    if (this.size === 0) return null;
    const popped = this.first;
    this.first = this.first.next;
    if (this.size === 1) {
      this.last = null;
    }
    this.size--;
    return popped;
  }
}

// const stack = new Stack();
// stack.push(new Node("func1")).push(new Node("func2")).push(new Node("func3"));
// console.log(stack);
// stack.pop();
// console.log(stack);

export class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(node) {
    if (this.size === 0) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    this.size++;
    return this;
  }

  dequeue() {
    if (this.size === 0) return null;
    const removed = this.first;
    this.first = this.first.next;
    if (this.size === 1) {
      this.last = null;
    }
    this.size--;
    return removed;
  }
}

// const queue = new Queue();
// queue
//   .enqueue(new Node("entered first"))
//   .enqueue(new Node("entered second"))
//   .enqueue(new Node("entered third"));
// queue.dequeue();
// console.log(queue);

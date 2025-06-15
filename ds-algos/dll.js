// 2:27

// push
// pop
// shift
// unshift
// get
// set
// insert
// remove
 
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(node) {
    if (this.length === 0) {
      this.head = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
    this.length++;
    return this;
  }
  pop() {
    if (this.length === 0) return null;
    const popped = this.tail;
    this.tail = this.tail.prev;
    if (this.length === 1) {
      this.head = null;
    } else {
      this.tail.next = null;
    }
    this.length--;
    return popped;
  }
  shift() {
    if (this.length === 0) return null;
    const shifted = this.head;
    this.head = this.head.next;
    if (this.length === 1) this.tail = null;
    else this.head.prev = null;
    this.length--;
    return shifted;
  }
  unshift(node) {
    if (this.length === 0) {
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
    }
    this.head = node;
    this.length++;
    return this;
  }
  get(index) {
    let curr = null;
    if (index < this.length / 2) {
      for (let i = 0; i <= index; i++) {
        curr = curr ? curr.next : this.head;
      }
    } else {
      for (let j = 0; j <= this.length - index - 1; j++) {
        curr = curr ? curr.prev : this.tail;
      }
    }
    return curr;
  }
  set(index, value) {
    const node = this.get(index);
    if (node) {
      node.value = value;
    }
    return node;
  }
  insert(node, index) {
    if (index === 0) {
      return this.unshift(node);
    }
    if (index === this.length - 1) {
      return this.push(node);
    }
    const nodeBefore = this.get(index - 1);
    const nodeAtIndex = nodeBefore.next;
    nodeBefore.next = node;
    node.prev = nodeBefore;
    node.next = nodeAtIndex;
    nodeAtIndex.prev = node;
    this.length++;
    return this;
  }
  remove(index) {
    if (index === 0) {
      return this.shift();
    }
    if (index === this.length - 1) {
      return this.pop();
    }
    const node = this.get(index);
    const before = node.prev;
    const after = node.next;
    before.next = after;
    after.prev = before;
    this.length--;
    return node;
  }
}

const dll = new DoublyLinkedList();
dll.unshift(new Node("node1"));
dll.unshift(new Node("node2"));
dll.unshift(new Node("node3"));
dll.unshift(new Node("node4"));
dll.unshift(new Node("node5"));
dll.unshift(new Node("node6"));
dll.unshift(new Node("node7"));
dll.unshift(new Node("node8"));
dll.unshift(new Node("node9"));
console.log(dll);
dll.remove(3);
console.log(dll.get(3));
// console.log(dll.get(0));
// console.log(dll.get(8));
// console.log(dll.get(2));
// console.log(dll.get(7));
// dll.shift();
// console.log(dll);

//   2 1 0
// o o o o
// 0 1 2 3

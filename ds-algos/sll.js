class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(node) {
    if (this.length === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
    return this;
  }
  pop() {
    if (this.length === 0) return this;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return this;
    }
    let newTailToBe = this.head;
    while (newTailToBe.next !== this.tail) {
      newTailToBe = newTailToBe.next;
    }
    newTailToBe.next = null;
    this.tail = newTailToBe;
    this.length--;
    return this;
  }
  shift() {
    if (this.length === 0) return this;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return this;
    }
    this.head = this.head.next;
    this.length--;
    return this;
  }
  unshift(node) {
    node.next = this.head;
    this.head = node;
    if (this.length === 0) {
      this.tail = node;
    }
    this.length++;
    return this;
  }
  get(index) {
    const nodeNumber = index + 1;
    if (this.length < nodeNumber) return null;
    let currNodeNumber = 0;
    let currNode = null;
    while (currNodeNumber !== nodeNumber) {
      currNodeNumber++;
      currNode = currNode ? currNode.next : this.head;
    }
    return currNode;
  }
  set(index, value) {
    const node = this.get(index);
    if (node) node.value = value;
    return this;
  }
  insert(node, index) {
    if (index > this.length) return this;
    if (index === 0) {
      return this.unshift(node);
    }
    if (index === this.length) {
      return this.push(node);
    }
    const nodeBefore = this.get(index - 1);
    const nodeAtIndex = nodeBefore.next;
    nodeBefore.next = node;
    node.next = nodeAtIndex;
    this.length++;
    return this;
  }
  remove(index) {
    if (index >= this.length) return this;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const nodeBefore = this.get(index - 1);
    const nodeAfter = nodeBefore.next.next;
    nodeBefore.next = nodeAfter;
    this.length--;
    return this;
  }
  reverse() {
    if (this.length === 0 || this.length === 1) return this;
    this.tail = this.head;
    let behind = null;
    let nodeToSwitch = this.head;
    this.head = this.head.next;
    while (nodeToSwitch) {
      nodeToSwitch.next = behind;
      behind = nodeToSwitch;
      nodeToSwitch = this.head;
      this.head = this.head?.next;
    }
    this.head = behind;
    return this;
  }
}

const linkedList = new LinkedList();
const node1 = new Node("node1");
const node2 = new Node("node2");
linkedList.push(node1);
linkedList.unshift(node2);
console.log(linkedList);
console.log(linkedList.get(2));
linkedList.insert(new Node("node3"), 1);
console.log(linkedList);
linkedList.reverse();
console.log(linkedList);
// linkedList.remove(1);
// console.log(linkedList);
// linkedList.pop();
// console.log(linkedList);
// linkedList.pop();
// console.log(linkedList);

// push - add to end of list
// pop - remove from end list
// shift - remove node from beginning
// unshift - add node to beginning of list
// get - retreive node based on array-like indexing
// set - change  node's value given a position and the new value
// insert - add a new node at given position
// remove - remove a node from list at specific position
// reverse - reverse the list in place (without making copy or duplicate)

// o <--o <--o  o--> o--> o--> o
// ^t        ^  ^h
//      ^

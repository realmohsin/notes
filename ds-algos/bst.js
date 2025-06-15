class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
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

class BstNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(node) {
    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (true) {
      if (current.value < node.value) {
        if (!current.right) {
          current.right = node;
          return this;
        }
        current = current.right;
      } else {
        if (!current.left) {
          current.left = node;
          return this;
        }
        current = current.left;
      }
    }
  }

  find(value) {
    if (!this.root) return null;
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value > current.value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return null;
  }

  bfs() {
    const queue = new Queue();
    queue.enqueue(new QueueNode(this.root));

    while (queue.size) {
      const node = queue.dequeue().value;
      process.stdout.write(`${node.value} `);
      if (node.left) queue.enqueue(new QueueNode(node.left));
      if (node.right) queue.enqueue(new QueueNode(node.right));
    }
    process.stdout.write("\n");
  }

  dfs() {
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      process.stdout.write(`${node.value} `);
    }
    traverse(this.root);
    process.stdout.write("\n");
  }
}

const bst = new BinarySearchTree();
bst.insert(new BstNode(10));
bst.insert(new BstNode(8));
bst.insert(new BstNode(15));
bst.insert(new BstNode(14));
bst.insert(new BstNode(9));
bst.dfs();
bst.bfs();

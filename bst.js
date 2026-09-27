export class node {
  constructor() {
    this.value = null;
    this.left = null;
    this.right = null;
  }
}

export class tree {
  constructor(array) {
    const processedArray = Array.from(new Set(array)).sort((a, b) => a - b);
    this.root = this.buildTree(processedArray);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const end = array.length - 1;
    const mid = Math.floor(end / 2);
    const newNode = new node();
    newNode.value = array[mid];

    const leftArray = array.slice(0, mid);
    const rightArray = array.slice(mid + 1);
    newNode.left = this.buildTree(leftArray);
    newNode.right = this.buildTree(rightArray);

    return newNode;
  }

  includes(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      }
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  insert(value) {
    let currentNode = this.root;
    let previousnode = null;
    let direction = null;

    while (currentNode !== null) {
      if (value === currentNode.value) {
        return "value exists";
      }

      if (value < currentNode.value) {
        previousnode = currentNode;
        currentNode = currentNode.left;
        direction = "left";
      } else {
        previousnode = currentNode;
        currentNode = currentNode.right;
        direction = "right";
      }
    }
    const newNode = new node();
    newNode.value = value;

    if (direction === "left") {
      previousnode.left = newNode;
    } else if (direction === "right") {
      previousnode.right = newNode;
    }
  }

  deleteItem(value) {
    let currentNode = this.root;
    let previousNode = null;

    while (currentNode !== null) {
      if (
        currentNode.value === value &&
        currentNode.left === null &&
        currentNode.right === null
      ) {
        if (previousNode.right !== null && previousNode.right.value === value) {
          previousNode.right = null;
        } else if (
          previousNode.left !== null &&
          previousNode.left.value === value
        ) {
          previousNode.left = null;
        }
        return;
      } else if (
        currentNode.value === value &&
        currentNode.left === null &&
        currentNode.right !== null
      ) {
        if (currentNode.value < previousNode.value) {
          previousNode.left = currentNode.right;
        } else if (currentNode.value > previousNode.value) {
          previousNode.right = currentNode.right;
        }
        return;
      } else if (
        currentNode.value === value &&
        currentNode.left !== null &&
        currentNode.right === null
      ) {
        if (currentNode.value < previousNode.value) {
          previousNode.left = currentNode.left;
        } else if (currentNode.value > previousNode.value) {
          previousNode.right = currentNode.left;
        }
        return;
      } else if (
        currentNode.value === value &&
        currentNode.left !== null &&
        currentNode.right !== null
      ) {
        const markNode = currentNode;
        let previousNode = currentNode;
        currentNode = currentNode.right;

        while (currentNode.left !== null) {
          previousNode = currentNode;
          currentNode = currentNode.left;
        }
        markNode.value = currentNode.value;

        if (previousNode === markNode) {
          previousNode.right = currentNode.right;
        } else {
          previousNode.left = currentNode.right;
        }
        return;
      }

      if (value < currentNode.value) {
        previousNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        previousNode = currentNode;
        currentNode = currentNode.right;
      }
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }
    let queue = [];

    queue.push(this.root);

    while (queue.length > 0) {
      let currentNode = queue[0];
      callback(currentNode.value);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
      queue.shift();
    }
  }

  preOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }

    if (root === null) return;

    callback(root.value);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  inOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }

    if (root === null) return;

    this.inOrderForEach(callback, root.left);
    callback(root.value);
    this.inOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }

    if (root === null) return;

    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root.value);
  }

  height(value) {
    let currentNode = this.root;

    while (currentNode.value !== value) {
      if (currentNode.value < value) {
        currentNode = currentNode.right;
      } else if (currentNode.value > value) {
        currentNode = currentNode.left;
      }
      if (currentNode === null) {
        return;
      }
    }
    let height = 0;

    function findHeight(node) {
      if (node === null) {
        return -1;
      }

      const leftHeight = findHeight(node.left);
      const rightHeight = findHeight(node.right);

      return 1 + Math.max(leftHeight, rightHeight);
    }

    return findHeight(currentNode);
  }

  depth(value) {
    let currentNode = this.root;
    let count = 0;
    while (currentNode.value !== value) {
      if (currentNode.value < value) {
        currentNode = currentNode.right;
      } else if (currentNode.value > value) {
        currentNode = currentNode.left;
      }

      if (currentNode === null) {
        return;
      }
      count++;
    }
    return count;
  }

  isBalanced() {
    function findHeight(node) {
      if (node === null) {
        return -1;
      }

      const leftHeight = findHeight(node.left);
      const rightHeight = findHeight(node.right);

      return 1 + Math.max(leftHeight, rightHeight);
    }

    if (this.root === null) return true;

    let queue = [];

    queue.push(this.root);

    while (queue.length > 0) {
      let currentNode = queue[0];
      const leftHeight = findHeight(currentNode.left);
      const rightHeight = findHeight(currentNode.right);

      if (Math.abs(leftHeight - rightHeight) > 1) return false;

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }

      queue.shift();
    }

    return true;
  }

  rebalance() {
    const arr = [];
    if (this.isBalanced() === false) {
      this.inOrderForEach((value) => {
        arr.push(value);
      });
    }
    this.root = this.buildTree(arr);
  }
}

const newTree = new tree([1, 5, 6, 7, 10, 8, 123, 4, 12312, 532]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

import { node, tree } from "./bst.js";

let arr = [];

for (let i = 0; i < 20; i++) {
  arr.push(Math.floor(Math.random() * 100));
}

const newTree = new tree(arr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

console.log(prettyPrint(newTree.root));

console.log(newTree.isBalanced());

console.log(newTree.inOrderForEach(console.log));
console.log(newTree.preOrderForEach(console.log));
console.log(newTree.postOrderForEach(console.log));

newTree.insert(33);
newTree.insert(45);
newTree.insert(24);

console.log(newTree.isBalanced());
console.log(newTree.rebalance());
console.log(newTree.isBalanced());
console.log(prettyPrint(newTree.root));

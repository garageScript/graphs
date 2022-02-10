export const TREE = "tree";
export const BINARY_TREE = "binary_tree";

const getRandomNum = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

const generateTree = (nodeCount, root, previous) => {};

const generateBinaryTree = (nodeCount, root, previous) => {
  if (!nodeCount) {
    return root;
  }
  if (!root) {
    const value = getRandomNum();
    const node = { value };
    return generateBinaryTree(nodeCount - 1, node, node);
  }
  const leftCount = getRandomNum(nodeCount) + 1;
  const leftValue = getRandomNum();
  const leftNode = { value: leftValue };
  previous.left = leftNode;
  generateBinaryTree(leftCount - 1, root, leftNode);

  const remainingCount = nodeCount - leftCount;
  if (!remainingCount) {
    return root;
  }

  const rightValue = getRandomNum();
  const rightNode = { value: rightValue };
  previous.right = rightNode;
  generateBinaryTree(remainingCount - 1, root, rightNode);

  return root;
};

export const generate = (nodeCount, type = TREE) => {
  if (type === TREE) {
    return generateTree(nodeCount);
  }
  if (type === BINARY_TREE) {
    return generateBinaryTree(nodeCount);
  }
};

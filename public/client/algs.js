export const algorithms = {
  bfs: {
    name: "Breadth First Search",
    description: `
BFS will go through the tree row by row. 

The algorithm uses an array <code>level</code> to contain all the nodes in the row.
    `,
  },

  dfs: {
    name: "Depth First Search",
    description: `
DFS will go through the tree all the way through the left node, then go to the right node.

When it hits a leaf node (node without children), you may have to wait for it to visit the left and right null nodes.

Challenge: How would you change the code to go all the way through the right nodes first instead?
    `,
  },

  maxDepth: {
    name: "Max Value",
    description: `
How would you return the max value of the node in a tree? Both BFS and DFS would work.
    `,
  },
};

algorithms.maxDepth.code = `
const bfs = (root, level=[root], maxValue=null) => {
  if (!level.length) {
    return maxValue
  }

  if (maxValue === null) {
    maxValue = root.value
  }

  const nextLevel = []
  level.forEach( node => {
    maxValue = Math.max(node.getValue(), maxValue)

    node.left && nextLevel.push(node.left)
    node.right && nextLevel.push(node.right)
  })

  return bfs(root, nextLevel, maxValue)
}

runFun(bfs)

`;

algorithms.bfs.code = `
const bfs = (root, level=[root]) => {
  if (!level.length) {
    return
  }

  const nextLevel = []
  level.forEach( node => {
    node.getValue()

    node.left && nextLevel.push(node.left)
    node.right && nextLevel.push(node.right)
  })

  bfs(root, nextLevel)
}

runFun(bfs)
`;

algorithms.dfs.code = `
const dfs = (root) => {
  if (!root) {
    return
  }
  root.getValue()

  dfs(root.left)
  root.getValue()


  dfs(root.right)
  root.getValue()
}

runFun(dfs)
`;

export default algorithms;

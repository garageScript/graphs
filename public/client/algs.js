export const algorithms = {};
export const algorithmNames = {
  bfs: "Breadth First Search",
  dfs: "Depth First Search",
};

algorithms.bfs = `
const bfs = (root, level=[node]) => {
  if (!level.length) {
    return
  }

  const nextLevel = []
  level.forEach( node => {
    node.left && nextLevel.push(node.left)
    node.right && nextLevel.push(node.right)
  })

  node.getValue()
}

runFun(bfs)
`;

algorithms.dfs = `
const dfs = (root) => {
  if (!root) {
    return
  }
  node.getValue()
  dfs(root.left)
  dfs(root.right)
}

runFun(dfs)
`;

export default algorithms;

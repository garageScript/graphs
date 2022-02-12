export const algorithms = {};
export const algorithmNames = {
  bfs: "Breadth First Search",
  dfs: "Depth First Search",
};

algorithms.bfs = `
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

algorithms.dfs = `
const dfs = (root) => {
  if (!root) {
    return
  }
  root.getValue()
  dfs(root.left)
  dfs(root.right)
}

runFun(dfs)
`;

export default algorithms;

export const bfs = (root, cb, levels = [root], height = 1) => {
  if (!levels.length) {
    return;
  }
  const newLevels = [];
  levels.forEach((n) => {
    n.left && newLevels.push(n.left);
    n.right && newLevels.push(n.right);
    cb(n, height);
  });
  return bfs(root, cb, newLevels, height + 1);
};

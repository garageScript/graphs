import { generate, BINARY_TREE } from "./lib/generate.js";
import { bfs } from "./lib/traversal.js";
import { drawSVG } from "./lib/svg.js";

const MIN_BOX_WIDTH = 10;

const nodeNumInput$ = document.querySelector("#nodeNumInput");
const nodeNumButton$ = document.querySelector("#nodeNumButton");
const generatedGraphStr$ = document.querySelector("#generatedGraphStr");
const gridContainer$ = document.querySelector("#gridContainer");
const [gridParent$, svgContainer$] = document.querySelectorAll(".gridParent");

let graph = null;

function Box(boxWidth) {
  const div = document.createElement("div");
  div.classList.add("box");
  div.style.width = `${boxWidth}px`;
  div.style.height = `${boxWidth}px`;
  gridContainer$.append(div);

  this.paint = () => {
    div.style.backgroundColor = "#afa";
  };
}

const clearGrid = () => {
  gridContainer$.innerHTML = "";
  grid = [];
};

let grid = [];
const drawGrid = (width, height, boxWidth) => {
  if (!height) return;
  const row = new Array(width).fill(0).map((_) => {
    return new Box(boxWidth);
  });
  grid.push(row);
  return drawGrid(width, height - 1, boxWidth);
};

const setGraphMetaData = () => {
  let graphHeight = 0;
  let levels = [];
  bfs(graph, (n, h) => {
    n.heightIndex = h - 1;
    graphHeight = Math.max(graphHeight, h);

    const row = levels[h - 1] || [];
    if (n.left) {
      n.left.parent = n;
      n.left.isLeftChild = true;
    }
    if (n.right) {
      n.right.parent = n;
      n.right.isRightChild = true;
    }
    row.push(n);
    levels[h - 1] = row;
  });

  drawSVG(svgContainer$, levels);

  const maxWidth = Math.pow(2, graphHeight);

  let leftMost = maxWidth;
  let rightMost = 0;

  const setColumn = (start, end, root) => {
    if (!root) {
      return;
    }
    const row = grid[root.heightIndex];
    const col = Math.ceil((start + end) / 2);

    root.leafIndex = col;
    leftMost = Math.min(leftMost, col);
    rightMost = Math.max(rightMost, col);

    // don't want end to be smaller than start
    setColumn(start, Math.max(start, col - 1), root.left);

    setColumn(Math.min(col + 1, end), end, root.right);
  };

  setColumn(0, maxWidth, graph);

  bfs(graph, (n, h) => {
    n.leafIndex -= leftMost;
  });

  return {
    maxWidth: rightMost - leftMost + 1,
    graphHeight,
  };
};

const draw = () => {
  const { maxWidth, graphHeight } = setGraphMetaData();

  const boxWidth = Math.max(
    Math.min(gridParent$.clientWidth / maxWidth),
    MIN_BOX_WIDTH
  );

  gridContainer$.style.width = `${maxWidth * boxWidth}px`;
  gridContainer$.style.height = `${graphHeight * boxWidth}px`;

  clearGrid();
  drawGrid(maxWidth, graphHeight, boxWidth);

  bfs(graph, (n, h) => {
    grid[n.heightIndex][n.leafIndex].paint();
  });
};

nodeNumButton$.addEventListener("click", () => {
  const nodeNum = parseInt(nodeNumInput$.value);
  if (!nodeNum) {
    return;
  }
  graph = generate(nodeNum, BINARY_TREE);

  generatedGraphStr$.innerHTML = JSON.stringify(graph, null, 2);

  draw();
});

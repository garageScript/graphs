import { generate, BINARY_TREE } from "./lib/generate.js";
import { bfs } from "./lib/traversal.js";

const BOX_WIDTH = 8;

const nodeNumInput$ = document.querySelector("#nodeNumInput");
const nodeNumButton$ = document.querySelector("#nodeNumButton");
const generatedGraphStr$ = document.querySelector("#generatedGraphStr");
const gridContainer$ = document.querySelector("#gridContainer");

let graph = null;

function Box() {
  const div = document.createElement("div");
  div.classList.add("box");
  div.style.width = `${BOX_WIDTH}px`;
  div.style.height = `${BOX_WIDTH}px`;
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
const drawGrid = (width, height) => {
  if (!height) return;
  const row = new Array(width).fill(0).map((_) => {
    return new Box();
  });
  grid.push(row);
  return drawGrid(width, height - 1);
};

const drawGraph = (start, end, root) => {
  if (!root) {
    return;
  }
  const row = grid[root.heightIndex];
  const col = Math.ceil((start + end) / 2);
  console.log(row, col);

  row[col].paint();

  // don't want end to be smaller than start
  drawGraph(start, Math.max(start, col - 1), root.left);

  drawGraph(Math.min(col + 1, end), end, root.right);
};

const draw = () => {
  let graphHeight = 0;
  bfs(graph, (n, h) => {
    n.heightIndex = h - 1;
    graphHeight = Math.max(graphHeight, h);
  });
  console.log(graph);

  const maxWidth = Math.pow(2, graphHeight);

  gridContainer$.style.width = `${maxWidth * BOX_WIDTH}px`;
  gridContainer$.style.height = `${graphHeight * BOX_WIDTH}px`;

  clearGrid();
  drawGrid(maxWidth, graphHeight);

  drawGraph(0, maxWidth, graph);
  console.log("max height", graphHeight, maxWidth);
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

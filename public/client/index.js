import { generate, BINARY_TREE } from "./lib/generate.js";
import { bfs } from "./lib/traversal.js";
import { drawSVG } from "./lib/svg.js";
import { algorithms, algorithmNames } from "./algs.js";

const nodeNumInput$ = document.querySelector("#nodeNumInput");
const nodeNumButton$ = document.querySelector("#nodeNumButton");
const generatedGraphStr$ = document.querySelector("#generatedGraphStr");
const svgContainer$ = document.querySelector(".gridParent");
const algText$ = document.querySelector(".algText");
const algList$ = document.querySelector(".algList");

algList$.innerHTML = Object.keys(algorithms).reduce((acc, key) => {
  return (
    acc +
    `
    <li class="alg" data-alg="${key}">${algorithmNames[key]}</li>
    `
  );
}, "");
const algOptions = document.querySelectorAll(".alg");

Array.from(algOptions).forEach((op) => {
  op.addEventListener("click", () => {
    console.log(algorithms);
    console.log(op.dataset.alg);
    console.log(algorithms[op.dataset.alg]);
    algText$.value = algorithms[op.dataset.alg];
  });
});

let graph = null;

const draw = () => {
  let levels = [];
  bfs(graph, (n, h) => {
    n.heightIndex = h - 1;

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

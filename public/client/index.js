import { generate, BINARY_TREE } from "./lib/generate.js";
import { bfs } from "./lib/traversal.js";
import { drawSVG, runAnimation } from "./lib/svg.js";
import { algorithms } from "./algs.js";

const nodeNumInput$ = document.querySelector("#nodeNumInput");
const nodeNumButton$ = document.querySelector("#nodeNumButton");
const generatedGraphStr$ = document.querySelector("#generatedGraphStr");
const svgContainer$ = document.querySelector(".gridParent");
const algText$ = document.querySelector(".algText");
const algList$ = document.querySelector(".algList");
const runCode$ = document.querySelector("#runCode");

algList$.innerHTML = Object.keys(algorithms).reduce((acc, key) => {
  return (
    acc +
    `
    <div class="alg">
    <details>
      <summary>
        ${algorithms[key].name}
      </summary>
        <pre>
${algorithms[key].description}
        </pre>
        <button class="revealCodeButton" data-alg="${key}">Reveal Code</button>
    </details>  
    </div>
    `
  );
}, "");
const algOptions = document.querySelectorAll(".revealCodeButton");

Array.from(algOptions).forEach((op) => {
  op.addEventListener("click", () => {
    algText$.value = algorithms[op.dataset.alg].code;
  });
});

runCode$.addEventListener("click", () => {
  const runFun = (cb) => {
    cb(graph);
  };
  eval(algText$.value);
});

let graph = null;

const draw = () => {
  let levels = [];
  bfs(graph, (n, h) => {
    n.getValue = function () {
      runAnimation(this);
      return n.value;
    };
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

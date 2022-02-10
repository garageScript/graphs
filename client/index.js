import { generate, BINARY_TREE } from "./lib/generate.js";

const nodeNumInput$ = document.querySelector("#nodeNumInput");
const nodeNumButton$ = document.querySelector("#nodeNumButton");
const generatedGraphStr$ = document.querySelector("#generatedGraphStr");

nodeNumButton$.addEventListener("click", () => {
  const nodeNum = parseInt(nodeNumInput$.value);
  if (!nodeNum) {
    return;
  }
  const result = generate(nodeNum, BINARY_TREE);

  generatedGraphStr$.innerHTML = JSON.stringify(result, null, 2);
});

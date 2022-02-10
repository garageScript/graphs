import { generate, BINARY_TREE } from "./lib/generate.js";

const result = generate(12, BINARY_TREE);

console.log(JSON.stringify(result, null, 2));

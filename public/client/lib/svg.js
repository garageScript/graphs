const SPACE = 50;
const CHILD_SKEW = 20;
const BOX_SIZE = 60;

const backlog = [];

let isRunning = false;

const runJob = () => {
  isRunning = true;
  setTimeout(() => {
    const node = backlog.shift();
    if (!node) {
      isRunning = false;
      return;
    }
    console.log(node);
    node.svgNode.trigger();
    runJob();
  }, 1000);
};

export const runAnimation = (node) => {
  backlog.push(node);
  if (isRunning) {
    return;
  }
  runJob();
};

function SvgNode(parent$, node, hSpace) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  const radius = BOX_SIZE / 2;

  let x = node.columnIndex * (SPACE + BOX_SIZE) + radius;
  if (hSpace) {
    x = (node.columnIndex + 1) * hSpace + node.columnIndex * BOX_SIZE + radius;
  }

  x += CHILD_SKEW;

  const y = node.rowIndex * (SPACE + BOX_SIZE) + radius;

  if (node.parent) {
    if (node.parent.svgNode.xPos === x) {
      if (node.isLeftChild) {
        x -= CHILD_SKEW;
      }
      if (node.isRightChild) {
        x += CHILD_SKEW;
      }
    }
    node.parent.svgNode.drawLine(x, y);
  }

  element.setAttributeNS(null, "cx", x);
  element.setAttributeNS(null, "cy", y);
  element.setAttributeNS(null, "r", radius);
  element.setAttributeNS(null, "fill", "yellow");

  // used for debugging. This way we could log the node and see what svg it corresponds to in the inspector
  this.svgElement = element;

  this.xPos = x;
  this.yPos = y;

  parent$.appendChild(element);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttributeNS(null, "x", x);
  text.setAttributeNS(null, "y", y);
  text.setAttributeNS(null, "font-size", 20);
  text.setAttributeNS(null, "text-anchor", "middle");
  text.setAttributeNS(null, "fill", "black");
  text.textContent = node.value;
  parent$.appendChild(text);

  this.drawLine = (fromX, fromY) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttributeNS(null, "x1", x);
    line.setAttributeNS(null, "x2", fromX);
    line.setAttributeNS(null, "y1", y);
    line.setAttributeNS(null, "y2", fromY);
    line.setAttributeNS(
      null,
      "style",
      "stroke:rgb(200, 255,200);stroke-width:2"
    );

    parent$.appendChild(line);
  };

  this.trigger = () => {
    element.setAttributeNS(null, "fill", "#9999ff");
    setTimeout(() => {
      element.setAttributeNS(null, "fill", "yellow");
    }, 1000);
  };
}

export const drawSVG = (container$, levels) => {
  const widest = levels.reduce((acc, row) => {
    return Math.max(row.length, acc);
  }, 0);

  const width = widest * BOX_SIZE + (widest - 1) * SPACE;
  const height = levels.length * BOX_SIZE + (levels.length - 1) * SPACE;

  container$.innerHTML = `
  <svg version="1.1" id="svgContainer"
     width="${width + 2 * CHILD_SKEW}" height="${height}" 
     xmlns="http://www.w3.org/2000/svg">
    </svg>
  `;

  const svgContainer$ = document.querySelector("#svgContainer");

  levels.forEach((row, rowIndex) => {
    row.forEach((node, columnIndex) => {
      node.rowIndex = rowIndex;
      node.columnIndex = columnIndex;

      const horizontalSpace =
        row.length < widest
          ? Math.floor((width - BOX_SIZE * row.length) / (row.length + 1))
          : 0;
      node.svgNode = new SvgNode(svgContainer$, node, horizontalSpace);
    });
  });
};

export function isStr(s) {
  return typeof s === "string";
}

export function isFn(fn) {
  return typeof fn === "function";
}

export function updateNode(node, nextVal) {
  Object.keys(nextVal).forEach((k) => {
    if (k === "children") {
      if (isStr(nextVal.children)) {
        node.textContent = nextVal.children;
      }
    } else {
      node[k] = nextVal[k];
    }
  });
}

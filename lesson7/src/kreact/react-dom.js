import {TEXT} from "./const";

function render(vnode, container) {
  console.log("vnode", vnode); //sy-log

  // vnode->node
  const node = createNode(vnode, container);
  container.appendChild(node);
}

// vnode->node
// 生成node节点
function createNode(vnode, parentNode) {
  const {type, props} = vnode;
  let node = null;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // function class
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode, parentNode)
      : updateFunctionComponent(vnode, parentNode);
  } else if (type === undefined) {
    node = document.createDocumentFragment();
  }

  reconcileChildren(props.children, node);
  updateNode(node, props);
  return node;
}

function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(child, node);
    }
  }
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // 简单处理 on开头当做事件
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function updateFunctionComponent(vnode, parentNode) {
  const {type, props} = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode, parentNode);
  return node;
}

function updateClassComponent(vnode, parentNode) {
  const {type, props} = vnode;
  const cmp = new type(props);
  const vvnode = cmp.render();
  const node = createNode(vvnode, parentNode);
  return node;
}

export default {
  render
};

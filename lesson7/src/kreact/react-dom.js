import {TEXT} from "./const";

// todo vnode、vvnode 虚拟DOM节点
// todo node 真实DOM节点

function render(vnode, container) {
  console.log("vnode", vnode); //sy-log

  // 1. vnode->node
  const node = createNode(vnode);
  // 2. container.appendChild(node);
  container.appendChild(node);
}

// 创建真实DOM节点
function createNode(vnode) {
  let node;

  const {type, props} = vnode;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  }

  reconcileChildren(props.children, node);
  return node;
}

export default {render};

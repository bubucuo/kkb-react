// vnode 虚拟dom节点
// node  真实dom节点

function render(vnode, container) {
  console.log("vnode", vnode); //sy-log

  // step1 : vnode->node
  const node = createNode(vnode);
  // 把node更新到container中
  container.appendChild(node);
}

function isStringOrNumber(sth) {
  return typeof sth === "string" || typeof sth === "number";
}
// 根据vnode生成node节点
function createNode(vnode) {
  let node;
  const {type} = vnode;
  // todo 根据vnode生成node

  if (typeof type === "string") {
    // 原生标签节点
    node = updateHostComponent(vnode);
  } else if (isStringOrNumber(vnode)) {
    node = updateTextComponent(vnode + "");
  }
  return node;
}

// 更新原生标签的，即根据原生标签的vnode生成node
function updateHostComponent(vnode) {
  const {type, props} = vnode;

  const node = document.createElement(type);
  updateNode(node, props);
  reconcileChildren(node, props.children);

  return node;
}
// 更新原生标签的属性，如className、href、id、（style、事件）等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => (node[k] = nextVal[k]));
}

// 文本节点
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 遍历子节点，假的协调
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];

  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // child是vnode, child->node, 把node更新到parentNode中
    render(child, parentNode);
  }
}

export default {render};

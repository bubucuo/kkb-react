// vnode  虚拟dom节点
// node dom节点

function render(vnode, container) {
  console.log("vnode", vnode); //sy-log
  // vnode - > node
  const node = createNode(vnode);

  // node更新到container中
  container.appendChild(node);
}

function isStringOrNumber(sth) {
  return typeof sth === "string" || typeof sth === "number";
}

function createNode(vnode) {
  let node;

  // todo 生成node

  const {type} = vnode;

  if (typeof type === "string") {
    // 原生标签节点
    node = updateHostComponent(vnode);
  } else if (isStringOrNumber(vnode)) {
    // 文本 (字符串或者是数字)
    node = updateTextComponent(vnode);
  }

  return node;
}

// 原生标签节点
function updateHostComponent(vnode) {
  const {type} = vnode;
  const node = document.createElement(type);
  return node;
}

function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode + "");
  return node;
}

export default {render};

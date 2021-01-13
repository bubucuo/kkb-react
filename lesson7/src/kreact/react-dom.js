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

// vnode->node
function createNode(vnode) {
  let node;

  // todo 生成node

  const {type} = vnode;

  if (typeof type === "string") {
    // console.log("原生标签", vnode); //sy-log
    // 原生标签节点
    node = updateHostComponent(vnode);
  } else if (isStringOrNumber(vnode)) {
    // console.log("文本", vnode); //sy-log
    // 文本 (字符串或者是数字)
    node = updateTextComponent(vnode);
  } else if (typeof type === "function") {
    // 再判断是函数组件还是类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  }

  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== "children")
    .forEach((k) => {
      node[k] = nextVal[k];
    });
}

// 原生标签节点
function updateHostComponent(vnode) {
  const {type, props} = vnode;
  const node = document.createElement(type);
  updateNode(node, props);
  reconcileChildren(node, props.children);
  return node;
}

function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode + "");
  return node;
}

// 函数组件
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  const child = type(props);
  // vnode->node
  const node = createNode(child);
  return node;
}

// 类组件
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const child = instance.render();

  // vnode->node
  const node = createNode(child);
  return node;
}

// 和现在的React17很大不同，下节课说
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // 遍历vnode
    // vnode->node, parentNode.appendChild(node)
    render(child, parentNode);
  }
}

export default {render};

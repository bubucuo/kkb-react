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
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = updateFragmentComponent(vnode);
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

// 函数组件 执行函数
// 返回node
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  const child = type(props);
  //  child->node
  const node = createNode(child);
  return node;
}

// 类组件
// 先实例化 再执行render函数
function updateClassComponent(vnode) {
  const {type, props} = vnode;

  const instance = new type(props);
  const child = instance.render();

  //  child->node
  const node = createNode(child);
  return node;
}

// 文本节点
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 实现Fragment
function updateFragmentComponent(vnode) {
  // todo 作业
  // 提示：可以使用document的fragment

  const node = document.createDocumentFragment();
  reconcileChildren(node, vnode.props.children);
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

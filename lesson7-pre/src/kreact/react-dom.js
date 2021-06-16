// vnode 虚拟dom节点
// node 真实dom节点
function render(vnode, container) {
  console.log("vnode", vnode); //sy-log
  // 1. vnode->node
  const node = createNode(vnode);

  // 2. node->container
  container.appendChild(node);
}

function isString(s) {
  return typeof s === "string";
}

function createNode(vnode) {
  let node;

  // todo 根据vnode生成node
  const {type, props} = vnode;
  if (isString(type)) {
    node = document.createElement(type);
    reconcileChildren(node, props.children);
    updateNode(node, props);
  } else if (typeof type === "function") {
    // 区分函数组件和类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = document.createTextNode(vnode);
  }

  return node;
}

// 类组件
// 先new，再执行实例的render
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const child = instance.render();
  const node = createNode(child);

  return node;
}

// 函数组件
// 执行函数
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;

  const child = type(props);
  // child vnode node
  const node = createNode(child);

  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== "children")
    .forEach((k) => {
      node[k] = nextVal[k];
    });
}

function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];
  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i];
    // child是vnode，
    // vnode-》node， 然后插入到container中
    render(child, parentNode);
  }
}

export default {render};

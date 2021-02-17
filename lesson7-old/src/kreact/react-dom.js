// vnode 虚拟dom节点
// node 真实dom节点

function render(vnode, container) {
  console.log("vnode", vnode); //sy-log
  //step1: vnode->node

  const node = createNode(vnode);

  //step2: container.appendChild(node)

  container.appendChild(node);
}

function createNode(vnode) {
  let node = null;

  const {type, props} = vnode;

  if (type === "TEXT") {
    // 文本
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    // 原生标签
    node = document.createElement(type);
  } else if (typeof type === "function") {
    node = type.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    // 源码中现在没有用createDocumentFragment，而是用的fiber节点
    node = document.createDocumentFragment();
  }

  // todo step1 处理子节点
  reconcileChildren(props.children, node);

  // todo 处理自身属性
  updateNode(node, props);
  return node;
}

// 处理函数组件
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;

  const vvnode = type(props);
  // vvnode->node
  const node = createNode(vvnode);
  return node;
}

// 处理类组件
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  // vvnode->node
  const node = createNode(vvnode);
  return node;
}

function reconcileChildren(children, node) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    // vnode->dom节点， 插入到node父节点中
    render(child, node);
  }
}

// 处理属性
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      node[k] = nextVal[k];
    });
}

export default {render};

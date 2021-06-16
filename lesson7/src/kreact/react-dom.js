// vnode  虚拟dom节点
// node dom节点

function render(vnode, container) {
  console.log("vnode", vnode); //sy-log

  // 1. vnode->node
  const node = createNode(vnode);

  // 2. node->container
  container.appendChild(node);
}

function isString(sth) {
  return typeof sth === "string";
}

// vnode->node
function createNode(vnode) {
  let node;

  // todo 生成node
  const {type} = vnode;
  if (isString(type)) {
    // 原生标签
    node = updateHostComponent(vnode);
  } else if (type === undefined) {
    // 文本
    node = updateTextComponent(vnode);
  } else if (typeof type === "function") {
    // 函数组件、类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    // 处理一下frgament
    node = document.createTextNode("");
  }
  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== "children")
    .forEach((k) => {
      if (k === "style") {
        for (let attr in nextVal.style) {
          node.style[attr] = nextVal.style[attr];
        }
      } else {
        node[k] = nextVal[k];
      }
    });
}

// 原生标签的初次渲染、更新
function updateHostComponent(vnode) {
  const {type, props} = vnode;
  const node = document.createElement(type);
  updateNode(node, props);
  reconcileChildren(node, props.children);

  return node;
}

// 文本
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 先实例化
// 执行render
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const child = instance.render();
  const node = createNode(child);
  return node;
}

// 直接执行函数
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  const child = type(props);
  const node = createNode(child);
  return node;
}

function reconcileChildren(parentNode, children) {
  // children 是数组或者非数组
  const newChildren = Array.isArray(children) ? children : [children];

  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i];
    // child (vnode) ->node ,再插入parentNode中
    render(child, parentNode);
  }
}

export default {render};

// vnode 虚拟dom
// node 真实dom
function render(vnode, container) {
  console.log("vnode", vnode); //sy-log

  // 1. vnode->node
  const node = createNode(vnode);
  // 把node更新到container
  container.appendChild(node);
}

// vnode->node
function createNode(vnode) {
  let node;
  const {type} = vnode;
  // todo 生成node
  if (typeof type === "string") {
    node = updateHostComponent(vnode);
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = document.createTextNode(vnode);
  }

  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== "children")
    .forEach((k) => {
      if (k.startsWith("on")) {
        // 事件
        let eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function updateHostComponent(vnode) {
  const {type, props} = vnode;
  const node = document.createElement(type);
  reconcileChildren(node, props.children);
  updateNode(node, props);
  return node;
}

// 直接执行函数，拿到子节点
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  const child = type(props);
  // child -> node
  const node = createNode(child);
  return node;
}

// 类组件
// 先实例化，再执行render函数才能拿到子节点
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const child = instance.render();
  // child -> node
  const node = createNode(child);
  return node;
}

// “协调”
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];

  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // todo child(vnode)->node, 把node插入到parentNode中
    render(child, parentNode);
  }
}

export default {render};

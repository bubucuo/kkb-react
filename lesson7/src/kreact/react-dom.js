// vnode 虚拟dom节点
// node 真实dom节点

// container  node是node节点
function render(vnode, container) {
  console.log("vnode", vnode, container); //sy-log

  // step1 : vnode->node
  const node = createNode(vnode);
  //step2: container.appnedChild(node)
  container.appendChild(node);
}

function createNode(vnode) {
  let node = null;
  // todo vnode->node

  const {type} = vnode;
  if (typeof type === "string") {
    // 原生标签
    node = updateHostComponent(vnode);
  } else if (typeof type === "function") {
    // 函数组件或者类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  }

  return node;
}

//原生标签节点处理
function updateHostComponent(vnode) {
  const {type, props} = vnode;
  let node = document.createElement(type);

  if (typeof props.children === "string") {
    let childText = document.createTextNode(props.children);
    node.appendChild(childText);
  } else {
    reconcileChildren(props.children, node);
  }

  updateNode(node, props);
  return node;
}

// 函数组件
// 执行函数
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;

  const vvnode = type(props);

  const node = createNode(vvnode);
  return node;
}

// 类组件
// 先实例化 再执行render函数
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  const node = createNode(vvnode);
  return node;
}

// 更新属性
// todo 加一下属性的具体处理 比如style
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      node[k] = nextVal[k];
    });
}

// vnode->node ,插入到dom节点里
function reconcileChildren(children, node) {
  if (Array.isArray(children)) {
    for (let index = 0; index < children.length; index++) {
      const child = children[index];
      render(child, node);
    }
  } else {
    render(children, node);
  }
}

export default {render};

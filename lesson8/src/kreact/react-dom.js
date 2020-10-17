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
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  }
  reconcileChildren(props.children, node);
  updateNode(node, props);
  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // node.setAttributes(k, nextVal[k]);
      node[k] = nextVal[k];
    });
}

// 返回真实dom节点
// 执行函数
function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  let vvnode = type(props);
  const node = createNode(vvnode);
  return node;
}

// 返回真实dom节点
// 先实例化，再执行render函数
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  const node = createNode(vvnode);
  return node;
}

// 遍历下子vnode，然后把子vnode->真实DOM节点，再插入父node中
function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    render(child, node);
  }
}

export default {render};

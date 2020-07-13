import {TEXT} from "./const";

// vnode虚拟dom
// node真实dom节点

// 把vnode变成node，然后把node插入到父容器中
function render(vnode, container) {
  console.log("vnode", vnode); //sy-log
  // vnode->node
  const node = createNode(vnode);
  container.appendChild(node);
}

// 根据传入的vnode，返回node
function createNode(vnode) {
  const {type, props} = vnode;
  let node;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // 函数组件 、类组件都走这里
    node = type.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = document.createDocumentFragment();
  }

  reconcileChildren(props.children, node);
  updateNode(node, props);
  return node;
}

function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode);
  return node;
}

function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const cmp = new type(props);
  const vvnode = cmp.render();
  const node = createNode(vvnode);
  return node;
}

// 遍历子节点
function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // child是vnode
    // vnode->真实dom节点 再把真实dom节点插入 到父节点 当中
    render(child, node);
  }
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

export default {render};

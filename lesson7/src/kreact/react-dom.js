import {TEXT} from "./const";

function render(vnode, container) {
  // console.log("vnode", vnode, container); //sy-log
  // vnode->node
  const node = createNode(vnode, container);
  container.appendChild(node);
}

// vnode->node 这个过程还要处理属性
function createNode(vnode, parentNode) {
  let node = null;
  // todo
  const {type, props} = vnode;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    node = type.isReactComponent
      ? updateClassComponent(vnode, parentNode)
      : updateFunctionComponent(vnode, parentNode);
  }
  reconcileChildren(props.children, node);
  updateNode(node, props);
  return node;
}

function updateFunctionComponent(vnode, parentNode) {
  const {type, props} = vnode;
  let vvnode = type(props);
  const node = createNode(vvnode, parentNode);
  return node;
}

function updateClassComponent(vnode, parentNode) {
  const {type, props} = vnode;
  let cmp = new type(props);
  let vvnode = cmp.render();
  const node = createNode(vvnode, parentNode);
  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // ! 这里不是源码重点中的实现逻辑
        let evenetName = k.slice(2).toLowerCase();
        node.addEventListener(evenetName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // vnode->node
    // container.appendChild(node);
    render(child, node);
  }
}

export default {render};

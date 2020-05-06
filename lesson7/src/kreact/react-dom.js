import {TEXT} from "./const";

function render(vnode, container) {
  console.log("vnode", vnode); //sy-log
  // vnode _> node
  const node = createNode(vnode, container);
  container.appendChild(node);
}

// 返回真实的dom节点
function createNode(vnode, parentNode) {
  let node = null;
  const {type, props} = vnode;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    node = type.isReactComponent
      ? updateClassComponent(vnode, parentNode)
      : updateFunctionComponent(vnode, parentNode);
  } else {
    node = document.createDocumentFragment();
  }

  reconcileChildren(props.children, node);
  updateNode(node, props);

  return node;
}

function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(child, node);
    }
  }
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
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
  const vvnode = cmp.render();
  const node = createNode(vvnode, parentNode);
  return node;
}

export default {
  render
};

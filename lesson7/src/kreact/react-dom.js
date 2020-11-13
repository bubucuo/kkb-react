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

  return node;
}

export default {render};

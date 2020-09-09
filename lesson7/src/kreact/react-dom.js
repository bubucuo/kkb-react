import {TEXT} from "./const";

// ! vnode、vvnode 虚拟dom节点
// ! node 真实dom节点

function render(vnode, container) {
  console.log("vnode--render", vnode); //sy-log
  // vnode->node
  const node = createNode(vnode);
  // 把node插入container
  container.appendChild(node);
}

// 生成真实dom节点
function createNode(vnode) {
  let node = null;
  const {type, props} = vnode;

  if (type === TEXT) {
    //创建文本节点
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    // 证明是个html标签节点， 比如div、span
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // 类组件 或者函数组件

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

// 遍历下子节点
function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // child是vnode，那需要把vnode->真实dom节点，然后插入父节点node中
    render(child, node);
  }
}

// 添加节点属性
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      node[k] = nextVal[k];
    });
}

function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const cmp = new type(props);
  const vvnode = cmp.render();
  // 返回真实dom节点
  const node = createNode(vvnode);
  return node;
}

function updateFunctionComponent(vnode) {
  const {type, props} = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode);
  return node;
}
export default {render};

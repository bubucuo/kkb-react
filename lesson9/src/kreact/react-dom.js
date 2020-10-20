import {TEXT} from "./const";

// 下一个单元任务 数据类型就是fiber
let nextUnitOfWork = null;
// work in progress 正在工作当中的
// 正在工作当中的fiber root
let wipRoot = null;

// ! fiber数据结构
// type 标记fiber的类型
// key 标记当前层级下的唯一性
// props fiber属性
// base 上一次更新的fiber节点
// child 第一个子节点
// sibling 下一个兄弟节点
// return 父节点
// stateNode 真实dom节点
// !

// todo vnode、vvnode 虚拟DOM节点
// todo node 真实DOM节点
function render(vnode, container) {
  // // 1. vnode->node
  // const node = createNode(vnode);
  // // 2. container.appendChild(node);
  // container.appendChild(node);

  wipRoot = {
    stateNode: container,
    props: {
      children: [vnode]
    }
  };

  nextUnitOfWork = wipRoot;
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
  } else {
    // * 这个地方是个简写，源码当中没有生成Fragment，直接协调的子节点
    node = document.createDocumentFragment();
  }
  // reconcileChildren(props.children, node);
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
function updateFunctionComponent(fiber) {
  const {type, props} = fiber;
  let children = [type(props)];
  reconcileChildren(fiber, children);
}

// 返回真实dom节点
// 先实例化，再执行render函数
function updateClassComponent(fiber) {
  const {type, props} = fiber;
  let cmp = new type(props);
  let vvnode = cmp.render();
  const children = [vvnode];
  reconcileChildren(fiber, children);
}

// 原生标签节点更新
function updateHostComponent(fiber) {
  // 判断真实dom节点是否存在，不存在的话，去创建
  if (!fiber.stateNode) {
    fiber.stateNode = createNode(fiber);
  }

  const {children} = fiber.props;
  reconcileChildren(fiber, children);
  // console.log("fiber", fiber); //sy-log
}

// 遍历下子vnode，然后把子vnode->真实DOM节点，再插入父node中
// function reconcileChildren(children, node) {
//   for (let i = 0; i < children.length; i++) {
//     let child = children[i];
//     render(child, node);
//   }
// }

function reconcileChildren(workInProgress, children) {
  // 记录上一个的哥哥fiber
  let prevSibling = null;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];

    // ! 这里只是新增
    let newFiber = {
      type: child.type,
      props: child.props,
      stateNode: null,
      base: null,
      // child:
      // sibling:
      return: workInProgress
    };

    if (i === 0) {
      workInProgress.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }
}

function performUnitOfWork(fiber) {
  // 任务1： 执行更新fiber
  const {type} = fiber;
  if (typeof type === "function") {
    type.prototype.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // 任务2： 返回下一个要更新的fiber
  //顺序是 子节点、兄弟、爸爸或者祖先的兄弟
  // 什么都没了，就更新完成了
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function workLoop(deadline) {
  // 当前有需要更新的fiber，并且浏览器有空闲时间
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    // 执行更新fiber，并且返回下一个要更新的fiber
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    // 把fiber更新到根节点中，其实就是把vnode->node
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function commitRoot() {
  commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // ! 找到fiber.stateNode的父或者祖先DOM节点parentNode
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }
  let parentNode = parentNodeFiber.stateNode;

  //  新增
  if (fiber.stateNode) {
    parentNode.appendChild(fiber.stateNode);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {render};

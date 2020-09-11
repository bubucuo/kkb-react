import {TEXT, PLACEMENT} from "./const";

// ! vnode、vvnode 虚拟dom节点
// ! node 真实dom节点

// fiber的数据结构如下：
// type: 标记当前节点的类型;
// props: 属性;
// key: 标记唯一性;
// child: 第一个子节点;
// sibling: 下一个兄弟节点;
// return: 指向父节点
// node: 真实的dom节点
// base: 记录下当前的节点

// 下一个要执行的fiber，数据结构就是fiber
let nextUnitOfWork = null;
// work in propgress 正在进行中的 结构类型是fiber
let wipRoot = null;

function render(vnode, container) {
  // console.log("vnode--render", vnode); //sy-log

  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    },
    base: null
  };

  nextUnitOfWork = wipRoot;

  // vnode->node
  // const node = createNode(vnode);
  // // 把node插入container
  // container.appendChild(node);
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
  }
  // else if (typeof type === "function") {
  //   // 类组件 或者函数组件

  //   node = type.isReactComponent
  //     ? updateClassComponent(vnode)
  //     : updateFunctionComponent(vnode);
  // } else {
  //   node = document.createDocumentFragment();
  // }

  // reconcileChildren(props.children, node);
  updateNode(node, props);
  return node;
}

// 遍历下子节点-old
// function reconcileChildren(children, node) {
//   for (let i = 0; i < children.length; i++) {
//     let child = children[i];
//     // child是vnode，那需要把vnode->真实dom节点，然后插入父节点node中
//     render(child, node);
//   }
// }

// 协调子节点
// 1. 给workInProgress添加一个child节点，就是children的第一个子节点形成的fiber
// 2. 形成fiber架构，把children里节点遍历下，形成fiber链表状
function reconcileChildren(workInProgress, children) {
  let prevSibling = null;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // 今天先写初次渲染
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null,
      return: workInProgress,
      effectTag: PLACEMENT
    };

    if (i === 0) {
      workInProgress.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
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
  // const {type, props} = vnode;
  // const cmp = new type(props);
  // const vvnode = cmp.render();
  // // 返回真实dom节点
  // const node = createNode(vvnode);
  // return node;
}

function updateFunctionComponent(fiber) {
  const {type, props} = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const {children} = fiber.props;
  reconcileChildren(fiber, children);

  console.log("updateHostComponent", fiber); //sy-log
}

function performUnitOfWork(fiber) {
  // step1: 执行更新当前fiber
  // todo
  // sth
  const {type} = fiber;
  if (typeof type === "function") {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // 原生标签的
    updateHostComponent(fiber);
  }
  // step2: 并且返回下一个要执行的fiber
  // 原则就是：先看下有没子节点
  if (fiber.child) {
    return fiber.child;
  }
  // 如果没有子节点，找兄弟
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    // 执行更新当前fiber，并且返回下一个要执行的fiber
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // 没有下一个任务了，执行提交
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

  // parentNode是跟fiber的离的最近的dom父或祖先节点
  // <Provider store={store}>
  //   <App />
  // </Provider>;
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }
  const parentNode = parentNodeFiber.node;
  // fiber有node节点
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {render};

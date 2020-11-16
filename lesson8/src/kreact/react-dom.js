import {PLACEMENT} from "./const";

// vnode 虚拟dom节点
// node 真实dom节点

// container  node是node节点
function render(vnode, container) {
  wipRoot = {
    stateNode: container,
    props: {children: [vnode]}
  };
  nextUnitOfWork = wipRoot;
}

function createNode(fiber) {
  let node = null;
  // todo vnode->node

  const {type, props} = fiber;
  if (typeof type === "string") {
    // 原生标签
    node = document.createElement(type);
    updateNode(node, props);
  }

  return node;
}

function reconcileChildren(workInProgressFiber, children) {
  if (
    !(
      workInProgressFiber.props &&
      typeof workInProgressFiber.props.children !== "string"
    )
  ) {
    return;
  }

  let newChildren = Array.isArray(children) ? children : [children];

  //  构建fiber结构
  // 更新 删除 新增
  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    let newFiber = null;
    console.log("child", child); //sy-log
    newFiber = {
      type: child.type,
      props: child.props,
      stateNode: null,
      child: null,
      sibling: null,
      return: workInProgressFiber,
      effectTag: PLACEMENT
    };

    // 形成链表结构
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      // i>0
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}

//原生标签节点处理
function updateHostComponent(fiber) {
  if (!fiber) {
    return;
  }
  if (!fiber.stateNode) {
    fiber.stateNode = createNode(fiber);
  }

  // todo reconcileChildren
  if (fiber.props) {
    const {children} = fiber.props;
    reconcileChildren(fiber, children);
  }
  console.log("fiiber", fiber); //sy-log
}

// 函数组件
// 执行函数
function updateFunctionComponent(fiber) {
  const {type, props} = fiber;
  const children = type(props);

  reconcileChildren(fiber, children);
}

// 类组件
// 先实例化 再执行render函数
function updateClassComponent(fiber) {
  const {type, props} = fiber;
  const instance = new type(props);
  const children = instance.render();
  reconcileChildren(fiber, children);
}

// 更新属性
function updateNode(node, nextVal) {
  Object.keys(nextVal).forEach(k => {
    if (k === "children") {
      if (typeof nextVal.children === "string") {
        const textNode = document.createTextNode(nextVal.children);
        node.appendChild(textNode);
      }
    } else {
      node[k] = nextVal[k];
    }
  });
}

function performUnitOfWork(fiber) {
  // 1. 执行当前任务
  // 执行当前任务
  const {type} = fiber;
  if (typeof type === "function") {
    type.prototype.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // 原生标签
    updateHostComponent(fiber);
  }

  // 2、 返回下一个任务
  // 原则就是：先找子元素
  if (fiber.child) {
    return fiber.child;
  }

  // 如果没有子元素 寻找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

let nextUnitOfWork = null;
let wipRoot = null;

function workLoop(deadline) {
  // 有下一个任务，并且当前帧还没有结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// ! commit阶段
function commitRoot() {
  commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // 向上查找
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }

  const parentNode = parentNodeFiber.stateNode;
  if (fiber.effectTag === PLACEMENT && fiber.stateNode !== null) {
    parentNode.appendChild(fiber.stateNode);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {render};

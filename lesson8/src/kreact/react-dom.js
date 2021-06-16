// vnode 虚拟dom
// node 真实dom
/**
 * fiber:
 * type  标记节点类型
 * key 标记节点在当前层级下的唯一性
 * props 属性
 * index 标记当前层级下的位置
 * child 第一个子节点
 * sibling 下一个兄弟节点
 * return 父节点
 * stateNode 如果组件是原生标签则是dom节点，如果是类组件则是类实例
 */

let wipRoot = null;
function render(vnode, container) {
  // console.log("vnode", vnode); //sy-log
  // // 1. vnode->node
  // const node = createNode(vnode);
  // // 把node更新到container
  // container.appendChild(node);

  wipRoot = {
    type: "div",
    props: {children: {...vnode}},
    stateNode: container,
  };
  nextUnitOfWork = wipRoot;
}

// vnode->node
function createNode(workInProgress) {
  const {type, props} = workInProgress;
  const node = document.createElement(type);
  updateNode(node, props);
  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    // .filter((k) => k !== "children")
    .forEach((k) => {
      if (k === "children") {
        if (isString(nextVal[k])) {
          node.textContent = nextVal[k];
        }
      } else {
        if (k.startsWith("on")) {
          // 事件
          let eventName = k.slice(2).toLocaleLowerCase();
          node.addEventListener(eventName, nextVal[k]);
        } else {
          node[k] = nextVal[k];
        }
      }
    });
}

// 原生标签， 和函数组件和类组件都有子节点，都需要协调
function updateHostComponent(workInProgress) {
  const {type, props} = workInProgress;
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }

  // 协调子节点
  reconcileChildren(workInProgress, workInProgress.props.children);

  console.log("work", workInProgress); //sy-log
}

// 直接执行函数，拿到子节点
function updateFunctionComponent(workInProgress) {
  const {type, props} = workInProgress;
  const child = type(props);

  reconcileChildren(workInProgress, child);
}

// 类组件
// 先实例化，再执行render函数才能拿到子节点
function updateClassComponent(workInProgress) {}

function updateFragementComponent(workInProgress) {
  reconcileChildren(workInProgress, workInProgress.props.children);
}

function isString(sth) {
  return typeof sth === "string";
}

// 协调
//
function reconcileChildren(workInProgress, children) {
  if (isString(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];
  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // 初次渲染
    let newFiber = {
      type: child.type,
      props: {...child.props},
      stateNode: null,
      child: null,
      sibling: null,
      return: workInProgress,
    };

    if (i === 0) {
      workInProgress.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}

// 下一个待执行的任务
let nextUnitOfWork = null;

// workInProgress work in progress 当前正在执行中的 fiber
function performUnitOfWork(workInProgress) {
  // 1. 更新当前任务
  // todo
  const {type} = workInProgress;

  if (isString(type)) {
    // 原生标签
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    // 函数组件或者类组件
    type.prototype.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress);
  } else {
    updateFragementComponent(workInProgress);
  }
  // 2. 返回下一个任务
  // 深度优先遍历 （王朝的故事）
  if (workInProgress.child) {
    return workInProgress.child;
  }
  let nextFiber = workInProgress;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
  // 最终找不到，那就返回undefined
}

function workLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
    // 更新链表，再更新到dom
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 提交 commit
  if (wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// commit
function commitRoot() {
  commitWorker(wipRoot.child);
  wipRoot = null;
}

// vnode->node
function commitWorker(workInProgress) {
  if (!workInProgress) {
    return;
  }

  // 1. 提交自己
  let parentNodeFiber = workInProgress.return;

  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }

  let parentNode = parentNodeFiber.stateNode;

  // 更新有dom节点的fiber，因为有些fiber没有dom节点（func、class、fragment、Provider、Consumer等）
  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  }

  // 2. 提交子节点
  commitWorker(workInProgress.child);
  // 3. 提交兄弟
  commitWorker(workInProgress.sibling);
}

export default {render};

// vnode  虚拟dom节点
// node dom节点

// work in progress root fiber
let wipRoot = null;

function render(vnode, container) {
  console.log("vnode", vnode); //sy-log
  // // 1. vnode->node
  // const node = createNode(vnode);
  // // 2. node->container
  // container.appendChild(node);
  wipRoot = {
    type: "div",
    props: {children: {...vnode}},
    stateNode: container,
  };
  nextUnitOfWork = wipRoot;
}

function isString(sth) {
  return typeof sth === "string";
}

// vnode->node
function createNode(workInProgress) {
  // todo 生成node
  const {type} = workInProgress;
  const node = document.createElement(type);
  updateNode(node, workInProgress.props);
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
        if (k === "style") {
          for (let attr in nextVal.style) {
            node.style[attr] = nextVal.style[attr];
          }
        } else {
          node[k] = nextVal[k];
        }
      }
    });
}

// 原生标签的初次渲染、更新
function updateHostComponent(workInProgress) {
  const {type, props} = workInProgress;

  // 处理自己属性
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }

  // 协调子节点
  reconcileChildren(workInProgress, props.children);
  console.log("workInProgress", workInProgress); //sy-log
}

// 文本
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 先实例化
// 执行render
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const child = instance.render();
  const node = createNode(child);
  return node;
}

// 直接执行函数
function updateFunctionComponent(workInProgress) {
  const {type, props} = workInProgress;
  const child = type(props);
  // （处理属性）
  // 协调子节点
  reconcileChildren(workInProgress, child);
}

function updateFragmentComponent(workInProgress) {
  const {type, props} = workInProgress;

  // 协调
  reconcileChildren(workInProgress, props.children);
}

function reconcileChildren(workInProgress, children) {
  if (isString(children)) {
    return;
  }

  // children 是数组或者非数组
  const newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null; //记录上一个fiber
  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i];

    // 初次渲染
    const newFiber = {
      type: child.type,
      key: child.key,
      props: {...child.props},
      child: null, // 第一个子fiber
      sibling: null,
      return: workInProgress,
      stateNode: null,
    };

    if (previousNewFiber === null) {
      workInProgress.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    if (newFiber) {
      previousNewFiber = newFiber;
    }
    // 更新、删除
  }
}

// workInProgress work in progress 当前正在进行中的

/**
 * fiber
 * type
 * key
 * props
 * child 大阿哥 fiber
 * sibling 下一个兄弟节点  fiber
 * return 父节点 fiber
 * stateNode 如果是原生标签，代表dom节点，如果是class组件则是实例
 */

function performUnitOfWork(workInProgress) {
  // 1. 处理当前的任务
  // todo
  const {type} = workInProgress;

  if (isString(type)) {
    // 原生标签
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    // 函数组件、类组件
    updateFunctionComponent(workInProgress);
  } else {
    // fragment
    updateFragmentComponent(workInProgress);
  }

  // 2. 返回下一个任务
  // 深度优先 王朝的故事
  //!子节点、兄弟、叔叔、爷爷的兄弟、太爷爷的兄弟等等或者null
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

  return null;
}

// 当前正在更新的任务 fiber
let nextUnitOfWork = null;

function workLoop(IdleDeadline) {
  // 1. 先处理vnode
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
    // 处理当前的任务、返回下一个任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 2. 再处理dom对象
  // commit
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
}
requestIdleCallback(workLoop);

// commit
function commitRoot() {
  commitWorker(wipRoot.child);
  // wipRoot = null;
}
// 根据fiber找父dom节点，因为不是所有节点都有dom节点
function getParentNode(workInProgress) {
  let parentNodeFiber = workInProgress.return;

  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }

  let parentNode = parentNodeFiber.stateNode;

  return parentNode;
}

function commitWorker(workInProgress) {
  if (!workInProgress) {
    return;
  }
  // 1. 提交自己

  // 父dom节点
  let parentNode = getParentNode(workInProgress); //  workInProgress.return.stateNode;
  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  }
  // 2. 提交子节点
  commitWorker(workInProgress.child);
  // 3. 提交兄弟
  commitWorker(workInProgress.sibling);
}

export default {render};

// vnode 虚拟dom节点
// node 真实dom节点

// container  node是node节点
function render(vnode, container) {
  wipRoot = {
    stateNode: container,
    props: {children: vnode}
  };

  nextUnitOfWork = wipRoot;
}

function createNode(workInProgress) {
  let node = null;
  // todo vnode->node

  const {type, props} = workInProgress;

  if (typeof type === "string") {
    // 原生标签
    node = document.createElement(type);
  }

  updateNode(node, props);

  return node;
}

//原生标签节点处理
function updateHostComponent(workInProgress) {
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }

  reconcileChildren(workInProgress, workInProgress.props.children);

  console.log("workInProgress", workInProgress); //sy-log
}

// 函数组件
// 执行函数
function updateFunctionComponent(workInProgress) {
  const {type, props} = workInProgress;

  const children = type(props);

  reconcileChildren(workInProgress, children);
}

// 类组件
// 先实例化 再执行render函数
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  const node = createNode(vvnode);
  return node;
}

// 更新属性
// todo 加一下属性的具体处理 比如style
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

function reconcileChildren(workInProgress, children) {
  if (
    !(workInProgress.props && typeof workInProgress.props.children !== "string")
  ) {
    return;
  }

  let newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null;
  for (let index = 0; index < newChildren.length; index++) {
    const child = newChildren[index];

    let newFiber = null;
    newFiber = {
      type: child.type, //
      props: child.props,
      child: null,
      sibling: null,
      return: workInProgress,
      stateNode: null
    };

    // 构建fiber结构
    if (index === 0) {
      workInProgress.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}

// fiber 结构
// child 第一个子节点
// sibling 下一个兄弟
// return  爸爸
// stateNode dom节点
function performUnitOfWork(workInProgress) {
  // * step1: 执行当前fiber （治理王朝）
  // todo 执行
  const {type} = workInProgress;
  if (typeof type === "function") {
    type.prototype.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress);
  } else {
    // 原生标签
    updateHostComponent(workInProgress);
  }

  // * step2: 返回下一个fiber (王朝的故事)
  // 原则： 先找子节点
  if (workInProgress.child) {
    return workInProgress.child;
  }
  // 没有子节点，传给兄弟,
  // 没有兄弟，
  let nextFiber = workInProgress;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

// 下一个fiber任务
let nextUnitOfWork = null;
// wip  work in progress 正在进行当中的 ，数据结构fiber root
let wipRoot = null;

function workLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    //  执行当前fiber， 返回下一个fiber
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    // commit
    commitRoot();
  }
}

requestIdleCallback(workLoop);

function commitRoot() {
  commotWorker(wipRoot.child);
  wipRoot = null;
}

function commotWorker(workInProgress) {
  if (!workInProgress) {
    return;
  }
  // step1: commit workInProgress
  let parentNodeFiber = workInProgress.return;
  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }

  // 父（祖先）dom节点
  const parentNode = parentNodeFiber.stateNode;
  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  }

  // step2: commit workInProgress.child
  commotWorker(workInProgress.child);
  // step1: commit workInProgress.sibling
  commotWorker(workInProgress.sibling);
}

export default {render};

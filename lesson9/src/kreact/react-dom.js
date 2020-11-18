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
}

// 函数组件
// 执行函数
function updateFunctionComponent(workInProgress) {
  wipFiber = workInProgress;
  wipFiber.hooks = [];
  wipFiber.hookIndex = 0;

  const {type, props} = workInProgress;

  const children = type(props);

  reconcileChildren(workInProgress, children);
}

// 类组件
// 先实例化 再执行render函数
function updateClassComponent(workInProgress) {
  const {type, props} = workInProgress;
  const instance = new type(props);
  const children = instance.render();
  reconcileChildren(workInProgress, children);
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
      // 源码当中事件是合成事件，利用了事件委托，react17之前是把事件添加到document上，react17是添加到了container
      // 但是今天不写这么复杂了，这里瞎写一下事件
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
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
// base 上一次的fiber
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
  commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(workInProgress) {
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
  commitWorker(workInProgress.child);
  // step1: commit workInProgress.sibling
  commitWorker(workInProgress.sibling);
}
// 当前正在工作的fiber
let wipFiber = null;
// hooks :{
// state 存储状态
// queue
// }

// [hook1, hook2, hook3]
export function useState(init) {
  const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hookIndex];
  const hook = oldHook
    ? {
        state: oldHook.state,
        queue: oldHook.queue
      }
    : {state: init, queue: []};

  hook.queue.forEach(action => {
    // 源码中是批量更新
    // 模拟一下
    hook.state = action;
  });

  const setState = () => {};

  // todo 别忘了改init

  return [hook.state, setState];
}

export default {render};

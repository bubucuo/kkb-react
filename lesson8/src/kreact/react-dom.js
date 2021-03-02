// vnode 虚拟dom
// node 真实dom节点

// 根节点 fiber
let wipRoot = null;
function render(vnode, container) {
  // console.log("vnode", vnode); //sy-log
  // // vnode -> node
  // const node = createNode(vnode);
  // // node插入到container中
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

// 根据vnode，生成node
function createNode(workInProgress) {
  let node = document.createElement(workInProgress.type);
  updateNode(node, workInProgress.props);
  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    // .filter((k) => k !== "children")
    .forEach((k) => {
      if (k === "children") {
        if (isString(nextVal.children)) {
          node.textContent = nextVal.children;
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

// 原生标签
function updateHostComponent(workInProgress) {
  // 修身
  // 构建真实dom节点
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }
  // 齐家
  // 协调子节点
  reconcileChildren(workInProgress, workInProgress.props.children);
  console.log("workInProgress", workInProgress); //sy-log
}

// 文本
function updateTextCompoent(workInProgress) {
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = document.createTextNode(workInProgress.props);
  }
}

function updateFunctionComponent(workInProgress) {
  const {type, props} = workInProgress;
  const children = type(props);
  reconcileChildren(workInProgress, children);
}

function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  const node = createNode(vvnode);
  return node;
}

function updateFragmentComponent(workInProgress) {
  reconcileChildren(workInProgress, workInProgress.props.children);
}

// 最假的吧，但是做的也是遍历子节点
function reconcileChildren(workInProgress, children) {
  if (isString(children)) {
    return;
  }

  let newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];

    let newFiber = {
      type: child.type, // 类型
      props: {...child.props}, // 属性
      stateNode: null, //如果是原生标签，代表dom节点，如果是类组件就代表实例
      child: null, // 第一个子节点 fiber
      sibling: null, // 下一个兄弟节点  fiber
      return: workInProgress, // 父节点
    };

    if (isString(child)) {
      newFiber.props = child;
    }

    if (i === 0) {
      // 第一个子fiber
      workInProgress.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}

// fiber 数据结构
// type
// props
// key
// stateNode  如果是原生标签，代表dom节点，如果是类组件就代表实例
// child 第一个子节点
// sibling 下一个兄弟节点
// return 指向父节点

// work in progress 当前正在执行当中的
function performNextUnitWork(workInProgress) {
  // step1 执行当前任务
  const {type} = workInProgress;
  if (isString(type)) {
    // 原生标签
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    updateFunctionComponent(workInProgress);
  } else if (typeof type === "undefined") {
    // 文本
    updateTextCompoent(workInProgress);
  } else {
    updateFragmentComponent(workInProgress);
  }

  // step2 并且要返回下一个任务 深度优先遍历
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
}

// 下一个要执行的任务
let nextUnitOfWork = null; // fiber
function workLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    // 执行当前任务，并且要返回下一个任务
    nextUnitOfWork = performNextUnitWork(nextUnitOfWork);
  }

  // 没有任务就提交
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
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

  // 更新自己
  let parentNodeFiber = workInProgress.return;

  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }

  let parentNode = parentNodeFiber.stateNode;
  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  }

  // 更新子节点
  commitWorker(workInProgress.child);
  //更新下一个兄弟节点
  commitWorker(workInProgress.sibling);
}

export default {render};

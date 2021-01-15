// 下一个要执行的任务
let nextUnitOfWork = null; // fiber
let wipRoot = null; //work in progress root: fiber

// ! fiber是个js对象
// !  fiber节点的属性
// child 第一个子节点
// sibling 下一个兄弟节点
// return 父节点
// stateNode 在原生标签里，指的就是dom节点
// !

// vnode  虚拟dom节点
// node dom节点

function render(vnode, container) {
  // console.log("vnode", vnode); //sy-log
  // // vnode - > node
  // const node = createNode(vnode);

  // // node更新到container中
  // container.appendChild(node);
  wipRoot = {
    type: "div",
    props: {children: {...vnode}},
    stateNode: container,
  };
  nextUnitOfWork = wipRoot;
}

function isStringOrNumber(sth) {
  return typeof sth === "string" || typeof sth === "number";
}

// vnode->node
// 生成原生标签的dom节点
function createNode(workInProgress) {
  const {type, props} = workInProgress;
  let node = document.createElement(type);
  updateNode(node, props);
  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    // .filter((k) => k !== "children")
    .forEach((k) => {
      if (k === "children") {
        // 如果children是字符串或者数字，要插入父节点
        if (isStringOrNumber(nextVal[k])) {
          node.textContent = nextVal[k];
        }
      } else {
        // 没有考虑细节，如style、事件等
        node[k] = nextVal[k];
      }
    });
}

function updateFragmentComponent(vnode) {
  const node = document.createDocumentFragment();
  reconcileChildren(node, vnode.props.children);
  return node;
}

// 原生标签节点的更新
function updateHostComponent(workInProgress) {
  if (!workInProgress.stateNode) {
    // dom节点
    workInProgress.stateNode = createNode(workInProgress);
  }

  // 协调子节点
  // todo
  reconcileChildren(workInProgress, workInProgress.props.children);

  console.log("workInProgress", workInProgress); //sy-log
}

function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode + "");
  return node;
}

// 函数组件
function updateFunctionComponent(workInProgress) {
  const {type, props} = workInProgress;
  const child = type(props);
  reconcileChildren(workInProgress, child);
}

// 类组件
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  const instance = new type(props);
  const child = instance.render();

  // vnode->node
  const node = createNode(child);
  return node;
}

// 协调子节点
function reconcileChildren(workInProgress, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    let newFiber = {
      key: child.key, // 属性的标记节点
      type: child.type,
      props: {...child.props}, //属性
      stateNode: null,
      child: null,
      sibling: null,
      return: workInProgress,
    };
    if (i === 0) {
      //newFiber 是 workInProgress的第一个子fiber
      workInProgress.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}

// work In Progress正在工作中的
function performUnitOfWork(workInProgress) {
  // * step1： 执行当前任务
  // todo
  const {type} = workInProgress;
  if (typeof type === "string") {
    // 原生标签节点
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    updateFunctionComponent(workInProgress);
  }

  // * step2: 返回下一个任务
  // 参考王朝的故事
  // 有子节点，传给第一个子节点
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

function workLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    //执行任务链
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // commit
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
}

// 在浏览器的空闲时段内调用的函数排队
requestIdleCallback(workLoop);

// 提交
function commitRoot() {
  commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(workInProgress) {
  // 惠及亲友
  // 提交自己 提交孩子 提交兄弟
  if (!workInProgress) {
    return;
  }

  // todo 自己

  // parentNode dom节点
  // ? 所有fiber节点都有dom节点吗  函数组件 类组件 Provider等
  let parentNodeFiber = workInProgress.return; // fiber
  // 有些节点是没有dom节点的

  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }

  let parentNode = parentNodeFiber.stateNode;

  // 新增
  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  }

  commitWorker(workInProgress.child);
  commitWorker(workInProgress.sibling);
}

export default {render};

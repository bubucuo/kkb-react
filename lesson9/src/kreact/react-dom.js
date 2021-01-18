import {Placement, Update} from "./const";

// 下一个要执行的任务
let nextUnitOfWork = null; // fiber
let wipRoot = null; //work in progress root: fiber
let currentRoot = null;
// work in progress fiber
let wipFiber = null;

// ! fiber是个js对象
// !  fiber节点的属性
// child 第一个子节点
// sibling 下一个兄弟节点
// return 父节点
// stateNode 在原生标签里，指的就是dom节点
// alternate 记录老fiber
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
  updateNode(node, {}, props);
  return node;
}

// function updateNode(node, prevVal, nextVal) {
//   Object.keys(nextVal)
//     // .filter((k) => k !== "children")
//     .forEach((k) => {
//       if (k === "children") {
//         // 如果children是字符串或者数字，要插入父节点
//         if (isStringOrNumber(nextVal[k])) {
//           node.textContent = nextVal[k];
//         }
//       } else if (k.slice(0, 2) === "on") {
//         // ! 事件, 假的，都是假的
//         const eventName = k.slice(2).toLowerCase();
//         node.addEventListener(eventName, nextVal[k]);
//       } else {
//         // 没有考虑细节，如style、事件等
//         node[k] = nextVal[k];
//       }
//     });
// }

function updateNode(node, prevVal, nextVal) {
  Object.keys(prevVal)
    // .filter(k => k !== "children")
    .forEach((k) => {
      if (k === "children") {
        // 有可能是文本
        if (isStringOrNumber(prevVal[k])) {
          node.textContent = "";
        }
      } else if (k.slice(0, 2) === "on") {
        const eventName = k.slice(2).toLocaleLowerCase();
        node.removeEventListener(eventName, prevVal[k]);
      } else {
        if (!(k in nextVal)) {
          node[k] = "";
        }
      }
    });

  Object.keys(nextVal)
    // .filter(k => k !== "children")
    .forEach((k) => {
      if (k === "children") {
        // 有可能是文本
        if (isStringOrNumber(nextVal[k])) {
          node.textContent = nextVal[k] + "";
        }
      } else if (k.slice(0, 2) === "on") {
        const eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function updateFragmentComponent(workInProgress) {
  reconcileChildren(workInProgress, workInProgress.props.children);
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

  // console.log("workInProgress", workInProgress); //sy-log
}

function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode + "");
  return node;
}

// 函数组件
function updateFunctionComponent(workInProgress) {
  // 给wipFiber赋初始值
  wipFiber = workInProgress;
  wipFiber.hooks = [];
  wipFiber.hookIndex = 0;

  const {type, props} = workInProgress;
  const child = type(props);
  reconcileChildren(workInProgress, child);
}

// 类组件
function updateClassComponent(workInProgress) {
  const {type, props} = workInProgress;
  const instance = new type(props);
  const child = instance.render();
  reconcileChildren(workInProgress, child);
}

// 老 1 2 3 4
// 新 2 3 4
// 今天不考虑位置移动
// 协调子节点
function reconcileChildren(workInProgress, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null;
  // 老fiber的头结点
  let oldFiber = workInProgress.alternate && workInProgress.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    let same =
      child &&
      oldFiber &&
      child.type === oldFiber.type &&
      child.key === oldFiber.key;
    let newFiber;
    if (same) {
      // 复用
      newFiber = {
        key: child.key, // 属性的标记节点
        type: child.type,
        props: {...child.props}, //属性
        stateNode: oldFiber.stateNode,
        child: null,
        sibling: null,
        return: workInProgress,
        alternate: oldFiber, // 老节点 fiber
        flag: Update,
      };
    }
    if (!same && child) {
      // 新增
      newFiber = {
        key: child.key, // 属性的标记节点
        type: child.type,
        props: {...child.props}, //属性
        stateNode: null,
        child: null,
        sibling: null,
        return: workInProgress,
        flag: Placement,
      };
    }

    if (!same && oldFiber) {
      // 删除
    }
    // 链表继续往后指
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

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
    type.prototype.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress);
  } else {
    updateFragmentComponent(workInProgress);
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

  requestIdleCallback(workLoop);
}

// 在浏览器的空闲时段内调用的函数排队
requestIdleCallback(workLoop);

// 提交
function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
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

  // 插入
  if (workInProgress.flag & Placement && workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  } else if (workInProgress.flag & Update && workInProgress.stateNode) {
    // 更新属性
    updateNode(
      workInProgress.stateNode,
      workInProgress.alternate.props,
      workInProgress.props
    );
  }

  commitWorker(workInProgress.child);
  commitWorker(workInProgress.sibling);
}

export function useState(init) {
  // alternate 老fiber
  const oldHook =
    wipFiber.alternate && wipFiber.alternate.hooks[wipFiber.hookIndex];
  // 区分是初次渲染还是更新
  // 状态值 修改状态的函数

  const hook = oldHook
    ? {state: oldHook.state, queue: oldHook.queue}
    : {
        state: init,
        queue: [],
      };

  // 把state状态添加到queue里，实现批量更新
  // 引起组件整体更新（这里应该是从函数组件开始更新，但是我这里用的是wipRoot从根节点更新）
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      stateNode: currentRoot.stateNode,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
  };

  // 模拟实现批量更新
  hook.queue.forEach((action) => {
    hook.state = action;
  });

  wipFiber.hooks.push(hook);
  wipFiber.hookIndex++;

  //  Todo init是初始值
  return [hook.state, setState];
}

export default {render};

// 引起组件更新
// ReactDOM.render
// setState
// forceUpdate

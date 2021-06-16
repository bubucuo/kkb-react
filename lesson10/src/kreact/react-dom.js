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
 * alternate 老的fiber
 */

import {Deletion, Placement, Update} from "./const";

let wipRoot = null;
let currentRoot = null;
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
  updateNode(node, {}, props);
  return node;
}

// 老的属性 和 新的属性
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
        // 老属性里有，新的没有
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
// 原生标签， 和函数组件和类组件都有子节点，都需要协调
function updateHostComponent(workInProgress) {
  const {type, props} = workInProgress;
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }

  // 协调子节点
  reconcileChildren(workInProgress, workInProgress.props.children);
}

// 直接执行函数，拿到子节点
function updateFunctionComponent(workInProgress) {
  // 初始化
  currentlyRenderingFiber = workInProgress; //当前正在渲染的fiber
  currentlyRenderingFiber.memoizedState = null; // 当前正在渲染的fiber的头结点hook
  workInProgressHook = null; //当前正在工作的hook

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

function isStringOrNumber(sth) {
  return typeof sth === "string" || typeof sth === "number";
}

// 删除节点
function deleteChild(returnFiber, childToDelete) {
  const last = returnFiber.lastEffect;

  // fiber 1->2->3->4
  // firstEffect 第一个副作用 fiber
  //  nextEffect 下一个副作用 fiber
  // lastEffect 最后一个副作用 fiber

  if (last != null) {
    // 链表已经存在
    last.nextEffect = childToDelete;
    returnFiber.lastEffect = childToDelete;
  } else {
    returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
  }

  childToDelete.nextEffect = null;
  childToDelete.flags = Deletion;
}

// 协调
// 没有考虑数组
//  1 2 3 4
//  2 3 4
function reconcileChildren(workInProgress, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];
  let previousNewFiber = null;
  // oldFiber初始值是老fiber链表的头结点
  let oldFiber = workInProgress.alternate && workInProgress.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    let same =
      child &&
      oldFiber &&
      // child.key === oldFiber.key &&
      child.type === oldFiber.type;
    let newFiber;
    if (same) {
      // 节点复用
      // 更新
      newFiber = {
        type: child.type,
        props: {...child.props},
        stateNode: oldFiber.stateNode,
        child: null,
        sibling: null,
        return: workInProgress,
        alternate: oldFiber,
        flags: Update,
      };
    }
    if (!same && child) {
      // 插入
      newFiber = {
        type: child.type,
        props: {...child.props},
        stateNode: null,
        child: null,
        sibling: null,
        return: workInProgress,
        alternate: null,
        flags: Placement,
      };
    }
    if (!same && oldFiber) {
      // 删除
      // ? 提示: oldFiber.flags =DELETIOIN
      // 标记子节点也要删除
      deleteChild(workInProgress, oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

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

  if (isStringOrNumber(type)) {
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
  currentRoot = wipRoot;
  wipRoot = null;
}

function handleEffect(workInProgress) {
  if (!workInProgress.firstEffect) {
    return;
  }

  let effect = workInProgress.firstEffect;

  while (effect) {
    if (effect.flags & Deletion) {
      // 删除节点
      // parentNode.removeChild(childNode)
      if (effect.stateNode) {
        getParentNode(effect).removeChild(effect.stateNode);
      }
    }
    effect = effect.nextEffect;
  }
}

// 根据fiber节点获取父dom
function getParentNode(workInProgress) {
  let parentNodeFiber = workInProgress.return;

  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }
  let parentNode = parentNodeFiber.stateNode;
  return parentNode;
}

// vnode->node
function commitWorker(workInProgress) {
  if (!workInProgress) {
    return;
  }

  // 1. 提交自己
  let parentNode = getParentNode(workInProgress);

  // 更新有dom节点的fiber，因为有些fiber没有dom节点（func、class、fragment、Provider、Consumer等）
  if (workInProgress.flags & Placement && workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  } else if (workInProgress.flags & Update && workInProgress.stateNode) {
    // 老节点属性 {id:'_id', className:'red'}
    // 新节点属性 {className:'green'}
    updateNode(
      workInProgress.stateNode,
      workInProgress.alternate.props,
      workInProgress.props
    );
  }

  handleEffect(workInProgress);

  // 2. 提交子节点
  commitWorker(workInProgress.child);
  // 3. 提交兄弟
  commitWorker(workInProgress.sibling);
}

// 当前正在渲染的fiber节点
let currentlyRenderingFiber = null;
// 当前正在执行的hook
let workInProgressHook = null;

export function useState(initalState) {
  let hook; // 当前的hook

  if (currentlyRenderingFiber.alternate) {
    // 更新阶段
    currentlyRenderingFiber.memoizedState =
      currentlyRenderingFiber.alternate.memoizedState;

    if (workInProgressHook) {
      // 证明不是头结点，存在上一个hook的后面就行了
      hook = workInProgressHook = workInProgressHook.next;
    } else {
      // 证明是头结点hook
      hook = workInProgressHook = currentlyRenderingFiber.memoizedState;
    }
  } else {
    // 初次渲染
    hook = {
      memoizedState: initalState, //初始状态
      queue: [],
      next: null,
    };

    // useState->useState->
    // fiber.memoizedState上村的是一个hook链表的头结点
    // 1-》2-》3
    if (workInProgressHook) {
      // 证明不是头结点hook
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // 证明当前是头结点hook
      // memoizedState上存的就是hook链表
      currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
    }
  }

  // 初次渲染还是更新阶段

  // hook = {
  //   memoizedState: newState || initalState , //状态
  //   queue: [],
  //   next: null,
  // };

  // 函数组件和类组件的state的更新都是批量更新
  // ! hook里的memoizedState是状态值
  // ! fiber上的memoizedState是hook链表的头结点
  // 模拟批量更新
  hook.queue.forEach((action) => (hook.memoizedState = action));

  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      type: currentRoot.type,
      stateNode: currentRoot.stateNode,
      props: currentRoot.props,
      alternate: currentRoot,
    };

    nextUnitOfWork = wipRoot;
  };

  // todo 返回最新的状态值和setState
  return [hook.memoizedState, setState];
}

export default {render};

// vnode  虚拟dom节点
// node dom节点

import {Deletion, Placement, Update} from "./const";

// work in progress root fiber
let wipRoot = null;
let currentRoot = null;

function render(vnode, container) {
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

function isStringOrNumber(sth) {
  return typeof sth === "string" || typeof sth === "number";
}

// vnode->node
function createNode(workInProgress) {
  // todo 生成node
  const {type} = workInProgress;
  const node = document.createElement(type);
  updateNode(node, {}, workInProgress.props);
  return node;
}
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

// 原生标签的初次渲染、更新
function updateHostComponent(workInProgress) {
  const {type, props} = workInProgress;

  // 处理自己属性
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }

  // 协调子节点
  reconcileChildren(workInProgress, props.children);
}

// 文本
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 类组件
// 先实例化 再执行render函数
function updateClassComponent(workInProgress) {
  const {type, props} = workInProgress;
  const instance = new type(props);
  const child = instance.render();
  reconcileChildren(workInProgress, child);
}

// 直接执行函数
function updateFunctionComponent(workInProgress) {
  // 初始化
  currentlyRenderingFiber = workInProgress;
  currentlyRenderingFiber.memoizedState = null;
  workInProgressHook = null;
  //
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

function deleteChild(returnFiber, childToDelete) {
  // todo
  // ! 1. 把childToDelete加到returnFiber的删除链表上
  // fiber->childToDelete0->childToDelete1->childToDelete2->childToDelete3
  // fiber.firstEffect（childToDelete0）-(nextEffect)->childToDelete1-(nextEffect)->childToDelete2
  // firstEffect 指代returnFiber的第一个要删除的子节点
  // nextEffect 指代下一个要删除的节点
  // lastEffect 指代最后一个要删除的子节点
  // 先获取最后一个要删除的子节点
  const last = returnFiber.lastEffect;

  if (last != null) {
    // 1->2->3->4
    // 证明最后一个子节点存在
    // ? 证明当前要删除的子节点的链表不为空
    last.nextEffect = childToDelete;
    returnFiber.lastEffect = childToDelete;
  } else {
    // ? 证明当前要删除的子节点的链表为空
    returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
  }

  // ! 2. 给childToDelete的子节点的副作用去掉
  childToDelete.lastEffect = null;

  // ! 3. 给childToDelete加上删除标记
  childToDelete.flags = Deletion;
}

// 1->2->4

// 1 2 3 4
// 2 3 4
function reconcileChildren(workInProgress, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  // children 是数组或者非数组
  const newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null; //记录上一个fiber
  let oldFiber = workInProgress.alternate && workInProgress.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i];
    let same =
      child &&
      oldFiber &&
      child.key === oldFiber.key &&
      child.type === oldFiber.type;
    let newFiber;
    if (same) {
      // 节点可以复用 更新节点
      newFiber = {
        type: child.type,
        key: child.key,
        props: {...child.props},
        child: null, // 第一个子fiber
        sibling: null,
        return: workInProgress,
        stateNode: oldFiber.stateNode,
        flags: Update,
        alternate: oldFiber,
      };
    }
    if (!same && child) {
      // 新增
      newFiber = {
        type: child.type,
        key: child.key,
        props: {...child.props},
        child: null, // 第一个子fiber
        sibling: null,
        return: workInProgress,
        stateNode: null,
        flags: Placement,
        alternate: null,
      };
    }
    if (!same && oldFiber) {
      // 删除 oldFiber,还要带上它的子节点，最后还要删除dom
      // todo
      deleteChild(workInProgress, oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

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
 * alternate 上一次的fiber
 */

function performUnitOfWork(workInProgress) {
  // 1. 处理当前的任务
  // todo
  const {type} = workInProgress;

  if (isStringOrNumber(type)) {
    // 原生标签
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    // 函数组件、类组件
    type.prototype.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress);
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
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

// commit
function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
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

function handleEffect(workInProgress) {
  if (!workInProgress.firstEffect) {
    return;
  }

  let effect = workInProgress.firstEffect;

  while (effect) {
    // 删除节点
    if (effect.stateNode) {
      // parentNode 父dom节点
      let parentNode = getParentNode(effect);
      parentNode.removeChild(effect.stateNode);
    }
    effect = effect.nextEffect;
  }
}

function commitWorker(workInProgress) {
  if (!workInProgress) {
    return;
  }
  // 1. 提交自己

  // 父dom节点
  let parentNode = getParentNode(workInProgress); //  workInProgress.return.stateNode;
  if (workInProgress.flags & Placement && workInProgress.stateNode) {
    // 插入
    parentNode.appendChild(workInProgress.stateNode);
  } else if (workInProgress.flags & Update && workInProgress.stateNode) {
    // 更新属性
    //老的 className = 'red'
    // 新的 props:{}
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

// fiber.memoizedState代表hook链表的头结点 hook
// hook.memoizedState代表状态值

/**
 * hook 数据结构 object
 * memoizedState 状态值
 * queue: [] 池塘
 * next 执向下一个hook
 */

//  当前正在工作的fiber 全局的
let currentlyRenderingFiber = null;
// 当前正在工作的hook
let workInProgressHook = null;

export function useState(initalState) {
  // 当前要用到的hook
  let hook;
  // 先取当前fiber，再获取fiber的最后一个hook
  // 判断是初次渲染还是更新
  if (currentlyRenderingFiber.alternate) {
    // 老的fiber存在，证明是更新阶段
    currentlyRenderingFiber.memoizedState =
      currentlyRenderingFiber.alternate.memoizedState;
    // 取老的hook
    if (workInProgressHook) {
      // 不是第一个hook
      hook = workInProgressHook = workInProgressHook.next;
    } else {
      // 这是第一个hook
      hook = workInProgressHook = currentlyRenderingFiber.memoizedState;
    }
  } else {
    // 初次渲染
    hook = {
      memoizedState: initalState,
      queue: [],
      next: null,
    };
    if (workInProgressHook) {
      // 不是第一个hook
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // 这是第一个hook
      currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
    }
  }

  // 状态值、修改状态值的函数
  // fiber.memoizedState->hook0->hook1->hook2(wipHook)
  // newfiber.memoizedState->hook0->hook1->hook2

  //模拟一下批量更新，其实就是把池塘的鱼全卖了
  // 0: {a: 0}
  // 1: {b: 1}
  hook.queue.forEach((action) => (hook.memoizedState = action));

  // 批量更新，其实就是养鱼的过程
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      type: currentRoot.type,
      stateNode: currentRoot.stateNode,
      props: {...currentRoot.props},
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
  };

  // todo
  return [hook.memoizedState, setState];
}

export default {render};

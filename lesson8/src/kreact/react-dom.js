import {TEXT, PLACEMENT, UPDATE, DELETION} from "./const";

// 下一个单元任务
let nextUnitOfWork = null;
// work in progress fiber root
let wipRoot = null;
// 现在的根节点
let currentRoot = null;

let deletions = null;

// fiber 结构
/**
 * child 第一个子元素
 * sibling 下一个兄弟节点
 * return 父节点
 * node 存储当前node节点
 */

function render(vnode, container) {
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    },
    base: currentRoot
  };
  nextUnitOfWork = wipRoot;
  deletions = [];
}

// vnode->node
// 生成node节点
function createNode(vnode) {
  const {type, props} = vnode;
  let node = null;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else {
    node = document.createDocumentFragment();
  }
  updateNode(node, {}, props);
  return node;
}

function reconcileChildren(workInProgressFiber, children) {
  //  构建fiber结构
  // 更新 删除 新增
  let prevSibling = null;
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null;
    const sameType = child && oldFiber && child.type === oldFiber.type;
    if (sameType) {
      // 类型相同 复用
      newFiber = {
        type: oldFiber.type,
        props: child.props,
        node: oldFiber.node,
        base: oldFiber,
        return: workInProgressFiber,
        effectTag: UPDATE
      };
    }
    if (!sameType && child) {
      // 类型不同 child存在 新增插入
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null,
        return: workInProgressFiber,
        effectTag: PLACEMENT
      };
    }
    if (!sameType && oldFiber) {
      // 删除
      oldFiber.effectTag = DELETION;
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // 形成链表结构
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      // i>0
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }
}

function updateNode(node, preVal, nextVal) {
  Object.keys(preVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // 简单处理 on开头当做事件
        let eventName = k.slice(2).toLowerCase();
        node.removeEventListener(eventName, preVal[k]);
      } else {
        if (!(k in nextVal)) {
          node[k] = "";
        }
      }
    });

  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // 简单处理 on开头当做事件
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  wipFiber.hooks = [];
  hookIndex = 0;
  const {type, props} = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

function updateClassComponent(fiber) {
  const {type, props} = fiber;
  const cmp = new type(props);
  const children = [cmp.render(props)];
  reconcileChildren(fiber, children);
}

function performUnitOfWork(fiber) {
  // 1. 执行当前任务
  // 执行当前任务
  const {type} = fiber;
  if (typeof type === "function") {
    type.isReactComponent
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

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  // todo reconcileChildren
  const {children} = fiber.props;
  reconcileChildren(fiber, children);
}

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
  deletions.forEach(commitWorker);
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // 向上查找
  let parentNodeFiber = fiber.return;
  while (
    !parentNodeFiber.node ||
    parentNodeFiber.node.toString() === "[object DocumentFragment]"
  ) {
    parentNodeFiber = parentNodeFiber.return;
  }

  const parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
    updateNode(fiber.node, fiber.base.props, fiber.props);
  } else if (fiber.effectTag === DELETION && fiber.node !== null) {
    commitDeletions(fiber, parentNode);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

function commitDeletions(fiber, parentNode) {
  if (fiber.node) {
    parentNode.removeChild(fiber.node);
  } else {
    commitDeletions(fiber.child, parentNode);
  }
}

// !hook 实现
// 当前正在工作的fiber
let wipFiber = null;
let hookIndex = null;
export function useState(init) {
  const oldHook = wipFiber.base && wipFiber.base.hooks[hookIndex];
  const hook = {state: oldHook ? oldHook.state : init, queue: []};
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => (hook.state = action));
  const setState = action => {
    hook.queue.push(action);
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

export default {
  render
};

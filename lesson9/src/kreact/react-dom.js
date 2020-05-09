import {TEXT, PLACEMENT} from "./const";

// 下一个子任务 fiber
let nextUnitOfWork = null;
//  work in progress fiber root
let wipRoot = null;

// fiber结构
/**
 * child
 * sibling
 * return
 * node dom节点
 * base 存储当前节点的上一次的fiber
 */

function render(vnode, container) {
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    },
    base: null
  };
  console.log("wipRoot", wipRoot); //sy-log
  nextUnitOfWork = wipRoot;
}

function createNode(fiber) {
  const {type, props} = fiber;
  let node = null;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  }
  // else {
  //   node = document.createDocumentFragment();
  // }
  updateNode(node, props);
  return node;
}

function updateNode(node, nextVal) {
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

function reconcileChildren(workInProgressFiber, children) {
  // 给children构建fiber架构
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  let prevSibling = null;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null;
    const sameType = child && newFiber && child.type === oldFiber.type;
    if (sameType) {
      // todo 类型相同 复用
    }
    if (!sameType && child) {
      // 类型不同 child存在  新增插入
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
      // todo 删除
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      // i>0
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }

  // 基本构建完成 done
}

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const {children} = fiber.props;
  reconcileChildren(fiber, children);
}

function updateFunctionComponent(fiber) {
  const {type, props} = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

function updateClassComponent(fiber) {
  const {type, props} = fiber;
  const cmp = new type(props);
  const children = [cmp.render()];
  reconcileChildren(fiber, children);
}

function peformUnitOfWork(fiber) {
  // 1. 执行当前任务
  const {type} = fiber;
  if (typeof type === "function") {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // 原生标签
    updateHostComponent(fiber);
  }

  // 2. 返回下一个任务
  // 找到下一个任务 得有原则
  // 原则就是：先找子元素
  if (fiber.child) {
    return fiber.child;
  }
  // 原则2： 如没有子元素，寻找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function workLoop(deadline) {
  // 查找下一个任务，并且当前帧没有结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    // 当前有任务
    nextUnitOfWork = peformUnitOfWork(nextUnitOfWork);
  }

  // 所有任务执行完成
  // todo commit
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// ! commit 阶段
function commitRoot() {
  console.log("commitRoot"); //sy-log
  commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // parentNodeFiber 指的是当前fiber的有node节点的父fiber或者祖先
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }

  // parentNode是指分fiber的父node（当前fiber的父fiber可能没有node吗）
  const parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {
  render
};

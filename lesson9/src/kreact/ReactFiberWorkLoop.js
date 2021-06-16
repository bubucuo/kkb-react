import {
  isArray,
  isFn,
  isStr,
  Placement,
  Update,
  updateNode,
  HookPassive,
} from "./utils";
import {
  updateHostComponent,
  updateFunctionComponent,
  updateFragmentComponent,
} from "./ReactFiberReconciler";
import {scheduleCallback, shouldYield} from "./scheduler";

// wip work in progress 当前正在工作中的fiber
// 根节点更新
let wipRoot = null;
// 下一个要更新的fiber节点
let nextUnitOfWork = null;

export function scheduleUpdateOnFiber(fiber) {
  // fiber.alternate = {...fiber};
  wipRoot = fiber;
  wipRoot.sibling = null;
  nextUnitOfWork = wipRoot;
  scheduleCallback(workLoop);
}

function performUnitOfwWork(wip) {
  // 1. 更新自己
  // 判断节点类型，因为不同的节点更新方式不一样
  const {type} = wip;
  if (isFn(type)) {
    //类组件或者函数组件
    // todo 区分函数组件和类组件
    updateFunctionComponent(wip);
  } else if (isStr(type)) {
    // 原生标签
    updateHostComponent(wip);
  } else {
    updateFragmentComponent(wip);
  }

  // 2. 返回下一个要更新的任务
  // 深度优先遍历（王朝的故事）
  if (wip.child) {
    return wip.child;
  }
  while (wip) {
    if (wip.sibling) {
      return wip.sibling;
    }
    wip = wip.return;
  }
  return null;
}
function workLoop() {
  while (nextUnitOfWork && !shouldYield()) {
    // 有要更新的fiber任务，并且浏览器有空闲时间
    nextUnitOfWork = performUnitOfwWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    // todo
    commitRoot();
  }
}

// requestIdleCallback(workLoop);

// commit
function commitRoot() {
  // 初次渲染
  isFn(wipRoot.type) ? commitWorker(wipRoot) : commitWorker(wipRoot.child);
}

function getParentNode(fiber) {
  let tem = {...fiber};
  while (tem) {
    if (tem.return.stateNode) {
      return tem.return.stateNode;
    }
    tem = tem.return;
  }

  return null;
}

function invokeHooks(wip) {
  const {hookFlags, updateQueue} = wip;

  let passiveQueue = [];

  if (isArray(updateQueue)) {
    for (let i = 0; i < updateQueue.length; i++) {
      const effect = updateQueue[i];
      if (hookFlags & HookPassive) {
        // useeffect
        passiveQueue.push(effect);
      } else {
        // layout
        effect.create();
      }
    }

    for (let i = 0; i < passiveQueue.length; i++) {
      const effect = passiveQueue[i];
      scheduleCallback(() => {
        effect.create();
      });
    }
  }
}

function commitWorker(wip) {
  if (!wip) {
    return;
  }

  const {type, stateNode, flags} = wip;
  if (isFn(type)) {
    invokeHooks(wip);
  }
  // parentNode是wip的父或者祖先dom节点
  const parentNode = getParentNode(wip);
  // 1. commit self
  // todo deletion update
  // placement
  // if (stateNode && flags & Placement) {
  //   parentNode.appendChild(wip.stateNode);
  // }

  if (stateNode && flags & Placement) {
    let hasSiblingNode = foundSiblingNode(wip, parentNode);
    // console.log("hasSiblingNode", hasSiblingNode); //sy-log
    if (hasSiblingNode) {
      parentNode.insertBefore(stateNode, hasSiblingNode);
    } else {
      parentNode.appendChild(wip.stateNode);
    }
  }

  if (stateNode && flags & Update) {
    //复用vnode和node，
    updateNode(stateNode, wip.alternate.props, wip.props);
  }

  if (wip.deletoins) {
    commitDeletoins(wip.deletoins, stateNode || parentNode);
    wip.deletoins = null;
  }

  // 2. commit child
  commitWorker(wip.child);
  // 3. commit sibling
  commitWorker(wip.sibling);
}

function foundSiblingNode(fiber, parentNode) {
  let siblingHasNode = fiber.sibling;
  let node = null;
  while (siblingHasNode) {
    node = siblingHasNode.stateNode;
    if (node && parentNode.contains(node)) {
      return node;
    }
    siblingHasNode = siblingHasNode.sibling;
  }

  return null;
}

function commitDeletoins(deletoins, parentNode) {
  for (let i = 0; i < deletoins.length; i++) {
    const deletion = deletoins[i];
    parentNode.removeChild(getStateNode(deletion));
  }
}

function getStateNode(fiber) {
  let tem = fiber;
  while (!tem.stateNode) {
    tem = tem.child;
  }
  return tem.stateNode;
}

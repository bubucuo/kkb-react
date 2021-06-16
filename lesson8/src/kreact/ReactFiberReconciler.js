import {createFiber} from "./fiber";
import {renderHooks} from "./hooks";
import {isStringOrNumber, Update, updateNode} from "./utils";

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    // 更新属性
    updateNode(wip.stateNode, {}, wip.props);
  }
  // 协调子节点
  reconcileChildren(wip, wip.props.children);
}

// 函数组件
export function updateFunctionComponent(wip) {
  renderHooks(wip);

  const {type, props} = wip;
  const children = type(props);

  // 协调子节点
  reconcileChildren(wip, children);
}

export function updateFragmentComponent(wip) {
  // 协调子节点
  reconcileChildren(wip, wip.props.children);
}

// 协调子节点
// diff
// 1 2 3 4
// 2 3 4
function reconcileChildren(returnFiber, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null;
  // 老节点的头结点
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, returnFiber);
    const same = sameNode(oldFiber, newFiber);
    if (same) {
      // 更新
      Object.assign(newFiber, {
        alternate: oldFiber, // 老节点
        stateNode: oldFiber.stateNode, // dom节点
        flags: Update, // fiber标记更新
      });
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}

// 同一个节点， 调用前提是同一个层级下
// className='red blue'
// className='red green'
function sameNode(a, b) {
  return !!(a && b && a.key === b.key && a.type === b.type);
}

import {createFiber} from "./fiber";
import {renderHooks} from "./hooks";
import {isArray, isStr, isStringOrNumber, Update, updateNode} from "./utils";

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    updateNode(wip.stateNode, {}, wip.props);
  }

  reconcileChildren(wip, wip.props.children);
  // console.log("wip", wip); //sy-log
}

//函数组件
export function updateFunctionComponent(wip) {
  renderHooks(wip);

  const {type, props} = wip;
  const child = type(props);
  reconcileChildren(wip, child);
}

export function updateFragmentComponent(wip) {
  reconcileChildren(wip, wip.props.children);
}

function reconcileChildren(returnFiber, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = isArray(children) ? children : [children];

  let previousNewFiber = null;
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, returnFiber);
    const same = sameNode(newChild, oldFiber);
    if (same) {
      // update
      Object.assign(newFiber, {
        alternate: oldFiber,
        stateNode: oldFiber.stateNode,
        flags: Update,
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

export function sameNode(a, b) {
  return !!(a && b && a.key === b.key && a.type === b.type);
}

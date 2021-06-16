import {createFiber} from "./fiber";
import {isArray, isStr, updateNode} from "./utils";

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    updateNode(wip.stateNode, wip.props);
  }

  reconcileChildren(wip, wip.props.children);
  // console.log("wip", wip); //sy-log
}

//函数组件
export function updateFunctionComponent(wip) {
  const {type, props} = wip;
  const child = type(props);
  reconcileChildren(wip, child);
}

export function updateFragmentComponent(wip) {
  reconcileChildren(wip, wip.props.children);
}

function reconcileChildren(returnFiber, children) {
  if (isStr(children)) {
    return;
  }

  const newChildren = isArray(children) ? children : [children];

  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i];
    const newFiber = createFiber(child, returnFiber);

    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}

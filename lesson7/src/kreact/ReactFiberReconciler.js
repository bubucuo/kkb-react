import {createFiber} from "./fiber";
import {isStr, updateNode} from "./utils";

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    // 更新属性
    updateNode(wip.stateNode, wip.props);
  }

  reconcileChildren(wip, wip.props.children);
  console.log("wip", wip); //sy-log
}

// 函数组件
export function updateFunctionComponent(wip) {
  const {type, props} = wip;
  const children = type(props);
  reconcileChildren(wip, children);
}

export function updateFragmentComponent(wip) {
  reconcileChildren(wip, wip.props.children);
}

// 协调子节点
// diff
function reconcileChildren(returnFiber, children) {
  if (isStr(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null;
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, returnFiber);

    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber;
  }
}

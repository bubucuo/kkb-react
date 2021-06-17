import {renderHooks} from "./hooks";
import {reconcileChildren} from "./ReactChildFiber";
import {updateNode} from "./utils";

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

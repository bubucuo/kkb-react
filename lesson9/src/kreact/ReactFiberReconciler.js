import {renderHooks} from "./hooks";
import {updateNode} from "./utils";
import {reconcileChildren} from "./ReactChildFiber";

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

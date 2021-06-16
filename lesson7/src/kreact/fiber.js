import {Placement} from "./utils";
/**
 * fiber （vnode）
 * type 类型
 * key 标记当前层级下的唯一性
 * props 属性值
 * child 第一个子节点（fiber）
 * return 父节点（fiber）
 * sibling 下一个兄弟节点（fiber）
 * flags 标记当前节点类型（比如插入、更新、删除等）
 * stateNode 原生标签时候，指向dom节点，（类组件时候指向实例）
 */

export function createFiber(vnode, returnFiber) {
  const newFiber = {
    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
    child: null,
    sibling: null,
    return: returnFiber,
    flags: Placement,
    stateNode: null,
  };
  return newFiber;
}

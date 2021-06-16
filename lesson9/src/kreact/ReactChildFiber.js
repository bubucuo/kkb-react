import {createFiber} from "./fiber";
import {
  isArray,
  isStr,
  isStringOrNumber,
  Update,
  updateNode,
  Placement,
} from "./utils";

function placeChild(
  newFiber,
  lastPlacedIndex,
  newIndex,
  shouldTrackSideEffects // 初次渲染（false）还是更新（true）
) {
  newFiber.index = newIndex;
  if (!shouldTrackSideEffects) {
    return lastPlacedIndex;
  }
  const current = newFiber.alternate;

  if (current) {
    const oldIndex = current.index;
    if (oldIndex < lastPlacedIndex) {
      // move
      newFiber.flags = Placement;
      return lastPlacedIndex;
    } else {
      return oldIndex;
    }
  } else {
    newFiber.flags = Placement;
    return lastPlacedIndex;
  }
}

// 删除单个节点
function deleteChild(returnFiber, childToDelete) {
  // returnFiber.deletoins = [...]
  const deletoins = returnFiber.deletoins;
  if (deletoins) {
    returnFiber.deletoins.push(childToDelete);
  } else {
    returnFiber.deletoins = [childToDelete];
  }
}

// 删除节点链表,头结点是currentFirstChild
function deleteRemainingChildren(returnFiber, currentFirstChild) {
  let childToDelete = currentFirstChild;
  while (childToDelete) {
    deleteChild(returnFiber, childToDelete);
    childToDelete = childToDelete.sibling;
  }
}

function mapRemainingChildren(currentFirstChild) {
  const existingChildren = new Map();
  let existingChild = currentFirstChild;
  while (existingChild) {
    existingChildren.set(
      existingChild.key || existingChild.index,
      existingChild
    );
    existingChild = existingChild.sibling;
  }
  return existingChildren;
}

// old 1 2 3 4
// new 2 3 4
export function reconcileChildren(returnFiber, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const shouldTrackSideEffects = !!returnFiber.alternate;

  const newChildren = isArray(children) ? children : [children];

  let previousNewFiber = null;
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
  let nextOldFiber = null; // 记录下一个oldFiber节点
  // 记录遍历newChildren的下标
  let newIndex = 0;
  let lastPlacedIndex = 0;

  // ! 1. 更新阶段，找到能复用的节点，如果不能复用，则停止这轮循环
  for (; oldFiber && newIndex < newChildren.length; newIndex++) {
    const newChild = newChildren[newIndex];
    if (newChild === null) {
      continue;
    }
    if (oldFiber.index > newIndex) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFiber = oldFiber.sibling;
    }

    const same = sameNode(newChild, oldFiber);

    if (!same) {
      if (oldFiber === null) {
        oldFiber = nextOldFiber;
      }

      break;
    }

    const newFiber = createFiber(newChild, returnFiber);
    Object.assign(newFiber, {
      alternate: oldFiber,
      stateNode: oldFiber.stateNode,
      flags: Update,
    });

    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    );

    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
    oldFiber = nextOldFiber;
  }

  // ! 2.检验newChildren是否到头，如果newChildren已经遍历完，那么就把剩下的oldFiber链表删除就行了
  if (newIndex === newChildren.length) {
    deleteRemainingChildren(returnFiber, oldFiber);
    return;
  }

  // !3.
  // 1). 初次渲染
  // 2). oldFiber已经为null，也就意味着老fiber链表已经被复用完成，但是新的Children还有fiber要生成，就只能新增插入了
  if (!oldFiber) {
    for (; newIndex < newChildren.length; newIndex++) {
      const newChild = newChildren[newIndex];
      if (newChild === null) {
        continue;
      }
      const newFiber = createFiber(newChild, returnFiber);
      lastPlacedIndex = placeChild(
        newFiber,
        lastPlacedIndex,
        newIndex,
        shouldTrackSideEffects
      );

      if (previousNewFiber === null) {
        returnFiber.child = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
    }
    return;
  }

  // !4.同时遍历新子节点数组和老链表，能复用的节点就复用，没法复用的老节点删除，新节点新增插入
  // old 1：{} 2:{} 3:{} 4:{} (查找、删除)
  // new 2 4 5
  const existingChildren = mapRemainingChildren(oldFiber);
  for (; newIndex < newChildren.length; newIndex++) {
    const newChild = newChildren[newIndex];
    if (newChild === null) {
      continue;
    }
    const newFiber = createFiber(newChild, returnFiber);
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    );

    // 从老链表上找能复用的节点
    let matchedFiber = existingChildren.get(newFiber.key || newFiber.index);
    if (matchedFiber) {
      // 找到能复用的节点
      existingChildren.delete(newFiber.key || newFiber.index);
      Object.assign(newFiber, {
        alternate: matchedFiber,
        stateNode: matchedFiber.stateNode,
        flags: Update,
      });
    }

    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }

  if (shouldTrackSideEffects) {
    existingChildren.forEach((child) => deleteChild(returnFiber, child));
  }
}

export function sameNode(a, b) {
  return !!(a && b && a.key === b.key && a.type === b.type);
}

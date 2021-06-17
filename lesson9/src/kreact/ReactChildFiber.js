import {createFiber} from "./fiber";
import {Deletion, isStringOrNumber, Placement, Update} from "./utils";

// parentNode.removeChild(childNode)
function deleteChild(returnFiber, childToDelete) {
  childToDelete.flags = Deletion;
  if (returnFiber.deletions) {
    returnFiber.deletions.push(childToDelete);
  } else {
    returnFiber.deletions = [childToDelete];
  }
}

// 12345
// 12
// 删除节点链表,头结点是currentFirstChild
function deleteRemainingChildren(returnFiber, currentFirstChild) {
  let childToDelete = currentFirstChild;
  while (childToDelete) {
    deleteChild(returnFiber, childToDelete);
    childToDelete = childToDelete.sibling;
  }
}

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

// key value
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

// 协调子节点
// diff
// old 链表 1 2 3 4
// new 数组 2 3 4
export function reconcileChildren(returnFiber, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const shouldTrackSideEffects = !!returnFiber.alternate;
  const newChildren = Array.isArray(children) ? children : [children];

  let previousNewFiber = null;
  // 老节点的头结点
  let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
  // 记录下一个oldFiber
  let nextOldFiber = null;

  let newIndex = 0;
  // 记录上次插入位置
  let lastPlacedIndex = 0;
  // *1找第一个能复用的节点，并往后，只要相对位置没有发生变化，就继续往后复用，否则跳出这个循环
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

  // *2. newChildren只有2个节点，已经遍历完了
  // 1 2 3 4 5
  // 1 2
  if (newChildren.length <= newIndex) {
    deleteRemainingChildren(returnFiber, oldFiber);
    return;
  }

  // *3. oldFiber没了，但是newChildren还有
  // 12
  // 123456789
  if (!oldFiber) {
    for (; newIndex < newChildren.length; newIndex++) {
      const newChild = newChildren[newIndex];
      if (newChild == null) {
        continue;
      }
      const newFiber = createFiber(newChild, returnFiber);
      const same = sameNode(oldFiber, newFiber);
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

  //*4.
  // old 1 234
  // new 1 538
  // 24 -》map

  const existingChildren = mapRemainingChildren(oldFiber); //234map
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

// 同一个节点， 调用前提是同一个层级下
// className='red blue'
// className='red green'
function sameNode(a, b) {
  return !!(a && b && a.key === b.key && a.type === b.type);
}

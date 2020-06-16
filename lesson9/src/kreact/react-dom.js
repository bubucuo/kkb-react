import {TEXT, PLACEMENT} from "./const";

// 下一个任务 fiber
let nextUnitOfWork = null;

// work in progress
let wipRoot = null;

// 当前根节点
let currentRoot = null;

function render(vnode, container) {
  // console.log("vnode", vnode, container); //sy-log
  // vnode->node
  // const node = createNode(vnode, container);
  // container.appendChild(node);

  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    },
    base: currentRoot
  };
  nextUnitOfWork = wipRoot;
}

// vnode->node 这个过程还要处理属性
function createNode(vnode, parentNode) {
  let node = null;
  // todo
  const {type, props} = vnode;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    node = type.isReactComponent
      ? updateClassComponent(vnode, parentNode)
      : updateFunctionComponent(vnode, parentNode);
  } else {
    node = document.createDocumentFragment();
  }
  // reconcileChildren(props.children, node);
  updateNode(node, props);
  return node;
}

function updateFunctionComponent(fiber) {
  const {type, props} = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

function updateClassComponent(fiber) {
  const {type, props} = fiber;
  let cmp = new type(props);
  let vvnode = cmp.render();
  const children = [vvnode];
  reconcileChildren(fiber, children);
}

// 真实dom节点属性添加
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // ! 这里不是源码重点中的实现逻辑
        let evenetName = k.slice(2).toLowerCase();
        node.addEventListener(evenetName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function reconcileChildren_old(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // vnode->node
    // container.appendChild(node);
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(child, node);
    }
  }
}
// workInProgressFiber父fiber，children是个数组，
// 这个函数就是给workInProgressFiber添加child，再给child构建sibling，形成一个链表
let prevSilbling = null;

function reconcileChildren(workInProgressFiber, children) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null,
      return: workInProgressFiber,
      effectTag: PLACEMENT
    };
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      prevSilbling.sibling = newFiber;
    }
    prevSilbling = newFiber;
  }
}

function updateHostComponent(fiber) {
  // todo  fiber结构
  // 1. 构建当前fiber，添加节点属性
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }

  // 2. 协调子元素，构建子元素的fiber架构
  const {children} = fiber.props;
  reconcileChildren(fiber, children);

  console.log("fiber", fiber); //sy-log
}

function performUnitOfWork(fiber) {
  // 1.执行当前任务
  const {type} = fiber;
  if (typeof type === "function") {
    // todo
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // h5标签
    updateHostComponent(fiber);
  }

  // 2. 返回下一个任务
  // 返回下一个任务原则： 1). 有子元素返回子元素
  if (fiber.child) {
    return fiber.child;
  }
  // 2) 如果没有子元素，找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    // 执行下一个任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWorker(fiber) {
  // 因为 当前fiber是个链表， 后面执行自己调用自己commitWorker，加个出口，不然会死循环
  if (!fiber) {
    return;
  }
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }
  let parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  }
  // todo 删除 更新
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {render};

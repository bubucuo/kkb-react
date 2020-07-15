import {TEXT, PLACEMENT} from "./const";

// vnode虚拟dom
// node真实dom节点

// fiber
// {
// type, //标记fiber节点类型
// props, //属性值
//   child, //第一个子元素
//   sibling, //下一个兄弟元素
//   return, //父节点
//   node,//当前节点的真实dom对象
//   base//存储旧的fiber

// }

// 下一个单元任务
let nextUnitOfWork = null;
// work in progress fiber root
let wipRoot = null;

// 把vnode变成node，然后把node插入到父容器中
function render(vnode, container) {
  // vnode->node
  // const node = createNode(vnode);
  // container.appendChild(node);

  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    }
  };

  nextUnitOfWork = wipRoot;
}

// 根据传入的vnode，返回node
function createNode(vnode) {
  const {type, props} = vnode;
  let node;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  }
  //  else if (typeof type === "function") {
  //   // 函数组件 、类组件都走这里
  //   node = type.isReactComponent
  //     ? updateClassComponent(vnode)
  //     : updateFunctionComponent(vnode);
  // }
  else {
    // 源码当中没有创建节点，我这里简单处理了
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
  // const {type, props} = vnode;
  // const cmp = new type(props);
  // const vvnode = cmp.render();
  // const node = createNode(vvnode);
  // return node;
}

// 协调子节点
function reconcileChildren(workInProgressFiber, children) {
  let prevSibling = null;
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
    // 形成链表结构
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      // 上一次fiber的sibling指向这次的fiber
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function updateHostComponent(fiber) {
  //
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }

  // 协调
  const {children} = fiber.props;
  reconcileChildren(fiber, children);

  console.log("fiber----", fiber); //sy-log
}

function performUnitOfWork(fiber) {
  // 1. 执行当前任务
  const {type} = fiber;
  if (typeof type === "function") {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // 2. 返回下一个单元任务
  if (fiber.child) {
    return fiber.child;
  }

  // 没有子元素， 寻找兄弟
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}
function workLoop(deadline) {
  // 有下一个任务，并且当前帧还没有结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    // commit
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// 提交
function commitRoot() {
  commitWorker(wipRoot.child);
  // 因为这里处于循环，提交完之后就要设置为null，否则会一直提交
  wipRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  let parentNodeFiber = fiber.return;
  // 向上查找有node的(祖)父级别，因为有的fiber没有node节点，如Provider、Consumer等
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }

  const parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {render};

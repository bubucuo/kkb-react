import {TEXT, PLACEMENT} from "./const";

// 下一个单元任务  fiber
let nextUnitOfWork = null;
// work in progress fiber root （正在执行的根fiber）
let wipRoot = null;

/**
 * fiber架构
 * type: 标记类型
 * key: 标记当前层级下的唯一性
 * child : 第一个子元素 fiber
 * sibling ： 下一个兄弟元素 fiber
 * return： 父fiber
 * node： 真实dom节点
 * props：属性值
 * base: 上次的节点 fiber
 * effectTag: 标记要执行的操作类型（删除、插入、更新）
 */

// ! vnode  虚拟dom对象
// ! node  真实dom

function render(vnode, container) {
  // // vnode->node
  // const node = createNode(vnode);
  // // 再把node插入container
  // container.appendChild(node);
  // console.log("vnode", vnode, container); //sy-log

  // 初始值
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    }
  };
  nextUnitOfWork = wipRoot;
}

// 创建node
function createNode(vnode) {
  const {type, props} = vnode;
  let node = null;
  // 判断节点类型
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // 判断是函数组件还是类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = document.createDocumentFragment();
  }

  // 把props.children遍历，转成真实dom节点 ，再插入node
  // reconcileChildren(props.children, node);
  // 更新属性节点
  updateNode(node, props);
  return node;
}

// 类组件
function updateClassComponent(vnode) {
  const {type, props} = vnode;
  let cmp = new type(props);
  const vvnode = cmp.render();
  // 生成node节点
  const node = createNode(vvnode);
  return node;
}

// 函数组件
function updateFunctionComponent(fiber) {
  const {type, props} = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

// 更新属性值，如className、nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      node[k] = nextVal[k];
    });
}

// ! 源码childrne可以是单个对象或者是数组，我们这里统一处理成了数组（在createElement里）
function reconcileChildren_old(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(child, node);
    }
  }
}

// workInProgressFiber Fiber ->child->sibling
// children 数组
function reconcileChildren(workInProgressFiber, children) {
  // 构建fiber架构
  let prevSlibling = null;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // 现在只考虑初次渲染
    // 创建一个新的fiber
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null,
      return: workInProgressFiber,
      effectTag: PLACEMENT
    };
    // 形成一个链表结构
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      prevSlibling.sibling = newFiber;
    }
    prevSlibling = newFiber;
  }
}

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  // 协调子元素
  const {children} = fiber.props;
  reconcileChildren(fiber, children);
  // console.log("fiber-----", fiber); //sy-log
}

function performUnitOfWork(fiber) {
  //执行当前任务 更新当前fiber节点
  const {type} = fiber;
  if (typeof type === "function") {
    // class function
    type.prototype.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // 原生标签
    updateHostComponent(fiber);
  }

  //获取下一个子任务（fiber）
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    // 找到兄弟
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 没有兄弟 往祖先上找
    nextFiber = nextFiber.return;
  }
}

function workLoop(deadline) {
  // 有下一个任务 并且当前帧没有结束
  // 这里的时间是模拟，源码当中用的过期时间，源码中的过期时间和时间单位相关内
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    //执行当前任务
    //获取下一个子任务（fiber）
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // 提交
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// ! 提交

function commitRoot() {
  commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // 找到parentNode,
  // 找到最近的有node节点的祖先fiber
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }

  const parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    // 新增插入（dom父子关系插入）
    parentNode.appendChild(fiber.node);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default {render};

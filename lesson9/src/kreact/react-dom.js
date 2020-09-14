import {TEXT, PLACEMENT, UPDATE, DELETION} from "./const";

// ! vnode、vvnode 虚拟dom节点
// ! node 真实dom节点

// fiber的数据结构如下：
// type: 标记当前节点的类型;
// props: 属性;
// key: 标记唯一性;
// child: 第一个子节点;
// sibling: 下一个兄弟节点;
// return: 指向父节点
// node: 真实的dom节点
// base: 记录下当前的节点

// 下一个要执行的fiber，数据结构就是fiber
let nextUnitOfWork = null;
// work in propgress 正在进行中的 结构类型是fiber
let wipRoot = null;
// 当前的fiber
let currentRoot = null;
// 正在工作的fiber
let wipFiber = null;

let deletions = [];

function render(vnode, container) {
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    },
    base: currentRoot
  };

  nextUnitOfWork = wipRoot;
  deletions = [];

  // vnode->node
  // const node = createNode(vnode);
  // // 把node插入container
  // container.appendChild(node);
}

// 生成真实dom节点
function createNode(vnode) {
  let node = null;
  const {type, props} = vnode;

  if (type === TEXT) {
    //创建文本节点
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    // 证明是个html标签节点， 比如div、span
    node = document.createElement(type);
  }
  // else if (typeof type === "function") {
  //   // 类组件 或者函数组件

  //   node = type.isReactComponent
  //     ? updateClassComponent(vnode)
  //     : updateFunctionComponent(vnode);
  // } else {
  //   node = document.createDocumentFragment();
  // }

  // reconcileChildren(props.children, node);
  updateNode(node, {}, props);
  return node;
}

// 遍历下子节点-old
// function reconcileChildren(children, node) {
//   for (let i = 0; i < children.length; i++) {
//     let child = children[i];
//     // child是vnode，那需要把vnode->真实dom节点，然后插入父节点node中
//     render(child, node);
//   }
// }

// 协调子节点
// 1. 给workInProgress添加一个child节点，就是children的第一个子节点形成的fiber
// 2. 形成fiber架构，把children里节点遍历下，形成fiber链表状
function reconcileChildren(workInProgress, children) {
  let prevSibling = null;
  let oldFiber = workInProgress.base && workInProgress.base.child;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null;
    // 今天没有key值，先只判断type是否相等，下节课再加key
    const sameType = child && oldFiber && child.type === oldFiber.type;
    if (sameType) {
      // 节点可以复用
      newFiber = {
        type: child.type,
        props: child.props,
        node: oldFiber.node,
        base: oldFiber, // 记录一下现在的fiber，便于下次比较
        return: workInProgress,
        effectTag: UPDATE
      };

      console.log("000000---", newFiber); //sy-log
    }
    if (!sameType && child) {
      // 节点插入
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null,
        return: workInProgress,
        effectTag: PLACEMENT
      };
    }

    if (!sameType && oldFiber) {
      // 删除
      // todo

      oldFiber.effectTag = DELETION;
      deletions.push(oldFiber);
    }

    // ! 这么写是有很大的问题的(今天先不考虑顺序)
    // 1 2 3
    // 2 3 4
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (i === 0) {
      workInProgress.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
  }
}

// 添加节点属性
function updateNode(node, prevVal, nextVal) {
  Object.keys(prevVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // ! 瞎写一下
      // 只要是on开头，我就判断是事件
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, prevVal[k]);
      } else {
        if (!(k in nextVal)) {
          node[k] = "";
        }
      }
    });

  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // ! 瞎写一下
      // 只要是on开头，我就判断是事件
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function updateClassComponent(fiber) {
  const {type, props} = fiber;
  let cmp = new type(props);
  let vvnode = cmp.render();
  const children = [vvnode];
  reconcileChildren(fiber, children);
}

// ! 这是hook故事开始的地方
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  wipFiber.hooks = [];
  wipFiber.hooksIndex = 0;
  const {type, props} = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const {children} = fiber.props;
  reconcileChildren(fiber, children);
}

function performUnitOfWork(fiber) {
  // step1: 执行更新当前fiber
  // todo
  // sth
  const {type} = fiber;
  if (typeof type === "function") {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // 原生标签的
    updateHostComponent(fiber);
  }
  // step2: 并且返回下一个要执行的fiber
  // 原则就是：先看下有没子节点
  if (fiber.child) {
    return fiber.child;
  }
  // 如果没有子节点，找兄弟
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
    // 执行更新当前fiber，并且返回下一个要执行的fiber
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // 没有下一个任务了，执行提交
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function commitRoot() {
  deletions.forEach(commitWorker);
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // parentNode是跟fiber的离的最近的dom父或祖先节点
  // <Provider store={store}>
  //   <App />
  // </Provider>;
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }
  const parentNode = parentNodeFiber.node;
  // fiber有node节点
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
    updateNode(fiber.node, fiber.base.props, fiber.props);
  } else if (fiber.effectTag === DELETION && fiber.node !== null) {
    commitDeletions(fiber, parentNode);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

function commitDeletions(fiber, parentNode) {
  if (fiber.node) {
    parentNode.removeChild(fiber.node);
  } else {
    commitDeletions(fiber.child, parentNode);
  }
}

// // fiber里定义hook
// hook ={
//   state: 状态值,
//   queue: []
// }
export function useState(init) {
  // 上一次的hook（存在的话，证明现在是更新阶段）
  // hooksIndex标记了当前是几个
  const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hooksIndex];

  // 定义当前的hook函数
  const hook = {
    state: oldHook ? oldHook.state : init, //存储当前状态值
    queue: oldHook ? oldHook.queue : [] // 存储要更新的值
  };

  // 模拟批量更新
  hook.queue.forEach(action => (hook.state = action));

  const setState = action => {
    hook.queue.push(action);
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  // 把定义好的hook存入fiber，指向hook的游标往后移动一位
  wipFiber.hooks.push(hook);
  wipFiber.hooksIndex++;

  return [hook.state, setState];
}

export default {render};

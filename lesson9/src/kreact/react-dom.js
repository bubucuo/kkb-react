import {Placement, Update, Deletion} from "./const";

// vnode 虚拟dom节点
// node  真实dom节点

// fiber root,wip work in progress
let wipRoot = null; // fiber | null
let currentRoot = null;

function render(vnode, container) {
  wipRoot = {
    type: "div",
    props: {children: {...vnode}},
    stateNode: container
  };
  nextUnitOfWork = wipRoot;
}

function isStringOrNumber(sth) {
  return typeof sth === "string" || typeof sth === "number";
}
// 根据原生标签的fiber生成dom节点
function createNode(workInProgress) {
  const {type, props} = workInProgress;
  const node = document.createElement(type);
  updateNode(node, props);
  return node;
}

// 更新原生标签的，即根据原生标签的vnode生成node
function updateHostComponent(workInProgress) {
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }
  // todo 协调子节点
  reconcileChildren(workInProgress, workInProgress.props.children);
}

// 更新原生标签的属性，如className、href、id、（style、事件）等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    // .filter(k => k !== "children")
    .forEach(k => {
      if (k === "children") {
        // 有可能是文本
        if (isStringOrNumber(nextVal[k])) {
          node.textContent = nextVal[k] + "";
        }
      } else if (k.slice(0, 2) === "on") {
        // 简单粗暴山寨一下，源码当中会通过映射表检验是否是有效合成事件
        let eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

// 函数组件 执行函数
// 协调子节点
function updateFunctionComponent(workInProgress) {
  const {type, props} = workInProgress;
  const child = type(props);
  reconcileChildren(workInProgress, child);
}

// 类组件
// 先实例化 再执行render函数
function updateClassComponent(workInProgress) {
  const {type, props} = workInProgress;
  const instance = new type(props);
  const child = instance.render();
  reconcileChildren(workInProgress, child);
}

// 实现Fragment
function updateFragmentComponent(workInProgress) {
  reconcileChildren(workInProgress, workInProgress.props.children);
}

// 遍历子节点
function reconcileChildren(workInProgress, children) {
  if (isStringOrNumber(children)) {
    return;
  }

  const newChildren = Array.isArray(children) ? children : [children];

  // 记录上一个fiber
  let previousNewFiber = null;
  // 老的fiber的第一个子节点
  let oldFiber = workInProgress.alternate && workInProgress.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    let newFiber = null;
    let same =
      child &&
      oldFiber &&
      child.key === oldFiber.key &&
      child.type === oldFiber.type;

    if (same) {
      // 复用
    }
    if (!same && child) {
      // 新增
      newFiber = {
        key: child.key || null,
        type: child.type,
        props: {...child.props},
        child: null, //fiber | nunll
        sibling: null, // fiber | null
        return: workInProgress, //fiber
        stateNode: null, // 如果是原生标签，这里dom节点
        alternate: null, // 上一次的fiber节点
        flags: Placement
      };
    }
    if (!same && oldFiber) {
      // 删除
    }

    if (oldFiber) {
      // 获取下一个oldFiber
      oldFiber = oldFiber.sibling;
    }

    if (i === 0) {
      // 构建fiber结构

      // workInProgress的第一个子fiber
      workInProgress.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}

//* fiber属性
// type 类型
// key 标记当前层级下的唯一性
// props 属性
// ! child 第一个子节点
// ! sibling 下一个兄弟节点
// ! return 父节点（暂时）
// stateNode 原生标签的就是dom节点，Fragment和函数组件的没有，类组件的是实例，
// index 是个数字，从0开始，标记当前层级下的位置
// *

// 下一个需要更新的任务 fiber
let nextUnitOfWork = null;
// work in progress 正在工作中的fiber任务

function performUnitOfWork(workInProgress) {
  // * step1: 更新fiber任务
  // todo
  // 根据fiber任务类型不同进行更新
  const {type} = workInProgress;

  if (typeof type === "string") {
    // 原生标签节点
    updateHostComponent(workInProgress);
  } else if (typeof type === "function") {
    type.prototype.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress);
  } else {
    updateFragmentComponent(workInProgress);
  }

  // * step2: 返回下一个要更新的fiber任务，顺序参考王朝的故事
  // ! 规则： 先子节点，
  if (workInProgress.child) {
    return workInProgress.child;
  }
  // ! 规则： 再兄弟节点或者叔叔节点或者爷爷弟弟节点等等
  let nextFiber = workInProgress;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function workLoop(IdleDeadline) {
  // 剩余空闲时间
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    // 更新fiber任务
    // 返回下一个要更新的fiber任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  requestIdleCallback(workLoop);
  // 任务更新完啦，
  // todo 把fiber节点更新到dom当中
  if (!nextUnitOfWork && wipRoot) {
    // 可以提交任务，更新去了 就是可以同步虚拟dom节点到dom节点了
    commitRoot();
  }
}

requestIdleCallback(workLoop);

// 提交
function commitRoot() {
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWorker(workInProgress) {
  if (!workInProgress) {
    return;
  }

  // step1 : 提交自己
  // 父dom节点的fiber
  let parentNodeFiber = workInProgress.return;
  // ? 一个fiber节点一定有dom节点吗，比如Fragment、Provider、Consumer等
  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }
  // parentNode是父dom节点
  let parentNode = parentNodeFiber.stateNode;

  // 新增插入
  if (workInProgress.flags & Placement && workInProgress.stateNode) {
    // 插入
    parentNode.appendChild(workInProgress.stateNode);
  } else if (workInProgress.flags & Update && workInProgress.stateNode) {
    // todo 更新
  } else if (workInProgress.flags & Deletion && workInProgress.stateNode) {
    // todo 删除
  }

  // step2 : 提交子节点
  commitWorker(workInProgress.child);
  // step3 : 提交兄弟
  commitWorker(workInProgress.sibling);
}

// hook API
export function useState(init) {
  const state = init;
  const setState = action => {
    console.log("action", action); //sy-log
  };
  return [state, setState];
}

export default {render};

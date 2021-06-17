const taskQueue = [];
const timerQueue = [];

// 过期时间
let deadline = 0;

// currentTime + threshold
const threshold = 5; // 时间间隔

export function scheduleCallback(callback) {
  const newTask = {callback};
  taskQueue.push(newTask);
  schedule(flushWork);
}

function schedule(callback) {
  timerQueue.push(callback);
  postMessage();
}

const postMessage = () => {
  // react 源码中默认用MessageChannel，不支持则用setTimeout
  const {port1, port2} = new MessageChannel();

  port1.onmessage = () => {
    // 把timerQueue里的任务执行，并且清空timerQueue，避免下一轮再执行timerQueue
    let tem = timerQueue.splice(0, timerQueue.length);
    tem.forEach((c) => c());
  };
  port2.postMessage(null);
};

// 执行任务
function flushWork() {
  deadline = getCurrentTime() + threshold;
  let currentTask = taskQueue[0];
  // 最小堆
  while (currentTask && !shouldYield()) {
    const {callback} = currentTask;
    callback();
    taskQueue.shift();
    currentTask = taskQueue[0];
  }
}

export function shouldYield() {
  return getCurrentTime() >= deadline;
}

export function getCurrentTime() {
  return performance.now();
}

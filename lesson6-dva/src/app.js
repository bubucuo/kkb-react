import dva from "dva";

// 1. Initialize 初始化
const createHistory = require("history").createBrowserHistory;

const app = dva({
  history: createHistory()
});

export default app;

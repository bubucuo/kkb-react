import dva from "dva";

// 1. Initialize
const createHistory = require("history").createBrowserHistory;

const app = dva({
  history: createHistory()
});

export default app;

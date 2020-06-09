import dva from "dva";
import "./index.css";

const createHistory = require("history").createBrowserHistory;

// 1. Initialize
const app = dva({
  history: createHistory()
});

export default app;

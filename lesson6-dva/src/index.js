import dva from "dva";
import "./index.css";

// 1. Initialize 初始化
const createHistory = require("history").createBrowserHistory;

export const app = dva({
  history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model 注册model
app.model(require("./models/example").default);
// app.model(require("./models/user").default);

// 4. Router 注册路由
app.router(require("./router").default);

// 5. Start 启动
app.start("#root");

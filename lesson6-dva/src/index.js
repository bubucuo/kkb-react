// import dva from "dva";
// import "./index.css";

// // 1. Initialize 初始化
// const createHistory = require("history").createBrowserHistory;

// const app = dva({
//   history: createHistory()
// });

import app from "./app";

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/example").default);
// app.model(require("./models/user").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");

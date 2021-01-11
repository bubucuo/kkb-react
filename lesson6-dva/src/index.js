import dva from "dva";
import "./index.css";

// 1. Initialize
const createHistory = require("history").createBrowserHistory;

export const app = dva({ history: createHistory() });

// 2. Plugins
// app.use({});

// 3. Model createStore
app.model(require("./models/example").default);
// app.model(require("./models/user").default);

// 4. Router 路由
app.router(require("./router").default);

// 5. Start
app.start("#root");

import dva from "dva";
import "./index.css";

// 1. Initialize
const createHistory = require("history").createBrowserHistory;

const app = dva({
  history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/example").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");

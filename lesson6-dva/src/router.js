import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import ExamplePage from "./routes/ExamplePage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/example" component={ExamplePage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

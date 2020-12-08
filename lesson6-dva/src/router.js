import React from "react";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import ExamplePage from "./routes/ExamplePage";
import UserPage from "./routes/UserPage";
import { UserDynamic } from "./dynamic";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/example" component={ExamplePage} />
        <Route path="/user" component={UserDynamic} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

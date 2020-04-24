import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   useHistory,
//   useLocation,
//   useRouteMatch,
//   useParams,
//   withRouter
// } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  withRouter
} from "./k-react-router-dom/";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import _404Page from "./pages/_404Page";
import PrivateRoute from "./pages/PrivateRoute";
import LoginPage from "./pages/LoginPage";

export default function App(props) {
  return (
    <div>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>

        <Switch>
          <Route
            exact
            path="/"
            // children={() => <h1>children</h1>}
            component={HomePage}
            // render={() => <h1>render</h1>}
          />

          {/* <Route path="/user" component={UserPage}>
            <div>userChildren</div>
          </Route> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/product/:id" render={() => <Product />} />
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

function Product(props) {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const params = useParams();

  console.log("history", history); //sy-log
  console.log("location", location); //sy-log
  console.log("match", match); //sy-log
  console.log("params", params); //sy-log

  return (
    <div>
      <h3>Product</h3>
      <Detail />
    </div>
  );
}

@withRouter
class Detail extends React.Component {
  render() {
    console.log("detail", this.props); //sy-log
    return (
      <div>
        <h1>Detail</h1>
      </div>
    );
  }
}

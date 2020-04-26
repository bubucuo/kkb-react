import React, {Component} from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   useHistory,
//   useLocation,
//   useRouteMatch,
//   useParams,
//   withRouter,
//   Prompt
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
  withRouter,
  Prompt
} from "./k-react-router-dom";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import _404Page from "./pages/_404Page";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";

export default function App(props) {
  return (
    <div className="app">
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

          <PrivateRoute path="/user" component={UserPage} />
          {/* <Route path="/user" component={UserPage}>
            {/* <div>userpage</div> */}
          {/* </Route> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/product/:id" render={() => <Product />} />
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

// function Product(props) {
//   // const {match} = props;
//   const history = useHistory();
//   const location = useLocation();
//   const match = useRouteMatch();
//   const params = useParams();
//   const {id} = match.params;

//   console.log("props", history, location, match, params); //sy-log
//   return (
//     <div>
//       <h1>Product-{id}</h1>
//     </div>
//   );
// }

@withRouter
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {confirm: true};
  }
  render() {
    console.log("Product", this.props); //sy-log
    return (
      <div>
        <h1>Product</h1>
        <button
          onClick={() => {
            this.setState({confirm: !this.state.confirm});
          }}>
          change
        </button>
        <Link to="/">go home</Link>
        <Prompt when={this.state.confirm} message="你确定要离开吗？" />
      </div>
    );
  }
}

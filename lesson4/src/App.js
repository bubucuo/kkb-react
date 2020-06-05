import React, {Component} from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   useRouteMatch,
//   useHistory,
//   useLocation,
//   useParams,
//   withRouter,
//   Prompt
// } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
  withRouter,
  Prompt
} from "./k-react-router-dom/index";

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
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/user" component={UserPage} /> */}
          {/* <h1>user</h1>
            <h2>user</h2> */}
          {/* </Route> */}

          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/product/:id" render={() => <Product />} />
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

// function Product({match, location}) {
//   // console.log("Product location", location, match); //sy-log
//   const {params, url} = match;
//   const {id} = params;
//   return (
//     <div>
//       <h1>Product-{id}</h1>
//       <Link to={url + "/detail"}>详情</Link>
//       <Route path={url + "/detail"} component={Detail} />
//     </div>
//   );
// }

// function Product() {
//   // console.log("Product location", location, match); //sy-log
//   const match = useRouteMatch();
//   const history = useHistory();
//   const location = useLocation();
//   const _params = useParams();

//   console.log("match", match); //sy-log
//   console.log("history", history); //sy-log
//   console.log("location", location); //sy-log
//   console.log("_params", _params); //sy-log

//   const {params, url} = match;
//   const {id} = params;
//   return (
//     <div>
//       <h1>Product-{id}</h1>
//       <Link to={url + "/detail"}>详情</Link>
//       <Route path={url + "/detail"} component={Detail} />
//     </div>
//   );
// }

// @withRouter
// class Product extends Component {
//   render() {
//     const {match} = this.props;
//     const {params, url} = match;
//     const {id} = params;
//     return (
//       <div>
//         <h1>Product-{id}</h1>
//         <Link to={url + "/detail"}>详情</Link>
//         <Route path={url + "/detail"} component={Detail} />
//       </div>
//     );
//   }
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
        <h3>Product</h3>
        <Link to="/">go home</Link>
        <Prompt
          when={this.state.confirm}
          // message="Are you sure you want to leave?"
          message={location => {
            return "Are you sure you want to leave-fun";
          }}
        />
      </div>
    );
  }
}

function Detail({match, location}) {
  // console.log("detail location", location, match); //sy-log
  return (
    <div>
      <h2>detail</h2>
    </div>
  );
}

import React from "react";
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
} from "react-router-dom";

// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   useRouteMatch,
//   useHistory,
//   useLocation,
//   useParams,
//   withRouter
//   // Prompt
// } from "./k-react-router-dom/";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";
// import RouteComponentPage from "./pages/RouteComponentPage";
import WelcomePage from "./pages/WelcomePage";

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
            //children={children}
            component={HomePage}
            //render={render}
          />
          <Route path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/product/:id" component={Product} /> */}
          <Route path="/product/:id" render={() => <Product />} />

          <Route path="/welcome" component={WelcomePage} />

          {/* 这里没有path值，用的是Router默认的match，默认是匹配的 */}
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

// function Product(props) {
//   console.log("Product-props", props); //sy-log

//   const match = useRouteMatch();
//   const history = useHistory();
//   const location = useLocation();
//   const params = useParams();

//   const {url} = match;
//   const {id} = params;

//   console.log("route props", match, history, location, params); //sy-log
//   return (
//     <div>
//       <h1>Product</h1>
//       <p>id:{id}</p>
//       <Link to={url + "/detail"}>详情</Link>
//       <Route path={url + "/detail"} component={Detail} />
//     </div>
//   );
// }

@withRouter
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {confirm: true};
  }
  render() {
    const {params} = this.props.match;
    const {id} = params;
    console.log("props", this.props); //sy-log
    return (
      <div>
        Product:{id}
        <Prompt
          when={this.state.confirm}
          message="Are you sure you want to leave?"
          // message={location => {
          //   return "Are you sure you want to leave-fun";
          // }}
        />
      </div>
    );
  }
}

function Detail(props) {
  return (
    <div>
      <h1>商品详情页</h1>
    </div>
  );
}

function children(props) {
  console.log("children props", props); //sy-log
  return <div>children</div>;
}

function render(props) {
  console.log("render props", props); //sy-log
  return <div>render</div>;
}

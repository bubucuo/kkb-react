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
//   withRouter,
//   Prompt
// } from "./k-react-router-dom/";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";
import RouteComponentPage from "./pages/RouteComponentPage";
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
          >
            {/* children 0000 */}
          </Route>
          <Route path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/product/:id" component={Product} /> */}
          <Route path="/product/:id" render={() => <Product />} />

          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

function children(props) {
  return <div>children</div>;
}

function render(props) {
  console.log("render props", props); //sy-log
  return <div>render</div>;
}

// function Product({match}) {
// function Product() {
//   const match = useRouteMatch();
//   const history = useHistory();
//   const location = useLocation();
//   const _params = useParams();
//   console.log("hhhhhh", history, location, match, _params); //sy-log
//   console.log("match", match); //sy-log
//   const {params, url} = match;
//   const {id} = params;
//   return (
//     <div>
//       <h1>Search-{id}</h1>
//       <Link to={url + "/detail"}>详情</Link>
//       <Route path={url + "/detail"} component={Detail} />
//     </div>
//   );
// }

// @withRouter
// class Product extends React.Component {
//   render() {
//     console.log("props", this.props); //sy-log
//     const {params, url} = this.props.match;
//     const {id} = params;

//     return (
//       <div>
//         <h1>Search-{id}</h1>
//         <Link to={url + "/detail"}>详情</Link>
//         {/* <Route path={url + "/detail"} component={Detail} /> */}
//       </div>
//     );
//   }
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

function Detail({match}) {
  return (
    <div>
      <h1>detail</h1>
    </div>
  );
}

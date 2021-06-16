import React, {Component, useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  withRouter,
  Prompt,
} from "react-router-dom";

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
//   Redirect,
// } from "./k-react-router-dom/";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";

function App() {
  const [state, setState] = useState(1);
  return (
    <div className="App">
      {/* <button onClick={() => setState(state + 1)}>{state}</button> */}
      {state < 5 && (
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>
          <Link to="/product/123">商品</Link>

          <Switch>
            <Route
              path="/"
              exact
              //children={childern}
              component={HomePage}
              // ! 影响性能 会导致不必要的渲染
              //component={() => <HomePage />}
              ///render={() => <HomePage />}
              render={render}></Route>
            <Route path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/product/:id" render={() => <Product />} />
            <Route component={_404Page} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;

// function Product(props) {
//   console.log(
//     "props",
//     useHistory(),
//     useLocation(),
//     useParams(),
//     useRouteMatch()
//   ); //sy-log

//   const match = useRouteMatch();
//   return (
//     <div>
//       Product： {match.params.id}
//       <Link to={match.url + "/detail"}>详情</Link>
//       <Route path={match.url + "/detail"} component={Detail} />
//     </div>
//   );
// }

@withRouter
class Product extends Component {
  render() {
    const {match} = this.props;
    console.log("props", this.props); //sy-log
    return (
      <div>
        Product： {match.params.id}
        <Link to={match.url + "/detail"}>详情</Link>
        <Route path={match.url + "/detail"} component={Detail} />
        <Prompt when={true} message={"你真的要走吗"} />
      </div>
    );
  }
}

function Detail(props) {
  return <div>Detail</div>;
}

function childern(props) {
  console.log("chiildren props", props); //sy-log
  return <div>childern</div>;
}

function render(props) {
  console.log("render props", props); //sy-log
  return <div>render</div>;
}

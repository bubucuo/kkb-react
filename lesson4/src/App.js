import React, {useState} from "react";
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
//   withRouter
//   // Redirect
// } from "./k-react-router-dom/";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {count < 3 && (
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>
          <Link to="/product/123">商品</Link>

          <Switch>
            <Route
              path="/"
              exact
              //children={children}
              //component={HomePage}
              // ! 这个写法影响性能
              //component={() => <HomePage />}
              render={() => <HomePage />}
              //render={render}
            >
              {/* omg children */}
            </Route>
            <Route path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
            <Route
              path="/product/:id"
              //component={Product}

              render={() => <Product />}
            />
            <Route component={_404Page} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;

function Product() {
  // console.log("match", match); //sy-log

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const params = useParams();

  console.log("props", history, location, match, params); //sy-log
  const [confirm, setConfirm] = useState(true);

  const {url} = match;
  const {id} = params;
  return (
    <div>
      <h1>Search-{id}</h1>

      <Prompt
        when={confirm}
        // message="Are you sure you want to leave?"
        message={(location) => {
          return "Are you sure you want to leave-fun";
        }}
      />

      <Link to={url + "/detail"}>详情</Link>
      <Route path={url + "/detail"} component={Detail} />
    </div>
  );
}

function Detail({match}) {
  return (
    <div>
      <h1>detail</h1>
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

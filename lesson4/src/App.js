import React, {useRef, useEffect, createRef, useState} from "react";
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
  Prompt,
  NavLink
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
//   Prompt,
//   NavLink
// } from "./k-react-router-dom/";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";
import RouteComponentPage from "./pages/RouteComponentPage";
import WelcomePage from "./pages/WelcomePage";

const homeRef = createRef();

export default function App(props) {
  // const [state, setState] = useState(0);

  // useEffect(() => {
  // console.log("hahah", homeRef.current); //sy-log
  // }, [state]);

  return (
    <div className="app">
      {/* <button onClick={() => setState(state + 1)}>add {state}</button> */}
      <Router>
        <Link to="/" ref={homeRef}>
          首页
        </Link>

        {/* <NavLink to="/" ref={homeRef} activeClassName="selected">
          首页 navlin
        </NavLink> */}
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>

        <Switch>
          <Route
            exact
            path="/"
            // children={children}
            component={HomePage}
            //render={render}
          />
          <Route path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/welcome" component={WelcomePage} />
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

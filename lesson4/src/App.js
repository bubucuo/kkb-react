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
//   withRouter
//   // Prompt,
//   // NavLink
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

        <NavLink
          to="/"
          ref={homeRef}
          activeClassName="selected"
          strict
          exact
          sensitive>
          首页 navlin
        </NavLink>
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
          <Route path="/welcome" component={WelcomePage} />
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
  return <div>render</div>;
}

// function Product(props) {
//   // const {match} = props;
//   const match = useRouteMatch();
//   const history = useHistory();
//   const location = useLocation();
//   const _params = useParams();

//   console.log("Product props", match, history, location, _params);
//   const {url, params} = match;

//   return (
//     <div>
//       <h4>Product</h4>
//       <p>id: {params.id}</p>
//       <Link to={url + "/detail"}>详情</Link>
//       <Route path={url + "/detail"} component={Detail} />
//     </div>
//   );
// }

function Detail(props) {
  console.log("Detail props", props);
  return <div>Detail</div>;
}

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

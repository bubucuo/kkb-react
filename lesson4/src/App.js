import React, {useState} from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   Redirect,
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
  withRouter
  // Redirect
} from "./k-react-router-dom/";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import _404Page from "./pages/_404Page";

function App() {
  const [count, setCount] = useState(1);
  const id = 123;
  return (
    <div className="App">
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        add: {count}
      </button>
      {/* // ! 可以去Router中注释掉改变this.unlisten,然后点击这里的count的参数值 ，查看卸载的组件的setState的错误*/}
      <a href="#/a">a</a>
      {count % 2 && (
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
              component={HomePage}
              // ! 下面写法影响性能
              //component={() => <HomePage />}

              // render={render}
            />
            <Route
              path="/product/:id"
              // component={Product}
              render={() => <Product />}
            />
            <Route path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
            <Route component={_404Page} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;

@withRouter
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {confirm: false};
  }
  render() {
    const {match} = this.props;
    const {url} = match;
    const {id} = match.params;

    return (
      <div>
        Product:{id}
        <Link to={url + "/detail"}>详情</Link>
        <Route path={url + "/detail"} component={Detail} />
        {/* <Prompt
          when={this.state.confirm}
          // message="Are you sure you want to leave?"
          message={location => {
            return "Are you sure you want to leave-fun";
          }}
        /> */}
      </div>
    );
  }
}

// function Product(props) {
//   const history = useHistory();
//   const location = useLocation();
//   const match = useRouteMatch();
//   const params = useParams();

//   console.log("props", match, params); //sy-log
//   // const {match} = props;
//   const {url} = match;
//   const {id} = match.params;

//   return (
//     <div>
//       Product:{id}
//       <Link to={url + "/detail"}>详情</Link>
//       <Route path={url + "/detail"} component={Detail} />
//     </div>
//   );
// }

function Detail(props) {
  console.log("Detail props", props); //sy-log
  return <div>Detail</div>;
}

function children(props) {
  console.log("children props", props); //sy-log

  return <div>children</div>;
}

function render(props) {
  console.log("render props", props); //sy-log
  return <div>render</div>;
}

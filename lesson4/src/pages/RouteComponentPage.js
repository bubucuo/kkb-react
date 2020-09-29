import React, {Component, useEffect} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

export default class RouteComponentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  render() {
    const {count} = this.state;
    return (
      <div>
        <h3>RouteComponentPage</h3>
        <button
          onClick={() => {
            this.setState({count: count + 1});
          }}>
          click change count {count}
        </button>
        <Router>
          {/* 渲染component的时候会调用React.createElement，如果使用下面这种匿名函数的形式，每次都会生成一个新的匿名的函数，
          导致生成的组件的type总是不相同，这个时候会产生重复的卸载和挂载 */}

          {/* 错误举例 课下自己尝试下 观察下child的didMount和willUnmount函数 */}
          {/* <Route component={() => <Child count={count} />} /> */}
          {/* <Route component={() => <FunctionChild count={count} />} /> */}

          {/* 下面才是正确的示范 */}
          <Route render={() => <Child count={count} />} />
          {/* <Route render={() => <FunctionChild count={count} />} /> */}

          {/* children 呢  */}
          {/* <Route children={() => <Child count={count} />} /> */}
          {/* <Route children={() => <FunctionChild count={count} />} /> */}
        </Router>
      </div>
    );
  }
}

class Child extends Component {
  componentDidMount() {
    console.log("componentDidMount"); //sy-log
  }

  componentWillUnmount() {
    console.log("componentWillUnmount"); //sy-log
  }

  render() {
    return <div>child-{this.props.count}</div>;
  }
}

function FunctionChild(props) {
  useEffect(() => {
    return () => {
      console.log("WillUnmount"); //sy-log
    };
  }, []);
  return <div>child-{props.count}</div>;
}

import React, {Component} from "react";
import {RouterContext} from "./RouterContext";

export default class Router extends Component {
  static computeRootMatch(pathname) {
    return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
  }
  constructor(props) {
    super(props);
    this.state = {location: props.history.location};
    this.unlisten = props.history.listen(location => {
      this.setState({location});
    });
  }
  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }
  render() {
    return (
      <RouterContext.Provider
        value={{
          location: this.state.location,
          history: this.props.history,
          match: Router.computeRootMatch(this.state.location.pathname)
        }}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

// ! Router负责总的，比如说history、location传递和监听等等 和
// ! Route负责匹配 根据location匹配渲染内容

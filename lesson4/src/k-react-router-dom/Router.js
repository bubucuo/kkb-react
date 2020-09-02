import React, {Component} from "react";
import {RouterContext} from "./Context";

export default class Router extends Component {
  static computeRootMatch(pathname) {
    return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
  }
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location
    };
    props.history.listen(location => {
      this.setState({location});
    });
  }
  render() {
    const {history, children} = this.props;
    return (
      <RouterContext.Provider
        value={{
          history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname)
        }}>
        {children}
      </RouterContext.Provider>
    );
  }
}

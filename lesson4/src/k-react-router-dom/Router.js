import {Component} from "react";
import RouterContext from "./RouterContext";

export default class Router extends Component {
  static computeRootMatch(pathname) {
    return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
  }
  constructor(props) {
    super(props);
    this.state = {location: props.history.location};

    // 订阅
    this.unlisten = props.history.listen((location) => {
      this.setState({location});
    });
  }

  // 取消订阅
  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    const {history, children} = this.props;
    return (
      <RouterContext.Provider
        value={{
          history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}>
        {children}
      </RouterContext.Provider>
    );
  }
}

import {Component} from "react";
import RouterContext from "./RouterContext";

class Router extends Component {
  static computeRootMatch(pathname) {
    return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
  }

  constructor(props) {
    super(props);
    this.state = {location: props.history.location};
    this.unlisten = props.history.listen((location) => {
      // location发生变化，执行这里
      this.setState({location});
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
export default Router;

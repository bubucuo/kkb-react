import React, {Component} from "react";
import RouterContext from "./RouterContext";

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };

    // 监听 location
    props.history.listen((location) => {
      this.setState({location});
    });
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
        }}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
export default Router;

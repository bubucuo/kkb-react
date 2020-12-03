import React, {Component} from "react";
import RouterContext from "./RouterContext";

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location
    };

    props.history.listen(location => {
      // location发生变化，执行回调
      this.setState({location});
    });
  }

  render() {
    return (
      <RouterContext.Provider
        value={{history: this.props.history, location: this.state.location}}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

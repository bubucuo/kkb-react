import React, {Component} from "react";
import RouterContext from "./RouterContext";

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };

    // 监听location变化
    this.unlisten = props.history.listen((location) => {
      this.setState({location});
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const {children, history} = this.props;
    return (
      <RouterContext.Provider value={{history, location: this.state.location}}>
        {children}
      </RouterContext.Provider>
    );
  }
}
export default Router;

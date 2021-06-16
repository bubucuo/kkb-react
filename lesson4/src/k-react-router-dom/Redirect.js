import {Component} from "react";
import RouterContext from "./RouterContext";

class Redirect extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {to} = this.props;
          return (
            <LifeCycle
              onMount={() => {
                context.history.push(to);
              }}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
export default Redirect;

class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }
  render() {
    return null;
  }
}

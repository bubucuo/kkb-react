import React from "react";
import {RouterContext} from "./Context";

export default function Redirect({to}) {
  return (
    <RouterContext.Consumer>
      {context => {
        const {history} = context;
        // history.push(to);
        return (
          <LifeCycle
            onMount={() => {
              history.replace(to);
            }}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}

class LifeCycle extends React.Component {
  componentDidMount() {
    this.props.onMount.call(this, this);
  }
  render() {
    return null;
  }
}

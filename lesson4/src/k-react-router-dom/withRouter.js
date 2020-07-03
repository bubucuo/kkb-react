import {RouterContext} from "./Context";
import React from "react";

// hoc 这是个高阶组件
const withRouter = WrappedComponent => props => {
  return (
    <RouterContext.Consumer>
      {context => <WrappedComponent {...props} {...context} />}
    </RouterContext.Consumer>
  );
};

export default withRouter;

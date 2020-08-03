import React from "react";
import {RouterContext} from "./Context";

const withRouter = WrappedComponent => props => {
  return (
    <RouterContext.Consumer>
      {context => {
        return <WrappedComponent {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};

export default withRouter;

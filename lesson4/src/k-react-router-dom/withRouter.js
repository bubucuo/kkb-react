import React from "react";
import {RouterContext} from "./Context";

const withRouter = Component => props => {
  return (
    <RouterContext.Consumer>
      {context => {
        return <Component {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};

export default withRouter;

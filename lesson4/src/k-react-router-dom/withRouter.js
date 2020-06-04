import React from "react";
import {RouterContext} from "./RouterContext";

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

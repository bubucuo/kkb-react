import React from "react";
import {RouterContext} from "./Context";

const withRouter = Compoent => props => {
  return (
    <RouterContext.Consumer>
      {context => {
        return <Compoent {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};

export default withRouter;

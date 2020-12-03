import React from "react";
import RouterContext from "./RouterContext";

// hoc 函数，接收组件作为参数，再返回新的组件
const withRouter = WrappedComponet => props => {
  return (
    <RouterContext.Consumer>
      {context => {
        return <WrappedComponet {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};

export default withRouter;

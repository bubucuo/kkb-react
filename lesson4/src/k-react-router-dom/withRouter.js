import RouterContext from "./RouterContext";

const withRouter = (WrappedComponent) => (props) => {
  return (
    <RouterContext.Consumer>
      {(context) => (
        <WrappedComponent {...props} {...context}></WrappedComponent>
      )}
    </RouterContext.Consumer>
  );
};

export default withRouter;

// A createForm connect withRouter

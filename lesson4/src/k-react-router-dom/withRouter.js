import RouterContext from "./RouterContext";

// hoc
const withRouter = (WrappedComponent) => (props) => {
  return (
    <RouterContext.Consumer>
      {(context) => {
        return <WrappedComponent {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};

export default withRouter;

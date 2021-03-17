import RouterContext from "./RouterContext";

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

import RouterContext from "./RouterContext";

const withRouter = (WrapperComponent) => (props) => {
  return (
    <RouterContext.Consumer>
      {(context) => {
        return <WrapperComponent {...props} {...context} />;
      }}
    </RouterContext.Consumer>
  );
};

export default withRouter;

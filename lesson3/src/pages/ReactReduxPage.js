import React, {Component} from "react";
// import {connect} from "react-redux";
import {bindActionCreators, connect} from "../kReactRedux";
// import {bindActionCreators} from "redux";

// connect hoc
export default connect(
  // mapStateToProps 把state map（映射） props上一份
  ({count}) => ({count}),
  // mapDispatchToProps   object | function
  // {
  //   add: () => ({type: "ADD"}),
  //   minus: () => ({type: "MINUS"}),
  // }

  (dispatch) => {
    let creators = {
      add: () => ({type: "ADD"}),
      minus: () => ({type: "MINUS"}),
    };

    creators = bindActionCreators(creators, dispatch);

    return {
      dispatch,
      ...creators,
    };
  }
)(
  class ReactReduxPage extends Component {
    render() {
      console.log("props", this.props); //sy-log
      const {count, dispatch, add, minus} = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <p>{count}</p>
          <button onClick={() => dispatch({type: "ADD", payload: 100})}>
            dispatch add
          </button>
          <button onClick={add}>add</button>
          <button onClick={minus}>minus</button>
        </div>
      );
    }
  }
);
// export default ReactReduxPage;
// connect(state => state)(ReactReduxPage);

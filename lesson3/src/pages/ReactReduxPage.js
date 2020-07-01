import React, {Component} from "react";
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
import {bindActionCreators, connect} from "../kReactRedux";

@connect(
  // mapStateToProps 把state放到props上一份
  // ({count}) => ({count}),
  state => {
    return {count: state.count};
  },

  // mapDispatchToProps object|function 把dispatch放到props上一份
  // {
  //   add: () => ({type: "ADD"}),
  //   minus: () => ({type: "MINUS"})
  // },

  dispatch => {
    let creators = {
      add: () => ({type: "ADD", payload: 100}),
      minus: () => ({type: "MINUS", payload: 100})
    };

    creators = bindActionCreators(creators, dispatch);

    return {dispatch, ...creators};
  }
  // (stateProps, dispatchProps, ownProps) => {
  //   return {
  //     // ...stateProps,
  //     // ...dispatchProps,
  //     // ...ownProps,
  //     omg: "omg"
  //   };
  // }
)
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
        <button onClick={add}> add</button>
        <button onClick={minus}> minus</button>
      </div>
    );
  }
}
export default ReactReduxPage;

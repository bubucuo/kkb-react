import React, {Component} from "react";
// import {connect} from "react-redux";
import {connect} from "../kReactRedux";

import {bindActionCreators} from "redux";

@connect(
  // mapStateToProps function
  ({count}) => ({count}),
  // mapDispatchToProps object | function
  // {
  //   add: () => ({
  //     type: "ADD"
  //   })
  // }

  dispatch => {
    //   // const add = () => dispatch({type: "ADD"});
    //   // const minus = () => dispatch({type: "MINUS"});

    let creators = {
      add: () => ({type: "ADD"}),
      minus: () => ({type: "MINUS"})
    };

    creators = bindActionCreators(creators, dispatch);

    return {dispatch, ...creators};
  }
  // (stateProps, dispatchProps, ownProps) => {
  //   return {...stateProps, ...dispatchProps, ...ownProps, omg: "omg"};
  // }
)
class ReactReduxPage extends Component {
  dispatchAdd = () => {
    this.props.dispatch({type: "ADD"});
  };

  render() {
    const {count, add, minus} = this.props;
    console.log("this.props", this.props); //sy-log
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={this.dispatchAdd}>disptch add</button>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}

export default ReactReduxPage;

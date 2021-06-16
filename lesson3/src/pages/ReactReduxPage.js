import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
// import {connect, bindActionCreators} from "../kReactRedux";

// hoc
// 高阶组件 是个函数，参数是组件，返回一个新的组件
@connect(
  // mapStateToProps
  // ({count}) => ({count})
  (state) => {
    console.log("ownProps"); //sy-log
    // asasaas
    return {count: state.count};
  },
  // mapDispatchToProps object | function
  {
    add: () => ({type: "ADD"}),
    minus: () => ({type: "MINUS"}),
  },

  // (dispatch) => {
  //   let creators = {
  //     add: () => ({type: "ADD"}),
  //     minus: () => ({type: "MINUS"}),
  //   };

  //   creators = bindActionCreators(creators, dispatch);

  //   return {dispatch, ...creators};
  // }

  (stateProps, dispatchProps, ownProps) => {
    console.log(
      "stateProps, dispatchProps, ownProps",
      stateProps,
      dispatchProps,
      ownProps
    ); //sy-log
    return {...stateProps, ...dispatchProps, ...ownProps, omg: "omg"};
  }
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

        <button onClick={add}> add </button>
        <button onClick={minus}> minus </button>
      </div>
    );
  }
}
export default ReactReduxPage;
// connect(state => state)(ReactReduxPage);

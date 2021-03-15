import React, {Component} from "react";
import {connect} from "react-redux";
// import {bindActionCreators, connect} from "../kReactRedux";
import {bindActionCreators} from "redux";

// hoc 是个函数，接收组件作为参数，返回一个新的组件
// connect原理 高阶组件（hoc）
@connect(
  // mapStateToProps 把state map（映射） props上一份
  // ({count}) => ({count}),
  (state) => {
    return {count: state.count};
  },
  // mapDispatchToProps: object | function
  {
    add: () => ({type: "ADD"}), //=> ()=>dispatch({type: "ADD"})
    minus: () => ({type: "MINUS"}),
  },

  // (dispatch) => {
  //   // 想改变状态值
  //   let creators = {
  //     add: () => ({type: "ADD"}), //=> ()=>dispatch({type: "ADD"})
  //     minus: () => ({type: "MINUS"}),
  //   };

  //   creators = bindActionCreators(creators, dispatch);

  //   return {
  //     dispatch,
  //     ...creators,
  //   };
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

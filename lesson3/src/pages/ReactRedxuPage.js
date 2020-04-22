import React, {Component} from "react";
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
import {connect, bindActionCreators} from "../kReactRedux";

export default connect(
  // mapStateToProps function
  ({count}) => ({count}),
  // mapDispatchToProps function | object
  {
    add: () => ({
      type: "ADD"
    })
  }
  // dispatch => {
  //   let creators = {
  //     add: () => ({
  //       type: "ADD"
  //     })
  //   };

  //   creators = bindActionCreators(creators, dispatch);

  //   return {
  //     dispatch,
  //     ...creators
  //   };
  // }
)(
  class ReactRedxuPage extends Component {
    addDispatch = () => {
      this.props.dispatch({
        type: "ADD"
      });
    };
    render() {
      console.log("this.props", this.props); //sy-log
      const {count, add} = this.props;
      return (
        <div>
          <h3>ReactRedxuPage</h3>
          <p>{count}</p>
          <button onClick={this.addDispatch}>addDispatch</button>
          <button onClick={add}>add</button>
        </div>
      );
    }
  }
);

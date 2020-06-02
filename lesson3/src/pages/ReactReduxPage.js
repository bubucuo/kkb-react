import React, {Component} from "react";
// import {connect} from "react-redux";
import {connect} from "../kReactRedux";

// import {bindActionCreators} from "redux";
import {bindActionCreators} from "../kReactRedux";

@connect(
  // mapStateToProps
  ({count}) => ({count}),
  // mapDispatchToProps object | function
  {
    add: () => ({type: "ADD"}),
    minus: () => ({type: "MINUS"})
  }

  // (dispatch, ownProps) => {
  //   console.log("wwww"); //sy-log

  //   let creators = {
  //     add: payload => ({type: "ADD", payload}),
  //     minus: () => ({type: "MINUS"})
  //   };

  //   creators = bindActionCreators(creators, dispatch);

  //   return {
  //     dispatch,
  //     ...creators
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
        <button onClick={() => dispatch({type: "ADD"})}>dispatch add</button>
        <button onClick={() => add(100)}> add</button>
        <button onClick={minus}> minus</button>
      </div>
    );
  }
}
export default ReactReduxPage;

import {Component} from "react";
// import {connect} from "react-redux";
import {connect} from "../kReactRedux";

// import {bindActionCreators} from "redux";
import {bindActionCreators} from "../kReactRedux";

// *今日学霸何伟城：函数 接受一个组件返回一个组件
// connect原理 高阶组件（hoc）
@connect(
  // mapStateToProps 把state映射到props
  ({count}) => ({count}),
  // mapDispatchToProps object| function
  // {add: () => ({type: "ADD"}), minus: () => ({type: "MINUS"})}

  dispatch => {
    let creators = {
      add: () => ({type: "ADD"}),
      minus: () => ({type: "MINUS"})
    };

    creators = bindActionCreators(creators, dispatch);

    return {dispatch, ...creators};
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
        <button onClick={add}> add</button>
        <button onClick={minus}>minus </button>
      </div>
    );
  }
}
export default ReactReduxPage;

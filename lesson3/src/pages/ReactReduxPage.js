import {Component} from "react";
import {connect} from "react-redux";

// connect原理 高阶组件（hoc）
@connect(({count}) => ({count}))
class ReactReduxPage extends Component {
  render() {
    // console.log("props", this.props); //sy-log
    const {count, dispatch} = this.props;
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={() => dispatch({type: "ADD", payload: 100})}>
          dispatch add
        </button>
      </div>
    );
  }
}
export default ReactReduxPage;

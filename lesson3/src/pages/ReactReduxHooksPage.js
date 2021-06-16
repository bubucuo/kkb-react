// import {useDispatch, useSelector} from "react-redux";
import {useDispatch, useSelector} from "../kReactRedux";

function ReactReduxHooksPage(props) {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>ReactReduxHooksPage</h3>
      <button onClick={() => dispatch({type: "ADD"})}>{count}</button>
    </div>
  );
}
export default ReactReduxHooksPage;

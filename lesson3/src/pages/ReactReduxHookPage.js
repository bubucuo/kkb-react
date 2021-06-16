import {useCallback} from "react";
// import {useDispatch, useSelector} from "react-redux";
import {useDispatch, useSelector} from "../kReactRedux";

function ReactReduxHookPage(props) {
  const count = useSelector(({count}) => count);
  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch({type: "ADD"});
  }, []);

  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <button onClick={add}>{count}</button>
    </div>
  );
}
export default ReactReduxHookPage;

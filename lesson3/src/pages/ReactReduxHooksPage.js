import {useCallback} from "react";
// import {useDispatch, useSelector} from "react-redux";
import {useDispatch, useSelector} from "../kReactRedux";

export default function ReactReduxHooksPage(props) {
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch({type: "ADD"});
  }, []);
  const count = useSelector((state) => state.count);
  return (
    <div>
      <h3>ReactReduxHooksPage</h3>
      {/* <button onClick={() => dispatch({type: "ADD"})}>{count}</button> */}
      <button onClick={add}>{count}</button>
    </div>
  );
}

import React, {useCallback} from "react";
// import {useSelector, useDispatch} from "react-redux";
import {useSelector, useDispatch} from "../kReactRedux";

export default function ReactReduxHooksPage(props) {
  // 获取state
  const count = useSelector(({count}) => count);

  // 获取dispatch
  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch({type: "ADD"});
  }, []);

  return (
    <div>
      <h3>ReactReduxHooksPage</h3>
      <button onClick={add}>{count}</button>
    </div>
  );
}

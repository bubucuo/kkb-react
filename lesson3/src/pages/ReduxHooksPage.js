import React, {useCallback} from "react";
// import {useSelector, useDispatch} from "react-redux";
import {useSelector, useDispatch} from "../kReactRedux";

export default function ReduxHooksPage(props) {
  // 访问状态 get
  const count = useSelector(({count}) => count);

  // 修改state ， set

  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch({type: "ADD"});
  }, []);

  return (
    <div>
      <h3>ReduxHooksPage</h3>
      <button onClick={add}>{count}</button>
    </div>
  );
}

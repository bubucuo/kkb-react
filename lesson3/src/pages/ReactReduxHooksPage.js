import React, {useCallback} from "react";
// import {useDispatch, useSelector} from "react-redux";
import {useDispatch, useSelector} from "../kReactRedux";

export default function ReactReduxHooksPage(props) {
  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch({type: "ADD"});
  }, []);

  // 获取状态 类似mapStateToProps
  const count = useSelector(({count}) => count);

  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <p>{count}</p>
      <button onClick={add}>add</button>
    </div>
  );
}

import React, {useCallback} from "react";
// import {useSelector, useDispatch} from "react-redux";
import {useSelector, useDispatch} from "../kReactRedux";

export default function ReduxHooksPage(props) {
  const count = useSelector(({count}) => count);
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch({type: "ADD"});
  }, []);

  return (
    <div>
      <h3>ReduxHooksPage</h3>
      <p>{count}</p>
      <button onClick={add}>add</button>
    </div>
  );
}

import React from "react";
import { connect } from "dva";

export default connect(({ user }) => ({ user }))(function UserPage(props) {
  console.log("UserPage", props.user); //sy-log
  return (
    <div>
      <h3>UserPage</h3>
    </div>
  );
});

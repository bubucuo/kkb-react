import React from 'react';
import { connect, Redirect } from 'umi';
import styles from './index.less';

export default connect(({ login }) => ({ isLogin: login.isLogin }), {
  loginClick: () => ({ type: 'login/login' }),
})(({ loginClick, isLogin, location }) => {
  if (isLogin) {
    const { redirect = '/' } = location.state || {};
    return <Redirect to={redirect} />;
  }
  return (
    <div>
      <h1 className={styles.title}>Page login/index</h1>
      <button onClick={loginClick}>login</button>
    </div>
  );
});

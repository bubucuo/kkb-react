import React from 'react';
import { Redirect, connect } from 'umi';

// 权限路由
export default connect(({ login }) => ({ isLogin: login.isLogin }))(
  ({ isLogin, children, location }) => {
    if (isLogin) {
      return children;
    } else {
      //没有登录，跳转登录页
      return (
        <Redirect
          to={{ pathname: '/login', state: { redirect: location.pathname } }}
        />
      );
    }
  },
);

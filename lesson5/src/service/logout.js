// 模拟登出接口
const LogoutService = {
  logout(userInfo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userInfo.id === 123) {
          resolve({tip: {msg: "退出登录成功，请重新登录！"}});
        } else {
          reject({err: {msg: "退出登录失败，请稍后再试！"}});
        }
      }, 1000);
    });
  }
};
export default LogoutService;

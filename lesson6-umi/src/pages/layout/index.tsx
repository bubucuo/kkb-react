import React from 'react';
import styles from './index.less';

export default props => {
  return (
    <div className="pages">
      <h1 className={styles.title}>Page layout/index</h1>
      <p>顶部菜单导航</p>
      <div>左边导航</div>
      <div>右边something</div>
      <div className="content">{props.children}</div>
      <footer>底部footer</footer>
    </div>
  );
};

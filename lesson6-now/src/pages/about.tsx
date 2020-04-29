import React from 'react';
import { Button } from 'antd';
import { Link, history } from 'umi';
import styles from './about.less';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page about</h1>
      <Link to="/">去首页</Link>
      <Button type="primary" onClick={() => history.push('/more')}>
        go more
      </Button>
    </div>
  );
};

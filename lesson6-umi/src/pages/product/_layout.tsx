import React from 'react';
import styles from './_layout.less';
import { IRouteComponentProps } from 'umi';

export default ({ children }: IRouteComponentProps) => {
  // 写权限逻辑
  return (
    <div>
      <h1 className={styles.title}>Page product/_layout</h1>
      {children}
    </div>
  );
};

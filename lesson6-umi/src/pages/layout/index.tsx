import React from 'react';
import styles from './index.less';

export default function Page({children}) {
  return (
    <div>
      <h1 className={styles.title}>Page layout/index-全局</h1>

      {children}
    </div>
  );
}

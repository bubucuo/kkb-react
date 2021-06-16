import React from 'react';
import styles from './index.less';

export default function Page(props) {
  return (
    <div>
      <h1 className={styles.title}>global Page layout/index</h1>
      {props.children}
    </div>
  );
}

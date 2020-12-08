import React from 'react';
import styles from './_layout.less';

export default props => {
  return (
    <div className="border">
      <h1 className={styles.title}>Page product/_layout</h1>
      {props.children}
      123
    </div>
  );
};

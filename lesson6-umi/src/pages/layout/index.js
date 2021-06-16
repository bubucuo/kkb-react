import React from 'react';
import styles from './index.css';

export default function Page(props) {
  return (
    <div>
      <h1 className={styles.title}>Page layout/index</h1>
      {props.children}
    </div>
  );
}

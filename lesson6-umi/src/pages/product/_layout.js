import React from 'react';
import styles from './_layout.css';

export default function Page(props) {
  console.log('product/_layout props', props); //sy-log
  return (
    <div>
      <h1 className={styles.title}>Page product/_layout</h1>
      {props.children}
    </div>
  );
}

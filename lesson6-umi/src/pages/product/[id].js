import React from 'react';
import styles from './[id].css';

/* <Route path='path' component={Page}/> */

export default function Page(props) {
  console.log('props', props); //sy-log
  return (
    <div>
      <h1 className={styles.title}>Page product/[{props.match.params.id}]</h1>
    </div>
  );
}

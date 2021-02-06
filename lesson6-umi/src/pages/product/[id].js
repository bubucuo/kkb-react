import React from 'react';
import styles from './[id].css';

export default function Page(props) {
  console.log('props', props); //sy-log
  const { id } = props.match.params;
  return (
    <div>
      <h1 className={styles.title}>Page product/[{id}]</h1>
    </div>
  );
}

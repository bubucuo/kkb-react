import React from 'react';
import styles from './[id].css';

export default props => {
  console.log('props', props); //sy-log
  const { id } = props.match.params;
  return (
    <div>
      <h1 className={styles.title}>Page product/[id]: {id}</h1>
    </div>
  );
};

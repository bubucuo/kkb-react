import React from 'react';
import styles from './[id].css';

export default props => {
  const { id } = props.match.params;
  return (
    <div>
      111
      <h1 className={styles.title}>Page product/[id]:{id}</h1>
    </div>
  );
};

import React from 'react';
import styles from './[id].less';

export default props => {
  console.log('props', props); //sy-log
  return (
    <div>
      <h1 className={styles.title}>Page product/[{props.match.params.id}]</h1>
    </div>
  );
};

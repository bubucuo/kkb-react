import React from 'react';
import styles from './[id].less';

export default props => {
  const { match } = props;
  return (
    <div>
      <h1 className={styles.title}>Page product/[id]: {match.params.id}</h1>
    </div>
  );
};

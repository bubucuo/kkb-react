import React from 'react';
import styles from './[id].css';
import { Link } from 'umi';

export default props => {
  const { match } = props;
  console.log('props', props); //sy-log
  return (
    <div>
      <h1 className={styles.title}>Page product/[id]:{match.params.id}</h1>
      <Link to="/more">Go to more page</Link>
    </div>
  );
};

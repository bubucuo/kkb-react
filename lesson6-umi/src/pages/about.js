import React from 'react';
import { Link } from 'umi';
import styles from './about.css';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page about</h1>
      <Link to="/more">go more</Link>
    </div>
  );
};

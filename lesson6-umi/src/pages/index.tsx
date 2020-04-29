import React from 'react';
import styles from './index.less';
import { IRouteComponentProps } from 'umi';

export default (props: IRouteComponentProps) => {
  console.log('props', props); //sy-log
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
};

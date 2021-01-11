import React from 'react';
import { IRouteComponentProps } from 'umi';
import styles from './index.less';

export default (props: IRouteComponentProps) => {
  console.log('props', props); //sy-log
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
};

import React from 'react';
import styles from './[id].less';
import { IRouteComponentProps } from 'umi';

export default (props: IRouteComponentProps) => {
  console.log('prooduct', props); //sy-log
  return (
    <div>
      <h1 className={styles.title}>Page product/[id]</h1>
    </div>
  );
};

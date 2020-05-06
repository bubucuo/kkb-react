import React from 'react';
import styles from './_layout.less';
import { IRouteComponentProps } from 'umi';

export default (props: IRouteComponentProps) => {
  return (
    <div>
      <h1 className={styles.title}>Page product/_layout</h1>
      {props.children}
    </div>
  );
};

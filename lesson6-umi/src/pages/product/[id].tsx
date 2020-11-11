import React from 'react';
import styles from './[id].less';
import { IRouteComponentProps } from 'umi';

export default (props: IRouteComponentProps) => {
  console.log('props', props); //sy-log
  const { id } = props.match.params;
  return (
    <div>
      <h1 className={styles.title}>Page product/[id]-{id}</h1>
    </div>
  );
};

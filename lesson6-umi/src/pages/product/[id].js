import React from 'react';
import styles from './[id].css';
import { useParams } from 'dva';

export default props => {
  console.log('props', props); //sy-log
  const { id } = props.match.params;
  // const { id } = useParams();
  return (
    <div>
      <h1 className={styles.title}>Page product/[{id}]</h1>
      <Child />
    </div>
  );
};

function Child(props) {
  const { id } = useParams();
  return (
    <div>
      <h1>Child</h1>
      <p>{id}</p>
    </div>
  );
}

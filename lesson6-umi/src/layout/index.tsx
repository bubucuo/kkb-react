import React, { useEffect } from 'react';
import { IRouteComponentProps } from 'umi';

export default (props: IRouteComponentProps) => {
  useEffect(() => {
    // 获取menus数据
  });
  return (
    <div>
      {/* menu组件 */}
      <h1>全局layout</h1>
      {props.children}
    </div>
  );
};

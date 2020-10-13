import React from 'react';

// 可以在这里写公共的菜单、顶部栏等
export default ({ children }) => {
  return (
    <div>
      <h1>Page layout</h1>
      {children}
    </div>
  );
};

import React from 'react';

export default function Page({ children }) {
  return (
    <div>
      <h1>Page product/全局</h1>
      {children}
    </div>
  );
}

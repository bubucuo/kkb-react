import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <h3>全局Layout</h3>
      {children}
    </div>
  );
}

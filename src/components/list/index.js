import React from 'react';
import './style.css';

function List({ children }) {
  return (
    <div className="List">
      {children}
    </div>
  );
}

export default React.memo(List);

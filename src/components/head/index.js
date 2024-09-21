import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, classNameHead = 'Head' }) {
  return (
    <div className={classNameHead}>
      <h1>{title}</h1>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  classNameHead: PropTypes.node,
};

export default React.memo(Head);

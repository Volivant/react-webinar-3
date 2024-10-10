import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentBottom({ children, margin }) {
  const cn = bem('CommentBottom');
  return (
    <div className={cn({ margin })}>
      {children}
    </div>
  );
}

CommentBottom.propTypes = {
  children: PropTypes.node,
};

export default memo(CommentBottom);

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormLayout({ children, side, padding }) {
  const cn = bem('FormLayout');
  return (
    <div className={cn({ side, padding })}>
      {React.Children.map(children, child => (
        <div key={child.key} className={cn('item')}>
          {child}
        </div>
      ))}
    </div>
  );
}

FormLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium']),
};

FormLayout.defaultProps = {};

export default memo(FormLayout);

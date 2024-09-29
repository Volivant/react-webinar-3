import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function Navigation(props) {
  const cn = bem('Navigation');
  
  return (
    <div className={cn('home')}>
      <Link to='/'>{props.titleHome}</Link>
    </div>
  );
}

Navigation.propTypes = {
  titleHome: PropTypes.string,
};

export default memo(Navigation);
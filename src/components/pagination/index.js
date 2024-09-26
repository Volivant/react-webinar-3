import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { createPagination } from '../../utils';
import './style.css';
import item from '../item';

function Pagination({ total = 0, current = 0, onLoadPage =() => {} }) {
  const cn = bem('Pagination');
  //console.log(createPagination(total, current));
  const paginationItems = createPagination(total, current).map(item => {
    const classNameCell = (item===current ? 'cell--selected' : 'cell');
    if (item==='DOTS') {
      return <div className={cn('dots') }>&#8230;</div>
    } else {
      return <div className={cn(classNameCell)} onClick={() => onLoadPage(item)}>{item}</div>
    }


  });

  return (
    <div className={cn()}>
      {paginationItems}
    </div>
  );
}

Pagination.propTypes = {
  onLoadPage: PropTypes.func.isRequired,
  total: PropTypes.number,
  current: PropTypes.number,
};

export default memo(Pagination);

import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
    onLoadProduct: e => props.onLoadProduct(props.item._id),
  };

  return (
    <div className={cn()} >
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      
        <div className={cn('title')}>
          <Link to={props.path}  onClick={callbacks.onLoadProduct}>
            {props.item.title}
          </Link>
        </div>
      
      
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.btnTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  path: PropTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  path: "/product",
};

export default memo(Item);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const defaultProps = {
  onAppend: () => {},
};
function Item(props) {
  props = { ...defaultProps, ...props }
  const callbacks = {
    onAppend: e => {
      e.stopPropagation();
      props.onAppend(props.item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className='Item-price'>{Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(props.item.price)}</div>
      {props.item.count &&
        <div className='Item-count'>{props.item.count} шт</div>
      }
      <div className="Item-actions">
        <button onClick={callbacks.onAppend}>{props.btnTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAppend: PropTypes.func,
};



export default React.memo(Item);

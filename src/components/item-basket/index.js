import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const defaultProps = {
  onAppend: () => {},
};
function ItemBasket(props) {
  props = { ...defaultProps, ...props }
  const callbacks = {
    onAppend: e => {
      e.stopPropagation();
      props.onAppend(props.item.code);
    },
  };

  return (
    <div className={'ItemBasket'}>
      <div className="ItemBasket-code">{props.item.code}</div>
      <div className="ItemBasket-title">{props.item.title}</div>
      <div className='ItemBasket-price'>{Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(props.item.price)}</div>
      <div className='ItemBasket-count'>{props.item.count} шт</div>
      <div className="ItemBasket-actions">
        <button onClick={callbacks.onAppend}>{props.btnTitle}</button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAppend: PropTypes.func,
};



export default React.memo(ItemBasket);

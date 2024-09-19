import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAdd = () => {}, btnTitle = "Перейти", basketText }) {
  return (
    <div className="Controls">
      <div className='Controls-basket'>В корзине:</div>
      <div className='Controls-basket-content'>{basketText}</div>
      <button onClick={() => onAdd()}>{btnTitle}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  btnTitle: PropTypes.string,
};

export default React.memo(Controls);

import React from "react";
import PropTypes from 'prop-types';
import Head from "../head";
import List from "../list";
import './style.css';

function ModalList({ isVisible = false, listBasket, onDeleteBasketItem, onCloseBasket, sumBasket }) {
  return !isVisible ? null : (
    <div className="modal">
      <div className="modal-dialog">
        <Head title="Корзина" />
        <button className="modal-dialog-btn" onClick={onCloseBasket}>Закрыть</button>
        <List
          list={listBasket}
          onAppendBasketItem={onDeleteBasketItem}
          btnTitle='Удалить'
        />
        <div className="modal-sum">
          Итого: {Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(sumBasket)}
        </div>
      </div>
    </div>
  )
};

ModalList.propTypes = {
  isVisible: PropTypes.bool,
  listBasket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteBasketItem: PropTypes.func,
  onCloseBasket: PropTypes.func,
};

export default React.memo(ModalList);

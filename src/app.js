import React, { Fragment, useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalList from './components/modal-list';
import Item from './components/item/index.js';
import ItemBasket from './components/item-basket/index.js';
import { caseNumber } from './utils.js';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const listBasket = store.getState().listBasket;
  const [isModal, setModal] = useState(false);
  const countBasket = store.getState().listBasket.length;
  const sumBasket = store.getState().sumBasket;

  // Фнукция формирования текста для корзины
  const textBasket = () => {
    if (countBasket) {
      return store.getState().listBasket.length + ' ' + caseNumber(countBasket) + ' / ' +
        Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(sumBasket);
    } else {
      return 'пусто';
    }
  }

  const callbacks = {
    onAppendBasketItem: useCallback(
      code => {
        store.appendBasketItem(code);
      },
      [store]
    ),

    onDeleteBasketItem: useCallback(
      code => {
        store.removeBasketItem(code);
      },
      [store],
    ),
  };

  //Массив компонентов каталога товаров
  const arrItem = list.map(item => (
    <div key={item.code} className="List-item">
      <Item item={item} onAppend={callbacks.onAppendBasketItem} btnTitle='Добавить' />
    </div>
  ));

  //Массив компонентов корзины
  const arrItemBasket = listBasket.map(item => (
    <div key={item.code} className="List-item">
      <ItemBasket item={item} onAppend={callbacks.onDeleteBasketItem} btnTitle='Удалить' />
    </div>
  ));

  return (
    <Fragment>
      <PageLayout>
        <Head title="Магазин" />
        <Controls onAdd={() => setModal(true)} btnTitle="Перейти" basketText={textBasket()} />
        <List>
          {arrItem}
        </List>
      </PageLayout>
      <ModalList isVisible={isModal} >
        <Head title="Корзина" classNameHead='Head-basket' />
          <button className="modal-dialog-btn" onClick={() => setModal(false)}>Закрыть</button>
          <List>
            {arrItemBasket}
          </List>
          <div className="modal-sum">
            Итого: {Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(sumBasket)}
          </div>
      </ModalList>

    </Fragment>
  );
}

export default App;

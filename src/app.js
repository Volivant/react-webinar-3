import React, { Fragment, useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalList from './components/modal-list';
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
  const sumBasket = store.getSumBasket();

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

  return (
    <Fragment>
      <PageLayout>
        <Head title="Магазин" />
        <Controls onAdd={() => setModal(true)} btnTitle="Перейти" basketText={textBasket()} />
        <List
          list={list}
          onAppendBasketItem={callbacks.onAppendBasketItem}
          btnTitle='Добавить'
        />
      </PageLayout>
      <ModalList
        isVisible={isModal}
        listBasket={listBasket}
        onDeleteBasketItem={callbacks.onDeleteBasketItem}
        onCloseBasket={() => setModal(false)}
        sumBasket={sumBasket}
      />
    </Fragment>
  );
}

export default App;

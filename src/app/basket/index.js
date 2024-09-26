import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    btnDel: state.lang.del,
    btnClose: state.lang.close,
    titleBasket: state.lang.basket,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // загрузка описания товара
    loadProduct: useCallback(_id => {store.actions.product.load(_id); store.actions.modals.close()}, [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket 
          item={item} 
          onRemove={callbacks.removeFromBasket} 
          onLoadProduct={callbacks.loadProduct} 
          btnDel={select.btnDel}/>;
      },
      [callbacks.removeFromBasket, callbacks.loadProduct, select.btnDel],
    ),
  };

  return (
    <ModalLayout title={select.titleBasket} onClose={callbacks.closeModal} btnClose={select.btnClose}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);

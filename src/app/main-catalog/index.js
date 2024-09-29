import { Fragment, memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';


function MainCatalog() {
  const store = useStore();

  const loadStore = (current) => {
    store.actions.catalog.load(current);
  }

  useEffect(() => {
    loadStore(1);
    const productId = localStorage.getItem("productId");
    if (productId) {
      store.actions.product.load(productId);
    }
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    current: state.catalog.current,
    total: state.catalog.total,
    lang: state.lang.id,
    titleHead: state.lang.shop,
    btnAdd: state.lang.add,
    btnGoto: state.lang.goto,
    homePage: state.lang.home,
    inBasket: state.lang.inBasket,
    empty: state.lang.empty,
    countryLabel: state.lang.country, 
    categoryLabel: state.lang.category,
    editionLabel: state.lang.edition,
    priceLabel: state.lang.price,
    productOne: state.lang.one,
    productFew: state.lang.few,
    productMany: state.lang.many,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Загрузка страницы
    loadPage: useCallback(current => loadStore(current), [store]),
    // загрузка описания товара
    loadProduct: useCallback(_id => store.actions.product.load(_id), [store]),
    // загрузка описания товара
    changeLang: useCallback(lang => store.actions.lang.setLang(lang), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item 
          item={item} 
          onAdd={callbacks.addToBasket} 
          onLoadProduct={callbacks.loadProduct} 
          btnTitle={select.btnAdd}
          path={"/product"}/>;
      },
      [callbacks.addToBasket, callbacks.loadProduct, select.btnAdd],
    ),
  };

    return (
    <Fragment>
      <Head title={select.titleHead} lang={select.lang} onChangeLang={callbacks.changeLang}/>
      <BasketTool 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        btnGoto={select.btnGoto}
        title={select.homePage}
        inBasket={select.inBasket}
        empty={select.empty}
        productOne={select.productOne}
        productFew={select.productFew}
        productMany={select.productMany}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination total={select.total} current={select.current} onLoadPage={callbacks.loadPage}/>
    </Fragment>
  );
}

export default memo(MainCatalog);

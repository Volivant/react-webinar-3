import { Fragment, memo, useCallback } from 'react';
import Product from '../product';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';


function MainProduct() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    productId: state.product.id,
    productTitle: state.product.title,
    productDescription: state.product.description,
    productMadeInTitle: state.product.madeInTitle,
    productMadeInCode: state.product.madeInCode,
    productCategory: state.product.category,
    productEdition: state.product.edition,
    productPrice: state.product.price,
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

  return (
    <Fragment>
      <Head title={select.productTitle} lang={select.lang} onChangeLang={callbacks.changeLang} />
      <BasketTool 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        btnGoto={select.btnGoto}
        title={select.homePage}
        inBasket={select.inBasket}
        empty={select.empty}
      />
      <Product 
        title={select.productTitle} 
        description={select.productDescription} 
        madeInTitle={select.productMadeInTitle}
        madeInCode={select.productMadeInCode}
        category={select.productCategory}
        edition={select.productEdition}
        price={select.productPrice}
        onAdd={callbacks.addToBasket}
        id={select.productId}
        countryLabel={select.countryLabel}
        categoryLabel={select.categoryLabel}
        editionLabel={select.editionLabel}
        priceLabel={select.priceLabel}
        btnTitle={select.btnAdd}
      />
    </Fragment>
  );
}

export default memo(MainProduct);

import { Fragment, memo, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../../components/product';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';


function Main() {
  const store = useStore();

  const loadStore = (current) => {
    store.actions.catalog.load(current);
    store.actions.pagination.load(current);
  }

  useEffect(() => {
    loadStore(1);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    current: state.pagination.current,
    total: state.pagination.total,
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
          btnTitle={select.btnAdd}/>;
      },
      [callbacks.addToBasket, callbacks.loadProduct, select.btnAdd],
    ),
  };

  const home = () => {
    return(
      <Fragment>
        <Head title={select.titleHead} lang={select.lang} onChangeLang={callbacks.changeLang}/>
        <BasketTool 
          onOpen={callbacks.openModalBasket} 
          amount={select.amount} 
          sum={select.sum} 
          btnGoto={select.btnGoto}
          title={select.homePage}
        />
        <List list={select.list} renderItem={renders.item} />
        <Pagination total={select.total} current={select.current} onLoadPage={callbacks.loadPage}/>
      </Fragment>
    );
  };

  const productPage = () => {
    return(
      <Fragment>
        <Head title={select.titleHead} lang={select.lang} onChangeLang={callbacks.changeLang} />
        <BasketTool 
          onOpen={callbacks.openModalBasket} 
          amount={select.amount} 
          sum={select.sum} 
          btnGoto={select.btnGoto}
          title={select.homePage}
        />
        <Product 
          title={select.productTitle} 
          description={select.productDescription} 
          madeInTitle={select.productMadeInTitle}
          madeInCode={select.productMadeInCode}
          category={select.productCategory}
          edition={select.productEdition}
          price={select.productPrice}
        />
      </Fragment>
    );
  };

  return (
    <PageLayout>
      <Routes>
        <Route path="/" exact element={home()} />
        <Route path="/product" element={productPage()} />
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);

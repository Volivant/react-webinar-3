import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import ProfileInfo from '../../containers/profile-info';
import ProfileCard from '../../components/profile-card';


/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Profile() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    user: state.user.data,
    waiting: state.user.waiting,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <PageLayout>
      <ProfileInfo />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);

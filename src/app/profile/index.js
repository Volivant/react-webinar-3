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

  useInit(() => {
    store.actions.profile.loadUserProfile(select.user);
  }, []);

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.user.waiting,
    user: state.user.token,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <ProfileInfo />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard user={select.profile} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);

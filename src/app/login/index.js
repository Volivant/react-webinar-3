import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import ProfileInfo from '../../containers/profile-info';
import LoginForm from '../../containers/login-form';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const { t } = useTranslate();

  return (
    <PageLayout>
      <ProfileInfo />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
}

export default memo(Main);

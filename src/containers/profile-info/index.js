import { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Menu from '../../components/menu';
import ProfileTool from '../../components/profile-tool';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер с компонентами навигации
 */
function ProfileInfo() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    userName: state.user.data.username,
  }));

  const callbacks = {
    // Обработка перехода на главную
    onNavigate: useCallback(
      item => {
        if (item.key === 1) store.actions.catalog.resetParams();
      },
      [store],
    ),
    // Выход пользователя
    onLogout: useCallback(() => store.actions.user.deleteUser(), [store]),
  };

  // Функция для локализации текстов
  const { t } = useTranslate();

  const options = {
    menu: useMemo(() => [{ key: 1, title: select.userName, link: '/profile' }]),
  };

  return (
    <SideLayout side="end">
      <Menu items={options.menu} onNavigate={callbacks.onNavigate} />
      <ProfileTool
        action={select.userName ? 'logout' : 'login'}
        onLogin={async event => { navigate('/profile'); }}
        onLogout={callbacks.onLogout}
        t={t}
      />
    </SideLayout>
  );
}

export default memo(ProfileInfo);

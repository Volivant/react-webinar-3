import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import FormLayout from '../../components/form-layout';

/**
 * Контейнер с формой авторизации
 */
function LoginForm() {
  const store = useStore();

  const select = useSelector(state => ({
    login: state.user.input.user,
    password: state.user.input.password,
    authUser: state.user.token ? true : false,
    errorLoadUser: state.user.error.message,
  }));

  const callbacks = {
    // Ввод логина
    onInputLogin: useCallback(login => store.actions.user.setLogin({ login }), [store]),
    // Ввод пароля
    onInputPassword: useCallback(password => store.actions.user.setPassword({ password }), [store]),
    // Загрузка пользователя
    onLoadUser: useCallback(() => store.actions.user.loadUser(), [store]),
  };

  const { t } = useTranslate();
  const textError = select.errorLoadUser;

  return (
    <FormLayout justify-content="side_start">
      <div style={{fontWeight: 'bold'}}>Вход</div>
      <Input
        value={select.login}
        onChange={callbacks.onInputLogin}
        placeholder={'Логин'}
        delay={1000}
      />
      <Input
        value={select.password}
        onChange={callbacks.onInputPassword}
        placeholder={'Пароль'}
        delay={1000}
      />
      <div style={{color: 'red'}}>{select.errorLoadUser}</div>
      <button onClick={callbacks.onLoadUser}>{t('login.enter')}</button>
    </FormLayout>
  );
}

export default memo(LoginForm);

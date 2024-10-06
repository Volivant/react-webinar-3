import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
class LoginState extends StoreModule {
  initState() {
    return {
      login: '',
      password: '',
    };
  }

  setLogin(_login) {
    this.setState(
      {
        ...this.getState(),
        login: _login,
      },
      'получение логина для авторизации',
    );
  }

  setPassword(_password) {
    this.setState(
      {
        ...this.getState(),
        password: _password,
      },
      'получение пароля для авторизации',
    );
  }
}

export default LoginState;

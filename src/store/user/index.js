import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      token: localStorage.getItem("userToken"),
      input: {login: '', password: ''},
      error: '',
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка пользователя по токену
   * @param token {String}
   * @return {Promise<void>}
   */
  async loadUserToken() {
    const currentToken = this.getState().token;
    if (currentToken) {
      // Сброс текущего пользователя и установка признака ожидания загрузки
      this.setState({
        ...this.getState(),
        data: {},
        token: null,
        waiting: true,
      });

      try {
        const response = await fetch(
          `/api/v1/users/self?fields=*`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Token': currentToken
            }
          }
        );
        const json = await response.json();
        // Пользователь загружен успешно
        this.setState(
          {
            ...this.getState(),
            data: json.result,
            token: currentToken,
            waiting: false,
          },
          'Загружен пользователь по токену из АПИ',
        );

        localStorage.setItem("userToken",currentToken);

      } catch (e) {
        // Ошибка при загрузке
        // @todo В стейт можно положить информацию об ошибке
        this.setState({
          ...this.getState(),
          error: e.error,
          waiting: false,
        });
      }

    }
  }


  /**
   * Загрузка пользователя
   * @return {Promise<void>}
   */
  async loadUser() {
    // Сброс текущего пользователя и установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      data: {},
      token: null,
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/users/sign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "login": this.getState().input.login,
            "password": this.getState().input.password
          })
        }
      );
      const json = await response.json();

      // Пользователь загружен успешно
      this.setState(
        {
          ...this.getState(),
          data: json.result.user,
          token: json.result.token,
          waiting: false,
        },
        'Загружен пользователь из АПИ',
      );
      localStorage.setItem("userToken",json.result.token);

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        ...this.getState(),
        error: e,
        waiting: false,
      });
    }
  }

  setLogin(_login) {
    this.setState(
      {
        ...this.getState(),
        input:{...this.getState().input, ..._login},
      },
      'получение логина для авторизации',
    );
  }

  setPassword(_password) {
    this.setState(
      {
        ...this.getState(),
        input: {...this.getState().input, ..._password}
      },
      'получение пароля для авторизации',
    );
  }

  /**
   * Загрузка пользователя по токену
   * @param token {String}
   * @return {Promise<void>}
   */
  async deleteUser() {
    const currentToken = this.getState().token;
    if (currentToken) {

      try {
        const response = await fetch(
          `/api/v1/users/sign`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'X-Token': currentToken
            }
          }
        );
        // Пользователь  успешно вышел
        this.setState(
          {
            ...this.getState(),
            data: {},
            token: null,
            waiting: false,
          },
          'Загружен пользователь по токену из АПИ',
        );

        localStorage.removeItem("userToken");

      } catch (e) {
        // Ошибка при загрузке
        // @todo В стейт можно положить информацию об ошибке
        this.setState({
          ...this.getState(),
          error: e,
          waiting: false,
        });
      }

    }
  }

}



export default UserState;

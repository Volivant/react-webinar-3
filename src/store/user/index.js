import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      token: localStorage.getItem("userToken"),
      error: '',
      waiting: false, // признак ожидания загрузки
    };
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error:'',
    });
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
        if (!response.ok) {
          let error = new Error('Некорректный ответ от сервера');
          error.response = response;
          throw error
        }
        const json = await response.json();
        // Пользователь загружен успешно
        this.setState(
          {
            ...this.getState(),
            data: json.result,
            token: currentToken,
            error: '',
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
          error: e.statusText,
          waiting: false,
        });
      }

    }
  }


  /**
   * Загрузка пользователя
   * @return {Promise<void>}
   */
  async loadUser(_login, _password) {
    // Сброс текущего пользователя и установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      data: {},
      token: null,
      error: '',
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
            "login": _login,
            "password": _password
          })
        }
      );
      if (!response.ok) {
        let error = new Error('Некорректный ответ от сервера');
        error.response = response;
        throw error
      }
      const json = await response.json();

      // Пользователь загружен успешно
      this.setState(
        {
          ...this.getState(),
          data: json.result.user,
          token: json.result.token,
          error: '',
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
        error: e.response.statusText,
        waiting: false,
      });
    }
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
        if (!response.ok) {
          let error = new Error('Некорректный ответ от сервера');
          error.response = response;
          throw error
        }
        // Пользователь  успешно вышел
        this.setState(
          {
            ...this.getState(),
            data: {},
            token: null,
            error: '',
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
          error: e.statusText,
          waiting: false,
        });
      }

    }
  }

}



export default UserState;

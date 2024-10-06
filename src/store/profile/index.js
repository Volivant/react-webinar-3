import StoreModule from '../module';

/**
 * Детальная информация о пользователе
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      error: '',
      waiting: false, // признак ожидания загрузки
    };
  }

  async loadUserProfile(currentToken) {
    // Сброс текущего пользователя и установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      data: {},
      error: '',
      waiting: true,
    });
    console.log('токен ', currentToken);
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
          error: '',
          waiting: false,
        },
        'Загружен профиль пользователя из АПИ',
      );

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

export default ProfileState;

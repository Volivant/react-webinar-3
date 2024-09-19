/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
     * Выбор состояния
     * @returns {Object}
     */
  getSumBasket() {
    let sum = 0;
    this.state.listBasket.map(item => {
      sum = item.price * item.count + sum;

    });
    return sum;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

 /**
 * Добавление в корзину новой записи по коду
 * @param code
 */
  addBasketItem(code) {
    this.setState({
      ...this.state,
        listBasket: [...this.state.listBasket, {...this.state.list.find(item => item.code == code), count: 1}]
    });
  }

 /**
 * Увеличение количества товара в корзине по коду
 * @param code
 */
  incBasketItem(code) {
    this.setState({
      ...this.state,
        listBasket: this.state.listBasket.map(item => {
          if (item.code == code) {
            // увеличение количества товара
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        }),
      });
  }

  appendBasketItem(code) {
    if (this.state.listBasket.some(item => item.code == code)) {
      this.incBasketItem(code);
    } else {
      this.addBasketItem(code);
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteBasketItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      listBasket: this.state.listBasket.filter(item => item.code !== code),
    });
  }

  /**
 * Уменьшение количества товара в корзине по коду
 * @param code
 */
  decBasketItem(code) {
    this.setState({
      ...this.state,
        listBasket: this.state.listBasket.map(item => {
          if (item.code == code) {
            // увеличение количества товара
            return {
              ...item,
              count: item.count - 1,
            };
          }
          return item;
        }),
      });
  }

  removeBasketItem(code) {
    if (this.state.listBasket.some(item => item.code == code && item.count > 1)) {
      this.decBasketItem(code);
    } else {
      this.deleteBasketItem(code);
    }
  }
}

export default Store;

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
        listBasket: [...this.state.listBasket, {...this.state.list.find(item => item.code == code), count: 1}],
        sumBasket: this.state.sumBasket + this.state.list.find(item => item.code == code).price,
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
        sumBasket: this.state.sumBasket + this.state.list.find(item => item.code == code).price,
      });
  }

  appendBasketItem(code) {
    if (this.state.listBasket.some(item => item.code == code)) {
      this.incBasketItem(code);
    } else {
      this.addBasketItem(code);
    }
  }

  removeBasketItem(code) {
    this.setState({
      ...this.state,
      sumBasket: this.state.sumBasket - this.state.listBasket.find(item => item.code == code).price *
        this.state.listBasket.find(item => item.code == code).count,
      // Новый список, в котором не будет удаляемой записи
      listBasket: this.state.listBasket.filter(item => item.code !== code),
    });
  }

}

export default Store;

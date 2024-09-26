import StoreModule from '../module';
import { langArray } from '../../utils';

class Lang extends StoreModule {
  initState() {
    return {
      id: "RU",
      shop: "Магазин",
      basket: "Корзина",
      add: "Добавить",
      goto: "Перейти",
      home: "Главная",
      del: "Удалить",
      close: "Закыть",
    };
  }

  setLang(id) {
    if (id=='RU') {
      this.setState(
        langArray('EN'),
        'Смена на EN',
      );
    } else {
      this.setState(
        langArray('RU'),
        'Смена на RU',
      );
    }
   
    console.log(id);
  }
}

export default Lang;
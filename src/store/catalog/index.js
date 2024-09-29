import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      current: 0,
      limit: 10,
      total: 0,
    };
  }

  async load(pageNumber) {
    const response = await fetch('/api/v1/articles?limit=10&skip='+(pageNumber-1)*10);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        current: pageNumber,
      },
      'Загружены товары из АПИ',
    );
    const responseCount = await fetch('/api/v1/articles?fields=items(_id),count');
    const jsonCount = await responseCount.json();
    this.setState(
      {
        ...this.getState(),
        total: Math.ceil(jsonCount.result.count /this.getState().limit),
      },
      'Загружено общее кол-во товаров из АПИ',
    );
  }
}

export default Catalog;

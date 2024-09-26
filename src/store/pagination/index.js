import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      current: 0,
      limit: 10,
      total: 0,
    };
  }

  async load(currentPage) {
    const response = await fetch('/api/v1/articles?fields=items(_id),count');
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        current: currentPage,
        total: Math.ceil(json.result.count /this.getState().limit),
      },
      'Загружены номера страниц из АПИ',
    );
  }
}

export default Pagination;

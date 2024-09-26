import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      title: '',
      description: '',
      madeInTitle: '',
      madeInCode: '',
      edition: 0,
      price: 0,
    };
  }

  async load(id) {
    const response = await fetch('/api/v1/articles/' + id + '?fields=*,madeIn(title,code),category(title)');
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        title: json.result.title,
        description: json.result.description,
        madeInTitle: json.result.madeIn.title,
        madeInCode: json.result.madeIn.code,
        category: json.result.category.title,
        edition: json.result.edition,
        price: json.result.price,
      },
      'Загружено описание товара из АПИ',
    );
    // console.log(json.result);
  }
}

export default Product;

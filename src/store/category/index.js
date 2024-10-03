import StoreModule from '../module';

/**
 * Детальная информация о товаре для страницы товара
 */
class CategoryState extends StoreModule {
  initState() {
    return {
      data: [{value: '', title: "Все"}],
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка списка категорий
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущего списка категорий и установка признака ожидания загрузки
    this.setState({
      data: [{value: '', title: "Все"}],
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`,
      );
      const json = await response.json();
      //Получаем массив категорий
      const arrCategory =json.result.items;
      //получаем список родительских категорий
      let parentCategory = json.result.items.filter((item) => item.parent == null);

      // рекурсивная функция
      const findChildCategory = (categoryList, arrayCategory, parentId, layerChild = 1) => {
        const childElements = arrayCategory.filter((item) => item.parent != null);
        childElements.forEach(item => {
          if (item.parent._id === parentId) {
            let liderSim = '';
            for (let i = 0; i < layerChild; i++) {
              liderSim += '- ';
            }
            categoryList.push({value: item._id, title: liderSim + item.title});
            layerChild += 1;
            findChildCategory(categoryList, arrayCategory, item._id, layerChild);
            layerChild -= 1;
            return;
          }
        });
      }

      let categoryList = [{value: '', title: 'Все'}];

      parentCategory.forEach(item => {
        categoryList.push({value: item._id, title: item.title});
        findChildCategory(categoryList, arrCategory, item._id);
      });

      // Список категорий загружен успешно
      this.setState(
        {
          data: categoryList,
          waiting: false,
        },
        'Загружен список категорий из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: [{value: '', title: "Все"}],
        waiting: false,
      });
    }
  }
}

export default CategoryState;

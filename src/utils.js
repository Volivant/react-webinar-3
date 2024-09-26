/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};


/**
* Формирование массива ячеек для
* пострничной навигации
* @param totalPage {Number}
* @param currentPage {Number}
* @returns []
*/
export function createPagination(totalPage, currentPage = 1) {
  const totalPageNumbers = 6;

  // если кол-во страниц меньше кол-ва элементов пагинации
  if (totalPageNumbers >= totalPage) {
    return range(1, totalPage);
  }

  // левый и правый элемент от текущего
  const leftElementIndex = Math.max(currentPage - 1, 1);
  const rightElementIndex = Math.min(currentPage + 1, totalPage);

  // показывать или нет точки
  const showLeftDots = leftElementIndex > 2;
  const showRightDots = rightElementIndex < totalPage - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPage;

  // левые точки не показываем, правые показываем
  if (!showLeftDots && showRightDots) {
    let leftItemCount = (currentPage<3 ? 3 : 4);
    let leftRange = range(1, leftItemCount);

    return [...leftRange, 'DOTS', totalPage];
  }

  // левые точки показываем, правые нет
  if (showLeftDots && !showRightDots) {
    let rightItemCount = (currentPage>totalPage-2 ? 3 : 4);
    let rightRange = range(totalPage - rightItemCount + 1, totalPage);
    return [firstPageIndex, 'DOTS', ...rightRange];
  }

  // левые и правые точки показываем
  if (showLeftDots && showRightDots) {
    let middleRange = range(leftElementIndex, rightElementIndex);
    return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
  }
}

/**
 * Форматирование языкового массива 
 * @param lang {String}
 * @returns {Object}
 */
export function langArray(lang = 'RU') {
  const langRU = {
    id: "RU",
    shop: "Магазин",
    basket: "Корзина",
    add: "Добавить",
    goto: "Перейти",
    home: "Главная",
    del: "Удалить",
    close: "Закыть",
  }
  const langEN = {
    id: "EN",
    shop: "Shop",
    basket: "Basket",
    add: "Add",
    goto: "GoTo",
    home: "Home",
    del: "Delete",
    close: "Close",
  }
  return (lang == 'RU' ?
    langRU:
    langEN
  );
}
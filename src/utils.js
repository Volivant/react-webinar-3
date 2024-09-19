/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {*|string}
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
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
  return () => ++start;
})();

export function caseNumber(number) {
  const arrNumber = Array.from(String(number)).map(i=>Number(i))
  const lastDigit = arrNumber[arrNumber.length-1];
  const secondToLastDigit = (number < 10 ? 0 : arrNumber[arrNumber.length-2]);
  if (secondToLastDigit == 1) {
    return 'товаров';
  } else {
    switch (lastDigit) {
      case 1:
        return 'товар';
      case 2:
      case 3:
      case 4:
        return 'товара';
      default:
        return 'товаров';
    }
  }

}
